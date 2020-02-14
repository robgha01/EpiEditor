//>>built
define("epi-cms/form/PageInfoPicker",["epi","dojo/_base/declare","dojo/i18n","dijit/form/TextBox"],function(_1,_2,_3,_4){return _2([_4],{title:"PageReference Picker",isContainer:true,templateString:"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" waiRole=\"presentation\"             ><div class=\"dijitReset dijitInputField dijitInputContainer\"                 ><input name=\"${id}PageLink\" id=\"${id}PageLink\" type=\"hidden\" dojoAttachPoint=\"pageLinkNode\" value=\"0\"                 /><input dojoAttachEvent=\"click:openDialog\" readonly=\"readonly\" disabled=\"disabled\" class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'                 /><input dojoAttachEvent=\"click:openDialog\" style=\"position:absolute; top:0;right:0; height:100%; font-size:7px;\" type=\"button\" dojoAttachPoint=\"clickNode\" value=\"...\"                 /></div             ></div>",openDialog:function(){var _5=EPi.ResolveUrlFromUI("edit/pagebrowser.aspx");var id=this._getValue().PageLink;EPi.CreatePageBrowserDialog(_5,id,true,false,this.textbox.id,this.pageLinkNode.id,null,null,null,true);},_getValue:function(){return {PageName:this.textbox.value.replace(/^(.*?) \[.+?\]$/,"$1")||"",PageLink:this.pageLinkNode.value};},_setValue:function(_6){this.textbox.value=this.format(_6);this.pageLinkNode.value=_6.PageLink;},get:function(_7){if(_7==="value"){return this._getValue();}return this.inherited(arguments);},set:function(_8,_9){if(_8==="value"){this._setValue(_9);return;}this.inherited(arguments);},format:function(_a,_b){if(_a.PageLink==="0"||!_a.PageLink){return "";}return _a.PageName+" ["+_a.PageLink+"]";},isValid:function(_c){if(this.params.required){var _d=this._getValue();if(_d.PageLink==="0"||!_d.PageLink){return false;}}return true;},getErrorMessage:function(){if(this.isValid()){return "";}if(!this.messages){this.messages=_3.getLocalization("dijit.form","validate",this.lang);}return this.messages.missingMessage;}});});