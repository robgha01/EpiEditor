//>>built
define("epi-cms/contentediting/StandardToolbar",["dojo/_base/declare","dojo/_base/lang","dojo/promise/all","dojo/when","dijit/form/DropDownButton","epi/shell/layout/ToolbarContainer","epi/shell/widget/ToolbarLabel","epi/shell/widget/ToolbarSet","epi-cms/plugin-area/edit-view-filters","epi-cms/widget/Breadcrumb","epi-cms/widget/BreadcrumbCurrentItem","epi-cms/widget/ChangeView"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _1([_8],{currentContext:null,availableViews:null,viewName:null,_setupPromise:null,constructor:function(){this.viewConfigurations={};},buildRendering:function(){this.inherited(arguments);_4(this._setupPromise=this.setupChildren(),_2.hitch(this,function(){this.updateChildren();}));},isSetup:function(){return this._setupPromise;},setupChildren:function(_c,_d){var _e=[{name:"leading",type:"toolbargroup",settings:{region:"leading"}},{name:"center",type:"toolbargroup",settings:{region:"center"}},{name:"trailing",type:"toolbargroup",settings:{region:"trailing"}}];var _f=[{parent:"leading",name:"breadcrumbs",widgetType:"epi-cms/widget/Breadcrumb",settings:{displayAsText:false,showCurrentNode:false}},{parent:"trailing",name:"viewselect",widgetType:"epi-cms/widget/ChangeView"},{parent:"leading",name:"currentcontent",widgetType:"epi-cms/widget/BreadcrumbCurrentItem"}];_e=_c?_c.concat(_e):_e;_f=_d?_d.concat(_f):_f;return this.add(_e).then(_2.hitch(this,function(){return this.add(_f);}));},updateChildren:function(){var _10=this.currentContext,_11=_10&&_10.id;this.setItemProperty("breadcrumbs","contentLink",_11);this.setItemProperty("viewselect","currentContext",this.currentContext);this.setItemProperty("viewselect","viewName",this.viewConfigurations.viewName);this.setItemProperty("viewselect","viewConfigurations",this.viewConfigurations);if(_10){this.setItemProperty("currentcontent","currentItemInfo",{name:_10.name,dataType:_10.dataType});}},update:function(_12){if(!_12){return;}var _13=_12.viewConfigurations;_9.get().forEach(function(_14){_13=_14(_13,_12.contentData,_12.currentContext);},this);this.currentContext=_12.currentContext;this.viewConfigurations=_13;_4(this.isSetup(),_2.hitch(this,this.updateChildren));}});});