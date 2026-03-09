in vec2 lightLevel;
in vec2 faceCoords;
in float stairs;

#define THICKNESS (sqrt(2.0) / 2.0 / 16.0)
#define OUTLINE ((16.0 - (7.5 * sqrt(2.0))) / 32.0)
#define CORNER (9.9 / 16.0)
