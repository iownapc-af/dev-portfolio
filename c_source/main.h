#pragma once

#ifndef MAIN_H
#define MAIN_H

#define BLACK 0
#define BLUE 1
#define GREEN 2
#define CYAN 3
#define RED 4
#define MAGENTA 5
#define BROWN 6
#define LIGHTGRAY 7
#define DARKGRAY 8
#define LIGHTBLUE 9
#define LIGHTGREEN 10
#define LIGHTCYAN 11
#define LIGHTRED 12
#define LIGHTMAGENTA 13
#define YELLOW 14
#define WHITE 15
#define BLINK 128

enum {
    KEY_ESC = 27,
    ARROW_UP = 256 + 72,
    ARROW_DOWN = 256 + 80,
    ARROW_LEFT = 256 + 75,
    ARROW_RIGHT = 256 + 77,
    KEY_F1 = 256 + 59,
    KEY_F2 = 256 + 60,
    KEY_F3 = 256 + 61,
    KEY_F4 = 256 + 62,
    KEY_F5 = 256 + 63,
    KEY_F6 = 256 + 64,
    KEY_F7 = 256 + 65,
    KEY_F8 = 256 + 66,
    KEY_F9 = 256 + 67,
    KEY_F10 = 256 + 68,
    KEY_F11 = 256 + 69,
    KEY_F12 = 256 + 70,
    TRASH = 7,
    COMMON = 15,
    UNCOMMON = 10,
    RARE = 9,
    EPIC = 13,
    LEGENDARY = 6
};

/*
Player Codes
\u263a = White Smile
\u263b = Black Smile
'\u0466' = Tree Large
'\u0467' = Tree Small
'\u20b3' = Tree Other
'\u2591' = Light block
'\u2592' = Medium block
'\u2593' = Dark block
'\u2588' = Full block
Building Codes
\u2554 = Top Left
\u2557 = Top Right
\u255a = Bottom Left
\u255d = Bottom Right
\u2550 = Horizontal
\u2551 = Vertical
\u0488 = Magic Blast 1
\u0489 = Magic Blast 2
*/

#define WALL L'\u2593'
#define DOOR L'\u2593'              // 0
#define WALLFRONT L'\u2592'         // 1
#define WALLSIDE L'\u2591'          // 2
#define ROOF L'\u2588'              // 3
#define ROOFCORNER L'\u2584'        // 4
#define ROOFWTF L'\u25a0'           // 5
#define WINDOW L'\u256c'            // 6
#define ROOFUNDERCORNER L'\u2580'   // 7
#define TABLE1 //0xCB         // 8
#define CHESTLEFT //0xA9      // 9
#define CHESTRIGHT //0xAA     // A
//#define TREE 

#define SMALLTENT L'\u03eb'
#define LARGETENT L'\u03EA'

#define mob1 L'\u2640'

#define GRASS1

/* TEST */
int aiX = 22;
int aiY = 15;
int aiXStart = aiX;
int aiYStart = aiY;
/* END TEST */

wchar_t gameMap[25][86] = {
    L"#####################################################################################",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#       4444444444444444444                   3444445              3444445          #",
    L"#      5                   5                 37     75            37     75         #",
    L"#     34444444444444444444443               37111111175          37111111175        #",
    L"#     21111111111111111111112               21611111612          21611111612        #",
    L"#     21166111111111111166112               21111011112          21111011112        #",
    L"#     21166111111111111166112                                                       #",
    L"#     21111111111111111111112                                                       #",
    L"#     21111111111111100111112                           3                           #",
    L"#                                                       4                           #",
    L"#                                                       5                           #",
    L"#                                                       6                           #",
    L"#                                                       7                           #",
    L"#                    .                                                              #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#                                                                                   #",
    L"#####################################################################################" };
wchar_t rooms[10][161] = {
    L"################################################################################################################################################################",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"#     9A                               ##     9A                               ##     9A                               ##     9A                               #",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"#     888                    888       ##     868                    888       ##                            888       ##           676              888       #",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"#                                      ##                                      ##                                      ##                                      #",
    L"##################0#######################################0#######################################0#######################################0#####################" };
wchar_t starterBuilding[10][41] = {
    L"########################################",
    L"#                                      #",
    L"#     9A                               #",
    L"#                                      #",
    L"#                                      #",
    L"#                                      #",
    L"#     888                  67688       #",
    L"#                                      #",
    L"#                                      #",
    L"##################0#####################" };
wchar_t inv[14][56] = {
    L"######################## INVENTORY ####################",
    L"#                                                      ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ",
    L"# ,                                                    ", };

wchar_t clearInv[1][56] = { L"# ,                                                    ", };

std::string items[11] = {
    "Item1",
    "Item2",
    "Item3",
    "Item4",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
};

/* DOOR COORDS */
int room1[2] = { 0, 0 };
int room2[2] = { 0, 0 };


/* Functions */
void init();
void initMap();
void checkSaveGame();

void gameLoop();

void menuHighlight();
void pauseMenu();
void inventory();

void checkNextSpace(int, int, int);
void getInput(bool);
void checkPosition();
void updateScreen();
void drawMap();
void clearScreen();
void drawUI(int);
void textColor(int, int);
void setCursorPosition(int, int);
void hideCursor();
bool isFacingDoor();

char PLAYER = 0xE8;
char direction;
int ppX, ppY;
int pX = 67; int pY = 9;
int inMap = 0;
bool running = false;

bool awaitingInput = false;
bool inMenu = false;
std::string menu;
int menuOptionSelected = 0;
int invYCoord;
#endif /* HEADER_H */

