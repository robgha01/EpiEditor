//>>built
define("epi-cms/contentediting/viewmodel/ContentAreaViewModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/promise/all","dojo/when","dojox/uuid/generateRandomUuid","epi/dependency","epi-cms/contentediting/viewmodel/ContentBlockViewModel","epi-cms/contentediting/viewmodel/PersonalizedGroupViewModel","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/viewmodel/_ContainerViewModel","epi-cms/_ContentContextMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){return _2([_b,_c],{selectedItem:null,postscript:function(){this.inherited(arguments);this.contentTypeService=this.contentTypeService||_7.resolve("epi.cms.ContentTypeService");if(!this._contentTypeStore){var _d=_7.resolve("epi.storeregistry");this._contentTypeStore=_d.get("epi.cms.contenttype");}},addChild:function(_e){var _f=[];if(!(_e instanceof _8)&&!(_e instanceof _9)){var _10=new _8(_e);if(_10.contentGroup){_e=this._groups[_10.contentGroup];if(!_e){_e=this._createGroup(_10.contentGroup);}_e.addChild(_10);}else{_e=_10;}}else{_e.set("contentGroup",null);if(_e instanceof _9){_f.push(_e.on("childrenChanged",_3.hitch(this,function(){this._emitChildrenChanged(_e);if(_e.getChildren().length===0){this.removeChild(_e);this._emitChanged();}})));}else{if(_e instanceof _8){_e.resetRoleIdentities();}}}_f.push(_e.on("changed",this._emitChanged.bind(this)));this.inherited(arguments);_f.push(_e.on("selected",_3.hitch(this,"set","selectedItem")));_f.forEach(function(_11){this.ownByKey(_e.id,_11);},this);},canCreateBlock:function(_12,_13){var _14=this.contentTypeService;return _4([this.getCurrentContext(),this.getCurrentContent()]).then(function(_15){var _16=_15[0],_17=_15[1];if(!_16||!_17){return false;}var _18=_a.isActionAvailable(_17,_a.action.Create,_a.providerCapabilities.Create,true);if(!_18||!_16.capabilities.resourceable||_16.currentMode==="create"||_16.currentMode==="translate"){return false;}return _5(_14.getAcceptedChildTypes(_17.contentLink,true,["episerver.core.blockdata"],_12,_13)).then(function(_19){return !!_19.length;});});},moveVisible:function(_1a,_1b){var _1c=_1.filter(this.getChildren(),function(_1d){return _1d.get("visible");}),_1e=_1b?1:-1,_1f=_1.indexOf(_1c,_1a)+_1e,_20=this.indexOf(_1c[_1f]);this.modify(_3.hitch(this,function(){this.move(_1a,_20);}));},moveOutsideGroup:function(_21){if(!_21.contentGroup){return;}var _22=this.getChild({name:_21.contentGroup}),_23=this.indexOf(_22);this.modify(_3.hitch(this,function(){_22.removeChild(_21);this.addChild(_21,_23);}));},personalize:function(_24){var _25=this.indexOf(_24);this.removeChild(_24);var _26=new _9({name:"group_"+Date.now(),expandOnAdd:true});_24.set("ensurePersonalization",true);_26.addChild(_24);this.addChild(_26,_25);},_valueGetter:function(){var _27=[];_1.forEach(this.getChildren(),function(_28){_27=_27.concat(_28.serialize());});return _27;},_valueSetter:function(_29){this._transformValueToModels(_29);},_selectedItemSetter:function(_2a){if(this.selectedItem){this.selectedItem.set("selected",false);}this.selectedItem=_2a;},_transformValueToModels:function(_2b){this.modify(function(){var _2c=this.getChildren();for(var i=_2c.length-1;i>=0;i--){this.removeChild(_2c[i]);}this._groups={};_1.forEach(_2b,function(_2d){var _2e=new _8(_2d);if(_2e.contentGroup){var _2f=this._groups[_2e.contentGroup];if(!_2f){_2f=this._createGroup(_2e.contentGroup);this.addChild(_2f);}_2f.addChild(_2e,_2f.getChildren().length);}else{this.addChild(_2e);}},this);},this,false);},_emitChanged:function(){this.emit("changed");},_createGroup:function(_30){var _31=new _9({name:_30});this._groups[_30]=_31;return _31;},_hash:function(_32){return (_32.contentLink||_32.name)+"_"+_6();}});});