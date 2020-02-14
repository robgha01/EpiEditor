//>>built
define("epi-cms/compare/command/CompareSettingsModel",["dojo/_base/declare","dojo/_base/lang","dojo/topic","dojo/Stateful","dojo/when","dijit/Destroyable","epi/dependency","epi/i18n!epi-cms/nls/episerver.cms.compare.mode"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1([_4,_6],{enabled:false,mode:"allpropertiescompare",_selectedCompareModeProfileKey:"epi.selected-comparemode-id",modeOptions:[{label:_8.allpropertiescompare,value:"allpropertiescompare",iconClass:"epi-iconForms"},{label:_8.sidebysidecompare,value:"sidebysidecompare",iconClass:"epi-iconLayout"}],constructor:function(){var _9=this;this.profile=this.profile||_7.resolve("epi.shell.Profile");_5(this._loadSelectedModeFromProfile(),_2.hitch(this,function(_a){if(_a){this.set("mode",_a);}}));this.own(_3.subscribe("/epi/shell/action/viewchanged",function(_b,_c,_d){var _e=_d&&(_d.viewName||(_d.sender&&_d.sender.viewName));var _f=_9.modeOptions.some(function(_10){return _10.value===_e;});_9.set("enabled",_f,false);}),_3.subscribe("/epi/cms/action/switcheditmode",function(){_9.set("enabled",false,false);}),_3.subscribe("/epi/cms/action/eyetoggle",function(_11){if(_11){_9.set("enabled",false,false);_3.publish("/epi/shell/action/changeview/updatestate",{viewName:null});}}));},_enabledSetter:function(_12,_13){if(this.enabled!==_12){this.enabled=_12;(_13!==false)&&this._onChange();}},_modeSetter:function(_14){if(this.mode!==_14){this.mode=_14;this.get("enabled")&&this._onChange();this.profile.set(this._selectedCompareModeProfileKey,_14,{location:"server"});}},_onChange:function(){_3.publish("/epi/shell/action/changeview",this.get("enabled")?this.get("mode"):null,null,{forceReload:true});},_loadSelectedModeFromProfile:function(){return _5(this.profile.get(this._selectedCompareModeProfileKey),function(_15){if(!_15){return null;}return _15;});}});});