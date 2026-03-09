#ifndef VT_COLOURED_OUTLINE_CONFIG
#define VT_COLOURED_OUTLINE_CONFIG

// --- config starts here ---
//  colours are RGBA format

const uint BLOCK_OUTLINE_COLOURS[] = uint[](
    0xff1100ffu,
    0xff6200ffu,
    0xffc42effu,
    0x80ff00ffu,
    0x00ba95ffu,
    0x42ecffffu,
    0x3245bfffu,
    0x921cd6ffu,
    0xfb26ffffu,
    0xff80bfffu
);

#define GRADIENT_SPEED 1400

// 0-1 float range
#define GRADIENT_SMOOTHNESS 1.0

#define BLOCK_OUTLINE_WIDTH lineWidth + 0.5



// --- config ends here ---

#endif