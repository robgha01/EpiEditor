using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using Alloy.Business.EditorDescriptors;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.PlugIn;

namespace Alloy.Models.Properties
{
    [EditorHint("RelatedLinksWithMedia")]
    [PropertyDefinitionTypePlugIn(Description = "Some description todo", DisplayName = "Related Links With Media")]
    public class PropertyRelatedLinksWithMedia : PropertyLongString
    {
        public override Type PropertyValueType
        {
            //defines the return type, This will return type of RelatedLinksWithMedia when the content is parsed to the view
            get { return typeof(RelatedLinksWithMedia); }
        }

        public override object Value
        {
            get
            {
                //get value as string
                var value = base.Value as string;
                if (value == null)
                {
                    //return null if value is null after parsing it as a string
                    return null;
                }
                //deserialize the string as an AdaptiveImages object
                var serializer = new JavaScriptSerializer();
                return serializer.Deserialize(value, typeof(RelatedLinksWithMedia));
            }
            set
            {
                if (value is RelatedLinksWithMedia)
                {
                    //serialize content if content is RelatedLinksWithMedia 
                    var serializer = new JavaScriptSerializer();
                    base.Value = serializer.Serialize(value);
                }
                else
                {
                    //parse value if it is not RelatedLinksWithMedia (we persume it is already serlized)
                    base.Value = value;
                }
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            return LongString;
        }
    }
}
