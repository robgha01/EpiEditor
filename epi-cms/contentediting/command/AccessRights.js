//>>built
define("epi-cms/contentediting/command/AccessRights",["dojo/_base/declare","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/command/_LegacyDialogCommandBase","epi/i18n!epi/cms/nls/episerver.cms.contentediting.contentdetails.command.accessrights"],function(_1,_2,_3,_4){return _1([_3],{name:"AccessRights",label:_4.label,tooltip:_4.tooltip,dialogPath:"Edit/EditSecurity.aspx",raiseCloseEvent:true,_onModelChange:function(){var _5=this.model.contentData,_6=_2.hasAccess(_5.accessMask,_2.accessLevel.Administer);this.set("canExecute",_5.capabilities.securable&&_6);}});});