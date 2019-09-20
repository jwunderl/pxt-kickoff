const currentGame = new Game(
    teams.create("Browns", "CLE", 0x4, 0xE, true),
    teams.create("Seahawks", "SEA", 0x8, 0x7, false),
    20
);

controller.A.onEvent(ControllerButtonEvent.Pressed, () => ball.toss());