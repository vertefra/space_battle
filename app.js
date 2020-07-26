import { SpaceShipFactory } from './scripts/classes.js'
import { game } from './scripts/objects.js'
import {
    renderWeaponsPanel,
    renderNextTurnBtn,
    renderRetreatBtn,
    renderEnemyFleet, 
    renderStatePanel, 
    renderShipDraw,
    flashText,
} from './scripts/domInt.js'

import { 
    evaluateIsPlayerDead,
    initGameLevel,  
    enemyShipClick,
    evaluateNewLevel,
    generateShips,
    attackShip,
    endGame
} from './scripts/functions.js'

// targeting DOM elements to use the DOM functions in domInt.js ***********************************

const enemyShipsPanel = document.getElementById('enemy-ships-panel')
const playerShipDraw = document.getElementById('player-ship-draw')
const weaponsPanel = document.getElementById('weapons')
const comPanel = document.getElementById('com-panel')
const statePanel = document.getElementById('state')
const turnBtn = document.getElementById('turn-btn')
const retreat = document.getElementById('retreat')

// ************************************************************************************************

const shipName = 'Nimbus'                                         

const playerShipFactory = new SpaceShipFactory(shipName,'player')        // Instanciating Factories
const alienShipFactory = new SpaceShipFactory('alien ship','alien')

// HIGH LEVEL FUNCTIONS dont return anything and use DOM manipulation

const initWeaponCards = (playerShipObj, gameObj) => {
    const weaponCards = document.querySelectorAll(".weapon-card")
    for (let card of weaponCards){
        card.addEventListener("click", (e)=>{
            console.log(playerShipObj, e.target.id)
            // flashText(comPanel, res.message)
            const weaponIdx = playerShipObj.weapons.findIndex(weapon => {
                return weapon.name.replace(' ','-') === e.target.id
            })
            playerShipObj.selectedWeapon = (
                playerShipObj.weapons[weaponIdx])
            flashText(comPanel,`${playerShipObj.selectedWeapon.name} selected`)
        })
    }
}

const initEnemyShips = (gameObj, playerShipObj, arrOfShips, DOMelement) => {
    renderEnemyFleet(arrOfShips, DOMelement, gameObj)
    renderStatePanel(gameObj, playerShipObj, statePanel)
    const targetShipsCards = document.querySelectorAll(".ship-card")
    targetShipsCards.forEach(targetShip => {
        targetShip.addEventListener("click", (e)=>{
            if(gameObj.playerTurn && playerShipObj.selectedWeapon!==undefined){
                const response = enemyShipClick(playerShipObj, arrOfShips, e.target.id)
                flashText(comPanel, response.message)
                const isNewLevel = evaluateNewLevel(arrOfShips, gameObj)
                if (isNewLevel.success && isNewLevel.victory){
                    renderEnemyFleet(arrOfShips, DOMelement, gameObj)
                    flashText(comPanel, "You won the Game!")
                } else if(isNewLevel.success){
                    setTimeout(()=>{
                        gameObj.turn++
                        gameObj.playerTurn=true
                        newTurn(gameObj.turn)
                    }, 4000)
                    renderEnemyFleet(arrOfShips, DOMelement, gameObj)
                    flashText(comPanel, `You completed ${gameObj.current_level.level}!`)
                } else {
                    gameObj.playerTurn = false
                    initEnemyShips(gameObj, playerShipObj, arrOfShips, DOMelement)
                }
            } else {
                !gameObj.playerTurn  
                    ? flashText(comPanel,"It's not your turn captain!")
                    : flashText(comPanel,"Select a weapon before attack!")
                }
        })
    })
}

const initEnemyTurn = (gameObj, arrOfShips, playerShipObj) => {
    renderStatePanel(gameObj, playerShipObj, statePanel)
    const button = renderNextTurnBtn(turnBtn, `Play alien's turn`)
    button.addEventListener('click', (e)=>{
        console.log('click')
        if(!gameObj.playerTurn){
            gameObj.playerTurn = true
            const alienShip = arrOfShips[0]
            const resp = attackShip(alienShip, playerShipObj)
            const isDead = evaluateIsPlayerDead(playerShipObj)
            if (isDead.success){
                setTimeout(()=>{
                    endGame(comPanel, newTurn)
                })
                flashText(comPanel, resp + ' ' + isDead.message)
            } else {
                const respStripped = resp.replace('the target', '')
                flashText(comPanel,`${respStripped}`)
                initEnemyTurn(gameObj, arrOfShips, playerShipObj)
            }
        } else if(gameObj.playerTurn===true){
            flashText(comPanel,'This is Your turn!')
        } 
    })
}

const newTurn = (level) => {
    
    console.log(playerShipFactory)
    const thisGame = initGameLevel(game, level)

    // cleaning factory shipyard

    playerShipFactory.shipyard = []
    alienShipFactory.shipyard = []

    // generating new ships based on the level

    const playerShip = generateShips(playerShipFactory, thisGame, 'player_power')[0]
    const alienShipsArr = generateShips(alienShipFactory, thisGame, 'enemy_power')

    renderWeaponsPanel(playerShip, weaponsPanel)
    renderShipDraw(playerShip, thisGame, playerShipDraw)
    renderRetreatBtn(retreat)
    retreat.addEventListener("click", ()=>{
        const decision = confirm('Sure you wanna retreat?')
        if(decision){
            window.close()
        } 
    })
    
    flashText(comPanel, `You must defend Earth from an incoming fleet of ${alienShipsArr.length} aliens ships!`)
    console.log('weapons in main game ', playerShip.weapons)
    initWeaponCards(playerShip, thisGame)
    initEnemyShips(thisGame, playerShip, alienShipsArr, enemyShipsPanel)
    initEnemyTurn(thisGame, alienShipsArr, playerShip)
    console.log(game, playerShip)

}

// starting Game!

newTurn(0)

    


    
    


























































































































































































































































    

    
