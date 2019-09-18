namespace SpriteKind {
    export const Ball = SpriteKind.create();
    export const Shadow = SpriteKind.create();
    export const Shield = SpriteKind.create();
    export const PlayerTeam = SpriteKind.create();
    export const OpposingTeam = SpriteKind.create();
}

namespace datakey {
    export const CURRENT_OFFENSE = "current_offense";
}

enum AnimationDirection {
    Left,
    Right
}

namespace zindex {
    export const BACKGROUND = 0;
    export const SHADOW = 1;
    export const PLAYER_TEAM = 5;
    export const OPPOSING_TEAM = 5;
    export const BALL = 10;
    export const PLAYER_INDICATOR = 20;
    export const HUD = 100; // scene.HUD_Z
}