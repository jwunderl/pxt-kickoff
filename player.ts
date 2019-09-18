namespace player {
    export function create(team: Team) {
        const startAnim = team.animations[1];
        const player = sprites.create(
            startAnim.frames[0],
            team.isPlayerControlled() ?
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
            team.isPlayerControlled() ?
                AnimationDirection.Right
                :
                AnimationDirection.Left
        );
        player.z = 2;

        return player;
    }

    game.onUpdate(() => {
        sprites
            .allOfKind(SpriteKind.PlayerTeam)
            .forEach(s => updatePlayerAnimation);
        sprites
            .allOfKind(SpriteKind.OpposingTeam)
            .forEach(s => updatePlayerAnimation);
    });

    function updatePlayerAnimation(player: Sprite) {
        if (player.vx < 0)
            animation.setAction(player, AnimationDirection.Left);
        else if (player.vx > 0)
            animation.setAction(player, AnimationDirection.Right);
    }
}
