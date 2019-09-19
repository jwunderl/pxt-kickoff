const lineOfScrimmage = 60;
const playerTeam = teams.create("Browns", "CLE", 0x4, 0xE, true);
const opposingTeam = teams.create("Seahawks", "SEA", 0x8, 0x7, false);
const gameClock = clocks.create(20);

ui.player.createIndicator();
field.create();
ui.scoreboard.create(playerTeam, opposingTeam);
text.util.showInstruction("CATCH!", 1000);
player.initializePlayerCollisions();
controller.A.onEvent(ControllerButtonEvent.Pressed, () => ball.toss());

(() => {
    let on = true;
    controller.B.onEvent(
        ControllerButtonEvent.Pressed,
        () => ai.setTeamDefense(opposingTeam, playerTeam, on = !on)
    );
})();