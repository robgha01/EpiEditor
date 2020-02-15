//define(
//    [
//        "epi/i18n!epi/cms/nls/episerver.cms.widget.editlink",
//        "dojo/on",
//        "dojo/_base/declare",
//        "dojo/_base/lang",
//        "dijit/_Widget",
//        "dijit/_TemplatedMixin",
//        "epi/shell/widget/dialog/Dialog",
//        "epi-cms/widget/_HasChildDialogMixin",
//        "alloy/editors/RelatedLinksWithMedia/ItemDialog",
//        "epi/epi",
//        "epi-cms/core/ContentReference",
//        "dojo/text!./templates/editorTemplate.html",
//        "xstyle/css!./editor.css"
//    ],
//    function (
//        res,
//        on,
//        declare,
//        lang,
//        _Widget,
//        _TemplatedMixin,
//        Dialog,
//        _HasChildDialogMixin,
//        ItemDialog,
//        epi,
//        ContentReference,
//        template
//    ) {
//        return declare("alloy.editors.RelatedLinksWithMedia.Editor", [_Widget, _TemplatedMixin],
//            {
//                resource: res,
//                // templateString: [protected] String
//                // A string that represents the default widget template.
//                templateString: template,
//                _setValueAttr: function (value) {
//                    // summary : Sets the value of the widget to "value" and updates the value displayed in the textbox.
//                    // tags    : private

//                    this._set('value', value);
//                    if (this.model) {
//                        this.model.value = this.value || '';
//                    }
//                },
//                _getDialog: function () {
//                    // summary:
//                    //		Create Link Editor dialog
//                    // tags:
//                    //    protected

//                    this.dialogContent = new ItemDialog({
//                        startpageContentLink: this.startpageContentLink,
//                        allowedTypes: this.allowedTypes,
//                        msRepositoryKey: this.msRepositoryKey,
//                        msAllowedTypes: this.msAllowedTypes,
//                        providers: this.providers,
//                        modelType: this.modelType
//                    });

//                    this.own(this.dialogContent);

//                    return new Dialog({
//                        title: this._getTitle(),
//                        dialogClass: "epi-dialog-portrait",
//                        content: this.dialogContent,
//                        destroyOnHide: false,
//                        defaultActionsVisible: false
//                    });
//                },
//                _getTitle: function () {
//                    // summary:
//                    //      Customize base get method for title prop.
//                    // tags:
//                    //      protected

//                    return lang.replace(this.value ? this.resource.title.template.edit : this.resource.title.template.create, this.resource.title.action);
//                },
//                openAddNewItemDialog: function () {
//                    var dialog = this._getDialog();

//                    this.isShowingChildDialog = true;
//                    dialog.show();
//                },
//                postCreate: function () {
//                    this.inherited(arguments);
//                }
//            });
//    }
//);

define([
    // dojo
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/when",
    "dojo/aspect",
    "dojo/Deferred",
    "dojox/uuid/generateRandomUuid",

    // EPi Framework
    "epi/shell/widget/_ModelBindingMixin",
    "epi/shell/widget/dialog/Dialog",
    "epi/Url",
    // EPi CMS
    "epi-cms/widget/LinkEditor",
    "epi-cms/widget/_SelectorBase",
    "epi-cms/core/PermanentLinkHelper",
    "epi/i18n!epi/cms/nls/episerver.cms.widget.editlink",
    "dojo/text!./templates/editorTemplate.html"
],
    function (
        // dojo
        declare,
        lang,
        domClass,
        domStyle,
        when,
        aspect,
        Deferred,
        generateRandomUuid,

        // EPi Framework
        _ModelBindingMixin,
        Dialog,
        Url,
        // EPi CMS
        LinkEditor,
        _SelectorBase,
        PermanentLinkHelper,
        res,
        template
    ) {

        return declare("alloy.editors.RelatedLinksWithMedia.Editor", [_SelectorBase, _ModelBindingMixin], {
            // summary:
            //    Represents the widget to edit todo.
            // tags:
            //    internal

            resource: res,

            templateString: template,

            // LinkHelper to retrieve the link info
            linkHelper: PermanentLinkHelper,

            postMixInProperties: function () {
                this.inherited(arguments);

                if (!this.model && this.modelClassName) {
                    var modelClass = declare(this.modelClassName);
                    this.model = new modelClass();
                }
            },

            startup: function () {
                // summary:
                //      Overridden to reset input field.

                if (this._started) {
                    return;
                }

                this.inherited(arguments);
                !this.value && this.set("value", null);
                this.items = this.get("value");
            },

            isValid: function () {
                // summary:
                //    Check if widget's value is valid.
                // tags:
                //    protected

                return (!this.required || (!this.get("isEmpty"))); // Not required or have some value.
            },

            _onDialogShow: function () {
                //summary:
                //    Handle onShow dialog event.
                // tags:
                //    protected

                this.inherited(arguments);

                var link = this.get("value");

                // we set the value to LinkEditor with obj.href format
                this.dialogContent.set("value", link);

            },

            _onDialogExecute: function () {
                //summary:
                //    Handle dialog close through executing OK, Cancel, Delete commands
                // tags:
                //    protected

                // we need to get value back from LinkEditor
                var linkObj = this.dialogContent.get("value");

                // setting the value from dialog
                this.set("value", linkObj);
            },

            _getDialog: function () {
                // summary:
                //		Create Link Editor dialog
                // tags:
                //    protected

                this.dialogContent = new LinkEditor({
                    modelType: this.modelType,
                    hiddenFields: ["id", "text", "title", "target", "language"]
                });

                this.own(this.dialogContent);

                return new Dialog({
                    title: this._getTitle(),
                    dialogClass: "epi-dialog-portrait",
                    content: this.dialogContent,
                    destroyOnHide: false,
                    defaultActionsVisible: false
                });

            },

            _setValueAttr: function (/* String*/ value) {
                //summary:
                //    Value's setter.
                //
                // value: [String]
                //    A string as link value
                //    Value to be set.
                //
                // tags:
                //  protected

                if (!value) {
                    this.set("isEmpty", true);

                    this._setValueAndFireOnChange(null);
                    return;
                }

                this.set("isEmpty", false);
                this._setValueAndFireOnChange(value);
            },

            _setValueAndFireOnChange: function (/* String */ value) {
                //summary:
                //    Sets the value internally and fires onChange if the value differs than the current value
                //
                // value: [String]
                //    A string as link value
                //    Value to be set.
                //
                // tags:
                //  private

                var currentLink = this.get("value");
                if (currentLink && value) {
                    // generate and set a uuid if needed
                    if (currentLink.id == null || currentLink.id === "") {
                        // set the id to a unique guid
                        currentLink.id = generateRandomUuid();
                    }
                    value.id = currentLink.id;
                } else if (value) {
                    // generate and set a uuid if needed
                    if (value.id == null || value.id === "") {
                        // set the id to a unique guid
                        value.id = generateRandomUuid();
                    }
                }

                this._set("value", value);

                // detect whether to invoke onChange or not
                var triggerOnChange = true;

                if (!currentLink && !value) {
                    triggerOnChange = false;
                } else if (value && value === currentLink) {
                    triggerOnChange = false;
                }

                if (triggerOnChange) {
                    this.onChange(value);
                }

                if (value) {
                    this._updateDisplayNode(value);
                } else {
                    this._updateDisplayNode(null);
                }
            },

            _getLinkName: function (/* String */ value) {
                // summary:
                //      Retrieves the name of given link value. If name not found then returns back the same provided value
                //
                // value: [String]
                //    A string as link value
                //
                // tags:
                //      private

                var def = new Deferred();
                when(this.linkHelper.getContent(value, { allLanguages: true }), lang.hitch(this, function (content) {
                    var result = { name: content ? content.name : value };
                    if (!def.isCanceled()) {
                        def.resolve(result);
                    }
                }));

                return def.promise;
            },

            _getTitle: function () {
                // summary:
                //      Customize base get method for title prop.
                // tags:
                //      protected

                return lang.replace(this.value ? this.resource.title.template.edit : this.resource.title.template.create, this.resource.title.action);
            },

            _updateDisplayNodeTitle: function () {
                // summary:
                //		updates the tooltip with the current text of displayNode
                // tags:
                //    protected

                this.resourceName.title = this.resourceName.textContent.trim();
            },

            _updateDisplayNode: function (value) {
                //summary:
                //    Update widget's display text and title.
                // tags:
                //    protected

                // update the displayNode with link name
                // There might be an ongoing getLinkName request, cancel it before starting a new one
                if (this._valueChangedPromise) {
                    this._valueChangedPromise.cancel("");
                }

                if (value && value.image) {
                    this._valueChangedPromise = this._getLinkName(value.image);
                    this._valueChangedPromise.then(lang.hitch(this, function(v) {
                        domClass.remove(this.domNode, "epi-noValue");
                        domClass.remove(this.resourceName, "dijitPlaceHolder");
                        this.set("selectedContentName", value.caption + " - " + v.name);
                    }));
                } else {
                    domClass.add(this.domNode, "epi-noValue");
                    domClass.add(this.resourceName, "dijitPlaceHolder");
                    this.set("selectedContentName", "");
                }
            }
        });
    });