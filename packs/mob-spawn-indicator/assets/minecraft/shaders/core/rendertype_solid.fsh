#version 150

#moj_import <fog.glsl>

uniform sampler2D Sampler0;

uniform vec4 ColorModulator;
uniform float FogStart;
uniform float FogEnd;
uniform vec4 FogColor;

in float vertexDistance;
in vec4 vertexColor;
in vec2 texCoord0;

out vec4 fragColor;

#moj_import <vt_mob_spawn_indicator/frag_variables.glsl>

void main() {
    vec4 color = texture(Sampler0, texCoord0);
    if (color.a < 0.5) discard;

    #moj_import <vt_mob_spawn_indicator/frag_main.glsl>

    fragColor = linear_fog(color, vertexDistance, FogStart, FogEnd, FogColor);
}
