//>>built
require({cache:{"url:epi-cms/contentediting/editors/propertyvaluelist/templates/PropertyValueListItem.html":"<div class=\"epi-card epi-card--numbered epi-card--mini\">\r\n    <div class=\"dijitInline dojoDndHandle\">\r\n        <span class=\"dijitInline epi-iconDnD\">\r\n        </span>\r\n    </div>\r\n    <div class=\"dijitInline epi-mo\" data-dojo-attach-point=\"containerNode\"></div>\r\n    <span class=\"dijitInline dijitIcon epi-iconContextMenu\"></span>\r\n</div>\r\n"}});define("epi-cms/contentediting/editors/propertyvaluelist/PropertyValueListItem",["dojo/_base/declare","dijit/_WidgetBase","dijit/_Container","dijit/_TemplatedMixin","epi/shell/widget/_FocusableMixin","dojo/text!./templates/PropertyValueListItem.html"],function(_1,_2,_3,_4,_5,_6){return _1([_2,_3,_4,_5],{templateString:_6,widgetFactory:null,editorDefinition:null,buildRendering:function(){this.inherited(arguments);this._createDeferred=this.widgetFactory.createWidgets(this,this.editorDefinition).then(function(_7){this.editor=_7[0];this.own(this.editor.on("change",function(_8){if(typeof this.editor.isValid==="function"&&!this.editor.isValid()){return;}this.onChange(_8);}.bind(this)));}.bind(this));},getDisplayedValue:function(){if(!this.editor){return "";}return this.editor.displayedValue;},onChange:function(_9){},focus:function(){this._createDeferred&&this._createDeferred.then(function(){this.editor.focus&&this.editor.focus();}.bind(this));},_onFocus:function(_a){this.onFocus(_a);}});});