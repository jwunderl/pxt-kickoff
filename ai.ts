namespace ai {
    export function setTeamDefense(defense: Team, offense: Team, on: boolean) {
        defense.players.forEach((player, ind) => {
            if (player !== defense.activePlayer) {
                player.follow(offense.players[ind], on ? 100 : 0, 1.5);
            }
        });
    }

    export function setTeamOffense(defense: Team, offense: Team, on: boolean) {
        const currSceneData = game.currentScene().data;
        let offenseList: Sprite[] = currSceneData[datakey.CURRENT_OFFENSE];
        if (!offenseList) {
            currSceneData[datakey.CURRENT_OFFENSE] = offenseList = [];
            game.onUpdate(() => {
                offenseList.forEach((value, index) => {
                    // do soomething to make offense move over
                    
                });
            });
        }
        
        offense.players.forEach((player, index) => {
        });
    }
}