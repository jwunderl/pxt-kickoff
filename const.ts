namespace SpriteKind {
    export const Ball = SpriteKind.create();
    export const Shadow = SpriteKind.create();
    export const ThrowTarget = SpriteKind.create();
    export const Logo = SpriteKind.create();
    export const PlayerTeam = SpriteKind.create();
    export const OpposingTeam = SpriteKind.create();
}

namespace datakey {
    export const CURRENT_OFFENSE = "current_offense";
    export const CURRENT_DEFENSE = "current_defense";
}

// must maintain relative positions of left / leftWithBall and right/rightWithBall,
// such that the one without the ball is one less than the one with the ball.
enum PlayerAnimation {
    Left = 0,
    LeftWithBall = 1,
    Right = 2,
    RightWithBall = 3,
    Celebrate = 4
}

namespace zindex {
    export const BACKGROUND = 0;
    export const SHADOW = 1;
    export const THROW_TARGET = 2;
    export const OPPOSING_TEAM = 5;
    export const PLAYER_TEAM = 6;
    export const BALL = 10;
    export const PLAYER_INDICATOR = 20;
    export const HUD = 100; // scene.HUD_Z
}