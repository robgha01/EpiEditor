//>>built
define("epi-cms/component/ContextHistory",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/topic","epi/dependency","epi/UriParser","epi-cms/ApplicationSettings","epi-cms/core/ContentReference","epi-cms/widget/_GridWidgetBase"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _2([_9],{ignoreVersionWhenComparingLinks:false,_sort:"dateAdded",postMixInProperties:function(){this.inherited(arguments);this.store=this.store||_5.resolve("epi.shell.ContextHistory").store;},buildRendering:function(){this.inherited(arguments);var _a=_3.mixin({columns:{name:{renderCell:_3.hitch(this,this._renderContentItem)}},store:this.store,selectionMode:"single",dndFormatSuffix:this.dndFormatSuffix,sort:this._sort},this.defaultGridMixin);this.grid=new this._gridClass(_a,this.domNode);this.grid.set("showHeader",false);},postCreate:function(){this.inherited(arguments);this.own(_4.subscribe("/epi/cms/trash/empty",_3.hitch(this,function(_b){if(_b){_b.forEach(function(_c){this.store.remove("epi.cms.contentdata:///"+_c);},this);}})));},startup:function(){this.inherited(arguments);this.fetchData();},_dndNodeCreator:function(_d,_e){var _f=this.inherited(arguments);_f.data.contentLink=new _6(_f.data.uri).getId();return _f;},contextChanged:function(){this.inherited(arguments);this.grid.set("sort",this._sort,true);},fetchData:function(){var _10=_7.wastebasketPage;this.grid.set("query",{uri:new RegExp("epi\\.cms\\.contentdata:///([^"+_10+"]|\\d{2,})")});this.grid.set("sort",this._sort,true);}});});