// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/Logger ../../../../../webgl ../../definitions ./parameters".split(" "),function(l,p,q,r,t,g){function u(c,a){a.fillColor[0]=c.color.r/255;a.fillColor[1]=c.color.g/255;a.fillColor[2]=c.color.b/255;a.fillColor[3]=c.color.a;c.haloColor?(a.outlineColor[0]=c.haloColor.r/255,a.outlineColor[1]=c.haloColor.g/255,a.outlineColor[2]=c.haloColor.b/255,a.outlineColor[3]=c.haloColor.a):(a.outlineColor[0]=a.fillColor[0],a.outlineColor[1]=a.fillColor[1],a.outlineColor[2]=
a.fillColor[2],a.outlineColor[3]=a.fillColor[3]);a.fillColor[3]*=c.fillOpacity;a.outlineColor[3]*=c.haloOpacity;a.fillColor[0]*=a.fillColor[3];a.fillColor[1]*=a.fillColor[3];a.fillColor[2]*=a.fillColor[3];a.outlineColor[0]*=a.outlineColor[3];a.outlineColor[1]*=a.outlineColor[3];a.outlineColor[2]*=a.outlineColor[3];a.outlineWidth=g.HIGHLIGHT_SIZING.outlineWidth;a.outerHaloWidth=g.HIGHLIGHT_SIZING.outerHaloWidth;a.innerHaloWidth=g.HIGHLIGHT_SIZING.innerHaloWidth;a.outlinePosition=g.HIGHLIGHT_SIZING.outlinePosition}
Object.defineProperty(p,"__esModule",{value:!0});var m=q.getLogger("esri.views.2d.engine.webgl.painter.highlight.HighlightGradient"),v=[0,0,0,0];l=function(){function c(){this._convertedHighlightOptions={fillColor:[.2*.75,.6*.75,.675,.75],outlineColor:[.2*.9,.54,.81,.9],outlinePosition:g.HIGHLIGHT_SIZING.outlinePosition,outlineWidth:g.HIGHLIGHT_SIZING.outlineWidth,innerHaloWidth:g.HIGHLIGHT_SIZING.innerHaloWidth,outerHaloWidth:g.HIGHLIGHT_SIZING.outerHaloWidth};this.shadeTexChanged=!0;this.texelData=
new Uint8Array(4*g.SHADE_TEXTURE_SIZE);this.minMaxDistance=[0,0]}c.prototype.setHighlightOptions=function(a){function c(a,b,c){d[0]=(1-c)*a[0]+c*b[0];d[1]=(1-c)*a[1]+c*b[1];d[2]=(1-c)*a[2]+c*b[2];d[3]=(1-c)*a[3]+c*b[3]}var e,f=this._convertedHighlightOptions;u(a,f);a=f.outlinePosition-f.outlineWidth/2-f.outerHaloWidth;var l=f.outlinePosition-f.outlineWidth/2,n=f.outlinePosition+f.outlineWidth/2,k=f.outlinePosition+f.outlineWidth/2+f.innerHaloWidth,b=Math.sqrt(Math.PI/2)*g.SIGMAS[3],h=Math.abs(a)>
b?Math.round(10*(Math.abs(a)-b))/10:0,b=Math.abs(k)>b?Math.round(10*(Math.abs(k)-b))/10:0;h&&!b?m.error("The outer rim of the highlight is "+h+"px away from the edge of the feature; consider reducing some width values or shifting the outline position towards positive values (inwards)."):!h&&b?m.error("The inner rim of the highlight is "+b+"px away from the edge of the feature; consider reducing some width values or shifting the outline position towards negative values (outwards)."):h&&b&&m.error("The highlight is "+
Math.max(h,b)+"px away from the edge of the feature; consider reducing some width values.");for(var d=[void 0,void 0,void 0,void 0],h=this.texelData,b=0;b<g.SHADE_TEXTURE_SIZE;++b)e=a+b/(g.SHADE_TEXTURE_SIZE-1)*(k-a),e<a?(d[4*b+0]=0,d[4*b+1]=0,d[4*b+2]=0,d[4*b+3]=0):e<l?c(v,f.outlineColor,(e-a)/(l-a)):e<n?(e=f.outlineColor,d[0]=e[0],d[1]=e[1],d[2]=e[2],d[3]=e[3]):e<k?c(f.outlineColor,f.fillColor,(e-n)/(k-n)):(e=f.fillColor,d[4*b+0]=e[0],d[4*b+1]=e[1],d[4*b+2]=e[2],d[4*b+3]=e[3]),h[4*b+0]=255*d[0],
h[4*b+1]=255*d[1],h[4*b+2]=255*d[2],h[4*b+3]=255*d[3];this.minMaxDistance[0]=a;this.minMaxDistance[1]=k;this.shadeTexChanged=!0};c.prototype.applyHighlightOptions=function(a,c){this.shadeTex||(this.shadeTex=new r.Texture(a,{target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,width:g.SHADE_TEXTURE_SIZE,height:1,samplingMode:9729}));this.shadeTexChanged&&(this.shadeTex.updateData(0,0,0,g.SHADE_TEXTURE_SIZE,1,this.texelData),this.shadeTexChanged=!1);a.bindTexture(this.shadeTex,t.TEXTURE_BINDING_HIGHLIGHT_1);
c.setUniform2fv("u_minMaxDistance",this.minMaxDistance)};c.prototype.destroy=function(){this.shadeTex&&(this.shadeTex.dispose(),this.shadeTex=null)};return c}();p.default=l});