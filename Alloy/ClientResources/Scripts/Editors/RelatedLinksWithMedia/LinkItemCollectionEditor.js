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

    // dgrid
    "dgrid/Keyboard",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dgrid/extensions/ColumnResizer",
    "dgrid/extensions/ColumnReorder",
    "put-selector/put",

    // dijit,
    "dijit/_CssStateMixin",
    "dijit/_TemplatedMixin",
    "dijit/_Widget",
    "dijit/_WidgetsInTemplateMixin",

    // epi shell
    "epi/shell/dgrid/Formatter",

    // EPi Framework
    "epi/shell/widget/_ModelBindingMixin",
    "epi/shell/widget/dialog/Dialog",
    "epi/Url",
    "epi-cms/dgrid/listItemFormatters",
    "epi-cms/dgrid/formatters",
    "epi-cms/dgrid/WithContextMenu",
    "epi/shell/dnd/Target",
    "epi/shell/widget/ContextMenu",
    "epi/shell/DialogService",

    // EPi CMS
    "epi-cms/contentediting/command/NewItem",
    "epi-cms/contentediting/command/ItemCollectionCommands",
    "epi-cms/contentediting/editors/_TextWithActionLinksMixin",
    "epi-cms/widget/LinkEditor",
    "epi-cms/widget/_SelectorBase",
    "epi-cms/core/PermanentLinkHelper",
    "epi/i18n!epi/cms/nls/episerver.cms.widget.editlink",
    "dojo/text!./templates/LinkItemCollectionEditor.html",
    "epi-cms/contentediting/editors/DefaultGridAssembler",
    "epi/shell/command/DelegateCommand",
    "epi/i18n!epi/nls/episerver.shared",

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
        json,

        //dgrid
        Keyboard,
        OnDemandGrid,
        Selection,
        ColumnResizer,
        ColumnReorder,
        put,

        //ditij
        _CssStateMixin,
        _TemplatedMixin,
        _Widget,
        _WidgetsInTemplateMixin,
        Formatter,

        // EPi Framework
        _ModelBindingMixin,
        Dialog,
        Url,
        listItemFormatters,
        formatters,
        WithContextMenu,
        Target,
        ContextMenu,
        dialogService,

        // EPi CMS
        NewItemCommand,
        ItemCollectionCommands,
        _TextWithActionLinksMixin,
        LinkEditor,
        _SelectorBase,
        PermanentLinkHelper,
        res,
        template,
        DefaultGridAssembler,
        DelegateCommand,
        sharedResources,
        EditorItem
    ) {
        return declare("alloy.editors.RelatedLinksWithMedia.LinkItemCollectionEditor",
            [
                _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin
            ],
            {
                value: null,

                widgetsInTemplate: true,

                multiple: true,

                resource: res,

                templateString: template,

                // LinkHelper to retrieve the link info
                linkHelper: PermanentLinkHelper,

                _currentProviderHandler: null,

                startup: function () {
                    this.inherited(arguments);

                    //if (this._started) {
                    //    return;
                    //}

                    //!this.value && this.set("value", null);
                    //this._size();
                },

                postCreate: function() {
                    this.inherited(arguments);
                },

                buildRendering: function() {
                    this.inherited(arguments);

                    this.store = new Observable(new Memory());

                    var gridSettings = {
                        store: this.store,
                        showHeader: false
                    };

                    var columns = {
                        caption: {
                            sortable: false,
                            label: "Caption",
                            className: "epi-grid--30 epi-cursor--default",
                            renderCell: function(object, value, node, options) {
                                node.textContent = object.caption;
                            }
                        }//,
                        //image: {
                        //    sortable: false,
                        //    label: "Image",
                        //    className: "epi-grid--40 epi-cursor--default",
                        //    renderCell: function(object, value, node, options) {
                        //        var title = object.name + ", ID: " + object.contentLink;
                        //        node.innerHTML =
                        //            listItemFormatters.statusFormatter(
                        //                formatters.contentItem(object.typeIdentifier, "", value, title),
                        //                object,
                        //                node,
                        //                options);
                        //    }
                        //},
                        //url: {
                        //    sortable: false,
                        //    className: "epi-grid--30 epi-cursor--default",
                        //    label: "Url",
                        //    renderCell: function(object, value, node, options) {
                        //        node.textContent = object.page ? object.page.id : object.href;
                        //    }
                        //}
                    };

                    var commands = [
                        new DelegateCommand({
                            name: "add",
                            tooltip: "SomeTooltipText",
                            iconClass: "epi-iconPlus",
                            canExecute: true,
                            isAvailable: true, //this._commandIsAvailable(commandMask.add, availableCommands),
                            delegate: lang.hitch(this, this.addItem)
                        })
                    ];

                    // Create grid assembler
                    var gridAssembler = new DefaultGridAssembler({
                        gridType: declare([OnDemandGrid, Formatter, Selection, Keyboard, ColumnResizer, ColumnReorder, WithContextMenu]),
                        gridSettings: gridSettings,
                        columnDefinitions: columns,
                        listCommands: commands, //this.readOnly ? [] : this.model.getListCommands(),
                        itemCommandsFactory: lang.hitch(this, function (item, category) {
                            return this.readOnly ? [] : this.getItemCommands(item, commands, category);
                        })
                    });

                    // Build the grid.
                    this.own(this.grid = gridAssembler.build(this.gridNode, this.commandTargetNode));

                    //style Grid
                    domClass.add(this.gridNode, "epi-plain-grid-modal epi-plain-grid--margin-bottom epi-plain-grid--cell-borders");

                    this.own(this.grid.on(".dgrid-row:click", lang.hitch(this, this.onGridRowClick)));
                    this.own(this.grid.on(".dgrid-row:dblclick", lang.hitch(this, this.onGridRowDblClick)));
                },

                _size: function() {
                    this.inherited(arguments);
                    this.grid.resize();
                },

                _setValueAttr: function (value) {
                    // summary:
                    //    Sets the value of the widget to "value" and updates the value displayed in the textbox.
                    // tags:
                    //    private

                    this.onFocus();
                    this._set("value", [...value]);
                    this.store.setData([...value]);
                    this.grid.refresh();

                    // tell epi to save the value
                    this.onChange([...this.store.data]);
                },

                openEditorDialog: function(callback, editorItemValue) {
                    this.own(this.editorItem = new declare([EditorItem])({
                        startpageContentLink: this.startpageContentLink,
                        allowedTypes: this.allowedTypes,
                        msRepositoryKey: this.msRepositoryKey,
                        msAllowedTypes: this.msAllowedTypes,
                        urlModelType: this.urlModelType,
                        modelType: this.modelType,
                        providers: this.providers
                    }));

                    if (editorItemValue) {
                        this.editorItem._setValueAttr(editorItemValue);
                    }

                    // Hide the delete button
                    declare.safeMixin(this.editorItem, {
                        _getDialogContent: function () {
                            var linkEditor = this.inherited(arguments);

                            // override the linkeditor getActions
                            declare.safeMixin(linkEditor, {
                                getActions: function () {
                                    var actions = this.inherited(arguments);

                                    actions.splice(1, 1);

                                    return actions;
                                }
                            });

                            return linkEditor;
                        }
                    });

                    // Show the dialog
                    this.editorItem._onButtonClick();

                    // Connect the onChange event to our callback
                    this.connect(this.editorItem, "onChange", callback);
                },

                addItem: function () {
                    this.openEditorDialog(function (value) {
                        this.store.put(value);
                        this.set("value", this.store.data);
                    });
                },

                editItem: function (cmd) {
                    this.openEditorDialog(function (value) {
                        this.store.put(value);
                        this.set("value", this.store.data);
                    }, cmd.model);
                },

                removeItem: function (cmd) {
                    var self = this;
                    dialogService.confirmation({
                        heading: "Remove " + cmd.model.caption,
                        content: "Are you sure you want to remove "+"'" + cmd.model.caption + "'?",
                        iconClass: "epi-iconTrash"
                    }).then(function () {
                        self.store.remove(cmd.model.id);
                        self.set("value", self.store.data);
                    }).otherwise(function () {
                        // Even tho we don't use this epi will throw error if its not here...
                    });
                },

                moveItem: function (item, before) {
                    // Make a copy of the value store
                    var valueArray = [...this.store.data];

                    // Indicate that is still moving
                    this._itemsUnchanged = true;

                    var itemIndex = valueArray.indexOf(item);

                    // Remove item
                    valueArray.splice(itemIndex, 1);

                    // Get ref index
                    var refIndex = itemIndex.valueOf();
                    var targetIndex = before ? refIndex - 1 : refIndex + 1;
                    //are we moving the same item? use itemIndex since refIndex will be -1;
                    targetIndex = refIndex === -1 ? itemIndex : targetIndex;

                    valueArray.splice(targetIndex, 0, item);

                    // Sync the value store
                    this.store.setData(valueArray);
                    this.set("value", this.store.data);
                },

                moveItemUpDelegate: function (cmd) {
                    // summary:
                    //      execute delegate for move up command.
                    // tags:
                    //      protected

                    var item = cmd.model;
                    var index = this.store.data.indexOf(item);
                    var refIndex = index - 1;
                    if (refIndex >= 0) {
                        this.moveItem(item, true);
                    }
                },

                moveItemDownDelegate: function (cmd) {
                    var item = cmd.model;
                    var index = this.store.data.indexOf(item);
                    var refIndex = index + 1;

                    if (refIndex < this.store.data.length) {
                        this.moveItem(item, false);
                    }
                },

                getItemCommands: function (item, availableCommands, category) {
                    // summary:
                    //      Return item level commands.
                    // item:
                    //      The item
                    // availableCommands:
                    //      The available commands bitmask. This value is Not needed to be passed since it's set up when the model is created.
                    // category:
                    //      The category
                    // tags:
                    //      public

                    return [
                        new DelegateCommand({
                            name: "edit",
                            category: category,
                            label: sharedResources.action.edit,
                            iconClass: "epi-iconPen",
                            model: item,
                            canExecute: true,
                            isAvailable: true,
                            //canExecute: true,
                            //isAvailable: this._commandIsAvailable(commandMask.edit, availableCommands),
                            delegate: lang.hitch(this, this.editItem)
                        }),


                        new DelegateCommand({
                            name: "moveUp",
                            category: category,
                            label: sharedResources.action.moveup,
                            iconClass: "epi-iconUp",
                            model: item,
                            isAvailable: true,
                            canExecute: this.store.data.indexOf(item) > 0,
                            //isAvailable: this._commandIsAvailable(commandMask.moveUp, availableCommands),
                            delegate: lang.hitch(this, this.moveItemUpDelegate)
                        }),

                        new DelegateCommand({
                            name: "moveDown",
                            category: category,
                            label: sharedResources.action.movedown,
                            iconClass: "epi-iconDown",
                            model: item,
                            isAvailable: true,
                            canExecute: this.store.data.indexOf(item) < this.store.data.length - 1,
                            //isAvailable: this._commandIsAvailable(commandMask.moveDown, availableCommands),
                            delegate: lang.hitch(this, this.moveItemDownDelegate)
                        }),

                        new DelegateCommand({
                            name: "remove",
                            category: category,
                            label: sharedResources.action.remove,
                            iconClass: "epi-iconTrash",
                            model: item,
                            canExecute: true,
                            isAvailable: true,
                            //isAvailable: this._commandIsAvailable(commandMask.remove, availableCommands),
                            delegate: lang.hitch(this, this.removeItem)
                        })
                    ];
                },

                _onGridRowSelect: function (e) {
                    // summary:
                    //      Makes sure the right commands are available in the context menu when selecting a row in the grid.
                    // tags:
                    //      private

                    if (!this.grid.itemCommandProviderMap) {
                        return;
                    }
                    if (this._currentProviderHandler) {
                        this._currentProviderHandler.removeProvider();
                    }
                    var item = this.grid.row(e).data;
                    this._currentProviderHandler = this.grid.contextMenu.addProvider(this.grid.itemCommandProviderMap[json.stringify(item)]);
                },

                onGridRowClick: function (e) {
                    // summary:
                    //      Makes sure the right commands are available in the context menu when selecting a row in the grid.
                    // tags:
                    //      protected
                    this._onGridRowSelect(e);
                },

                onGridRowDblClick: function (e) {
                    // summary:
                    //      Makes sure the right commands are available in the context menu when selecting a row in the grid.
                    // tags:
                    //      protected
                    if (this.readOnly) {
                        return;
                    }

                    var item = {
                        model: this.grid.row(e).data
                    };
                    this.editItem(item);
                }

            });
    });