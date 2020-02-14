using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using EPiServer;
using EPiServer.Cms.Shell;
using EPiServer.Cms.Shell.UI.ObjectEditing.InternalMetadata;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Shell;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using EPiServer.Web.Routing;

namespace Alloy
{
    public class RelatedLinksWithMediaModel
    {
        private readonly UrlResolver _urlResolver;
        private readonly UIDescriptorRegistry _uiDescriptors;
        private readonly string _typeIdentifier;
        private Func<string, Frame> _frameLoader;
        private IFrameRepository _frameRepository;

        public RelatedLinksWithMediaModel()
            : this(ServiceLocator.Current.GetInstance<UrlResolver>(),
                ServiceLocator.Current.GetInstance<UIDescriptorRegistry>(),
                ServiceLocator.Current.GetInstance<IFrameRepository>())
        {
        }

        public RelatedLinksWithMediaModel(
            UrlResolver urlResolver,
            UIDescriptorRegistry uiDescriptors,
            IFrameRepository frameRepository)
        {
            _urlResolver = urlResolver;
            _uiDescriptors = uiDescriptors;
            _typeIdentifier = _uiDescriptors.GetTypeIdentifiers(typeof(LinkItem)).FirstOrDefault<string>();
            _frameRepository = frameRepository;
        }

        [Required]
        //[DisplayName("/episerver/cms/widget/editlink/linkname")]
        public string Caption { get; set; }

        //[DisplayName("/episerver/cms/widget/editlink/linktitle")]
        //public string Title { get; set; }

        //[UIHint("TargetFrame")]
        //[DisplayName("/contenttypes/icontentdata/properties/pagetargetframe/caption")]
        //public int? Target { get; set; }

        [UIHint(UIHint.Image)]
        public ContentReference Image { get; set; }

        public PageReference Page { get; set; }

        //[Required]
        //[UIHint("HyperLink")]
        public string Href { get; set; }

        [ScaffoldColumn(false)]
        public string PublicUrl { get; set; }

        [ScaffoldColumn(false)]
        public string TypeIdentifier { get; set; }

        [ScaffoldColumn(false)]
        public Dictionary<string, string> Attributes { get; set; }

        internal Func<string, Frame> FrameLoader
        {
            get
            {
                return _frameLoader ?? (_frameLoader = _frameRepository.Load);
            }
            set { _frameLoader = value; }
        }

        public object ToClientModel(object serverModel)
        {
            LinkItem serverModel1 = (LinkItem) serverModel;
            Frame frame = FrameLoader(serverModel1.Target);
            int? nullable = frame != (Frame) null ? new int?(frame.ID) : new int?();
            LinkModel clientModel = new LinkModel(_urlResolver, _uiDescriptors, _frameRepository)
            {
                Text = serverModel1.Text,
                Title = serverModel1.Title,
                Href = _urlResolver.GetPermanent(serverModel1.Href, true),
                Target = nullable,
                TypeIdentifier = _typeIdentifier,
                Attributes = serverModel1.Attributes
            };
            ModifyIContentProperties(serverModel1, clientModel);
            return clientModel;
        }

        public object ToServerModel(object clientModel)
        {
            LinkModel linkModel = (LinkModel) clientModel;
            LinkItem linkItem1 = new LinkItem();
            if (linkModel.Attributes != null)
            {
                foreach (KeyValuePair<string, string> attribute in linkModel.Attributes)
                    linkItem1.Attributes.Add(attribute.Key, attribute.Value);
            }

            linkItem1.Text = linkModel.Text;
            linkItem1.Title = linkModel.Title;
            LinkItem linkItem2 = linkItem1;
            int? target = linkModel.Target;
            string str;
            if (!target.HasValue)
            {
                str = string.Empty;
            }
            else
            {
                IFrameRepository frameRepository = _frameRepository;
                target = linkModel.Target;
                int id = target.Value;
                str = frameRepository.Load(id).Name;
            }

            linkItem2.Target = str;
            linkItem1.Href = linkModel.Href;
            return linkItem1;
        }

        private void ModifyIContentProperties(LinkItem serverModel, LinkModel clientModel)
        {
            string mappedHref = serverModel.GetMappedHref();
            if (string.IsNullOrEmpty(mappedHref))
                return;
            UrlBuilder urlBuilder;
            try
            {
                urlBuilder = new UrlBuilder(mappedHref);
            }
            catch (UriFormatException ex)
            {
                return;
            }

            IContent content = _urlResolver.Route(urlBuilder, ContextMode.Preview);
            if (content == null)
                return;
            clientModel.TypeIdentifier =
                _uiDescriptors.GetTypeIdentifiers(content.GetType()).FirstOrDefault<string>();
            clientModel.PublicUrl = UriSupport.AbsoluteUrlBySettings(content.PublicUrl(_urlResolver));
        }
    }
}