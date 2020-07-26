// weapons objects

const laser = {
    name: 'laser cannon',
    multiplyForce: 1,
    badDamageChance: 0.05
}

const atomic_ray = {
    name: 'atomic ray',
    multiplyForce: 2,
    badDamageChance: 0.2
}
const death_ray = {
    name: 'death ray',
    multiplyForce: 0.5,
    badDamageChance: 0.7
}


// levels objects

const gameLevels = [
    
    // enemy power[
        // number of ships
        // hull range
        // firepower range
        // accuracy range
    //  ]
    {
        level: 'level 1',
        enemy_power: [6, [3,6],[2,4],[.6,.8]], 
        player_power: [1, [20,20],[5,5],[.7,.7]],
        weapons:[laser]
    },{
        level: 'level 2',
        enemy_power: [8, [5,7],[3,5],[.6,.8]], // ranges for enemy spaceships at level 2
        player_power: [1, [22,22],[7,7],[.7,.7]],
        weapons:[laser, atomic_ray]
    },{
        level: 'level 3',
        enemy_power: [10, [6,8],[5,5],[.6,.8]], // ranges for enemy spaceships at level 3
        player_power: [1, [23,23],[8,8],[.8,.8]],
        weapons:[laser, atomic_ray, death_ray]
    }
]


const game = {
    playerTurn: true,
    points: 0,
    turn: 0,
    levels: gameLevels,
    max_levels: undefined,
    current_level: undefined,
    level_idx: 0
}

export { game }
