//>>built
define("epi-cms/widget/overlay/Property",["dojo/_base/declare","dojo/_base/lang","epi/string","epi/shell/widget/overlay/Item"],function(_1,_2,_3,_4){return _1([_4],{onValueChange:function(_5){},_getRightProperty:function(){var _6=this.name;if(this.dndTargetPropertyName){_6+=("."+_3.pascalToCamel(this.dndTargetPropertyName));}return _6;},onDrop:function(_7,_8){var _9=this._getRightProperty();function _a(_b){if(!_b){return [];}if(!(_b instanceof Array)){return [_b];}return _b;};if(this.dndTargetPropertyAllowMultiple===true){var _c=_a(_2.clone(this.contentModel.get(_9)));_a(_8).forEach(function(_d){_c.push(_d);});_8=_c;}this.onValueChange({propertyName:_9,value:_8});}});});