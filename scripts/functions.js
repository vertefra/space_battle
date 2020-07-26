import { flashText } from "./domInt.js"

const selectWeapon = (shipObj, weaponId) => {
    console.log('select weapon: ', shipObj)
    shipObj.selectedWeapon = shipObj.weapons.filter(weapon=>{
        return weapon.name = weaponId
    })[0]
    console.log('selectWeapon: ', shipObj.selectedWeapon)
    return shipObj.selectedWeapon
}

const weaponCardClick = (shipObj, gameObj, event) => {
    if(gameObj.playerTurn){
        console.log('weaponcardclick: ', shipObj.weapons)
        const weapon = selectWeapon(shipObj, event.target.id)
        console.log('weapon', weapon)
        return {
            success: true,
            message: `you selected ${weapon.name}`
        }
    } else {
        return {
            success: false,
            message: 'this is not your turn captain!'
        }
    }
}

const selectShip = (arrOfShips, id) => {
    for(let ship of arrOfShips){
        if(ship.id === parseInt(id)){
            return ship
        }
    } 
}

const attackShip = (attackingShip, targetShip) => {
    const res = attackingShip.attack(targetShip)
    if(res.success){
        if(res.badDamage){
            return `That was a bad damage. ${res.effects} points!`
        } else {
            return `Hit! ${res.effects} points of damage!`
        }
    } else {
        return res.error
    }
}

const evaluateFatalHit = (targetShip, arrOfShips) => {
    if(targetShip.hull <= 0){
        const indexToSplice = arrOfShips.findIndex(ship=>{
            return ship.id === targetShip.id
        })
        arrOfShips.splice(indexToSplice, 1)
        return {
            success: true,
            message: `Ship has been destroyed!`
        }
    } else {
        return {
            success: false
        }
    }
}

const enemyShipClick = (shipObj, arrOfShips, shipId) => {
    if (shipObj.selectedWeapon !== undefined){
        const targetObj = selectShip(arrOfShips, shipId)
        const res = attackShip(shipObj, targetObj)
        const fatalHit = evaluateFatalHit(targetObj, arrOfShips)
        if(fatalHit.success){
            const shipId = targetObj.id
            return {
                success: true,
                message: res + fatalHit.message
            } 
        } else {
            return {
                success: true,
                message: res
            }
        }
        
    } else {
        return {
            success: false, 
            message: `select a weapon!`
        }
    }
}

const evaluateNewLevel = (arrOfShips, gameObj) => {
    if(arrOfShips.length <= 0){
        if(gameObj.level_idx === gameObj.levels.length-1){
            return {
                success: true,
                victory: true,
                message: 'You completed the last level! you Won!'
            } 
        } else {
            return {
                success: true,
                victory: false,
                message: `You completed the ${gameObj.current_level.level}` 
            }
        }
    } else {
        return {
            success: false
        }
    }
}

// ranges are the player_power and enemy_power arrays in the level object
// that is assigned to the game object

const generateShips = (shipFactory, gameObj, ranges_type) =>{
    // ranges_type could be 'player_power' or 'enemy_power'
    const ranges = gameObj.current_level[ranges_type]
    const shipArr = shipFactory.generateSpaceShip(
        ranges[0], ranges[1], ranges[2], ranges[3])
    if (ranges_type==="enemy_power"){
        // giving a default laser weapon to all the alien ships
        for(let ship of shipArr){
            ship.selectedWeapon = gameObj.current_level.weapons[0]
        }
    } else if(ranges_type==="player_power"){
        for(let ship of shipArr){
            ship.weapons = gameObj.current_level.weapons
        }
    }
    
    return shipArr
}

const evaluateIsPlayerDead = (playerShipObj) => {
    if(playerShipObj.hull <= 0){
        return {
            success: true,
            message: `you have been killed!`
        }
    } else {
        return {
            success: false
        }
    }
}

// level is a zero based index, so 0 for level 1, 1 for level 2 etc etc

const initGameLevel = (gameObj, level) =>{
    const max_levels = gameObj.levels.length
    const current_level = gameObj.levels[level]
    gameObj.max_levels = max_levels
    gameObj.current_level = current_level
    return gameObj
}

const endGame = (DOMelement, callBack) => {
    const decision = confirm('Do You want to start a new game?')
    if (decision){
        setTimeout(()=>{
            callBack(0)
        })
        flashText(DOMelement,'Starting a new game!')
    } else {
        window.close()
    }
}

export {
    evaluateIsPlayerDead, 
    initGameLevel, 
    selectWeapon, 
    weaponCardClick, 
    selectShip,
    attackShip,
    evaluateFatalHit,
    enemyShipClick,
    evaluateNewLevel,
    generateShips,
    endGame
}