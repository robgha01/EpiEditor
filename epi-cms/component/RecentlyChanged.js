//>>built
define("epi-cms/component/RecentlyChanged",["dojo/_base/declare","dojo/_base/lang","epi","epi/dependency","epi/shell/command/_WidgetCommandProviderMixin","epi/shell/command/_Command","epi/shell/command/ToggleCommand","epi/shell/widget/layout/ComponentContainer","epi/shell/DialogService","epi/shell/widget/_FocusableMixin","epi-cms/contentediting/ContentActionSupport","epi-cms/core/ContentReference","epi-cms/widget/_GridWidgetBase","epi/i18n!epi/cms/nls/episerver.cms.components.recentlychanged"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){return _1([_d,_5,_a],{_componentsController:null,onlyShowMyChanges:false,postMixInProperties:function(){this.storeKeyName="epi.cms.content.search";this._componentsController=_4.resolve("epi.shell.controller.Components");this.ignoreVersionWhenComparingLinks=false;this.inherited(arguments);},buildRendering:function(){this.inherited(arguments);var _f=_2.mixin({columns:this._createGridColumns(),store:this.store,selectionMode:"single"},this.defaultGridMixin);this.grid=new this._gridClass(_f,this.domNode);},startup:function(){if(this._started){return;}this.inherited(arguments);var _10=[new _7({label:_e.showmychanges,category:"setting",model:this,property:"onlyShowMyChanges"}),new _6({iconClass:"epi-iconReload",label:_3.resources.action.refresh,canExecute:true,_execute:_2.hitch(this,function(){this.grid.refresh();})})];this.add("commands",_10);this.fetchData();},_setOnlyShowMyChangesAttr:function(_11){this._set("onlyShowMyChanges",_11);if(this._started){this._saveSettingComponent("onlyShowMyChanges",_11);}},fetchData:function(){var _12=this._getQuery();this.grid.set("query",_12.query,_12.options);},_getQuery:function(){return {query:{query:"recentlychanged",onlyShowMyChanges:this.onlyShowMyChanges,keepversion:true},options:{ignore:["query"],sort:[{attribute:"saved",descending:true}]}};},_createGridColumns:function(){var _13={name:{label:_3.resources.header.name,className:"epi-width50",renderCell:_2.hitch(this,this._renderContentItem)},status:{label:_3.resources.header.status,renderCell:function(_14,_15,_16,_17){_16.innerHTML=_b.getVersionStatus(_15);},className:"epi-width15"},saved:{label:_3.resources.header.saved,formatter:this._localizeDate,className:"epi-width25"}};if(!this.get("onlyShowMyChanges")){_13.changedBy={label:_3.resources.header.by,formatter:this._createUserFriendlyUsername,className:"epi-width10"};}return _13;},_saveSettingComponent:function(_18,_19){var _1a=this._componentsController.getComponentDefinition(this.id),_1b;if(_1a){_1a.settings.onlyShowMyChanges=_19;var _1c=this._componentsController.saveComponents([_1a]);_1c.then(function(_1d){},function(){_9.alert(_e.errormessage);});_1b=this._getQuery();this.grid.query=_1b.query;this.grid.queryOptions=_1b.options;this.grid.set("columns",this._createGridColumns());}},onContextChanged:function(_1e){this.grid.clearSelection();var _1f=new _c(_1e.id).createVersionUnspecificReference().toString();var row=this.grid.row(_1f);if(row){this.grid.select(row);}}});});