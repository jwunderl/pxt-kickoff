namespace player {
    export function create(team: Team) {
        const startAnim = team.animations[0];
        const player = sprites.create(startAnim[0], SpriteKind.Player);
        player.z = 2;

        animation.runImageAnimation(player, startAnim, 200, true);
        return player;
    }
} 























