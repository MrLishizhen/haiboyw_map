// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define(["require","exports","tslib","../../shaderModules/interfaces"],function(l,e,c,d){Object.defineProperty(e,"__esModule",{value:!0});e.LineStipple=function(a,b){a.defines.addFloat("STIPPLE_ALPHA_COLOR_DISCARD",.001);a.defines.addFloat("STIPPLE_ALPHA_HIGHLIGHT_DISCARD",.5);b.stippleEnabled?(a.vertex.uniforms.add("stipplePatternPixelSizeInv","float"),b.stippleUVMaxEnabled&&a.varyings.add("stipplePatternUvMax","float"),a.varyings.add("stipplePatternUv","float"),a.fragment.uniforms.add("stipplePatternTexture",
"sampler2D"),b.stippleOffColorEnabled&&a.fragment.uniforms.add("stippleOffColor","vec4"),a.fragment.code.add(d.glsl(f||(f=c.__makeTemplateObject(["\n  float getStippleAlpha() {\n    float stipplePatternUvClamped \x3d stipplePatternUv * gl_FragCoord.w;\n    ","\n\n    return texture2D(stipplePatternTexture, vec2(mod(stipplePatternUvClamped, 1.0), 0.5)).a;\n  }"],["\n  float getStippleAlpha() {\n    float stipplePatternUvClamped \x3d stipplePatternUv * gl_FragCoord.w;\n    ","\n\n    return texture2D(stipplePatternTexture, vec2(mod(stipplePatternUvClamped, 1.0), 0.5)).a;\n  }"])),
b.stippleUVMaxEnabled?"stipplePatternUvClamped \x3d clamp(stipplePatternUvClamped, 0.0, stipplePatternUvMax);":"")),b.stippleOffColorEnabled?a.fragment.code.add(d.glsl(g||(g=c.__makeTemplateObject(["\n    #define discardByStippleAlpha(stippleAlpha, threshold) {}\n    #define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)\n    "],["\n    #define discardByStippleAlpha(stippleAlpha, threshold) {}\n    #define blendStipple(color, stippleAlpha) mix(color, stippleOffColor, stippleAlpha)\n    "])))):
a.fragment.code.add(d.glsl(h||(h=c.__makeTemplateObject(["\n    #define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha \x3c threshold) { discard; }\n    #define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)\n    "],["\n    #define discardByStippleAlpha(stippleAlpha, threshold) if (stippleAlpha \x3c threshold) { discard; }\n    #define blendStipple(color, stippleAlpha) vec4(color.rgb, color.a * stippleAlpha)\n    "]))))):a.fragment.code.add(d.glsl(k||(k=
c.__makeTemplateObject(["\n  float getStippleAlpha() { return 1.0; }\n\n  #define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}\n  #define blendStipple(color, _stippleAlpha_) color\n  "],["\n  float getStippleAlpha() { return 1.0; }\n\n  #define discardByStippleAlpha(_stippleAlpha_, _threshold_) {}\n  #define blendStipple(color, _stippleAlpha_) color\n  "]))))};var f,g,h,k});