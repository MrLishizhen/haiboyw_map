// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define(["require","exports","tslib","../../../core/accessorSupport/decorators","./Input"],function(h,k,b,c,g){function e(b){return null!=b?new Date(b):null}return function(f){function a(a){a=f.call(this,a)||this;a.includeTime=null;a.max=null;a.min=null;a.type="datetime-picker";return a}b.__extends(a,f);d=a;a.prototype.readMax=function(a,b){return e(b.max)};a.prototype.writeMax=function(a,b){b.max=a?a.getTime():null};a.prototype.readMin=function(a,b){return e(b.min)};a.prototype.writeMin=function(a,
b){b.min=a?a.getTime():null};a.prototype.clone=function(){return new d({includeTime:this.includeTime,max:this.max,min:this.min,type:this.type})};var d;b.__decorate([c.property({type:Boolean,json:{write:!0}})],a.prototype,"includeTime",void 0);b.__decorate([c.property({type:Date,json:{type:Number,write:!0}})],a.prototype,"max",void 0);b.__decorate([c.reader("max")],a.prototype,"readMax",null);b.__decorate([c.writer("max")],a.prototype,"writeMax",null);b.__decorate([c.property({type:Date,json:{type:Number,
write:!0}})],a.prototype,"min",void 0);b.__decorate([c.reader("min")],a.prototype,"readMin",null);b.__decorate([c.writer("min")],a.prototype,"writeMin",null);b.__decorate([c.property({type:["datetime-picker"],json:{read:!1,write:!0}})],a.prototype,"type",void 0);return a=d=b.__decorate([c.subclass("esri.form.elements.inputs.DateTimePickerInput")],a)}(g)});