//>>built
define("epi-cms/widget/viewmodel/CategorySelectorViewModel",["dojo/_base/declare","dojo/Deferred","dijit/Destroyable","dojo/Stateful","dojo/when","dojo/promise/all","epi/dependency"],function(_1,_2,_3,_4,_5,_6,_7){return _1([_4,_3],{_categories:null,_categoriesParentsName:null,_updateDisplayPromise:null,store:null,constructor:function(_8){if(_8&&_8.store){this.store=_8.store;}else{var _9=_7.resolve("epi.storeregistry");this.store=_9.get("epi.cms.category");}this._categoriesParentsName={};},destroy:function(){this.inherited(arguments);if(this._updateDisplayPromise){this._updateDisplayPromise.cancel();this._updateDisplayPromise=null;}},refreshCategories:function(){var _a=new _2();this._categoriesParentsName={};if(!this.hasCategories()){_a.resolve([]);return _a.promise;}var _b=[];var _c=[];this._categories.forEach(function(_d){var _e=_5(this.store.refresh(_d)).then(function(_f){if(!_f||!_f.visible){_c.push(_d);return null;}this._categoriesParentsName[_f.id]=_f.parentsNameCollection;return _f;}.bind(this),function(){_c.push(_d);return null;}.bind(this));_b.push(_e);},this);this._updateDisplayPromise=_6(_b).then(function(_10){this._updateDisplayPromise=null;_c.forEach(function(c){var _11=this._categories.indexOf(c);if(_11!==-1){this._categories.splice(_11,1);}}.bind(this),this);_a.resolve(_10.filter(function(c){return c!==null;}));}.bind(this));return _a.promise;},hasCategories:function(){var _12=this.get("categories");return !!_12&&_12.length>0;},hasCategory:function(_13){return this.get("categories")&&this.get("categories").indexOf(_13)!==-1;},_categoriesParentsNameGetter:function(){return this._categoriesParentsName;},_categoriesGetter:function(){return this._categories;},_categoriesSetter:function(_14){this._categories=_14;}});});