//>>built
define("epi-cms/project/command/RemoveProject",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/when","./RemoveProjectConfirmation","epi/i18n!epi/nls/episerver.cms.components.project.command.removeproject","./_ProjectCommand"],function(_1,_2,on,_3,_4,_5,_6){return _1([_6],{category:"context",label:_5.label,iconClass:"epi-iconTrash",_execute:function(){var _7=this.model.getProject();this.model.projectService.hasScheduledProjectItems(_7.id).then(this._createRemoveProjectConfirmationDialog.bind(this));},_createRemoveProjectConfirmationDialog:function(_8){var _9=this.model.getProject().status==="delayedpublished",_a=new _4({isScheduledProject:_8&&_9});on.once(_a,"execute",_2.hitch(this,"_removeProject"));_a.show();},_removeProject:function(_b){var _c=this.model,_d=_c.getProject(),_e=!_b&&_c.reactivateProject(_d.id);_3(_e).then(function(){return _c.removeProject();}).otherwise(function(_f){console.error("An error occured while removing the project.",_f);});},_onPropertyChanged:function(){var _10=this.model.getProject();this.set("canExecute",!!_10&&!_10.isDeleted);}});});