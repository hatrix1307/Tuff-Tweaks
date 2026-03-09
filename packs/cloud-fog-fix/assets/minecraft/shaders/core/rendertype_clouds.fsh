#version 150

#moj_import <minecraft:fog.glsl>

uniform float FogStart;
uniform float FogEnd;
uniform vec4 FogColor;
uniform int FogShape;

in float vertexDistance;
in vec4 vertexColor;

out vec4 fragColor;
in vec3 vertexPos;

void main() {
    vec4 color = vertexColor;
    color.a *= linear_fog_fade(fog_distance(vertexPos.xyz, FogShape), FogStart, FogEnd);
    
    if (color.a < 0.05) {
        discard;
    }
    fragColor = color;
}
