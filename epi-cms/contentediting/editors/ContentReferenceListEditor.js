//>>built
require({cache:{"url:epi-cms/contentediting/editors/templates/ContentReferenceListEditor.html":"<div class=\"dijitInline\" tabindex=\"-1\" role=\"presentation\">\r\n    <div class=\"epi-content-area-header-block\">\r\n        <div data-dojo-type=\"epi-cms/contentediting/AllowedTypesList\"\r\n             data-dojo-props=\"allowedTypes: this.allowedTypes, restrictedTypes: this.restrictedTypes\"\r\n             data-dojo-attach-point=\"allowedTypesHeader\"></div>\r\n    </div>\r\n    <div class=\"epi-content-area-editor--wide epi-content-area-editor\"\r\n         data-dojo-attach-point=\"dndAreaWrapper\">\r\n        <div data-dojo-type=\"epi-cms/contentediting/ContentReferenceList\"\r\n             data-dojo-props=\"allowedTypes: this.allowedTypes,\r\n                          restrictedTypes: this.restrictedTypes,\r\n                          commandSource: this.model,\r\n                          store: this.model.valueStore,\r\n                          readOnly: this.readOnly,\r\n                          query: this.model.query\"\r\n             data-dojo-attach-point=\"list\"></div>\r\n        <div data-dojo-attach-point=\"dropContainer\" class=\"epi-content-area-actionscontainer\"></div>\r\n    </div>\r\n</div>"}});define("epi-cms/contentediting/editors/ContentReferenceListEditor",["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/dom-style","dojo/dom-class","dojo/on","dojo/when","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","epi/shell/dnd/Target","epi/shell/widget/_ValueRequiredMixin","epi/shell/widget/_FocusableMixin","./_AddItemDialogMixin","./_TextWithActionLinksMixin","./model/ContentReferenceListEditorModel","../AllowedTypesList","../ContentReferenceList","epi-cms/widget/ContentSelectorDialog","dojo/text!./templates/ContentReferenceListEditor.html","epi/i18n!epi/cms/nls/episerver.cms.widget.contentreferencelisteditor"],function(_1,_2,_3,_4,_5,on,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14){return _1([_8,_7,_9,_b,_c,_e,_d],{baseClass:"epi-content-area-wrapper",value:null,model:null,templateString:_13,itemEditorType:_12,multiple:true,postMixInProperties:function(){this.inherited(arguments);this.dialogParams=_2.mixin({dialogClass:"epi-dialog-portrait"},this.dialogParams);this.allowedTypes=this.allowedTypes||["episerver.core.icontentdata"];this.model=this.model||new _f();this.own(this.model);},buildRendering:function(){this.inherited(arguments);this._setupModelWatchers();if(this.readOnly){return;}this.dndTarget=new _a(this.dropContainer,{accept:this.allowedTypes,reject:this.restrictedTypes,alwaysCopy:false,allowMultipleItems:true,creator:function(){},insertNodes:function(){}});this.setupActionLinks(this.dropContainer);this._setupEvents();},_setupModelWatchers:function(){var _15=_2.hitch(this,function(_16){this.list.refresh();if(_16){this.list.setSelection(_16);}this.onChange(this.get("value"));});this.own(_3.before(this.model,"addItems",this.focus.bind(this)),_3.after(this.model,"addItems",_15),_3.after(this.model,"moveItems",_15),_3.after(this.model,"removeItems",_15));},_setupEvents:function(){var _17=this.list.getDndSource();this.own(this.dndTarget,on(this.list,"itemaction",_2.hitch(this,function(e){this.model.navigateToItem(e.item);})),on(this.list,"itemsdropped",_2.hitch(this,function(e){this.model.addItems(e.items,_17.current!=null?_17.getItem(_17.current.id).data.index:null,_17.before);})),on(this.list,"itemsmoved",_2.hitch(this,function(e){this.model.moveItems(e.ids,_17.current!=null?_17.getItem(_17.current.id).data.index:null,_17.before);})),on(this.list,"itemsremove",_2.hitch(this,function(e){this.model.removeItems(e.ids);})),_3.after(this.dndTarget,"onDropData",_2.hitch(this,function(_18,_19){var _1a=_18.map(function(_1b){return _1b.data;});this.model.addItems(_1a);}),true),_3.after(_17,"onDndStart",_2.hitch(this,function(_1c,_1d,_1e){var _1f=_17.accept&&_17.checkAcceptance(_1c,_1d);_5[_1f?"remove":"add"](this.dndAreaWrapper,"dojoDndTargetDisabled");}),true));},_setValueAttr:function(_20){this.model.setContentLinks(_20).then(_2.hitch(this,function(){if(this.list){this.list.setSelection([]);this.list.refresh();}}));},_getValueAttr:function(){return this.model.get("contentLinks");},_setReadOnlyAttr:function(_21){this._set("readOnly",_21);this.model.set("readOnly",_21);_4.set(this.dropContainer,"display",_21?"none":"");},focus:function(){if(this._hasValue()){this.list.focus();}else{this.textWithLinks.focus();}},onChange:function(_22){},isValid:function(){return !this.required||this._hasValue();},_hasValue:function(){return (!!this.model&&!!this.get("value")&&this.get("value").length>0);},getTemplateString:function(){return {templateString:_14.template,actions:_14.actions};},executeAction:function(_23){this._onToggleItemEditor();},_createItemEditor:function(){return new this.itemEditorType({canSelectOwnerContent:false,showButtons:false,roots:this.roots,allowedTypes:this.allowedTypes,restrictedTypes:this.restrictedTypes,showAllLanguages:true,disableRestrictedTypes:false});},_getDialogTitleText:function(_24){return _14.dialogtitle;},_onDialogExecute:function(){this.onExecuteDialog();},onExecuteDialog:function(){var _25=this._itemEditor.get("value");this.model.addContentLink(_25);}});});