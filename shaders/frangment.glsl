/*
1: #version 300 es
2: #define varying in
3: out highp vec4 pc_fragColor;
4: #define gl_FragColor pc_fragColor
5: #define gl_FragDepthEXT gl_FragDepth
6: #define texture2D texture
7: #define textureCube texture
8: #define texture2DProj textureProj
9: #define texture2DLodEXT textureLod
10: #define texture2DProjLodEXT textureProjLod
11: #define textureCubeLodEXT textureLod
12: #define texture2DGradEXT textureGrad
13: #define texture2DProjGradEXT textureProjGrad
14: #define textureCubeGradEXT textureGrad
15: precision highp float;
16: precision highp int;
17: #define HIGH_PRECISION
18: #define SHADER_NAME ShaderMaterial
19: #define GAMMA_FACTOR 2
20: uniform mat4 viewMatrix;
21: uniform vec3 cameraPosition;
22: uniform bool isOrthographic;
23: 
24: vec4 LinearToLinear( in vec4 value ) {
25: 	return value;
26: }
27: vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
28: 	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
29: }
30: vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
31: 	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
32: }
33: vec4 sRGBToLinear( in vec4 value ) {
34: 	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
35: }
36: vec4 LinearTosRGB( in vec4 value ) {
37: 	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
38: }
39: vec4 RGBEToLinear( in vec4 value ) {
40: 	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
41: }
42: vec4 LinearToRGBE( in vec4 value ) {
43: 	float maxComponent = max( max( value.r, value.g ), value.b );
44: 	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
45: 	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
46: }
47: vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
48: 	return vec4( value.rgb * value.a * maxRange, 1.0 );
49: }
50: vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
51: 	float maxRGB = max( value.r, max( value.g, value.b ) );
52: 	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
53: 	M = ceil( M * 255.0 ) / 255.0;
54: 	return vec4( value.rgb / ( M * maxRange ), M );
55: }
56: vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
57: 	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
58: }
59: vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
60: 	float maxRGB = max( value.r, max( value.g, value.b ) );
61: 	float D = max( maxRange / maxRGB, 1.0 );
62: 	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
63: 	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
64: }
65: const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
66: vec4 LinearToLogLuv( in vec4 value ) {
67: 	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
68: 	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
69: 	vec4 vResult;
70: 	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
71: 	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
72: 	vResult.w = fract( Le );
73: 	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
74: 	return vResult;
75: }
76: const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
77: vec4 LogLuvToLinear( in vec4 value ) {
78: 	float Le = value.z * 255.0 + value.w;
79: 	vec3 Xp_Y_XYZp;
80: 	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
81: 	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
82: 	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
83: 	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
84: 	return vec4( max( vRGB, 0.0 ), 1.0 );
85: }
86: vec4 linearToOutputTexel( vec4 value ) { return LinearToLinear( value ); }
87: 
88: 
*/

uniform float sec;
uniform sampler2D texture0;

varying vec2 vUv;
varying vec4 vColor;

    void main() {
        vec4 smpColor=texture2D(texture0,vUv);
        gl_FragColor =vColor*smpColor;
    }