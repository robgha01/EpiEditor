//>>built
require({cache:{"url:epi-cms/content-approval/templates/ApprovalStepList.html":"<div class=\"epi-approval-step-list\">\r\n    <div class=\"epi-approval-step-list__status\">\r\n        <span class=\"epi-approval-step-list__status-icon epi-approval-step-list__status-icon--review\"></span><h2 class=\"dijitInline\">${resources.readytoreview}</h2>\r\n    </div>\r\n    <div data-dojo-attach-point=\"listNode\"></div>\r\n\r\n    <div class=\"epi-approval-step-list__status\">\r\n        <span class=\"epi-approval-step-list__status-icon epi-approval-step-list__status-icon--publish\"></span><h2 class=\"dijitInline\">${resources.readytopublish}</h2>\r\n    </div>\r\n</div>\r\n"}});define("epi-cms/content-approval/ApprovalStepList",["dojo/_base/declare","dojo/keys","epi-cms/content-approval/ApprovalStep","dijit/_WidgetBase","dijit/_TemplatedMixin","epi/shell/widget/_ModelBindingMixin","dgrid/List","dgrid/Keyboard","dgrid/extensions/DijitRegistry","dgrid/extensions/DnD","epi/shell/dgrid/SingleQuery","epi/shell/dgrid/WidgetRow","dojo/text!./templates/ApprovalStepList.html","epi/i18n!epi/nls/episerver.cms.contentapproval.steplist"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){var _f=_1([_7,_b,_a,_8,_9,_c]);return _1([_4,_5,_6],{model:null,modelBindingMap:{approvalSteps:["approvalSteps"]},templateString:_d,resources:_e,buildRendering:function(){this.inherited(arguments);this.list=new _f({className:"epi-chromeless",dndParams:{withHandles:true,creator:this._createAvatar.bind(this),skipForm:true},maintainOddEven:false,renderRow:this._renderRow.bind(this),selectionMode:"single",sort:"default"},this.listNode);this.own(this.list.addKeyHandler(_2.DELETE,this._removeStep.bind(this)),this.list.addKeyHandler(_2.DOWN_ARROW,this._moveStep.bind(this,false)),this.list.addKeyHandler(_2.UP_ARROW,this._moveStep.bind(this,true)),this.list.on(".dgrid-row:keypress",this._createStep.bind(this)));},startup:function(){this.inherited(arguments);this.list.startup();},_createAvatar:function(_10){var _11=new _3({model:_10});_11.startup();var _12=_11.domNode.cloneNode(true);_11.destroyRecursive();return {node:_12,type:this.list.dndSourceType,data:_10};},_createStep:function(_13){if(!_13.ctrlKey&&String.fromCharCode(_13.which)==="+"){var row=this.list.row(_13);this.model.createApprovalStep(row.data);}},_moveStep:function(_14,_15){if(_15.ctrlKey){var row=this.list.row(_15);this.list.focus(row);this.model.moveApprovalStep(row.data,_14);}},_removeStep:function(_16){var row=this.list.row(_16);this.model.removeApprovalStep(row.data);},_renderRow:function(_17){var _18=this.model.get("languageOptions");var _19=new _3({model:_17,languageOptions:_18});return _19.domNode;},_setApprovalStepsAttr:function(_1a){this._set("approvalSteps",_1a);this.list.set("store",_1a);}});});