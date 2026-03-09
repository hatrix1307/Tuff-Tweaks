#version 330

#moj_import <vt_hardcore_darkness_util.glsl>

layout(std140) uniform LightmapInfo {
    float AmbientLightFactor;
    float SkyFactor;
    float BlockFactor;
    float NightVisionFactor;
    float DarknessScale;
    float DarkenWorldFactor;
    float BrightnessFactor;
    vec3 SkyLightColor;
    vec3 AmbientColor;
} lightmapInfo;

in vec2 texCoord;

out vec4 fragColor;

float get_brightness(float level) {
    return level / (4.0 - 3.0 * level);
}

vec3 notGamma(vec3 color) {
    float maxComponent = max(max(color.x, color.y), color.z);
    float maxInverted = 1.0f - maxComponent;
    float maxScaled = 1.0f - maxInverted * maxInverted * maxInverted * maxInverted;
    return color * (maxScaled / maxComponent);
}

bool isInEnd() {
    return toint(lightmapInfo.SkyLightColor) == 0xe580ff;
}

void main() {
    float minSkyThreshold = isInEnd() ? 0.0 : PITCH_BLACK_THRESHOLD;
    float generalSkyDarkenStart = isInEnd() ? 0.0 : GENERAL_DARKEN_START;

    float block_brightness = get_brightness(floor(texCoord.x * 16) / 15) * lightmapInfo.BlockFactor;
    float sky_brightness = get_brightness(floor((texCoord.y - (texCoord.y < generalSkyDarkenStart / 15.0 ? minSkyThreshold / 15.0 : 0.0)) * 16) / 15) * lightmapInfo.SkyFactor;

    // cubic nonsense, dips to yellowish in the middle, white when fully saturated
    vec3 color = vec3(
        block_brightness,
        block_brightness * ((block_brightness * 0.6 + 0.4) * 0.6 + 0.4),
        block_brightness * (block_brightness * block_brightness * 0.6 + 0.4)
    );

    color = mix(color, lightmapInfo.AmbientColor, lightmapInfo.AmbientLightFactor);

    color += lightmapInfo.SkyLightColor * sky_brightness;
    color = mix(color, vec3(0.75), 0.04);

    if (lightmapInfo.AmbientLightFactor == 0.0f) {
        vec3 darkened_color = color * vec3(0.7, 0.6, 0.6);
        color = mix(color, darkened_color, lightmapInfo.DarkenWorldFactor);
    }

    if (lightmapInfo.NightVisionFactor > 0.0) {
        // scale up uniformly until 1.0 is hit by one of the colors
        float max_component = max(color.r, max(color.g, color.b));
        if (max_component < 1.0) {
            vec3 bright_color = color / max_component;
            color = mix(color, bright_color, lightmapInfo.NightVisionFactor);
        }
    }

    if (lightmapInfo.AmbientLightFactor == 0.0f) {
        color = color - vec3(lightmapInfo.DarknessScale);
    }

    color = clamp(color, 0.0, 1.0);

    vec3 notGamma = notGamma(color);
    color = mix(color, notGamma, lightmapInfo.BrightnessFactor);
    color = mix(color, vec3(0.75), 0.04);

    // Adjust brightness if player doesnt have night vision
    if(
        texCoord.x <= PITCH_BLACK_THRESHOLD/16.0 &&
        texCoord.y <= minSkyThreshold/16.0 &&
        lightmapInfo.NightVisionFactor <= 0.001
    ) {
        fragColor = vec4(vec3(0.0), 1.0);
        return;
    }

    fragColor = vec4(color, 1.0);
}
