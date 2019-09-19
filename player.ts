namespace player {
    export function create(team: Team) {
        const isPlayerTeam = team.isPlayerControlled();
        const startAnim = team.animations[1];
        const player = sprites.create(
            startAnim.frames[0],
            isPlayerTeam ?
                SpriteKind.PlayerTeam
                :
                SpriteKind.OpposingTeam
        );
        animation.attachAnimation(
            player,
            team.animations[PlayerAnimation.Left]
        );
        animation.attachAnimation(
            player,
            team.animations[PlayerAnimation.Right]
        );
        animation.setAction(
            player,
            isPlayerTeam ?
                PlayerAnimation.Right
                :
                PlayerAnimation.Left
        );
        player.z = isPlayerTeam ? zindex.PLAYER_TEAM : zindex.OPPOSING_TEAM;

        return player;
    }

    game.onUpdate(() => {
        sprites
            .allOfKind(SpriteKind.PlayerTeam)
            .forEach(updatePlayerAnimation);
        sprites
            .allOfKind(SpriteKind.OpposingTeam)
            .forEach(updatePlayerAnimation);
    });

    function updatePlayerAnimation(player: Sprite) {
        if (player.vx < 0)
            animation.setAction(player, PlayerAnimation.Left);
        else if (player.vx > 0)
            animation.setAction(player, PlayerAnimation.Right);
    }

    export function initializeEvents() {
        sprites.onOverlap(
            SpriteKind.PlayerTeam,
            SpriteKind.OpposingTeam,
            (sprite, otherSprite) => {
                // needs some logic for going other way; maybe instead we switch sprite kinds to
                // ``SpriteKind.Offense`` and ``SpriteKind.Defense`` and change players kind depending
                // on their current status instead
                if (sprite.x < otherSprite.x) {
                    // push player back
                    sprite.x -= 3;
                    otherSprite.x += 2;
                }
            }
        );
    }
}
