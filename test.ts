// todo: move these to be contained in a 'game manager' class, along with scoring / etc;
// have everything else delegate for these constants through that.
const lineOfScrimmage = 60;
let offense = teams.create("Browns", "CLE", 0x4, 0xE, true);
let defense = teams.create("Seahawks", "SEA", 0x8, 0x7, false);
const gameClock = clocks.create(20);

ui.player.createIndicator();
field.create();
ui.scoreboard.create(offense, defense);
player.initializeEvents();
ball.initializeEvents();
controller.A.onEvent(ControllerButtonEvent.Pressed, () => ball.toss());