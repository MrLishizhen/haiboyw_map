// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../core/JSONSupport ../../core/maybe ../../core/accessorSupport/decorators ./materialUtils".split(" "),function(b,a,d,f,g,e,h){Object.defineProperty(a,"__esModule",{value:!0});b=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.color=null;return a}d.__extends(c,b);a=c;c.prototype.clone=function(){return new a({color:g.isSome(this.color)?this.color.clone():null})};var a;d.__decorate([e.property(h.colorAndTransparencyProperty)],c.prototype,"color",
void 0);return c=a=d.__decorate([e.subclass("esri.symbols.support.Symbol3DMaterial")],c)}(f.JSONSupport);a.Symbol3DMaterial=b;a.default=b});