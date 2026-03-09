if (!(fract(Position.x) >= 0.7 || fract(Position.z) >= 0.7) && (fract(Position.x) > 0.01 || fract(Position.z) > 0.01)) {
    stairs = 1.0;
} else {
    stairs = 0.0;
}

lightLevel = vec2(UV2);

const vec2[4] corners = vec2[4](
    vec2(0, 1),
    vec2(0, 0),
    vec2(1, 0),
    vec2(1, 1)
);

faceCoords = corners[gl_VertexID % 4];
