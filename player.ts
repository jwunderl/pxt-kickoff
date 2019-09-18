namespace player {
    export function create(team: Team) {
        const startAnim = team.animations[1];
        const player = sprites.create(startAnim.frames[0], SpriteKind.Player);
        animation.attachAnimation(player, team.animations[AnimationDirection.Left]);
        animation.attachAnimation(player, team.animations[AnimationDirection.Right]);
        animation.setAction(player, AnimationDirection.Left)
        player.z = 2;

        // animation.runImageAnimation(player, startAnim, 200, true);
        return player;
    }
} 
