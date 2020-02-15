using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using EPiServer.Cms.Shell.UI.ObjectEditing.InternalMetadata;
using EPiServer.Core;
using EPiServer.Framework.Localization;
using EPiServer.ServiceLocation;
using EPiServer.Shell;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using EPiServer.Web;

namespace Alloy.Business.EditorDescriptors
{
    public class RelatedLinksWithMedia : ICloneable, IEquatable<RelatedLinksWithMedia>
    {
        public string Id { get; set; }

        public string Caption { get; set; }

        public ContentReference Image { get; set; }

        public PageReference Page { get; set; }

        public string Href { get; set; }

        public object Clone()
        {
            RelatedLinksWithMedia linkItem = new RelatedLinksWithMedia();
            linkItem.Caption = string.Copy(Caption);
            linkItem.Image = Image.Copy();
            linkItem.Page = Page.Copy();
            linkItem.Href = string.Copy(Href);

            return linkItem;
        }

        public bool Equals(RelatedLinksWithMedia other)
        {
            if (this == other)
                return true;
            if (other == null)
                return false;
            return string.Equals(Caption, other.Caption) && Image.Equals(other.Image) && Page.Equals(other.Page) && string.Equals(Href, other.Href);
        }
    }


    [EditorDescriptorRegistration(TargetType = typeof(RelatedLinksWithMedia), UIHint = "RelatedLinksWithMedia")]
    public class RelatedLinksWithMediaDescriptor : EditorDescriptor
    {
        private LocalizationService _localizationSvc;

        public RelatedLinksWithMediaDescriptor()
            : this(LocalizationService.Current)
        {
        }

        public RelatedLinksWithMediaDescriptor(LocalizationService localizationSvc)
        {
            ClientEditingClass = "alloy/editors/RelatedLinksWithMedia/Editor";
            _localizationSvc = localizationSvc;
        }

        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            base.ModifyMetadata(metadata, attributes);

            // ContentSelector
            metadata.EditorConfiguration.Add("startpageContentLink", SiteDefinition.Current.StartPage);
            metadata.EditorConfiguration.Add("allowedTypes", new[] {typeof(PageData)});

            // MediaSelector
            metadata.EditorConfiguration.Add("msRepositoryKey", "media");
            metadata.EditorConfiguration.Add("msAllowedTypes", new[] {typeof(ImageData)});

            // UrlSelector
            metadata.EditorConfiguration.Add("urlModelType", new[] {typeof(LinkModel).FullName});

            metadata.EditorConfiguration.Add("modelType", typeof(RelatedLinksWithMediaModel).FullName);


            List<HyperLinkModel> list = ServiceLocator.Current.GetAllInstances<IContentRepositoryDescriptor>().OrderBy(r => r.SortOrder).Where(r =>
            {
                if (r.LinkableTypes != null)
                {
                    return r.LinkableTypes.Any();
                }

                return false;
            }).Select(r => new HyperLinkModel
            {
                Name = r.CustomSelectTitle ?? r.Name,
                Roots = r.Roots,
                WidgetType = "epi-cms/widget/ContentSelector",
                LinkableTypes = r.LinkableTypes,
                SearchArea = r.SearchArea
            }).ToList();

            list.InsertRange(list.Count, new[]
            {
                new HyperLinkModel
                {
                    Name = "ExternalLink",
                    Title = _localizationSvc.GetString("/episerver/cms/widget/editlink/externallinktooltip"),
                    DisplayName = _localizationSvc.GetString("/episerver/cms/widget/editlink/externallink"),
                    WidgetType = "epi-cms/form/UrlValidationTextBox"
                },
                new HyperLinkModel
                {
                    Name = "Anchor",
                    Title = _localizationSvc.GetString("/episerver/cms/widget/editlink/anchortooltip"),
                    DisplayName = _localizationSvc.GetString("/episerver/cms/widget/editlink/anchor"),
                    WidgetType = "epi-cms/form/AnchorSelectionEditor",
                    Invisible = true
                }
            });

            metadata.EditorConfiguration["providers"] = list;
        }

        public class HyperLinkModel
        {
            public string Name { get; set; }

            public string DisplayName { get; set; }

            public string Title { get; set; }

            public IEnumerable<ContentReference> Roots { get; set; }

            public string WidgetType { get; set; }

            public IDictionary<string, object> WidgetSettings { get; set; }

            public IEnumerable<Type> LinkableTypes { get; set; }

            public bool Invisible { get; set; }

            public string SearchArea { get; set; }
        }
    }

    [EditorDescriptorRegistration(TargetType = typeof(IEnumerable<RelatedLinksWithMedia>), UIHint = "RelatedLinksWithMediaCollection")]
    public class ItemCollectionEditorDescriptor : RelatedLinksWithMediaDescriptor
    {
        public ItemCollectionEditorDescriptor()
        {
            ClientEditingClass = "alloy/editors/RelatedLinksWithMedia/LinkItemCollectionEditor";
        }

        public override void ModifyMetadata(
            ExtendedMetadata metadata,
            IEnumerable<Attribute> attributes)
        {
            base.ModifyMetadata(metadata, attributes);
            
        }
    }
}