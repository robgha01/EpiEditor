//>>built
require({cache:{"url:epi-cms/project/templates/PublishMenu.html":"<div tabIndex=\"${tabIndex}\" role=\"menu\" class=\"epi-invertedTooltip epi-publishActionMenu\" data-dojo-attach-point=\"containerNode\" data-dojo-attach-event=\"onkeypress:_onKeyPress\">\r\n    <div class=\"epi-tooltipDialogTop\">\r\n        <ul>\r\n            <li data-dojo-attach-point=\"primarySection\" class=\"epi-projectStatusMessage\"></li>\r\n            <li data-dojo-attach-point=\"publishMenuNode\"></li>\r\n        </ul>\r\n    </div>\r\n    <div data-dojo-attach-point=\"statusSection\" class=\"epi-tooltipDialogInfo\"></div>\r\n    <table class=\"epi-tooltipDialogMenu epi-menuInverted\" cellspacing=\"0\">\r\n        <tbody data-dojo-attach-point=\"projectActionMenu\"></tbody>\r\n    </table>\r\n</div>\r\n"}});define("epi-cms/project/PublishMenu",["dojo/_base/declare","dojo/on","dijit/DropDownMenu","dijit/registry","epi/shell/command/builder/MenuAssembler","epi/shell/command/builder/MenuBuilder","epi/shell/widget/_SectionedTemplatedMixin","./command/PublishMenuButtonBuilder","dojo/text!./templates/PublishMenu.html"],function(_1,on,_2,_3,_4,_5,_6,_7,_8){return _1([_2,_6],{sections:["primarySection","statusSection"],templateString:_8,buildRendering:function(){this.inherited(arguments);var _9=[{builder:new _7({settings:{"class":"epi-button--bold epi-button--full-width epi-success",isExecutingClass:"epi-loading"},optionClass:"epi-menu--inverted",optionItemClass:"epi-radioMenuItem"}),category:"publishmenu-primary",target:this.publishMenuNode},{builder:new _5(),category:"publishmenu",target:this.projectActionMenu}];this.own(this._menuAssembler=new _4({configuration:_9}));this.own(on(this.domNode,"beforeFocusedButtonRemoved",this.domNode.focus));},childSelector:function(_a){var _b=_3.byNode(_a);return _b&&_b.focus&&(_a.parentNode===this.projectActionMenu);},getChildren:function(){return [].concat(_3.findWidgets(this.publishMenuNode),_3.findWidgets(this.projectActionMenu));},_setCommandSourceAttr:function(_c){this._menuAssembler.set("commandSource",_c);},_getCommandSourceAttr:function(){return this._menuAssembler.get("commandSource");}});});