#include <iostream>
#include <string>
#include <io.h>
#include <fcntl.h>
#include <time.h>
#include <chrono>

#define _WIN32_WINNT 0x0500
#include <windows.h>

#include "main.h"

int rev = 5;
int pause() {
    std::cin.ignore(1, '\n');
    return std::cin.get();
} // should not be used except for maybe debugging

int main(int argc, char** argv) {
    _setmode(_fileno(stdout), _O_U16TEXT);

    try {
        inMap = 0;
        init();
        running = true;
    }
    catch (int trycatch) {}

    gameLoop();

    return 0;
}

/** DISPLAY FUNCTIONS **/

void clearScreen() {
    DWORD n, size;
    COORD coord = { 0 };
    CONSOLE_SCREEN_BUFFER_INFO csbi;

    HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
    GetConsoleScreenBufferInfo(h, &csbi);
    size = csbi.dwSize.X * csbi.dwSize.Y;

    FillConsoleOutputCharacter(h, TEXT(' '), size, coord, &n);
    GetConsoleScreenBufferInfo(h, &csbi);
    FillConsoleOutputAttribute(h, csbi.wAttributes, size, coord, &n);

    SetConsoleCursorPosition(h, coord);
}
void textColor(int fg, int bg) {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

    int color_attribute;
    color_attribute = bg;
    color_attribute = _rotl(color_attribute, 4) | fg;
    SetConsoleTextAttribute(hConsole, color_attribute);
}
void setCursorPosition(int y, int x) {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD point;
    point.X = x - 1;
    point.Y = y - 1;
    SetConsoleCursorPosition(hConsole, point);
}
void hideCursor() {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO ConCurInf;
    ConCurInf.dwSize = 10;
    ConCurInf.bVisible = FALSE;
}

/** INIT **/

void init() {
    // initial the screen    
    HWND hDesktop = GetDesktopWindow();
    HWND hConsole = GetConsoleWindow();
    COORD coord;
    RECT r, d;

    GetWindowRect(hConsole, &r);
    GetWindowRect(hDesktop, &d);
    GetStdHandle(STD_OUTPUT_HANDLE);
    coord.X = ((d.right / 2) - 300);
    coord.Y = ((d.bottom / 2) - 160);

    MoveWindow(hConsole, coord.X, coord.Y, 750, 540, TRUE);
    SetConsoleTitle(L"Realm of Chaos -- v0.0.5");

    initMap();
    // check savegame
    //checkSaveGame();
}
void initMap() {
    // Initialize the map

    for (int y = 0; y < 25; y++) {
        for (int x = 0; x < 86; x++) {
            switch (gameMap[y][x]) {
                case '#': gameMap[y][x] = WALL; break;
                case '0': gameMap[y][x] = DOOR; break;
                case '1': gameMap[y][x] = WALLFRONT; break;
                case '2': gameMap[y][x] = WALLSIDE; break;
                case '3': gameMap[y][x] = ROOF; break;
                case '4': gameMap[y][x] = ROOFCORNER; break;
                case '5': gameMap[y][x] = ROOFWTF; break;
                case '6': gameMap[y][x] = WINDOW; break;
                case '7': gameMap[y][x] = ROOFUNDERCORNER; break;
                //case '8': gameMap[y][x] = TABLE1; break;
                //case '9': gameMap[y][x] = CHESTLEFT; break;
                //case 'A': gameMap[y][x] = CHESTRIGHT; break;
                case 'G': break;
            }
        }
    }
    /*
    for (int y = 0; y < 10; y++) {
        for (int x = 0; x < 41; x++) {
            switch (starterBuilding[y][x]) {
            case '#': starterBuilding[y][x] = WALL; break;
            case '0': starterBuilding[y][x] = DOOR; break;
            case '1': starterBuilding[y][x] = WALLFRONT; break;
            case '2': starterBuilding[y][x] = WALLSIDE; break;
            case '3': gameMap[y][x] = ROOF; break;
            case '4': gameMap[y][x] = ROOFCORNER; break;
            //case '5': starterBuilding[y][x] = ROOFRIGHT; break;
            case '6': starterBuilding[y][x] = WINDOW; break;
            case '7': gameMap[y][x] = ROOFUNDERCORNER; break;
            //case '8': starterBuilding[y][x] = TABLE1; break;
            //case '9': starterBuilding[y][x] = CHESTLEFT; break;
            //case 'A': starterBuilding[y][x] = CHESTRIGHT; break;
            }
        }
    }
    */
    drawMap();
}
void drawMap() {
    clearScreen();
    setCursorPosition(29, 70);
    std::wcout << "Facing: ";
    setCursorPosition(1, 1);

    drawUI(1);

    /*

     MAKING GRASS GREEN
     BUILDINGS BROWN
     ETC
     */

    if (inMap == 0) {
        for (int y = 0; y < 25; y++) {
            std::wcout << "  ";
            for (int x = 0; x < 86; x++) {

                // Change text color of stuff
                textColor(WHITE, BLACK);
                switch (gameMap[y][x]) {
                    //case TREE
                }

                std::wcout << gameMap[y][x];
            }
            std::wcout << std::endl;
        }
    }
    else if (inMap == 1) {
        for (int y = 0; y < 10; y++) {
            std::wcout << "  ";
            for (int x = 0; x < 41; x++) {
                std::wcout << starterBuilding[y][x];
            }
            std::wcout << std::endl;
        }
    }

    // draw player
    setCursorPosition(pY + 4, pX + 3);
    textColor(MAGENTA, BLACK);
    std::wcout << PLAYER;

    drawUI(2);
    std::wcout << "\n";
    hideCursor();
}


/** GAME LOOP **/

int moveTime = 0;

void clearAITEST() {
    setCursorPosition(aiY, aiX);
    std::wcout << " ";
}

void aiTEST() {
    // create some time of leash limit
    // also instances of this function need to be able to run for multiple npcs on the screen

    bool reDrawAI = false;
    int directions[6] = { 0, 0, 0, 0, 1, 1 };

    if (aiY - 1 > aiYStart - 3 && gameMap[aiY - 1][aiX] == ' ') directions[0] = 1;      // up
    if (aiY + 1 < aiYStart + 3 && gameMap[aiY + 1][aiX] == ' ') directions[1] = 1;      // down
    if (aiX - 1 > aiXStart - 3 && gameMap[aiY][aiX - 1] == ' ') directions[2] = 1;      // left
    if (aiX + 1 < aiXStart + 3 && gameMap[aiY][aiX + 1] == ' ') directions[3] = 1;      // right

    srand(time(0));
    int direction = rand() % 6;
    //for (int i = 0; i < 6; i++) {
        if (directions[direction] == 1 && (direction != 5 && direction != 6))
            reDrawAI = true;
    //}

    if (reDrawAI) {
        //clearAITEST(); // clear ai previous position on screen

        switch (direction) {
            case 0: aiY -= 1; break;
            case 1: aiY += 1; break;
            case 2: aiX -= 1; break;
            case 3: aiX += 1; break;
        }

        setCursorPosition(aiY, aiX); // draw new ai position on screen
        std::wcout << mob1;
    }
}

void gameLoop() {
    while (running) {
        hideCursor();

        aiTEST();
        getInput(true);

        Sleep(125);
    }
}

/** INPUTS AND ACTIONS **/

void checkNextSpace(int y, int x, int room) {
    // at some point make gameMap array 3d and store all the maps unless its less efficient
    int idontknowwhattonamethis[2] = { y, x };

    if (idontknowwhattonamethis == room1) {  } // change current room to room1
    if (idontknowwhattonamethis == room2) {  } // 
        
}

void getInput(bool awaitingInput) {
    while (awaitingInput) {
        if (GetAsyncKeyState('W') != 0) {
            // create a check next position function
            // checks if door, item, npc, etc

            // when interacting with a door check door coordinates to determine destination 
            // use roomX array coordinates

            // create function to move character to reduce duplicate code

            if (direction != 'n') {
                direction = 'n';
            }
            else {
                if ((inMap == 0) && (gameMap[pY - 1][pX] == ' ')) {
                    ppY = pY; pY--;
                    ppX = pX;
                }
                if ((inMap == 1) && (starterBuilding[pY - 1][pX] == ' ')) {
                    ppY = pY; pY--;
                    ppX = pX;
                }
            }
            updateScreen();
            awaitingInput = false;
            Sleep(50); // create a variable for time?
        }
        if (GetAsyncKeyState('S') != 0) {
            if (direction != 's') {
                direction = 's';
            }
            else {
                if ((inMap == 0) && (gameMap[pY + 1][pX] == ' ')) {
                    ppY = pY; pY++;
                    ppX = pX;
                }
                if ((inMap == 1) && (starterBuilding[pY + 1][pX] == ' ')) {
                    ppY = pY; pY++;
                    ppX = pX;
                }
            }
            updateScreen();
            awaitingInput = false;
            Sleep(50);
        }
        if (GetAsyncKeyState('A') != 0) {
            if (direction != 'w') {
                direction = 'w';
            }
            else {
                if ((inMap == 0) && (gameMap[pY][pX - 1] == ' ')) {
                    ppY = pY;
                    ppX = pX; pX--;
                }
                if ((inMap == 1) && (starterBuilding[pY][pX - 1] == ' ')) {
                    ppY = pY;
                    ppX = pX; pX--;
                }
            }
            updateScreen();
            awaitingInput = false;
        }
        if (GetAsyncKeyState('D') != 0) {
            if (direction != 'e') {
                direction = 'e';
            }
            else {
                if ((inMap == 0) && (gameMap[pY][pX + 1] == ' ')) {
                    ppY = pY;
                    ppX = pX; pX++;
                }
                if ((inMap == 1) && (starterBuilding[pY][pX + 1] == ' ')) {
                    ppY = pY;
                    ppX = pX; pX++;
                }
            }
            updateScreen();
            awaitingInput = false;
        }

        if (GetAsyncKeyState('E') != 0) {
            int inventorypositiontorandomlychangebecausewhynot = std::rand() % 10;
            std::string testnumberforinventorybecausevariablenamesshouldbelong = std::to_string(std::rand() % 100000);

            items[inventorypositiontorandomlychangebecausewhynot] = testnumberforinventorybecausevariablenamesshouldbelong;

            Sleep(100);
        }
        if (GetAsyncKeyState('F') != 0) {
            // interaction


            //Enters rooms but you need to have every doors coords inputted here
            if (inMap == 0) {
                if (((pX == 70) && (pY == 8)) && (direction == 'n')) {
                    inMap = 1;
                    pX = 18;
                    pY = 8;
                    drawMap();
                }
                if (((pX == 49) && (pY == 8)) && (direction == 'n')) {
                    inMap = 1;
                    pX = 20;
                    pY = 9;
                    drawMap();
                }
            }
            if (inMap == 1) {
                if (((pX == 18) && (pY == 8)) && (direction == 's')) {
                    inMap = 0;
                    pX = 67;
                    pY = 8;
                    drawMap();
                }
            }

        }

        if ((GetAsyncKeyState(VK_TAB) != 0) || (GetAsyncKeyState('B') != 0)) {
            inMenu = true;
            //testMenu();
            inventory();
            awaitingInput = false;
        }
        if (GetAsyncKeyState(VK_ESCAPE) != 0) {
            running = false;
            awaitingInput = false;
        }

        awaitingInput = false;
    }
}


/** MENUS **/

void inventory() {
    // changes characters for special characters
    // reset inventory
    for (int y = 2; y < 14; y++)
        for (int x = 0; x < 56; x++)
            inv[y][x] = clearInv[0][x];

    for (int y = 0; y < 13; y++) {
        for (int x = 0; x < 55; x++) {
            switch (inv[y][x]) {
            case '#': inv[y][x] = 178; break;
            case ',': inv[y][x] = 0xAF; break;
            }

        }
    }

    // load character inventory into inventory ui
    for (int charinv = 0; charinv < 11; charinv++) {
        for (int itemNameLength = 0; itemNameLength < items[charinv].length(); itemNameLength++) {
            inv[charinv + 2][itemNameLength + 4] = items[charinv][itemNameLength];
        }
    }

    // draw inventory ui
    for (int y = 0; y < 13; y++) {
        setCursorPosition(15 + y, 32);
        for (int x = 0; x < 55; x++) {
            std::wcout << inv[y][x];
        }
    }


    setCursorPosition(31, 60);
    std::wcout << "InMenu: " << inMenu;

    Sleep(300);
    menu = "inv";
    menuHighlight();

    while (inMenu) {
        if (GetAsyncKeyState('W') != 0) {
            if (menuOptionSelected > 0) {
                menuOptionSelected--;
                menuHighlight();
            }
            Sleep(100);
        }
        if (GetAsyncKeyState('S') != 0) {
            if (menuOptionSelected < 10) {
                menuOptionSelected++;
                menuHighlight();
            }
            Sleep(100);
        }

        if ((GetAsyncKeyState(VK_TAB) != 0) || (GetAsyncKeyState('B')) ||
            (GetAsyncKeyState(VK_ESCAPE) != 0)) {
            clearScreen();
            drawMap();
            inMenu = false;
            Sleep(200);
        }
    }
}
void pauseMenu() {
}
void menuHighlight() {
    if (menu == "inv") {  
        // reset highlight?
        if (invYCoord != 0) {
            setCursorPosition(invYCoord, 34);
            textColor(WHITE, BLACK);
            for (int x = 2; x < 54; x++) {
                std::wcout << inv[invYCoord - 15][x];
            }
        }

        // Get new selection
        invYCoord = 17 + menuOptionSelected;// Clear previous selection

        setCursorPosition(invYCoord, 34);
        textColor(LIGHTGREEN, BLACK);
        
        for (int x = 2; x < 54; x++) {
            std::wcout << inv[invYCoord - 15][x];
        }
        hideCursor();
    }

    hideCursor();
    textColor(WHITE, BLACK);
}


void drawUI(int uiStep) {
    if (uiStep == 1) {
        std::wcout << "\n          ";
        textColor(LIGHTRED, BLACK);
        std::wcout << "Realm of Chaos\n";
        for (int lon = 0; lon < 39; lon++)
            std::wcout << " ";
        textColor(CYAN, BLACK);
        std::wcout << "Developed and maintained by: Logan Cunningham.\n";
        //std::wcout << std::endl;
        textColor(WHITE, BLACK);
    }
    else if (uiStep == 2) {
        setCursorPosition(23, 6);
        textColor(WHITE, BLACK);
        std::wcout << "Press F when facing doors to enter rooms.\n      Press Tab to open/close inventory.";


        setCursorPosition(29, 1);
        textColor(WHITE, BLACK);
        std::wcout << "    Pos: " << pX << "/" << pY;
        std::wcout << "  (" << inMap << ")" << std::endl;
    }
    else if (uiStep == 3) {
        setCursorPosition(29, 79);
        switch (direction) {
            case 'n': std::wcout << "NORTH"; break;
            case 's': std::wcout << "SOUTH"; break;
            case 'e': std::wcout << "EAST "; break;
            case 'w': std::wcout << "WEST "; break;
        }
    }
    else if (uiStep == 4) {
        std::wcout << "Item Description: ";
    }
}
void updateScreen() {

    setCursorPosition(ppY + 4, ppX + 3);
    textColor(WHITE, BLACK);
    if (inMap == 0) std::wcout << gameMap[ppY][ppX];
    if (inMap == 1) std::wcout << starterBuilding[ppY][ppX];

    setCursorPosition(pY + 4, pX + 3);
    textColor(MAGENTA, BLACK);
    std::wcout << PLAYER;

    drawUI(2);
    drawUI(3);
    hideCursor();
}

/*
 * r1 - nothing works
 * r2 - ui is working
 * r3 - fixing drawing on map and input
 * r4 - added graphics for buildings
 * r5 - added rooms and item input
 * r6 - refactoring and maybe going to rewrite soon
 *
 */


/*
#define _WIN32_WINNT 0x0500
#include <windows.h>
#include <fcntl.h>
#include <io.h>

#include "main.h"

#include <iostream>

bool running = false;

void screenInit() {
	try {
		HWND hDesktop = GetDesktopWindow();
		HWND hConsole = GetForegroundWindow();
		COORD coord;
		RECT r, d;

		GetWindowRect(hConsole, &r);
		GetWindowRect(hDesktop, &d);
		GetStdHandle(STD_OUTPUT_HANDLE);

		// Set Window Size
		int width = 920;
		int height = 520;
		SetWindowPos(hConsole, NULL, 0, 0, width, height, SWP_SHOWWINDOW);

		// move window to center of the screen
		int consolePosX = ((d.right - d.left) / 2 - width / 2);
		int consolePosY = ((d.bottom - d.top) / 2 - height / 2);
		SetWindowPos(hConsole, HWND_NOTOPMOST, consolePosX, consolePosY, width, height, SWP_SHOWWINDOW || SWP_NOSENDCHANGING);

		SetConsoleTitle(L"Realm of Chaos");

		// FONT
		CONSOLE_FONT_INFOEX cfie;
		cfie.cbSize = sizeof cfie;
		cfie.nFont = 0;
		cfie.dwFontSize.X = 0;
		cfie.dwFontSize.Y = 16;
		cfie.FontFamily = FF_DONTCARE;
		cfie.FontWeight = FW_NORMAL;

		wcscpy_s(cfie.FaceName, L"Calibri");
		SetCurrentConsoleFontEx(GetStdHandle(STD_OUTPUT_HANDLE), FALSE, &cfie);

		running = true;
		draw(true);
	}
	catch (int e) {}
}

void clearScreen() {
	DWORD n, size;
	COORD coord = { 0 };
	CONSOLE_SCREEN_BUFFER_INFO csbi;

	HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
	GetConsoleScreenBufferInfo(h, &csbi);
	size = csbi.dwSize.X * csbi.dwSize.Y;

	FillConsoleOutputCharacter(h, TEXT(' '), size, coord, &n);
	GetConsoleScreenBufferInfo(h, &csbi);
	FillConsoleOutputAttribute(h, csbi.wAttributes, size, coord, &n);
	SetConsoleCursorPosition(h, coord);
}

void draw(bool doDraw) {
	if (doDraw) {
		clearScreen();

		std::wcout << "\n\n\n";
		for (int y = 0; y < 25; y++) {
			for (int x = 0; x < 86; x++) {
				switch (map[y][x]) {
				case '#': map[y][x] = L'\u2593'; break;
				case '^': map[y][x] = L'\u0466'; break;
				case '7': map[y][x] = L'\u20B3'; break;
				case '6': map[y][x] = L'\u2191'; break;
				case 'C': map[y][x] = L'\u263a'; break;
				}
			}

			std::wcout << "\t " << map[y] << "\n";
		}
	}
}

void textColor(int fg, int bg) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

	int color_attribute;
	color_attribute = bg;
	color_attribute = _rotl(color_attribute, 4) | fg;
	SetConsoleTextAttribute(hConsole, color_attribute);
}

void setCursorPosition(int y, int x) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	COORD point;
	point.X = x - 1;
	point.Y = y - 1;
	SetConsoleCursorPosition(hConsole, point);
}

void hideCursor() {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	CONSOLE_CURSOR_INFO ConCurInf;

	ConCurInf.dwSize = 10;
	ConCurInf.bVisible = FALSE;
}

bool getInput(bool waitingInput) {
	
	//HANDLE handle = GetStdHandle(STD_INPUT_HANDLE);
	//DWORD events;
	//INPUT_RECORD buffer;
	//ReadConsoleInput(handle, &buffer, 1, &events);

	//KEY_EVENT_RECORD ker = buffer.Event.KeyEvent;
	

	while (waitingInput) {
		if ((GetAsyncKeyState('W') != 0) || (GetAsyncKeyState(VK_UP) != 0)) {
			map[playerPOSY][playerPOSX] = L' ';
			map[playerPOSY - 1][playerPOSY] = L'C';
			waitingInput = false;
		}
		if ((GetAsyncKeyState('S') != 0) || (GetAsyncKeyState(VK_DOWN) != 0)) {
			playerPOSY += 1;
			waitingInput = false;
		}
		if ((GetAsyncKeyState('A') != 0) || (GetAsyncKeyState(VK_UP) != 0)) {
			playerPOSX -= 1;
			waitingInput = false;
		}
		if ((GetAsyncKeyState('D') != 0) || (GetAsyncKeyState(VK_UP) != 0)) {
			playerPOSX += 1;
			return true;
		}

		if (GetAsyncKeyState(VK_ESCAPE) != 0) running = false;
		else waitingInput = false;
	}

	return false;
}

int main()
{
	_setmode(_fileno(stdout), _O_U16TEXT);

	screenInit();

	while (running) {
		//getInput(true);
		draw(getInput(true));

	}

	return 0;
}
*/