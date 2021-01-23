/*
#version 300 es
2: #define attribute in
3: #define varying out
4: #define texture2D texture
5: precision highp float;
6: precision highp int;
7: #define HIGH_PRECISION
8: #define SHADER_NAME ShaderMaterial
9: #define VERTEX_TEXTURES
10: #define GAMMA_FACTOR 2
11: #define MAX_BONES 0
12: #define BONE_TEXTURE
13: uniform mat4 modelMatrix;
14: uniform mat4 modelViewMatrix;
15: uniform mat4 projectionMatrix;
16: uniform mat4 viewMatrix;
17: uniform mat3 normalMatrix;
18: uniform vec3 cameraPosition;
19: uniform bool isOrthographic;
20: #ifdef USE_INSTANCING
21: 	attribute mat4 instanceMatrix;
22: #endif
23: #ifdef USE_INSTANCING_COLOR
24: 	attribute vec3 instanceColor;
25: #endif
26: attribute vec3 position;
27: attribute vec3 normal;
28: attribute vec2 uv;
29: #ifdef USE_TANGENT
30: 	attribute vec4 tangent;
31: #endif
32: #ifdef USE_COLOR
33: 	attribute vec3 color;
34: #endif
35: #ifdef USE_MORPHTARGETS
36: 	attribute vec3 morphTarget0;
37: 	attribute vec3 morphTarget1;
38: 	attribute vec3 morphTarget2;
39: 	attribute vec3 morphTarget3;
40: 	#ifdef USE_MORPHNORMALS
41: 		attribute vec3 morphNormal0;
42: 		attribute vec3 morphNormal1;
43: 		attribute vec3 morphNormal2;
44: 		attribute vec3 morphNormal3;
45: 	#else
46: 		attribute vec3 morphTarget4;
47: 		attribute vec3 morphTarget5;
48: 		attribute vec3 morphTarget6;
49: 		attribute vec3 morphTarget7;
50: 	#endif
51: #endif
52: #ifdef USE_SKINNING
53: 	attribute vec4 skinIndex;
54: 	attribute vec4 skinWeight;
55: #endif
*/

uniform float sec;

varying  vec4 vColor;
varying vec2 vUv;

void main() {
    vColor = vec4(1.0-sin(sec)*0.5, 1.0, 0, 1.0);
    vUv=uv;

    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vec4 mvPosition =  viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;
}