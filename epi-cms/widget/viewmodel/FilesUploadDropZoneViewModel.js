//>>built
define("epi-cms/widget/viewmodel/FilesUploadDropZoneViewModel",["dojo/_base/declare","dojo/_base/lang","dojo/Stateful","epi/i18n!epi/cms/nls/episerver.cms.widget.uploadmultiplefiles.dropzone"],function(_1,_2,_3,_4){return _1([_3],{settings:null,descriptionText:null,dropFolderName:null,validSelection:null,enabled:null,_descriptionTemplate:null,_settingsSetter:function(_5){this.settings=_5;if(!_5){_5=this._getDefaultValue();}this.set("enabled",_5.enabled);this.set("validSelection",_5.validSelection);this.set("dropFolderName",_5.dropFolderName);this.set("_descriptionTemplate",_5.descriptionTemplate);this.set("descriptionText",this._getDescription(_5));},_getDefaultValue:function(){return {enabled:false,validSelection:false,dropFolderName:null};},_getDescription:function(_6){if(!_6.validSelection){return _4.toomanyfolders;}var _7=this._descriptionTemplate||_4.description;return _2.replace(_7,[_6.dropFolderName||_4.defaultfoldername]);}});});