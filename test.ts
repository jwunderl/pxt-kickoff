let currentGame: Game;
currentGame = new Game(
    teams.create(league.clevelandBrowns, true),
    teams.create(league.seattleSeahawks, false),
    20
);
// currentGame = new Game(
//     teams.create(league.kansasCityChiefs, true),
//     teams.create(league.pittsburghSteelers, false),
//     20
// );
// currentGame = new Game(
//     teams.create(league.newEnglandPatriots, true),
//     teams.create(league.washingtonRedskins, false),
//     20
// );

// controller.A.onEvent(ControllerButtonEvent.Pressed, () => ball.toss());

ball.toss();