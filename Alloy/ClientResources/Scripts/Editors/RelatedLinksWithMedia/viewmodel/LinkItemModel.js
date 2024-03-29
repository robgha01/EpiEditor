﻿define([
    // Dojo
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Deferred",                                                                        // used to make a method become asynchronous
    "dojo/when",                                                                            // used to wait an asynchronous request

    // EPi Framework
    "epi/Url",                                                                              // used to build a public url

    // EPi CMS
    "epi-cms/contentediting/viewmodel/CollectionItemModel",                                 // mixed into me
    "epi-cms/core/PermanentLinkHelper"                                                      // used to get content by permanent link

], function (

    // Dojo
    declare,
    lang,
    Deferred,
    when,

    // EPi Framework
    Url,

    // EPi CMS
    CollectionItemModel,
    PermanentLinkHelper

) {

    return declare("alloy.editors.RelatedLinksWithMedia.viewmodel.LinkItemModel", [CollectionItemModel], {
        // _defaultDataStoreName: [protected virtual] String
        //      Default data store name to get from registry, if store is null.
        //_defaultDataStoreName: "epi.cms.content.light",

        serialize: function () {
            // summary:
            //      Serialize data to be accepted by server
            // tags:
            //      public override

            return {
                caption: this.caption,
                image: this.image,
                page: this.page,
                href: this.href
            };
        }

        //_buildPublicUrl: function (/*String*/url) {
        //    // summary:
        //    //      The common method used to build full url.
        //    // tags:
        //    //      private

        //    var returnUrl = new Url(url);
        //    if (!returnUrl.scheme) {
        //        returnUrl = new Url("", {
        //            scheme: window.location.protocol,
        //            authority: window.location.hostname,
        //            path: url
        //        });

        //    }
        //    return returnUrl.toString();
        //},

        //_publicUrlGetter: function () {
        //    // summary:
        //    //      Customize get method to return correct a public url.
        //    // tags:
        //    //      protected override

        //    return this._buildPublicUrl(this.publicUrl || this.url || this.href);
        //},

        //_permanentUrlSetter: function (/*String*/value) {
        //    // summary:
        //    //      Customize default set method for permanentUrl prop.
        //    // tags:
        //    //      protected override

        //    this.href = this.permanentUrl = value;
        //},

        //_onTryUpdateItemModel: function () {
        //    // summary:
        //    //      Callback method that called when we need updated item's model
        //    // data: [Object]
        //    //      The data returned from store
        //    // tags:
        //    //      protected override

        //    // Try get content from href (assumption that href is permanent link)
        //    if (!this.typeIdentifier) {
        //        return when(PermanentLinkHelper.getContent(this.href), lang.hitch(this, function (content) {
        //            if (content) {
        //                this._parseFromContent(content);
        //            }
        //        }));
        //    }
        //},

        //_parseFromContent: function (content) {
        //    // summary:
        //    //      Parse a link item model from contentdata
        //    // content: [Object]
        //    //      An structure store content data model
        //    // tags:
        //    //      private

        //    if (content) {
        //        this.typeIdentifier = content.typeIdentifier;
        //        this.publicUrl = this._buildPublicUrl(content.publicUrl);
        //    }
        //}
    });
});
