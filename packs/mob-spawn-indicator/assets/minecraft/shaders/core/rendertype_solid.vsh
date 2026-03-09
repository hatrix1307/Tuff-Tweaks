#version 150

#moj_import <light.glsl>
#moj_import <fog.glsl>

in vec3 Position;
in vec4 Color;
in vec2 UV0;
in ivec2 UV2;
in vec3 Normal;

uniform sampler2D Sampler2;

uniform sampler2D Sampler0;
uniform float GameTime;

uniform mat4 ModelViewMat;
uniform mat4 ProjMat;
uniform vec3 ChunkOffset;
uniform int FogShape;

out float vertexDistance;
out vec4 vertexColor;
out vec2 texCoord0;

#moj_import <vt_wavy_core/vert.glsl>
#moj_import <vt_mob_spawn_indicator/vert_variables.glsl>

void main() {
    vec3 pos = Position + ChunkOffset;

    float vertexAlphaMultiplier = 1.0;
    gl_Position = ProjMat * ModelViewMat * vec4(applyVertexOffsets(Position, ChunkOffset, GameTime, sampleAnimationType(Sampler0, UV0), vertexAlphaMultiplier), 1.0);

    vertexDistance = fog_distance(pos, FogShape);
    vertexColor = Color * minecraft_sample_lightmap(Sampler2, UV2);
    texCoord0 = UV0;

    #moj_import <vt_mob_spawn_indicator/vert_main.glsl>

    vertexColor.a *= vertexAlphaMultiplier;
}
