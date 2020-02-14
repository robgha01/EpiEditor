//>>built
define("epi-cms/project/viewmodels/OverviewViewModel",["dojo/_base/declare","dojo/_base/lang","dojo/topic","dojo/when","epi/dependency","epi-cms/project/command/RefreshProjectItems","epi-cms/project/command/ToggleProjectActivities","./_ProjectViewModel","./ActivityFeedViewModel","./ProjectCommentViewModel","epi/i18n!epi/nls/episerver.cms.components.project.overview.eventfeed"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _1([_8],{contextHistory:null,isProjectOverviewActive:false,_sortOrderProfileKey:"epi.project-overview-sort-order",_isActivitiesVisibleProfileKey:"epi.project-overview-is-activities-visible",postscript:function(){this.inherited(arguments);this.contextHistory=this.contextHistory||_5.resolve("epi.cms.BackContextHistory");this.own(this.projectService.on("currentProjectChanged",_2.hitch(this,this.projectOverviewChanged)));this.activityFeedModel=new _9({noQueryMessage:_b.noquerymessage,noAccessMessage:_b.noaccessmessage,activitiesStore:this.activitiesStore});this.projectCommentFeedModel=new _a({noQueryMessage:_b.noquerymessage,activitiesStore:this.activitiesStore});},contextChanged:function(_c,_d){this.inherited(arguments);if(_c&&_c.type==="epi.cms.project"){var _e=parseInt(_c.id,10);_4(this.projectStore.refresh(_e)).then(this.set.bind(this,"selectedProject"));}else{this.set("selectedProject",null);}},projectOverviewChanged:function(_f){var _10=this.get("isProjectOverviewActive"),_11;if(_10){if(_f&&_f.id){_11="epi.cms.project:///"+_f.id;_3.publish("/epi/shell/context/request",{uri:_11},{sender:this});}else{this.requestPreviousContext();}}},requestPreviousContext:function(){this.contextHistory.closeAndNavigateBack(this);},_createProjectCommands:function(){var _12=this.inherited(arguments);_12.refreshProject=new _6({model:this,category:"project-comments",order:120});return _12;},_createProjectItemCommands:function(){var _13=this.inherited(arguments);_13.toggleProjectActivities=new _7({model:this,order:100});return _13;},updateActivityFeed:function(_14){this.activityFeedModel.set({selectedProjectId:this.selectedProject&&this.selectedProject.id,selectedProjectItems:_14});},_selectedProjectSetter:function(_15){this.inherited(arguments);this._updateProjectFeedViewModel(_15);},_updateSelectedProjectDependencies:function(_16){this.inherited(arguments);this._updateProjectFeedViewModel(_16);},_updateProjectFeedViewModel:function(_17){this.projectCommentFeedModel.set({placeholderName:_17&&_17.name,selectedProjectId:_17&&_17.id});}});});