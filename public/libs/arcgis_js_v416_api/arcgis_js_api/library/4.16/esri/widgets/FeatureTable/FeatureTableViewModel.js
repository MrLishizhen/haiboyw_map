// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../Graphic ../../intl ../../core/arrayUtils ../../core/Collection ../../core/HandleOwner ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ../../layers/FeatureLayer ../../views/support/layerViewUtils ./AttachmentsColumn ./FieldColumn ./Grid/Grid ./Grid/GridViewModel ./support/FeatureStore".split(" "),function(E,F,d,l,m,n,u,v,w,f,e,x,y,z,p,A,B,q){return function(r){function c(a){var b=r.call(this,a)||this;b._defaultHiddenFields=["CreationDate",
"Creator","EditDate","Editor","GlobalID"];b._highlights=new w;b.attachmentsEnabled=!1;b.cellClassNameGenerator=function(a,b){return a.path||null};b.dataProvider=function(a,c){return d.__awaiter(b,void 0,void 0,function(){var b,g,h,e,f,k,t;return d.__generator(this,function(d){switch(d.label){case 0:return b=this.store,g=a.page,h=a.pageSize,e=a.sortOrders,f=this._sortOrdersToLayerOrderByFields(e),c?b?[4,b.set({orderByFields:f})]:(c&&c([]),[2]):[2];case 1:return d.sent(),"loaded"===b.state||"loading"===
b.state?[3,3]:[4,b.load()];case 2:d.sent(),d.label=3;case 3:k=c;if(!k)return[3,5];t=c;return[4,b.fetchItems({page:g,pageSize:h})];case 4:k=t.apply(void 0,[d.sent()]),d.label=5;case 5:return k,[2]}})})};b.editingEnabled=!1;b.grid=null;b.hiddenFields=new u;b.highlightOnRowSelectEnabled=!0;b.itemIdPath="objectId";b.relatedRecordsEnabled=!1;b.store=null;b.view=null;a=b.itemIdPath;b.hiddenFields.addMany(b._defaultHiddenFields);b._set("store",new q);b._set("grid",new A({itemIdPath:a,viewModel:b}));return b}
d.__extends(c,r);c.prototype.initialize=function(){var a=this,b=function(){return d.__awaiter(a,void 0,void 0,function(){var a;return d.__generator(this,function(b){switch(b.label){case 0:return a=this,[4,m.loadMessageBundle("esri/widgets/FeatureTable/t9n/FeatureTable")];case 1:return[2,a.messages=b.sent()]}})})};b();this.handles.add([m.onLocaleChange(b),f.on(this,"grid.selectedItems","change",function(b){return a._onSelectionChange(b)}),f.watch(this,"relatedRecordsEnabled",function(b){return a.store.relatedRecordsEnabled=
b}),f.watch(this,["layer.loaded"],function(){var b;if(null===(b=a.layer)||void 0===b?0:b.loaded)(b=a._getPageSizeFromLayer())&&a.grid.set({pageSize:b}),a._generateColumns()}),f.watch(this,["editingEnabled","messages"],function(){var b;return(null===(b=a.layer)||void 0===b?void 0:b.loaded)&&a._generateColumns()}),f.watch(this,"layer.definitionExpression",function(b,c){return(b||c)&&"loaded"===a.store.state&&a.refresh()}),f.watch(this,"attachmentsEnabled",function(b,c){(b||c)&&"loaded"===a.store.state&&
(a.store.attachmentsEnabled=!0,a.refresh(),a._generateColumns())})])};c.prototype.destroy=function(){this._resetColumns();this.columns.destroy();this.handles.removeAll();this._highlights.removeAll();this._highlights.destroy();this.view=this.layer=null};Object.defineProperty(c.prototype,"fieldConfigs",{set:function(a){var b;this._set("fieldConfigs",a);(null===(b=this.layer)||void 0===b?0:b.loaded)&&this._generateColumns()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"layer",{set:function(a){this._set("layer",
a);this._resetColumns();this.store.set({layer:a});a&&a.load();this.notifyChange("state")},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"messages",{set:function(a){var b;null===(b=this.grid)||void 0===b?void 0:b.set("messages",a);this._set("messages",a)},enumerable:!0,configurable:!0});c.prototype.clearHighlights=function(){this._highlights.removeAll()};c.prototype.clearSelection=function(){var a;null===(a=this.grid)||void 0===a?void 0:a.clearSelection()};c.prototype.deselectRows=
function(a){var b=this;a=a instanceof Array?a:[a];a.forEach(function(a){return b._deselectRow(a)})};c.prototype.getObjectIdIndex=function(a){var b;return null===(b=this.store)||void 0===b?void 0:b.getObjectIdIndex(a)};c.prototype.getValue=function(a,b){var c;a=this.store.getItemByObjectId(a);return null===(c=null===a||void 0===a?void 0:a.feature)||void 0===c?void 0:c.attributes[b]};c.prototype.refresh=function(){var a;null===(a=this.grid)||void 0===a?void 0:a.refresh()};c.prototype.selectRows=function(a){var b=
this;a=a instanceof Array?a:[a];a.forEach(function(a){return b._selectRow(a)})};c.prototype._generateColumns=function(){this._resetColumns();this.columns.addMany(d.__spreadArrays(this._createFieldColumns()));this.attachmentsEnabled&&this.columns.push(this._createAttachmentsColumn())};c.prototype._createFieldColumns=function(){return this.fieldConfigs&&this.fieldConfigs.length?this._createColumnsFromConfigs():this._createColumnsFromFields()};c.prototype._createColumnsFromConfigs=function(){var a=this.editingEnabled,
b=this.fieldConfigs,c=this.grid,d=this.hiddenFields,e=this.layer,f=this.messages,C=this.store,D=this.get("layer.fields")||[];return b.map(function(b){var g=n.find(D||[],function(a){return b.name===a.name}),h=-1<d.indexOf(g.name);return new p({config:b,direction:b.direction||null,editingEnabled:a,field:g,grid:c,hidden:h,layer:e,store:C,messages:f})})};c.prototype._createColumnsFromFields=function(){var a=this.editingEnabled,b=this.grid,c=this.hiddenFields,d=this.layer,e=this.messages,f=this.store;
return(this.get("layer.fields")||[]).map(function(g){var h=-1<c.indexOf(g.name);return new p({editingEnabled:a,field:g,grid:b,hidden:h,layer:d,store:f,messages:e})})};c.prototype._createAttachmentsColumn=function(){var a;return new z({header:null===(a=this.messages)||void 0===a?void 0:a.attachments})};c.prototype._sortOrdersToLayerOrderByFields=function(a){return a&&a.length?a.filter(function(a,c,d){return d.map(function(a){return a.path}).indexOf(a.path)===c}).map(function(a){return a.path+" "+a.direction.toUpperCase()}):
[]};c.prototype._highlight=function(a){var b=this.view,b=b&&a&&n.find(b.allLayerViews.items,function(b){return b.layer===a.layer});y.highlightsSupported(b)&&this._highlights.add(b.highlight(a),"feature-"+a.getObjectId())};c.prototype._unhighlight=function(a){a&&this._highlights.remove("feature-"+a.getObjectId())};c.prototype._selectRow=function(a){var b=this.grid,c=a instanceof l?a:null;a=c?c.getObjectId():a;var d=this.getObjectIdIndex(a);-1===d?null===b||void 0===b?void 0:b.selectItem({objectId:a,
feature:c}):null===b||void 0===b?void 0:b.selectRow(d)};c.prototype._deselectRow=function(a){var b=this.grid;a=a instanceof l?a.getObjectId():a;var c=this.getObjectIdIndex(a);-1===c?null===b||void 0===b?void 0:b.deselectItem({objectId:a}):null===b||void 0===b?void 0:b.deselectRow(c)};c.prototype._onSelectionChange=function(a){var b=this,c=this.highlightOnRowSelectEnabled,d=a.added;a=a.removed;c&&d.forEach(function(a){return b._highlight(a.feature)});c&&a.forEach(function(a){return b._unhighlight(a.feature)})};
c.prototype._resetColumns=function(){this.columns.items.forEach(function(a){return a.destroy()});this.columns.removeAll()};c.prototype._getPageSizeFromLayer=function(){var a,b,c;return(null===(c=null===(b=null===(a=this.layer)||void 0===a?void 0:a.capabilities)||void 0===b?void 0:b.query)||void 0===c?void 0:c.maxRecordCount)||0};d.__decorate([e.property()],c.prototype,"attachmentsEnabled",void 0);d.__decorate([e.property()],c.prototype,"cellClassNameGenerator",void 0);d.__decorate([e.property()],
c.prototype,"dataProvider",void 0);d.__decorate([e.property()],c.prototype,"editingEnabled",void 0);d.__decorate([e.property({dependsOn:["messages","layer.loaded"]})],c.prototype,"fieldConfigs",null);d.__decorate([e.property({readOnly:!0})],c.prototype,"grid",void 0);d.__decorate([e.property()],c.prototype,"hiddenFields",void 0);d.__decorate([e.property()],c.prototype,"highlightOnRowSelectEnabled",void 0);d.__decorate([e.property({readOnly:!0})],c.prototype,"itemIdPath",void 0);d.__decorate([e.property({type:x})],
c.prototype,"layer",null);d.__decorate([e.property()],c.prototype,"messages",null);d.__decorate([e.property()],c.prototype,"relatedRecordsEnabled",void 0);d.__decorate([e.property({readOnly:!0,type:q})],c.prototype,"store",void 0);d.__decorate([e.property()],c.prototype,"view",void 0);return c=d.__decorate([e.subclass("esri.widgets.FeatureTable.FeatureTableViewModel")],c)}(v.HandleOwnerMixin(B))});