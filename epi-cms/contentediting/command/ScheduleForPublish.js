//>>built
define("epi-cms/contentediting/command/ScheduleForPublish",["dojo/_base/declare","epi/shell/DialogService","epi-cms/contentediting/command/_ChangeContentStatus","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/ScheduledPublishSelector","epi-cms/contentediting/ScheduledPublishSelectorViewModel","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons","epi/i18n!epi/cms/nls/episerver.cms.widget.scheduledpublishselector"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1([_3],{label:_7.scheduleforpublish.label,tooltip:_7.scheduleforpublish.title,iconClass:"epi-iconClock",action:_4.saveAction.Schedule,_execute:function(){var _9=new _6();_9.set("contentData",this.model.contentData);var _a=new _5({model:_9});return _2.dialog({content:_a,title:_8.title,defaultActionsVisible:false}).then(function(){return this.model.scheduleForPublish(_9.get("dateValue"));}.bind(this)).then(this._onContentStatusChange.bind(this));}});});