//>>built
define("epi-cms/content-approval/command/ReadyForReview",["dojo/_base/declare","epi-cms/contentediting/ContentActionSupport","epi-cms/content-approval/command/_ApprovalTransitionWithReasonTextCommand","epi/i18n!epi/nls/episerver.cms.contentapproval.command.requestapproval"],function(_1,_2,_3,_4){return _1([_3],{label:_4.label,executingLabel:_4.label,action:_2.saveAction.RequestApproval,title:_4.title,dialogPlaceHolder:_4.placeholder,confirmActionText:_4.confirmactiontext,isCommentRequiredPropertyName:"isStartCommentRequired",_onModelChange:function(){this._watchModelProperty();},_getApprovalDefinition:function(){return this.approvalService.getDefinition(this.model.contentLink);},_executeServiceMethod:function(_5){return this.model.changeContentStatus(this.action).then(function(){if(_5){return this.approvalService.getApproval(this.model.contentLink).then(function(_6){this.set({canExecute:!!_6,approval:_6});return this.approvalService.commentChanges(this.approval.id,_5);}.bind(this));}}.bind(this)).then(this._onContentStatusChange.bind(this));}});});