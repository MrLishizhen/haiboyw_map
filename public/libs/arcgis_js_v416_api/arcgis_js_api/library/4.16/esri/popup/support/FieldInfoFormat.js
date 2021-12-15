// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../core/date ../../core/JSONSupport ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType ../../intl/date ../../intl/number".split(" "),function(m,n,b,h,k,c,l,e,f){return function(g){function a(a){a=g.call(this,a)||this;a.dateFormat=null;a.digitSeparator=!1;a.places=null;return a}b.__extends(a,g);d=a;a.prototype.clone=function(){return new d({dateFormat:this.dateFormat,digitSeparator:this.digitSeparator,places:this.places})};a.prototype.format=
function(a){return this.dateFormat?e.formatDate(a,e.convertDateFormatToIntlOptions(this.dateFormat)):f.formatNumber(a,f.convertNumberFormatToIntlOptions(this))};var d;b.__decorate([c.enumeration(h.dictionary)],a.prototype,"dateFormat",void 0);b.__decorate([c.property({type:Boolean,json:{write:!0}})],a.prototype,"digitSeparator",void 0);b.__decorate([c.property({type:l.Integer,json:{write:!0}})],a.prototype,"places",void 0);return a=d=b.__decorate([c.subclass("esri.popup.support.FieldInfoFormat")],
a)}(k.JSONSupport)});