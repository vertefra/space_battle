
const renderStatePanel = (gameObj, shipObj, DOMelement) => {
    DOMelement.innerHTML=`
        <h1>${gameObj.playerTurn ? "PLAYERS' TURN" : "ALIENS' TURN"}</h1>
        <h3>Ship's HULL: <span>${shipObj.hull}</span></h3>
        <h3>Ship fire power: <span>${shipObj.firepower}</span></h3>
        <h3>Ship Level: <span>${gameObj.current_level.level}</span></h3>
    `
}

const renderWeaponsPanel = (playerShipObj, DOMelement) => {
    DOMelement.innerHTML=''
    playerShipObj.weapons.forEach(weapon => {
        const weaponCard = document.createElement('div')
        weaponCard.classList.add('weapon-card')
        weaponCard.setAttribute('id',weapon.name.replace(' ','-'))
        const imgPath = `./assets/${weapon.name.split(' ').join('')}.svg`
        weaponCard.innerHTML=`
            <h3>${weapon.name}</h3>
            <img src="${imgPath}" class="weap-img"</img>
            <h4>firepower multiplier: X${weapon.multiplyForce}</h4>
            <h4>Bad damage chance: ${weapon.badDamageChance*100}%</h4>
        `
        DOMelement.appendChild(weaponCard)
    })
}

const renderShipDraw = (shipObj, gameObj, DOMelement, ) => {
    
    let imgPath = ''
    // check if the ship is alien or human
    // if is alien assign the imgPat just adding .svg
    // Alien ships img doesn't upgrade with the level
    // if it's human check the level and add it to the string
    // to retrieve the path for the correponding image for that 
    // leve

    if(shipObj.img_path==='assets/alien'){
        imgPath += shipObj.img_path + '.svg'
    } else if(shipObj.img_path==='assets/player') {
        const level = gameObj.current_level.level.split(' ').join('')
        console.log(level)
        imgPath += shipObj.img_path + level + '.svg'
    }

    DOMelement.innerHTML=`
        <img src=${imgPath}>
    `
}

const renderEnemyFleet = (arrayOfEnemyShips, DOMelement, gameObj) => {
    DOMelement.innerHTML=''
    for(let ship of arrayOfEnemyShips){
        const shipCard = document.createElement('div')
        const shipPic = document.createElement('div')
        const hullPoints = document.createElement('h3')
        shipCard.setAttribute('class','ship-card')
        shipCard.setAttribute('id', ship.id)            // setting an unique id for each card
        shipPic.setAttribute('class','enemy-ship-img')
        shipCard.innerHTML=`
        <h3>${ship.name + ' ' + ship.id}</h3>
        `
        shipCard.appendChild(shipPic)

        // function abowe to evaluate the ship object
        // and render the pic on a DOM element ( in this 
        // case the newly created shipPic 
        
        renderShipDraw(ship, gameObj, shipPic)
        hullPoints.innerText=`Hull points: ${ship.hull}`
        shipCard.appendChild(hullPoints)
        DOMelement.appendChild(shipCard)
    }
}


const flashText = (DOMelement, message) => {
        DOMelement.innerHTML=`
        <div>
            <h3>${message}</h3>
        </div>
        `
}

const renderNextTurnBtn = (DOMelement, message) => {
    DOMelement.innerHTML=''
    const nxtTurnBtn = document.createElement('button')
    nxtTurnBtn.setAttribute('id','next')
    nxtTurnBtn.textContent = message
    DOMelement.appendChild(nxtTurnBtn)
    return nxtTurnBtn
}

const renderRetreatBtn = (DOMelement) => {
    DOMelement.innerHTML=`
    <button id="retreat">Retreat!!</button>
    `
}


export {
    renderWeaponsPanel,
    renderNextTurnBtn,
    renderRetreatBtn,
    renderEnemyFleet,
    renderStatePanel,  
    renderShipDraw,
    flashText
}
