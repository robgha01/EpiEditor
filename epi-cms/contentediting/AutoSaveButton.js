//>>built
define("epi-cms/contentediting/AutoSaveButton",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/string","dijit/_WidgetBase","epi/datetime","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons.autosave"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b={Saving:0,Offline:1,Saved:2};return _3([_8],{_state:null,button:undefined,lastSaved:undefined,model:null,_currentlySavingClass:"epi-autosave-saving",_errorClass:"epi-autosave-error",_savedClass:"epi-autosave-saved",_hoverClass:"epi-autosave-hover",_modelHandles:null,_updateTimeHandle:null,postMixInProperties:function(){this.inherited(arguments);this._modelHandles=[];},postCreate:function(){this.inherited(arguments);if(!this.button){return;}this.connect(this.button.domNode,"onmouseover",this._addHoverClass);this.connect(this.button.domNode,"onmouseout",this._removeHoverClass);},destroy:function(){_1.forEach(this._modelHandles,function(_c){_c.unwatch();});this._updateTimeHandle&&clearTimeout(this._updateTimeHandle);this._updateTimeHandle=null;this.inherited(arguments);},_setModelAttr:function(_d){_1.forEach(this._modelHandles,function(_e){_e.unwatch();});this._set("model",_d);if(_d){this._modelHandles=[_d.watch("isOnline",_4.hitch(this,"_isOnlineChanged")),_d.watch("lastSaved",_4.hitch(this,"_lastSavedChanged")),_d.watch("isSaved",_4.hitch(this,"_isSavedChanged")),_d.watch("isSaving",_4.hitch(this,"_isSavingChanged")),_d.watch("hasErrors",_4.hitch(this,"_hasErrorsChanged")),_d.watch("disableUndo",_4.hitch(this,this._disableUndo))];this.set("lastSaved",_d.lastSaved);if(this.lastSaved){this.updateButton();}else{this._setVisibility(false);}}},_setLastSavedAttr:function(_f){this._set("lastSaved",_f);this.updateLastSaveTime();},_disableUndo:function(_10,_11,_12){this._isUndoDisabled=_12;this.updateButton();},_isOnlineChanged:function(_13,_14,_15){if(_15===_14){return;}if(_15){this.revertToLastAutoSaveTime();}else{this.showOfflineStatus();}},_lastSavedChanged:function(_16,_17,_18){this.set("lastSaved",_18);},_isSavedChanged:function(_19,_1a,_1b){if(_1b){this.updateLastSaveTime();}},_isSavingChanged:function(_1c,_1d,_1e){if(_1e){this.showSavingStatus();}else{if(!this.model.isSaved){this.revertToLastAutoSaveTime();}}},_hasErrorsChanged:function(_1f,_20,_21){if(_20===_21){return;}if(!_21){this.revertToLastAutoSaveTime();}else{_2.publish("/epi/cms/action/showerror");}},_animateSaving:function(){_5.replace(this.button.domNode,this._currentlySavingClass,[this._errorClass,this._savedClass]);this._removeHoverClass();},_animateOffline:function(){_5.replace(this.button.domNode,this._errorClass,[this._currentlySavingClass,this._savedClass]);this._removeHoverClass();},_animateSaved:function(){_5.replace(this.button.domNode,this._savedClass,[this._currentlySavingClass,this._errorClass]);this._removeHoverClass();},_addHoverClass:function(){if(this._state==null||this._state===_b.Saving||this._hasDropDownOpen()){return;}if(this._state===_b.Saved){_5.add(this.button.domNode,this._hoverClass);}},_removeHoverClass:function(){if(!this._hasDropDownOpen()){_5.remove(this.button.domNode,this._hoverClass);}},_updateState:function(_22){this.button.set("label",_22);this.button.set("disabled",this._isUndoDisabled||this._state!==_b.Saved);},_setVisibility:function(_23){if(_23!==this._visible){this._visible=_23;if(this.button){_6.set(this.button.domNode,{display:_23?"":"none"});this.button.set("itemVisibility",_23&&!this.button.disabled);if(this.button.isInNarrowToolbar){this.onLayoutChanged();}}}},onLayoutChanged:function(){},_hasDropDownOpen:function(){return this.button._popupStateNode?_5.contains(this.button._popupStateNode,"dijitHasDropDownOpen"):false;},revertToLastAutoSaveTime:function(){if(this.lastSaved===undefined){this._setVisibility(false);return;}this.updateLastSaveTime();},updateLastSaveTime:function(){if(!this.lastSaved){return;}if(!this.model.isOnline){return;}this._updateTimeHandle&&clearTimeout(this._updateTimeHandle);this._updateTimeHandle=setTimeout(_4.hitch(this,function(){if(this.model.isOnline){this.updateButton();this._animateSaved();}}),1000);this._setVisibility(true);},showSavingStatus:function(){this._setVisibility(true);this._state=_b.Saving;this._updateState(_a.savinglabel);this._animateSaving();},showOfflineStatus:function(){this._state=_b.Offline;this._updateState(_a.offlinelabel);this._animateOffline();},updateButton:function(){if(!this.lastSaved||!this.model.canChangeContent()||(this.model.contentData&&this.model.contentData.isDeleted)){this._setVisibility(false);return;}if(this.model.isSaving){this._state=_b.Saving;return;}this._state=_b.Saved;var _24="<span class=\"dijitReset dijitInline clearfix\">${autosavelabel} ${timestamp}</span>&nbsp;<span class=\"epi-inlineButtonLink\">${undolabel}</span>";var _25={autosavelabel:_a.autosavelabel,undolabel:this.model.undoManager.get("hasUndoSteps")&&!this._isUndoDisabled?_a.undolabel:"",timestamp:_9.toUserFriendlyHtml(this.lastSaved,null,true)};this._updateState(_7.substitute(_24,_25));}});});