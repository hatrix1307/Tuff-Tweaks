#version 330

#define MINECRAFT_LIGHT_POWER   (0.6)
#define MINECRAFT_AMBIENT_LIGHT (0.4)

layout(std140) uniform Lighting {
    vec3 Light0_Direction;
    vec3 Light1_Direction;
};

vec2 minecraft_compute_light(vec3 lightDir0, vec3 lightDir1, vec3 normal) {
    return vec2(dot(lightDir0, normal), dot(lightDir1, normal));
}

vec4 minecraft_mix_light_separate(vec2 light, vec4 color) {
    vec2 lightValue = max(vec2(0.0), light);
    float lightAccum = min(1.0, (lightValue.x + lightValue.y) * MINECRAFT_LIGHT_POWER + MINECRAFT_AMBIENT_LIGHT);
    return vec4(color.rgb * lightAccum, color.a);
}

vec4 minecraft_mix_light(vec3 lightDir0, vec3 lightDir1, vec3 normal, vec4 color) {
    vec2 light = minecraft_compute_light(lightDir0, lightDir1, normal);
    return minecraft_mix_light_separate(light, color);
}

// this is defined here so wavy plants and mob spawn indicator can be compatible with warm glow
// to add compat with other packs:
//   - make sure to moj_import light.glsl
//   - define a 'default' version of this function and surround it with `#ifndef VT_WARM_GLOW_ENABLED (func here) #endif` (can be multiline)
//   - make sure warm glow is enanled _below_ the other pack
#define VT_WARM_GLOW_ENABLED

vec4 minecraft_sample_lightmap(sampler2D lightMap, ivec2 uv) {
	float blockLight = uv.x / 16.0;
	float skyLight = uv.y / 16.0;
	
	vec4 pureSkyLight = texture(lightMap, clamp(vec2(0.0, 240.0) / 256.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0))); // Gets the color of pure skylight.
	float dayness = 1.0 - (smoothstep(7.0, 15.0, skyLight) * smoothstep(0.164, 0.976, pureSkyLight.r));
	
	float brightnessModifier = ((blockLight * dayness) + 32.0) / 32.0; // Lighter light levels are made brighter because it looks pretty.
	vec3 warmTint = vec3(0.15, 0.04, -0.15) * dayness; // The default warm tint of light.
	vec3 lightModifier = vec3(brightnessModifier) + (warmTint * smoothstep(0.0, 7.0, blockLight)); // Combine the brightness modifier and the warm tint to get the nice glow effect!
	
	vec4 defaultLightColor = texture(lightMap, clamp(uv / 256.0, vec2(0.5 / 16.0), vec2(15.5 / 16.0))); // Gets what the light color would be in vanilla.
	
	if (blockLight > 0.0) return defaultLightColor * vec4(lightModifier, 1.0); // If there is enough block light, add the light modifier.
	else return defaultLightColor; // If there is no block light, return default.
}
