export class SpaceShip{
    constructor(name, img_path, id, hull, firepower, accuracy){
        this.name = name
        this.img_path = img_path
        this.id = id
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        this.weapons = []
        this.selectedWeapon = undefined
    }

    attack(targetObj){
        if(this.selectedWeapon!==undefined){                            // Check if a weapon has been selected                
            if(Math.random()<this.accuracy){                // Check if the target will be hit
                if(Math.random()                            // Check if will be a 'Bad Damage' (damage increased by50%)
                    <this.selectedWeapon.badDamageChance){  
                    let damages = (this.firepower * this.selectedWeapon.multiplyForce)
                    console.log('mul forc:',this.selectedWeapon.multiplyForce)
                    console.log('selected weapon', this.selectedWeapon)
                    damages += damages*0.5
                    targetObj.hull -= damages
                    return {
                        success: true,
                        badDamage: true,
                        effects: damages
                    }
                } else {
                    const damages = this.firepower * this.selectedWeapon.multiplyForce
                    console.log('mul forc:',this.selectedWeapon.multiplyForce)
                    console.log('selected weapon', this.selectedWeapon)
                    targetObj.hull -= damages
                    return {                                // return an object with the result of the attack
                        success: true,
                        badDamage: false,
                        effects: damages
                    }
                }

            } else {                                        // returning error object if target has been missed
                return { 
                    success: false,
                    error: 'missed the target!'        
                }
            }
        } else {                                            // returning error object if no weapon is selected
            return {
                success: false,
                error: 'You need to select a weapon first!'
            }
        }
    }
    selectWeapon(weaponIndex){
        this.selectedWeapon = this.weapons[weaponIndex]
        if(!this.selectedWeapon){
            return {
                success: false
            }
        } else {
            return {
                success: true,
                selectedWeapon: this.selectedWeapon
            }
        }
    }
}

export class SpaceShipFactory{
    
    // img_team is used to create the path for the img based on the level of the ship
    // use "player" if the factory is supposed to produce player ships, "alien" if it's
    // supposed to produce enemy's ship

    constructor(team, img_team){
        this.shipyard = []
        this.team = team
        this.img_path = `assets/${img_team}`
        // this are couple of number in an array [3,6] first number min, second max
    }
    generateSpaceShip(numberOfSpaceships, hullRange, firepowerRange, accuracyRange){
        for(let i=1; i<=numberOfSpaceships; i++){
            const hull = Math.floor(
                Math.random()*(
                    hullRange[1]-hullRange[0]+1)+hullRange[0])
            const firepower = Math.floor(
                Math.random()*(
                    firepowerRange[1]-firepowerRange[0]+1)+firepowerRange[0])
            const accuracy = Math.floor(
                (Math.random()*(
                    accuracyRange[1]-accuracyRange[0]+0.1)+accuracyRange[0])*10)/10
            const newSpaceShip = new SpaceShip(
                this.team,
                this.img_path, 
                this.shipyard.length,
                hull,
                firepower,
                accuracy
            )
            this.shipyard.push(newSpaceShip)
        }
        return this.shipyard
    }

    returnShip(index=0){ // default will return the first object in the array
        return this.shipyard.splice(index,1)[0]
    }
    
}





// const enemyFactory = new SpaceShipFactory('enemy', [3, 6],[2,4],[.6,.8])
// enemyFactory.generateSpaceShip(10)
// // console.log(enemyFactory.shipyard)
// const ship = enemyFactory.returnShip()
// console.log(ship)
// console.log(enemyFactory.shipyard.length)
