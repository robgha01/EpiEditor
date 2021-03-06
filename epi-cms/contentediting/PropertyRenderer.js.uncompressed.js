﻿define("epi-cms/contentediting/PropertyRenderer", [
    "dojo/_base/json",
    "dojo/_base/declare",
    "epi",
    "epi/dependency",
    "epi/shell/XhrWrapper",
    "epi-cms/contentediting/_Renderer",
    "epi-cms/core/ContentReference",
    "epi/routes",
    "dojo/string"],

function (json, declare, epi, dependency, XhrWrapper, _Renderer, ContentReference, routes, string) {

    return declare([_Renderer], {
        // summary:
        //    Server side property renderer. Returns the mark-up generated by rendering a property on the server side.
        // tags:
        //    internal

        _routes: routes,

        // xhrHandler: [private] Object
        //  The xhr implementation to use when requesting data. Defaults to epi/shell/XhrWrapper
        _xhrHandler: null,

        // Profile: [private] Object
        //  The current profile.
        _profile: null,

        constructor: function () {
            if (!this._routes) {
                this._routes = epi.routes;
            }
            if (!this._xhrHandler) {
                this._xhrHandler = new XhrWrapper();
            }

            this._profile = this._profile || dependency.resolve("epi.shell.Profile");
        },

        render: function (contentLink, propertyName, propertyValue, renderSettings) {
            // summary:
            //    Get the content rendered by the server for an editable block.
            //
            // contentLink: object
            //    The content containing the update property
            //
            // propertyName: String
            //    The updated property name.
            //
            // propertyValue: String
            //    The updated raw value of the property.
            //
            // returns:
            //    A deferred
            //
            // tags:
            //    public


            var reference = ContentReference.toContentReference(contentLink);

            var url = null;
            if (renderSettings.useMvc) {
                url = this._routes.getActionPath({
                    moduleArea: "CMS",
                    controller: "PropertyRender",
                    action: "Render",
                    epieditmode: true,
                    visitorgroupsByID: renderSettings.visitorgroup,
                    epslanguage: this._profile ? this._profile.contentLanguage : "" // in order to render the property (content) in correct language
                });
            } else {

                url = this._routes.getActionPath({
                    moduleArea: "LegacyCMS",
                    path: "edit/RenderProperty.aspx",
                    id: reference.toString(),
                    epieditmode: true,
                    visitorgroupsByID: renderSettings.visitorgroup,
                    epslanguage: this._profile ? this._profile.contentLanguage : "" // in order to render the property (content) in correct language
                });
            }

            var postData = {
                propertyName: propertyName,
                propertyValue: json.toJson(propertyValue),
                id: reference.toString(), // The default model binder in MVC needs the id to be part of the posted data.
                renderSettings: ""
            };

            if (renderSettings && renderSettings.propertyRenderSettings) {
                postData.renderSettings = renderSettings.propertyRenderSettings;
            }


            return this._xhrHandler.xhrPost({
                url: url,
                handleAs: "json",
                content: postData
            }); //Deferred
        }
    });
});
