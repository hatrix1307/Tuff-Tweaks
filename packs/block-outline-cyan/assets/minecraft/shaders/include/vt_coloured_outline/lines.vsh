uint toint(vec4 col) {
   ivec4 icol = ivec4(col*255.);
   return uint((icol.r << 24) + (icol.g << 16) + (icol.b << 8) + icol.a);
}
vec4 tovec(uint col) {
    return vec4(col >> 24 % 256, (col >> 16) % 256u, (col >> 8) % 256u, col % 256u) / 255.;
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

vec4 _modifyLineColour(float lineWidth, vec4 colourAttribute) {
    if(_isBlockOutline(lineWidth, colourAttribute)) {
        return tovec(BLOCK_OUTLINE_COLOUR);
    }
    return colourAttribute;
}
