//>>built
define("epi-cms/activity/viewmodels/MessageActivityViewModel",["dojo/_base/declare","./_ActivityViewModel","epi/i18n!epi/cms/nls/episerver.shared.action"],function(_1,_2,_3){return _1([_2],{sendLabel:_3.save,_save:function(_4){return this.activityService.saveMessage(this.id,_4);}});});