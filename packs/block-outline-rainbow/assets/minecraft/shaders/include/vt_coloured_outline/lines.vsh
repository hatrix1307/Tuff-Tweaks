uint toint(vec4 col) {
   ivec4 icol = ivec4(col*255.);
   return uint((icol.r << 24) + (icol.g << 16) + (icol.b << 8) + icol.a);
}
vec4 tovec(uint col) {
    return vec4(col >> 24 % 256, (col >> 16) % 256u, (col >> 8) % 256u, col % 256u) / 255.;
}

vec4 drawGradient(float time, float smoothness) {
    vec4 gradient = vec4(0.);
    smoothness = clamp(smoothness / 2., 0.0001, 1.);
    
    int indexAtTime = int(time * float(BLOCK_OUTLINE_COLOURS.length()));
    float fLength = float(BLOCK_OUTLINE_COLOURS.length());
    
    for(int i = indexAtTime - 1; i < indexAtTime + 1; i++){
        float _step1 = (float(i) + (0.5 - smoothness))/fLength;
        float _step2 = (float(i) - (-smoothness - 0.5))/fLength;

        gradient = mix(
            i <= 0 ? tovec(BLOCK_OUTLINE_COLOURS[BLOCK_OUTLINE_COLOURS.length()-1]) : gradient,
            tovec(BLOCK_OUTLINE_COLOURS[i]),
            smoothstep(_step1, _step2, time)
        );
    }
    
    return gradient;
}

bool _isBlockOutline(float lineWidth, vec4 colourAttribute) {
    return toint(colourAttribute) == 0x00000066u;
}

float _modifyLineWidth(float lineWidth, vec4 colourAttribute) {
    if(_isBlockOutline(lineWidth, colourAttribute)) {
        return BLOCK_OUTLINE_WIDTH;
    }
    return lineWidth;
}

vec4 _modifyLineColour(float lineWidth, vec4 colourAttribute, float gameTime) {
    if(_isBlockOutline(lineWidth, colourAttribute)) {
        return drawGradient(fract(gameTime * GRADIENT_SPEED / BLOCK_OUTLINE_COLOURS.length()), GRADIENT_SMOOTHNESS);
    }
    return colourAttribute;
}
