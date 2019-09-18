namespace ai {
    export function setOpponentTeamFollowing(on?: boolean) {
        if (on) {
            // make opponent follow matching member of other team
            opposingTeam.players.forEach((player, ind) => {
                player.follow(playerTeam.players[ind], 100, 1.5);
            });
        } else {
            opposingTeam.players.forEach((player, ind) => {
                player.follow(playerTeam.players[ind], 0);
            });
        }
    }
}