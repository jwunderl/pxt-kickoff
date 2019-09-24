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
        team.animations
            .forEach(a => animation.attachAnimation(player, a));

        player.z = isPlayerTeam ? zindex.PLAYER_TEAM : zindex.OPPOSING_TEAM;

        return player;
    }

    game.onUpdate(() => {
        currentGame
            .offense
            .players
            .forEach(updatePlayerAnimation);
        currentGame
            .defense
            .players
            .forEach(updatePlayerAnimation);
    });

    function updatePlayerAnimation(player: Sprite) {
        const offset = player === currentGame.playerWhoHasBall ? 1 : 0;
        if (player.vx < 0)
            animation.setAction(player, PlayerAnimation.Left + offset);
        else if (player.vx > 0)
            animation.setAction(player, PlayerAnimation.Right + offset);
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
