namespace SpriteKind {
    export const Ball = SpriteKind.create();
    export const Shadow = SpriteKind.create();
    export const Shield = SpriteKind.create();
    export const PlayerTeam = SpriteKind.create();
    export const OpposingTeam = SpriteKind.create();
}

namespace DataKeys {
    export const PlayerHasBall = "__PLAYER_HAS_BALL";
}

enum AnimationDirection {
    Left,
    Right
}