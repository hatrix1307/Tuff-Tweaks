// this light level or below will be pitch black
#define PITCH_BLACK_THRESHOLD 2.2
// below this light leve, will darken the light a bit
#define GENERAL_DARKEN_START 2.0

int toint(vec3 col) {
  ivec3 icol = ivec3(col*255.);
  return (icol.r << 16) + (icol.g << 8) + icol.b;
}