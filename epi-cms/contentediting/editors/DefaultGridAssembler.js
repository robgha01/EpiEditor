//>>built
define("epi-cms/contentediting/editors/DefaultGridAssembler",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/json","dojo/Stateful","epi","epi/shell/command/builder/ButtonBuilder","epi/shell/command/withConfirmation","epi-cms/dgrid/formatters"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){var _a=_2([],{gridType:null,gridSettings:null,columnDefinitions:null,listCommands:null,itemCommandsFactory:null,constructor:function(_b){_3.mixin(this,_b);},build:function(_c,_d){},instantiateGrid:function(_e,_f,_10,_11){return new _e(_3.mixin(_f,{columns:_10,className:"epi-plain-grid epi-grid-height--auto"}),_11);}});return _2([_a],{itemCommandProviderMap:null,constructor:function(){this.itemCommandProviderMap={};},build:function(_12,_13){this.columnDefinitions["_epiGrid_Action"]={renderHeaderCell:function(){},renderCell:_3.hitch(this,function(_14,_15,_16,_17){var _18=this._getItemCommands(_14);this.itemCommandProviderMap[_4.stringify(_14)]=new _5({commands:_18});this.renderActionMenu(_14,_16,_18);}),className:"epi-columnNarrow",sortable:false};var _19=this.instantiateGrid(this.gridType,this.gridSettings,this.columnDefinitions,_12);_19.itemCommandProviderMap=this.itemCommandProviderMap;this._setupCommands(this.listCommands,_13);return _19;},renderActionMenu:function(_1a,_1b,_1c){_1b.innerHTML=_1c&&_1c.length>0?_9.menu({title:_6.resources.action.options}):"";},_getItemCommands:function(_1d){var _1e=this.itemCommandsFactory(_1d,"context");_1.some(_1e,function(_1f){if(_1f.name==="remove"&&this.gridSettings.useDeleteWithConfirmation){_1f=_8(_1f,null,{title:this.gridSettings.deleteConfirmationTitle,description:this.gridSettings.deleteConfirmationMessage});return true;}},this);return _1e;},_setupCommands:function(_20,_21){var _22=this.getListCommandBuilder();_1.forEach(_20,function(_23){_22.create(_23,_21);},this);},getListCommandBuilder:function(){return new _7({settings:{showLabel:true},optionClass:"epi-menu--inverted",optionItemClass:"epi-radioMenuItem"});}});});