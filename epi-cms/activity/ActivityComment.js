//>>built
require({cache:{"url:epi-cms/activity/templates/ActivityComment.html":"<div class=\"epi-activity-comment\">\r\n    <header>\r\n        <span class=\"dijitReset dijitInline epi-username\" data-dojo-attach-point=\"usernameNode\"></span>\r\n        <span class=\"dijitReset dijitInline epi-event__timestamp\" data-dojo-attach-point=\"timestampNode\"></span>\r\n        <span class=\"dijitReset dijitInline epi-iconEdited\" data-dojo-attach-point=\"editedIconNode\"></span>\r\n    </header>\r\n    <div data-dojo-type=\"epi-cms/activity/ActivityCommentForm\"\r\n         data-dojo-props=\"model: this.model\"\r\n         data-dojo-attach-point=\"commentForm\"></div>\r\n</div>\r\n"}});define("epi-cms/activity/ActivityComment",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","epi/datetime","epi/username","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","epi/shell/widget/_ModelBindingMixin","dojo/text!./templates/ActivityComment.html","epi/i18n!epi/cms/nls/episerver.cms.activities.activity.message","./ActivityCommentForm","dijit/form/Button"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _1([_6,_7,_8,_9],{templateString:_a,modelBindingMap:{hasChanged:["hasChanged"]},_setHasChangedAttr:function(_c){this._set("hasChanged",_c);var _d=_2.replace(_b.editedformat,{updated:_4.toUserFriendlyString(this.model.lastUpdated)});this.editedIconNode.title=_d;_3.toggle(this.editedIconNode,"dijitHidden",!_c);},buildRendering:function(){this.inherited(arguments);var _e=this.model.changedBy||this.model.author;this.usernameNode.textContent=_5.toUserFriendlyString(_e,null,false,false,true);this.timestampNode.textContent=_4.toUserFriendlyString(this.model.created);}});});