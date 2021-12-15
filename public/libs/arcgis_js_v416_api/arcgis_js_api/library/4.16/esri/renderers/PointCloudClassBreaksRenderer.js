// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../core/lang ../core/accessorSupport/decorators ./PointCloudRenderer ./support/LegendOptions ./support/pointCloud/ColorClassBreakInfo".split(" "),function(l,m,b,f,c,d,h,k){return function(g){function a(a){a=g.call(this,a)||this;a.type="point-cloud-class-breaks";a.field=null;a.legendOptions=null;a.fieldTransformType=null;a.colorClassBreakInfos=null;return a}b.__extends(a,g);e=a;a.prototype.clone=function(){return new e(b.__assign(b.__assign({},this.cloneProperties()),
{field:this.field,fieldTransformType:this.fieldTransformType,colorClassBreakInfos:f.clone(this.colorClassBreakInfos),legendOptions:f.clone(this.legendOptions)}))};var e;b.__decorate([c.enumeration({pointCloudClassBreaksRenderer:"point-cloud-class-breaks"})],a.prototype,"type",void 0);b.__decorate([c.property({json:{write:!0},type:String})],a.prototype,"field",void 0);b.__decorate([c.property({type:h.default,json:{write:!0}})],a.prototype,"legendOptions",void 0);b.__decorate([c.property({type:d.fieldTransformTypeKebabDict.apiValues,
json:{type:d.fieldTransformTypeKebabDict.jsonValues,read:d.fieldTransformTypeKebabDict.read,write:d.fieldTransformTypeKebabDict.write}})],a.prototype,"fieldTransformType",void 0);b.__decorate([c.property({type:[k.default],json:{write:!0}})],a.prototype,"colorClassBreakInfos",void 0);return a=e=b.__decorate([c.subclass("esri.renderers.PointCloudClassBreaksRenderer")],a)}(d)});