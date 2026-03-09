out vec2 lightLevel;
out vec2 faceCoords;
out float stairs;

vec2 generateFaceCoords() {
    if (gl_VertexID % 4 == 0) return vec2(1.0,0.0);
    else if (gl_VertexID % 4 == 1) return vec2(1.0,1.0);
    else if (gl_VertexID % 4 == 2) return vec2(0.0,1.0);
    else if (gl_VertexID % 4 == 3) return vec2(0.0,0.0);
}