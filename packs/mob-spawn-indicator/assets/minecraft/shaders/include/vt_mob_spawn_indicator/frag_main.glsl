// make sure color is just the raw texture, `texture(Sampler0, texcoord0)` for example
float lightLevelOpacity = 0.45;

if (lightLevel.x <= 1*16+1) {
    lightLevelOpacity = 1;
    
} else if (lightLevel.x <= 7*16+1) {
    lightLevelOpacity = 0.7;
}

vec4 vtc = vertexColor;

bool shape = abs(faceCoords.x + faceCoords.y - 1) < THICKNESS || abs(faceCoords.x - faceCoords.y) < THICKNESS;
bool corners = abs(faceCoords.x + faceCoords.y - 1) < (CORNER * lightLevelOpacity) && abs(faceCoords.x - faceCoords.y) < (CORNER * lightLevelOpacity);

if (
    shape && corners && stairs < (1.0 / 255.0)
    #ifdef DONT_APPLY_TO_TRANSLUCENT
    // if this is defined, will only apply to textures that are nearly fully opaque
    && color.a > 0.95
    #endif
) {
    if (lightLevel.x <= 1*16+1) {
        color *= vec4(4.0,0.0,0.0,1.0); //? RED

    } else if (lightLevel.x <= 7*16+1) {
        color *= vec4(4.0,1.5,0.0,1.0); //? ORANGE

    } else if (lightLevel.x <= 11*16+1) {
        color *= vec4(4.0,4.0,0.0,1.0); //? YELLOW
        
    } 

    vtc = mix(vertexColor, vec4(1.), 0.5);
}

color *= vtc 
#ifndef VT_MOB_SPAWN_INDICATOR__NO_COLOUR_MODULATOR
* ColorModulator;
#else
;
#endif

color = clamp(color, 0.0, 1.0);
