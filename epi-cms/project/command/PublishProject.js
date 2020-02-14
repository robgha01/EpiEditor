//>>built
define("epi-cms/project/command/PublishProject",["dojo/_base/declare","dojo/string","epi-cms/project/command/_ProjectCommand","epi/i18n!epi/cms/nls/episerver.cms.components.project.command.publishproject"],function(_1,_2,_3,_4){return _1([_3],{category:"publishmenu-primary",label:_4.label,isExecuting:false,_execute:function(){var _5=this.model,_6=this;_6.set("isExecuting",true);_5.publishProject(this.model.selectedProject.id).then(function(){_6.set("isExecuting",false);},function(){_6.set("isExecuting",false);});},_onPropertyChanged:function(){var _7=this.model.selectedProject,_8=_7&&_7.status,_9=this.model.canPublishProject(_7),_a=this.model.isProjectModeEnabled();this.set({canExecute:_9,isAvailable:_a||(_8!=="published"&&_8!=="delayedpublished"),isExecuting:_8==="publishing"});},_updateLabel:function(){var _b=this.model&&this.model.selectedProject,_c=(_b&&_b.itemStatusCount.checkedin)||0,_d={count:_c>0?_c+" ":""},_e;if(this.isExecuting){_e=_c===1?_4.labelexecuting.singular:_4.labelexecuting.plural;}else{if(!this.isAvailable){_e=_4.labelexecuted;}else{_e=_c===1?_4.label.singular:_4.label.plural;}}this.set("label",_2.substitute(_e,_d));},_isExecutingSetter:function(_f){this.isExecuting=_f;this._updateLabel();}});});