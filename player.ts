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
            team.animations[AnimationDirection.Left]
        );
        animation.attachAnimation(
            player,
            team.animations[AnimationDirection.Right]
        );
        animation.setAction(
            player,
            isPlayerTeam ?
                AnimationDirection.Right
                :
                AnimationDirection.Left
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
            animation.setAction(player, AnimationDirection.Left);
        else if (player.vx > 0)
            animation.setAction(player, AnimationDirection.Right);
    }
}
