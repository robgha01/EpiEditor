//define([
//    // Dojo
//    "dojo/_base/array",                                                         // got some array extension methods
//    "dojo/_base/declare",
//    "dojo/_base/lang",
//    "dojo/_base/event",                                                         // used to stop event
//    "dojo/aspect",                                                              // used to listen event from model
//    "dojo/dom-class",                                                           // used to add/remove dom class
//    "dojo/dom-construct",                                                       // used to create dom elem
//    "dojo/dom-style",                                                           // used to show or not the action's container
//    "dojo/dom-geometry",                                                        // used to get dom position
//    "dojo/keys",                                                                // used to detect key to open context menu
//    "dojo/mouse",                                                               // used to detect mouse event
//    "dojo/on",                                                                  // used to listen event
//    "dojo/query",                                                               // used to select dome
//    "dojo/topic",                                                               // used to publish global event
//    "dojo/when",                                                                // used to work with potential assynchronous calls

//    // Dijit
//    "dijit/_TemplatedMixin",                                                    // mixin into me
//    "dijit/_WidgetsInTemplateMixin",                                            // mixin into me
//    "dijit/layout/_LayoutWidget",                                               // inherited directly

//    // EPi Framework
//    "epi/shell/dgrid/Formatter",                                                // mixin into grid class
//    "epi/shell/dnd/Target",                                                     // used to create an drop zone in actionContainer area
//    "epi/shell/widget/_ValueRequiredMixin",                                     // mixin into me
//    "epi/shell/widget/ContextMenu",                                             // used to create context menu
//    "epi/shell/TypeDescriptorManager",

//    // EPi CMS
//    "dgrid/Keyboard",                                                           // mixin into grid class
//    "dgrid/OnDemandList",                                                       // mixin into grid class
//    "dgrid/Selection",                                                          // mixin into grid class
//    "epi-cms/dgrid/formatters",                                                 // used to format grid's item display name
//    "epi-cms/dgrid/DnD",                                                        // mixin into grid class
//    "epi-cms/extension/events",                                                 // used to get default events
//    "epi-cms/contentediting/command/NewItem",                                   // used to create new item
//    "epi-cms/contentediting/viewmodel/ItemCollectionViewModel",                 // editor view model
//    "epi-cms/contentediting/command/ItemCollectionCommands",                    // context menu
//    "epi-cms/widget/_HasChildDialogMixin",                                      // mixin into me
//    "epi-cms/contentediting/editors/_TextWithActionLinksMixin",

//    // Resources
//    "dojo/text!./templates/LinkItemCollectionEditor.html",                          // editor template
//    "epi/i18n!epi/cms/nls/episerver.cms.contentediting.editors.itemcollection",  // language resources

//    "alloy.editors.RelatedLinksWithMedia.Editor"

//], function (
//    // Dojo
//    array,
//    declare,
//    lang,
//    event,
//    aspect,
//    domClass,
//    domConstruct,
//    domStyle,
//    domGeometry,
//    keys,
//    mouse,
//    on,
//    query,
//    topic,
//    when,

//    // Dijit
//    _TemplatedMixin,
//    _WidgetsInTemplateMixin,
//    _LayoutWidget,

//    // EPi Framework
//    Formatter,
//    Target,
//    _ValueRequiredMixin,
//    ContextMenu,
//    TypeDescriptorManager,

//    // EPi CMS
//    Keyboard,
//    OnDemandList,
//    Selection,
//    formatters,
//    DnD,
//    events,
//    NewItemCommand,
//    ItemCollectionViewModel,
//    ItemCollectionCommands,
//    _HasChildDialogMixin,
//    _TextWithActionLinksMixin,

//    // Resources
//    template,
//    resources,

//    EditorItem

//) {

//    return declare("alloy.editors.RelatedLinksWithMedia.LinkItemCollectionEditor", [
//        _LayoutWidget,                                                          // for base functionalities
//        _TemplatedMixin, _WidgetsInTemplateMixin,                               // for base functionalities
//        _ValueRequiredMixin,                                                    // for styling
//        _HasChildDialogMixin,                                                   // for open dialog to create/edit an item
//        _TextWithActionLinksMixin
//    ], {
//        // res: [protected] Json object
//        //      Language resource
//        res: resources,

//        // actionsResource: [Object]
//        //      The language resource for actions link
//        actionsResource: resources,

//        // templateString: [protected] String
//        //      UI template for the editor
//        templateString: template,

//        // value: [protected] String
//        //      Value of the property (link collection)
//        value: null,

//        // _gridClass: [private] Grid class
//        //      The grid class to create new grid instance.
//        _gridClass: declare([OnDemandList, Formatter, Selection, DnD, Keyboard]),

//        // _mouseOverClass: [private] CSS class
//        //      Used to show context menu when mouse hover a row
//        _mouseOverClass: "epi-dgrid-mouseover",

//        onChange: function (value) {
//            // summary:
//            //      Event raised when model value change or item's sort order changed
//            // value:
//            //      The link collection value
//            // tags:
//            //      public callback
//        },

//        postMixInProperties: function () {
//            this.inherited(arguments);
//        },

//        postCreate: function () {
//            this.inherited(arguments);

//            var dummyData = [];
//            var item1 = new EditorItem();



//            dummyData.push(item1);


//            this._set("value", []);

//            this.setupList();
//        },

//        startup: function () {
//            this.inherited(arguments);
//        },

//        setupList: function () {
//            // summary:
//            //      Initialization a list.
//            // tags:
//            //      protected

//            var menu = { hasMenu: !!this.contextMenu, settings: { title: this.res ? this.res.menutooltip : "" } },

//                linkAssembler = function (data, object, row) {
//                    return "<div class='epi-rowIcon'><span class='dijitInline dijitIcon epi-iconLink epi-objectIcon'></span></div>" + data;
//                },
//                // Init grid
//                settings = {
//                    selectionMode: "single",
//                    selectionEvents: "click,dgrid-cellfocusin",
//                    formatters: [formatters.contentItemFactory("text", "title", "typeIdentifier", menu), linkAssembler],
//                    dndParams: {
//                        copyOnly: true,
//                        accept: this.get("allowedDndTypes"),
//                        creator: lang.hitch(this, this._dndNodeCreator),
//                        isSource: !this.readOnly
//                    },
//                    dndSourceTypes: this.customTypeIdentifier ? [this.customTypeIdentifier] : [],
//                    consumer: this
//                },

//                getDndType = function (object) {
//                    var types = TypeDescriptorManager.getAndConcatenateValues(this.dndSourceTypes, "dndTypes");

//                    if (types.length === 0) {
//                        types = this.dndSourceTypes;
//                    }
//                    return types;
//                };

//            this.own(this.grid = new this._gridClass(settings, this.itemsContainer));
//            this.grid.set("showHeader", false);
//            this.grid.renderArray(this.model.get("data"));
//            this.grid.startup();
//        },

//        select: function (item) {
//            // summary:
//            //      Set selected item on dgrid
//            // item: Object
//            //      The selected object
//            // tags:
//            //      protected

//            this.grid.clearSelection();
//            if (item) {
//                this.grid.select(this.model.getItemIndex(item));
//            }
//        },

//        isValid: function () {
//            // summary:
//            //    Check if widget's value is valid.
//            // isFocused:
//            //    Indicate that the widget is being focused.
//            // tags:
//            //    protected

//            return (!this.required || (this.model && this.model.get("value").length > 0));
//        },

//        _getValueAttr: function () {
//            // summary:
//            //      The get value method
//            // tags:
//            //      public override

//            return this.model.get("value");
//        },

//        _setValueAttr: function (/*Object*/val) {
//            // summary:
//            //      The set value method
//            // tags:
//            //      public override

//            this._set("value", val);
//            // Reset value to an empty array
//            if (!val || !(val instanceof Array)) {
//                this._set("value", []);
//            }

//            if (this._started) {
//                this.model ? this.model.set("data", this.value) : (this.model = new ItemCollectionViewModel(this.value, { readOnly: this.readOnly }));
//                this._renderUI();
//            }
//        },

//        _setReadOnlyAttr: function (/*Boolean*/readOnly) {
//            // summary:
//            //      Overwrite readonly property
//            // tags:
//            //      Protected

//            this._set("readOnly", readOnly);

//            // Hide actions container area if is readOnly
//            this._displayActionsContainer();

//            if (this.model) {
//                this.model.set("readOnly", readOnly);
//            }
//        },

//        _dndNodeCreator: function (/*Object*/item, /*Object*/hint) {
//            // summary:
//            //      Custom DnD avatar creator method
//            // tags:
//            //      Protected

//            var dndTypes = this.allowedDndTypes,
//                node = domConstruct.create("div").appendChild(document.createTextNode(item.text));

//            if (item.typeIdentifier) {
//                dndTypes = TypeDescriptorManager.getAndConcatenateValues(item.typeIdentifier, "dndTypes");
//            }

//            return {
//                node: node,
//                type: dndTypes,
//                data: item
//            };
//        },

//        _aroundInsertRow: function (/*Object*/original) {
//            // summary:
//            //      Called 'around' the insertRow method to fix the grids less than perfect selection.
//            // tags:
//            //      private

//            return lang.hitch(this, function (object, parent, beforeNode, i, options) {

//                // Call original method
//                var row = original.apply(this.grid, arguments);

//                var currentItem = this.model.get("selectedItem");
//                if (currentItem && currentItem.id === object.id) {
//                    this.select(currentItem);
//                }

//                return row;
//            });
//        },

//        _renderUI: function () {
//            // summary:
//            //      The common method to update grid ui and set selected item.
//            // tags:
//            //      private

//            this.grid.refresh();
//            this.grid.renderArray(this.model.get("data"));
//        },

//        _displayActionsContainer: function () {
//            // summary:
//            //      Show/not actions container area
//            // tags:
//            //      private

//            // Hide actions when readonly or set not visible
//            domStyle.set(this.actionsContainer, "display", this.readOnly || !this.actionsVisible ? "none" : "");
//        }
//    });
//});

define([
    // Dojo
    "dojo/_base/array",                                                         // got some array extension methods
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/event",                                                         // used to stop event
    "dojo/aspect",                                                              // used to listen event from model
    "dojo/dom-class",                                                           // used to add/remove dom class
    "dojo/dom-construct",                                                       // used to create dom elem
    "dojo/dom-style",                                                           // used to show or not the action's container
    "dojo/dom-geometry",                                                        // used to get dom position
    "dojo/keys",                                                                // used to detect key to open context menu
    "dojo/mouse",                                                               // used to detect mouse event
    "dojo/on",                                                                  // used to listen event
    "dojo/query",                                                               // used to select dome
    "dojo/topic",                                                               // used to publish global event
    "dojo/when",                                                                // used to work with potential assynchronous calls
    "dojo/Deferred",
    "dojo/store/Observable",
    "dojo/store/Memory",
    "dojo/json",

    //dgrid
    "dgrid/OnDemandGrid",

    // dijit,
    "dijit/_CssStateMixin",
    "dijit/_TemplatedMixin",
    "dijit/_Widget",
    "dijit/_WidgetsInTemplateMixin",

    // EPi Framework
    "epi/shell/widget/_ModelBindingMixin",
    "epi/shell/widget/dialog/Dialog",
    "epi/Url",
    "epi-cms/dgrid/listItemFormatters",
    "epi-cms/dgrid/formatters",
    "epi/shell/dnd/Target",
    "epi/shell/widget/ContextMenu",

    // EPi CMS
    "epi-cms/contentediting/command/NewItem",
    "epi-cms/contentediting/command/ItemCollectionCommands",
    "epi-cms/contentediting/editors/_TextWithActionLinksMixin",
    "epi-cms/widget/LinkEditor",
    "epi-cms/widget/_SelectorBase",
    "epi-cms/core/PermanentLinkHelper",
    "epi/i18n!epi/cms/nls/episerver.cms.widget.editlink",
    "dojo/text!./templates/LinkItemCollectionEditor.html",

    // widgets
    "alloy/editors/RelatedLinksWithMedia/Editor",

    // style
    "xstyle/css!./linkItemCollectionEditor.css"
],
    function (
        // Dojo
        array,
        declare,
        lang,
        event,
        aspect,
        domClass,
        domConstruct,
        domStyle,
        domGeometry,
        keys,
        mouse,
        on,
        query,
        topic,
        when,
        Deferred,
        Observable,
        Memory,
        JSON,

        //dgrid
        OnDemandGrid,

        //ditij
        _CssStateMixin,
        _TemplatedMixin,
        _Widget,
        _WidgetsInTemplateMixin,

        // EPi Framework
        _ModelBindingMixin,
        Dialog,
        Url,
        listItemFormatters,
        formatters,
        Target,
        ContextMenu,

        // EPi CMS
        NewItemCommand,
        ItemCollectionCommands,
        _TextWithActionLinksMixin,
        LinkEditor,
        _SelectorBase,
        PermanentLinkHelper,
        res,
        template,
        EditorItem
    ) {

        return declare("alloy.editors.RelatedLinksWithMedia.LinkItemCollectionEditor",
            [
                _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin
            ],
            {
                // summary:
                //    Represents the widget to edit todo.
                // tags:
                //    internal
                newItemDialog: null,

                value: null,

                widgetsInTemplate: true,

                resource: res,

                templateString: template,

                // LinkHelper to retrieve the link info
                linkHelper: PermanentLinkHelper,

                startup: function () {
                    this.inherited(arguments);

                    //if (this._started) {
                    //    return;
                    //}

                    //!this.value && this.set("value", null);
                    //this._size();
                },

                postMixInProperties: function() {
                    this.inherited(arguments);

                    if (!this.model && this.modelClassName) {
                        var modelClass = declare(this.modelClassName);
                        this.model = new modelClass();
                    }
                },

                postCreate: function() {
                    this.inherited(arguments);
                },

                buildRendering: function() {
                    this.inherited(arguments);

                    this.store = new Observable(new Memory());

                    var gridSettings = {
                        store: this.store,
                        showHeader: false,
                        "class": "",
                        columns: {
                            caption: {
                                sortable: false,
                                label: "Caption",
                                className: "epi-grid--30 epi-cursor--default",
                                renderCell: function(object, value, node, options) {
                                    node.textContent = object.caption;
                                }
                            },
                            image: {
                                sortable: false,
                                label: "Image",
                                className: "epi-grid--40 epi-cursor--default",
                                renderCell: function(object, value, node, options) {
                                    var title = object.name + ", ID: " + object.contentLink;
                                    node.innerHTML =
                                        listItemFormatters.statusFormatter(
                                            formatters.contentItem(object.typeIdentifier, "", value, title),
                                            object,
                                            node,
                                            options);
                                }
                            },
                            url: {
                                sortable: false,
                                className: "epi-grid--30 epi-cursor--default",
                                label: "Url",
                                renderCell: function(object, value, node, options) {
                                    node.textContent = object.page ? object.page.id : object.href;
                                }
                            }
                        }
                    };

                    this.own(this.content = new declare([OnDemandGrid])(gridSettings, this.itemsContainer));
                    this.content.startup();

                    //this.setupCommands();
                    //this.setupActionContainer();
                },

                _onCreateNewItemClick: function() {
                    this.own(this.editorItem = new declare([EditorItem])({
                        startpageContentLink: this.startpageContentLink,
                        allowedTypes: this.allowedTypes,
                        msRepositoryKey: this.msRepositoryKey,
                        msAllowedTypes: this.msAllowedTypes,
                        urlModelType: this.urlModelType,
                        modelType: this.modelType,
                        providers: this.providers
                    }));

                    // Show the dialog
                    this.editorItem._onButtonClick();
                    this.connect(this.editorItem,
                        "onChange",
                        function(value) {
                            //this._setValueAndFireOnChange(value);

                            this.store.put(value);
                            var tmpValue = [];

                            for (var item of this.store.data) {
                                tmpValue.push({ caption: item.caption, image: item.image, page: item.page, href: item.href });
                            }

                            this.onFocus();
                            this.set("value", tmpValue);
                            this.onChange(tmpValue);
                        });
                },

                _size: function() {
                    this.inherited(arguments);
                    this.content.resize();
                },

                _displayActionsContainer: function() {
                    // summary:
                    //      Show/not actions container area
                    // tags:
                    //      private

                    // Hide actions when readonly or set not visible
                    domStyle.set(this.actionsContainer, "display", this.readOnly || !this.actionsVisible ? "none" : "");
                },

                _setValueAttr: function (value) {
                    // summary:
                    //    Sets the value of the widget to "value" and updates the value displayed in the textbox.
                    // tags:
                    //    private

                    this._set('value', value);
                }

                //_setValueAttr: function(/*Object*/val) {
                //    // summary:
                //    //      The set value method
                //    // tags:
                //    //      public override

                //    // Reset value to an empty array
                //    if (!val || !(val instanceof Array)) {
                //        //this._set("value", []);
                //        //this._setValueAndFireOnChange([]);
                //    } else {
                //        this._setValueAndFireOnChange(val);
                //    }
                //},

                // Event that tells EPiServer when the widget's value has changed.
                //onChange: function (value) { },

                //_onChange: function (value) {
                //    console.log("Notifying EPiServer with onChange: " + JSON.stringify(value));
                //    this.onChange(value);
                //    console.log("Done notitying EPiServer");
                //},

                //_setValueAndFireOnChange: function (/* Object */ value) {
                //    //summary:
                //    //    Sets the value internally and fires onChange if the value differs than the current value
                //    //
                //    // value: [Object]
                //    //    A related links with media model as value
                //    //    Value to be set.
                //    //
                //    // tags:
                //    //  private

                //    //var currentLink = this.get("value");
                //    //this._set("value", value);

                //    var currentLink = this.get("value");

                //    this.store.put(value);
                //    var tmpValue = [];

                //    for (var item of this.store.data) {
                //        tmpValue.push({ caption: item.caption, image: item.image, page: item.page, href: item.href });
                //    }

                //    this._set("value", tmpValue);

                //    // detect whether to invoke onChange or not
                //    var triggerOnChange = true;

                //    if (!currentLink && !value) {
                //        triggerOnChange = false;
                //    } else if (value && value === currentLink) {
                //        triggerOnChange = false;
                //    }

                //    if (triggerOnChange) {
                //        this.onChange(value);
                //    }
                //},
                //isValid: function () {
                //    return true;
                //}
            });
    });