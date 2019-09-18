namespace player {
    export function create(team: Team) {
        const startAnim = team.animations[1];
        const player = sprites.create(startAnim.frames[0], SpriteKind.Player);
        animation.attachAnimation(player, team.animations[AnimationDirection.Left]);
        animation.attachAnimation(player, team.animations[AnimationDirection.Right]);
        animation.setAction(player, team.isPlayerControlled() ? AnimationDirection.Right : AnimationDirection.Left)
        player.z = 2;

        return player;
    }

    game.onUpdate(() => {
        sprites.allOfKind(SpriteKind.Player).forEach(s => {
            if (s.vx < 0)
                animation.setAction(s, AnimationDirection.Left);
            else if (s.vx > 0)
                animation.setAction(s, AnimationDirection.Right);
        });
    });
}
