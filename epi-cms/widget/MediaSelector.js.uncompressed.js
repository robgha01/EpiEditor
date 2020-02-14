define("epi-cms/widget/MediaSelector", [
    "dojo/_base/declare",
    "dojo/dom-style",
    "dojo/topic",
    "dojo/when",
    "epi-cms/_ContentContextMixin",
    "epi/shell/TypeDescriptorManager",
    "epi-cms/core/ContentReference",
    "epi-cms/widget/ContentSelector",
    "epi-cms/ApplicationSettings",
    "epi-cms/component/Media"
], function (
    declare,
    domStyle,
    topic,
    when,
    _ContentContextMixin,
    TypeDescriptorManager,
    ContentReference,
    ContentSelector,
    ApplicationSettings,
    Media
) {

    var SelectableMediaComponent = declare([Media, _ContentContextMixin], {
        // summary:
        //      Represents a wrapper of the Media component that allows to set/get selected value.
        // tags:
        //      internal

        // componentId: [readonly] String
        //      The id of this component.
        componentId: "SelectableMediaComponent",

        // root: [readonly] ContentReference|String
        //      Id of the root content, used by epi-cms/widget/ContentTreeStoreModel.
        root: ApplicationSettings.rootPage,

        // additionalTreeClass: [public] String
        //      Additional CSS class that will be applied to the tree element.
        additionalTreeClass: "",

        postMixInProperties: function () {
            this.inherited(arguments);
            this.model.containedTypes = this.allowedTypes;
            this.model.changeContextOnItemSelection = false;
            this.model.treeStoreModel.forThisFolderEnabled = this._currentContext.currentMode !== "create";
            this.own(topic.subscribe("/epi/cms/upload", this._focusGrid.bind(this)));
        },

        _getValueAttr: function () {
            return this.model.selection.data[0].data.contentLink;
        },

        _setValueAttr: function (value) {
            this._set("value", value);
            if (value) {
                this.model.selectItemsByContentReference(value, true);
                this._focusGrid();
            } else {
                this.model.set("treePaths", null);
            }
        },

        _focusGrid: function () {
            this._focusManager.focus(this.list.grid.domNode);
        }
    });

    return declare([ContentSelector, _ContentContextMixin], {
        // summary:
        //      Represents a widget to select Media files.
        // tags:
        //      internal

        // contentClass: [public] String
        //      The content class to be set on the epi-cms/widget/ContentSelectorDialog.
        contentClass: "epi-wrapped epi-mediaSelector",

        // dialogClass: [public] String
        //      The dialog class to be set on the epi-cms/widget/ContentSelectorDialog.
        dialogClass: null,

        createDialogContent: function () {
            // summary:
            //    Create custom dialog content with an instance of the custom SelectableMediaComponent
            // tags:
            //    protected

            var mediaComponent = new SelectableMediaComponent({
                repositoryKey: this.repositoryKey,
                allowedTypes: this.allowedTypes
            });

            mediaComponent.list.set("selectionMode", "single");
            mediaComponent.searchResultList.set("selectionMode", "single");

            mediaComponent.resize({ h: 370, w: 680, l: 0, t: 0 });
            mediaComponent.tree.set({ region: "left", splitter: true });
            domStyle.set(mediaComponent.tree.domNode, "width", "250px");
            mediaComponent.listContainer.set({ region: "center", splitter: false });

            this.own(mediaComponent.model.selection.watch("data", this._dataChanged.bind(this)));

            return mediaComponent;
        },
        contextChanged: function () {
            // summary:
            //    Hide the dialog on every context change
            // tags:
            //    protected

            if (this.dialog) {
                this.dialog.hide();
            }
        },

        setInitialValue: function () {
            when(this.getCurrentContent()).then(function (content) {
                var assetsFolderLink;
                if (this._currentContext.currentMode === "create") {
                    assetsFolderLink = ApplicationSettings.globalAssetsFolder;
                } else {
                    assetsFolderLink = new ContentReference(content.assetsFolderLink).createVersionUnspecificReference().toString();
                }
                this.contentSelectorDialog.set("value", assetsFolderLink);
            }.bind(this));
        },

        _dataChanged: function (name, oldValue, newValue) {
            // summary:
            //      Propagate the new value to the dialog to make sure it is not possible to select a folder
            // tags:
            //      private

            if (!newValue || newValue.length !== 1 || !newValue[0].data || !this.allowedTypes.some(function (allowedType) {
                return TypeDescriptorManager.isBaseTypeIdentifier(newValue[0].data.typeIdentifier, allowedType);
            })) {
                this.dialog.definitionConsumer.setItemProperty(this.dialog._okButtonName, "disabled", true);
                return;
            }

            this._setDialogButtonState(newValue[0].data.contentLink);
        }
    });
});
