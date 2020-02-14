//>>built
require({cache:{"url:epi-cms/activity/templates/ActivityCommentForm.html":"<div class=\"epi-activity-comment-form\">\r\n    <div class=\"epi-activity-comment__message\"\r\n         data-dojo-attach-point=\"commentNode\"></div>\r\n    <div data-dojo-attach-point=\"_commentTextarea, focusNode\"\r\n         data-dojo-attach-event=\"onChange:_commentChanged, onFocus: _commentFocused\"\r\n         data-dojo-props=\"intermediateChanges: true, searchProperty: 'name', tagProperty: 'name', displayProperty: 'displayName'\"\r\n         data-dojo-type=\"epi/shell/widget/AutoCompleteTextarea\" class=\"epi-autocomplete-textarea--chat-icon\"></div>\r\n    <div class=\"epi-activity-comment-form__buttons dijitHidden\"\r\n         data-dojo-attach-point=\"_commentFormButtons\">\r\n        <span class=\"epi-activity-feed__error-message\"\r\n              data-dojo-attach-point=\"_errorMessage\"></span>\r\n        <button data-dojo-type=\"dijit/form/Button\"\r\n                class=\"epi-primary\"\r\n                data-dojo-attach-event=\"onClick:_postComment\"\r\n                data-dojo-props=\"disabled: true\"\r\n                data-dojo-attach-point=\"_postButton\"></button>\r\n        <button data-dojo-type=\"dijit/form/Button\"\r\n                class=\"epi-chromeless epi-chromeless--text-only\"\r\n                data-dojo-attach-point=\"_resetButton\"\r\n                data-dojo-attach-event=\"onClick: _reset\"></button>\r\n    </div>\r\n    <button data-dojo-type=\"dijit/form/Button\"\r\n            class=\"epi-chromeless epi-chromeless--text-only epi-text--small\"\r\n            data-dojo-attach-point=\"_editButton\"\r\n            data-dojo-attach-event=\"onClick: _toggleWriteComment\"></button>\r\n</div>\r\n"}});define("epi-cms/activity/ActivityCommentForm",["dojo/_base/declare","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_FocusMixin","epi/shell/widget/_ModelBindingMixin","dojo/text!./templates/ActivityCommentForm.html","epi/shell/widget/AutoCompleteTextarea","dijit/form/Button"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1([_3,_4,_5,_6,_7],{templateString:_8,readOnly:null,hideOnPost:null,isEditEnabled:true,errorMessage:"",modelBindingMap:{readOnly:["readOnly"],editLabel:["editLabel"],isEditEnabled:["isEditEnabled"],hideOnPost:["hideOnPost"],errorMessage:["errorMessage"],placeholderText:["placeholder"],sendLabel:["sendLabel"],resetLabel:["resetLabel"],message:["value"],formattedMessage:["displayValue"],noNotificationUserMessage:["noNotificationUserMessage"],notificationUserStore:["notificationUserStore"]},postCreate:function(){this.inherited(arguments);this._commentChanged(this.get("value"));this._commentTextarea.on("save",this._postComment.bind(this));},_setModelAttr:function(_9){this.inherited(arguments);this._toggleFormsButtonVisibility(!_9.readOnly&&this.get("value")!=="");},_setErrorMessageAttr:function(_a){this._set("errorMessage",_a);this._errorMessage.textContent=_a;},_setSendLabelAttr:function(_b){this._set("sendLabel",_b);if(_b){this._postButton.set("label",_b);}},_setResetLabelAttr:function(_c){this._set("resetLabel",_c);if(_c){this._resetButton.set("label",_c);}},_setEditLabelAttr:function(_d){this._set("editLabel",_d);if(_d){this._editButton.set("label",_d);}},_setIsEditEnabledAttr:function(_e){this._set("isEditEnabled",_e);if(this._editButton){_2.toggle(this._editButton.domNode,"dijitHidden",!this.isEditEnabled);}},_setNoNotificationUserMessageAttr:function(_f){this._commentTextarea.set("noDataMessage",_f);},_setNotificationUserStoreAttr:function(_10){this._set("notificationUserStore",_10);this._commentTextarea.set("store",_10);},_setPlaceholderAttr:function(_11){this._commentTextarea.set("placeholder",_11);},_setReadOnlyAttr:function(_12){this._set("readOnly",_12);_2.toggle(this._commentTextarea.domNode,"dijitHidden",this.readOnly);if(this.readOnly){this._toggleFormsButtonVisibility(false);}},_setValueAttr:function(_13){this._set("value",_13);this._commentTextarea.set("value",_13);},_setDisplayValueAttr:function(_14){_14.then(function(_15){this.commentNode.innerHTML=_15;}.bind(this));},_getValueAttr:function(){return this._commentTextarea.get("value");},_commentChanged:function(_16){this._started&&this._postButton.set("disabled",!_16||_16===this.model.message);},_commentFocused:function(){this._toggleFormsButtonVisibility(true);},_reset:function(){if(this._destroyed){return;}this.hideOnPost&&this._toggleWriteComment();this.model.set("errorMessage","");this._commentTextarea.reset();this._toggleFormsButtonVisibility(false);},_postComment:function(){var _17=this._commentTextarea.get("value");if(_17.trim().length===0){return;}if(_17===this.model.message||this._postButton.get("disabled")){this._reset();return;}this._postButton.set("disabled",true);var _18=10;this.defer(function(){_2.add(this._postButton.domNode,"epi-button--loading");}.bind(this),_18);this.model.save(_17).then(this._reset.bind(this)).always(function(){if(!this._destroyed){this._postButton.set("disabled",false);_2.remove(this._postButton.domNode,"epi-button--loading");}}.bind(this));},_toggleWriteComment:function(){_2.toggle(this._commentTextarea.domNode,"dijitHidden");_2.toggle(this._editButton.domNode,"dijitHidden");_2.toggle(this.commentNode,"dijitHidden");if(this._commentTextarea.isFocusable()){this._commentTextarea.focus();this._commentTextarea.setCaretLast();}if(this._editButton.isFocusable()){this._editButton.focus();}},_toggleFormsButtonVisibility:function(_19){_2.toggle(this._commentFormButtons,"dijitHidden",!_19);}});});