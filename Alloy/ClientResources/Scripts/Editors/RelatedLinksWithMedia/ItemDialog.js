//define(
//    [
//        "dojo/on",
//        "dojo/_base/declare",
//        "dojo/_base/lang",
//        "dijit/_CssStateMixin",
//        //"dijit/_Widget",
//        //"dijit/_TemplatedMixin",
//        "epi/shell/widget/FormContainer",
//        "dijit/form/TextBox",
//        "epi/shell/widget/_ActionProviderWidget",
//        "epi/shell/widget/_ModelBindingMixin",
//        "epi/shell/widget/dialog/_DialogContentMixin",
//        "epi/epi",
//        "epi/dependency",
//        "epi-cms/widget/ContentSelector",
//        "epi-cms/widget/MediaSelector",
//        "dojo/text!./templates/dataItemDialogTemplate.html"
//    ],
//    function (
//        on,
//        declare,
//        lang,
//        _CssStateMixin,
//        //_Widget,
//        //_TemplatedMixin,
//        FormContainer,
//        TextBox,
//        _ActionProviderWidget,
//        _ModelBindingMixin,
//        _DialogContentMixin,
//        epi,
//        dependency,
//        ContentSelector,
//        MediaSelector,
//        template
//    ) {
//        return declare("alloy/editors/RelatedLinksWithMedia/ItemDialog", [FormContainer, _ActionProviderWidget, _DialogContentMixin, _CssStateMixin, _ModelBindingMixin],
//            {
//                // summary:
//                //    The dialog to insert or edit a link item.
//                // tags:
//                //    public

//                _metadataManager: null,

//                templateString: template,

//                startup: function () {
//                    this.inherited(arguments);
//                },

//                postMixInProperties: function () {
//                    // summary:
//                    //		Initialize properties
//                    // tags:
//                    //    protected
//                    this.inherited(arguments);

//                    this._metadataManager = this._metadataManager || dependency.resolve("epi.shell.MetadataManager");

//                    this._actions = [
//                        {
//                            name: "ok",
//                            label: epi.resources.action.ok,
//                            settings: { type: "button", "class": "Salt" },
//                            action: lang.hitch(this, function () {
//                                if (this.validate()) {
//                                    this.executeDialog({ action: "ok" });
//                                }
//                            })
//                        },
//                        {
//                            name: "delete",
//                            label: epi.resources.action.deletelabel,
//                            settings: { type: "button", disabled: true }, // Default disable Delete button until the value is valid
//                            action: lang.hitch(this, function () {
//                               this.executeDialog({ action: "delete" });
//                            })
//                        },
//                        {
//                            name: "cancel",
//                            label: epi.resources.action.cancel,
//                            settings: { type: "button" },
//                            action: lang.hitch(this, function () {
//                                this.cancelDialog();
//                            })
//                        }
//                    ];
//                },

//                postCreate: function () {
//                    this.metadata = this._metadataManager.getMetadataForType(this.modelType);

//                    this.inherited(arguments);

//                    // Caption
//                    this.captionTextbox = new TextBox({
//                        // Set intermediateChanges on
//                        intermediateChanges: false
//                    });

//                    this.captionTextbox.placeAt(this.captionTextboxContainer);

//                    // Content selector
//                    var ContentSelectorOverride = declare(ContentSelector, {
//                        _onButtonClick: function () {
//                            this.inherited(arguments);
//                        }
//                    });

//                    // Create an instance of the EPiServer ContentSelector. Pass in the settings defined in the server-side part.
//                    this.contentPicker = new ContentSelectorOverride({
//                        roots: [this.startpageContentLink],
//                        allowedTypes: this.allowedTypes,
//                        showAllLanguages: false
//                    });

//                    // Hook into onChange event for the content selector
//                    this.connect(this.contentPicker, "onChange", function (contentId) {
//                        console.log("Selected content id: ", contentId);
//                    });

//                    // Put the content selector in our container defined in the template.
//                    this.contentPicker.placeAt(this.contentPickerContainer);

//                    // Media selector
//                    var ImageSelectorOverride = declare(MediaSelector, {
//                        _onButtonClick: function () {
//                            this.inherited(arguments);
//                        }
//                    });

//                    // Create an instance of the EPiServer ContentSelector. Pass in the settings defined in the server-side part.
//                    this.imagePicker = new ImageSelectorOverride({
//                        repositoryKey: this.msRepositoryKey,
//                        allowedTypes: this.msAllowedTypes
//                    });

//                    // Hook into onChange event for the media selector
//                    this.connect(this.imagePicker, "onChange", function (mediaId) {
//                        console.log("Selected media id: ", mediaId);
//                    });

//                    // Put the content selector in our container defined in the template.
//                    this.imagePicker.placeAt(this.imagePickerContainer);

//                    // Url
//                    this.urlTextbox = new TextBox({
//                        // Set intermediateChanges on
//                        intermediateChanges: false
//                    });

//                    this.urlTextbox.placeAt(this.urlTextboxContainer);

//                    // Url selector
//                    //var UrlSelectorOverride = declare(HyperLinkSelector, {
//                    //    _onButtonClick: function () {
//                    //        this.inherited(arguments);
//                    //    }
//                    //});

//                    // Create an instance of the EPiServer ContentSelector. Pass in the settings defined in the server-side part.
//                    //this.urlPicker = new UrlSelectorOverride({
//                    //    //hiddenFields: ["text", "title", "target", "language"]
//                    //});

//                    //this.urlPicker.metadata = {
//                    //    additionalValues: { "modelType": this.urlModelType }
//                    //};

//                    //// Hook into onChange event for the media selector
//                    //this.connect(this.urlPicker, "onChange", function (urlInfo) {
//                    //    console.log("Selected url info: ", new ContentReference(urlInfo));
//                    //});

//                    // Put the content selector in our container defined in the template.
//                    //this.urlPicker.placeAt(this.urlPickerContainer);
//                },

//                getActions: function () {
//                    // summary:
//                    //      Overridden from _ActionProvider to get the select current content action added to the containing widget
//                    //
//                    // returns:
//                    //      An array containing a select page action definition, if it is not a shared block
//                    return this._actions;
//                }
//            });
//    }
//);



