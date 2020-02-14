//>>built
require({cache:{"url:epi-cms/project/templates/ProjectSelectorList.html":"<div class=\"epi-selector-list epi-menu--inverted\">\r\n    <div class=\"epi-menuInverted epi-invertedTooltip\">\r\n        <div class=\"epi-tooltipDialogTop\">\r\n            <span data-dojo-attach-point=\"headerNode\"></span>\r\n        </div>\r\n        <div data-dojo-type=\"dijit/Toolbar\" data-dojo-attach-point=\"toolbar\" class=\"epi-flatToolbar\">\r\n            <div data-dojo-attach-point=\"toolbarGroupNode\" class=\"epi-floatRight\"></div>\r\n        </div>\r\n        <button class=\"epi-selector-list-btn epi-chromeless\" data-dojo-attach-point=\"defaultOption\" data-dojo-type=\"dijit/form/ToggleButton\" data-dojo-props=\"iconClass:'dijitRadioIcon'\"></button>\r\n        <div data-dojo-attach-point=\"separatorNode\" class=\"epi-selector-list__separator dijitHidden\"></div>\r\n        <div data-dojo-attach-point=\"listNode\"></div>\r\n    </div>\r\n</div>\r\n"}});define("epi-cms/project/ProjectSelectorList",["dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dojo/keys","dojo/when","dojo/dom-class","dojox/html/entities","dijit/form/RadioButton","dijit/Menu","epi/epi","epi/shell/command/_WidgetCommandBinderMixin","epi/shell/command/builder/MenuAssembler","epi/shell/command/builder/ExpandoMenuBuilder","epi/shell/command/builder/OptionsBuilderMixin","epi/datetime","epi/username","./viewmodels/ProjectSelectorListViewModel","dojo/text!./templates/ProjectSelectorList.html","epi/i18n!epi/shell/ui/nls/episerver.shared.header","epi/i18n!epi/cms/nls/episerver.cms.components.project","dgrid/OnDemandList","dgrid/extensions/DijitRegistry","dgrid/Keyboard","dgrid/Selection","dgrid/util/mouse","put-selector/put","epi/shell/dgrid/Focusable","epi/shell/dgrid/selection/Exclusive","epi/shell/dgrid/util/misc","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_KeyNavContainer","dijit/Toolbar"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,res,_14,_15,_16,_17,_18,put,_19,_1a,_1b,_1c,_1d,_1e,_1f){return _1([_1c,_1d,_1e,_1f,_b],{templateString:_12,store:null,query:null,selectedProject:null,enableDefaultValue:false,defaultValueText:res.preview.defaultoption,header:res.title,_setHeaderAttr:{node:"headerNode",type:"innerText"},_optionsMenuClass:_1([_9,_e]),postMixInProperties:function(){this.inherited(arguments);if(!this.model){this.own(this.model=new _11());}},buildRendering:function(){this.inherited(arguments);this._setupProjectSortMenu();this.list=new (_1([_14,_15,_17,_16,_19,_1a]))({sort:[{attribute:"created",descending:true}],className:"epi-grid--no-alternating-rows epi-grid-max-height--300",cleanEmptyObservers:false,deselectOnRefresh:false,selectionMode:"exclusive",selectionEvents:"click",query:this.get("query"),renderRow:this.renderRow},this.listNode);this.own(this.list,this.list.on("dgrid-select",_3.hitch(this,"_projectSelected")),this.list.on("dgrid-refresh-complete",_3.hitch(this,"_refreshComplete")),this.list.addKeyHandler(_4.ENTER,_3.hitch(this,"_listEnterKeypress")),this.model.watch("projectSortOrder",_3.hitch(this,"_sortChanged")),this.list.addKeyHandler(_4.UP_ARROW,_3.hitch(this,"_listNavigateUp")),this.list.addKeyHandler(_4.PAGE_UP,_3.hitch(this,"_listNavigateUp")),this.list.on(_18.enterRow,_3.hitch(this,"_listMouseover")),this.defaultOption.on("click",_3.hitch(this,"_defaultOptionSelected")),this.defaultOption.on("keypress",_3.hitch(this,"_defaultOptionKeypress")),this.defaultOption.on("mouseover",_3.hitch(this,"_defaultOptionMouseover")));if(this.enableDefaultValue){this.list.keyMap[_4.HOME]=_3.hitch(this,"_listNavigateHome");}else{_6.add(this.defaultOption.domNode,"dijitHidden");}this.defaultOption.set({iconClass:"dijitRadioIcon",label:_7.encode(this.defaultValueText)});},startup:function(){if(this._started){return;}this.inherited(arguments);this.model.initialize();this.list.startup();},focus:function(){if(this.enableDefaultValue){this.defaultOption.focus();}else{this.list.focus();}},resize:function(){this.inherited(arguments);this.list.resize();},renderRow:function(_20,_21){var _22=put("div.epi-selector-list__type-wrapper",put("span.dijit.dijitReset.dijitInline.dijitRadio"));var _23=put("label.epi-selector-list__title.dojoxEllipsis",put("strong[title=$]",_20.name,_20.name));var _24=put("div.epi-selector-list__description.dojoxEllipsis",_f.toUserFriendlyString(new Date(_20.created))+", "+_10.toUserFriendlyString(_20.createdBy));return put("div",[_22,_23,_24]);},refresh:function(){if(!this._started){return;}if(!this.list.get("store")){this.list.set("store",this.store);}return this.list.refresh().then(_3.hitch(this,function(_25){var _26=this.get("selectedProject"),_27=_26&&_25.some(function(_28){if(_28.id===_26.id){_26=_28;return true;}return false;},this);this.set("selectedProject",_27?_26:null);}));},_projectSelected:function(e){var _29=e&&e.rows&&e.rows[0].data;if(!_a.areEqual(_29,this.get("selectedProject"))){this.set("selectedProject",_29);this.emit("change",{value:_29});}this._updateView();},_refreshComplete:function(evt){_5(evt.results.total,_3.hitch(this,function(_2a){this.emit("loaded");_6.toggle(this.separatorNode,"dijitHidden",!_2a||!this.enableDefaultValue);}));},_defaultOptionSelected:function(){this.set("selectedProject",null);this.emit("change",null);},_defaultOptionKeypress:function(e){var _2b;switch(e.keyCode){case _4.DOWN_ARROW:_2b=_16.moveFocusHome;break;case _4.PAGE_DOWN:_2b=_16.moveFocusPageDown;break;case _4.END:_2b=_16.moveFocusEnd;break;default:return;}_2b.apply(this.list,[e]);},_defaultOptionMouseover:function(){this.defaultOption.focus();},_listEnterKeypress:function(e){this.list.clearSelection();this.list.select(e);},_listNavigateUp:function(e){var _2c=this.list,row=_2c.row(e),_2d=_2c.up(row,1,true);if(row.id===_2d.id){this.defaultOption.focus();}},_listNavigateHome:function(){this.defaultOption.focus();},_listMouseover:function(e){var row=this.list.row(e);this.list.focus(row);},_sortChanged:function(evt){var _2e=this.model[evt];if(this.list.get("sort")!==_2e){this.list.set("sort",_2e);}},_setSelectedProjectAttr:function(_2f){this._set("selectedProject",_2f);this.list.clearSelection();if(_2f){this.list.select(_2f.id);}this._updateView();},_updateView:function(){this.defaultOption.set("checked",!this.selectedProject);},_setupProjectSortMenu:function(){var _30=[{builder:new _d({settings:{"class":"epi-flat epi-chromeless",iconClass:"epi-iconSort",showLabel:false,label:res.command.sort.label}}),category:"context",target:this.toolbarGroupNode}];this.own(new _c({configuration:_30,commandSource:this.model}));}});});