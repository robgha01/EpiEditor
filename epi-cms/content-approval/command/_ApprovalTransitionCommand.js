//>>built
define("epi-cms/content-approval/command/_ApprovalTransitionCommand",["dojo/_base/declare","epi/dependency","epi/i18n!epi/nls/episerver.cms.contentapproval.command.rejectchanges","epi-cms/contentediting/command/_ChangeContentStatus"],function(_1,_2,_3,_4){return _1([_4],{approval:null,executeMethod:null,postscript:function(){this.inherited(arguments);this.approvalService=this.approvalService||_2.resolve("epi.cms.ApprovalService");},_onModelChange:function(){this.set("canExecute",false);if(!this.model){return;}return this.approvalService.getApproval(this.model.contentLink).then(function(_5){this.set({canExecute:!!_5,approval:_5});}.bind(this));},_execute:function(){return this._executeServiceMethod();},_executeServiceMethod:function(){return this.approvalService[this.executeMethod](this.approval).then(this._onContentStatusChange.bind(this));},_onContentStatusChange:function(){this.inherited(arguments,[{id:this.model.contentLink}]);}});});