//>>built
define("epi-cms/contentediting/ContentHierarchyService",["dojo/_base/declare","dojo/_base/lang","dojo/when","dojo/Deferred","dojo/promise/all","epi/dependency","epi/shell/DialogService","epi-cms/core/ContentReference"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1([],{store:null,constructor:function(_9){_1.safeMixin(this,_9);this.store=this.store||_6.resolve("epi.storeregistry").get("epi.cms.content.light");},move:function(_a,_b,_c,_d){return this._execute("MoveMany",_a,_b,_c,_d);},copy:function(_e,_f,_10,_11){return this._execute("CopyMany",_e,_f,_10,_11);},_execute:function(_12,_13,_14,_15,_16){var _17={ids:_13 instanceof Array?_13:[_13],targetId:_14+"",createAsLocalAsset:_15,sortIndex:_16};return this.store.executeMethod(_12,null,_17).then(this._checkForErrors.bind(this)).then(this._handleUpdates.bind(this));},_checkForErrors:function(_18){var _19=new _4(),_1a=this.store.getAllResponsesWithError(_18).map(function(_1b){return _1b.message;});if(_1a.length>0){_7.alertWithErrors({},_1a).then(function(){_19.resolve(_18);});}else{_19.resolve(_18);}return _19.promise;},_handleUpdates:function(_1c){var _1d=this.store,_1e=this._getUpdatesFromResponse(_1c);return _5(_1e.map(function(_1f){var id=_8.toContentReference(_1f.extraInformation).createVersionUnspecificReference().toString();return _1d.refresh(id,true);})).then(function(_20){_20.forEach(function(_21){_1d.notify(_21,_1d.getIdentity(_21));});return _1c;});},_getUpdatesFromResponse:function(_22){var _23=_22.extraInformation,_24=[];Object.keys(_23).forEach(function(id){var _25=_23[id];if(_25.statusCode===200){_24.push(_25);}});return _24;}});});