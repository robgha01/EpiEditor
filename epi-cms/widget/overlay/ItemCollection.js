//>>built
define("epi-cms/widget/overlay/ItemCollection",["dojo/_base/declare","dojo/_base/lang","epi-cms/contentediting/viewmodel/ItemCollectionViewModel","epi-cms/widget/overlay/Property"],function(_1,_2,_3,_4){return _1([_4],{modelType:"epi-cms/contentediting/viewmodel/ItemCollectionViewModel",model:null,postMixInProperties:function(){this.inherited(arguments);this._setupAllowedTypes();this._setupModel(this.contentModel.get(this.name));this.own(this.contentModel.watch(this.name,_2.hitch(this,function(_5,_6,_7){this.model.set("data",_7);})));},onDrop:function(_8,_9){this.model.addTo(_9,null,false);},_setupModel:function(_a){require([this.modelType],_2.hitch(this,function(_b){this.model=new _b(_a,this.modelParams);this.own(this.model.on("changed",_2.hitch(this,function(_c){this.onValueChange({propertyName:this.name,value:this.model.get("value")});})));}));},_setupAllowedTypes:function(){var _d=this.modelParams.itemConverterKey,_e=this.modelParams.customTypeIdentifier;this.allowedDndTypes=this.allowedDndTypes||[];if(_d){this.allowedDndTypes=this.allowedDndTypes.map(function(_f){return _f+"."+_d;});}if(_e){this.allowedDndTypes.unshift(_e);}}});});