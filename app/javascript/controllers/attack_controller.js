import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Object,
  }

  static targets = [
    "name",
    "results",
    "fullHit",
    "sideHit",
    "hideHit",
    "longHit",
    "sneakDice",
    "sneakDie",
    "AC",
    "bab",
    "abil",
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha",
    "specAbil",
  ]
  connect() {
    console.log(this.dataValue)
    this.specAbil = []
    this.maxDex = 100
    this.nameTarget.textContent = this.dataValue.name

    this.bab = this.dataValue.bab

    this.strength = this.dataValue.strength
    this.dexterity = this.dataValue.dexterity
    this.constitution = this.dataValue.constitution
    this.intelligence = this.dataValue.intelligence
    this.wisdom = this.dataValue.wisdom
    this.charisma = this.dataValue.charisma

    this.sneakDice = 3
    this.sneakDie = "d6"

    this.calculateAbilityMods()

    this.mainWeaponFinesse = false
    this.sideWeaponFinesse = false
    this.hideWeaponFinesse = true
    this.longWeaponFinesse = true

    // AC calculation
    this.armorBonus = this.shieldBonus = 0
    this.sizeBonus = 0
    this.naturalBonus = 0
    this.deflectBonus = 0
    this.miscBonus = 0
    this.armorCheckPenalty = 0

    this.mainWeaponEnhancement = 0
    this.mainWeaponDamageDie = "1d4 bludgeoning"
    this.sideWeaponEnhancement = 0
    this.sideWeaponDamageDie = ""
    this.hideWeaponEnhancement = 0
    this.hideWeaponDamageDie = ""
    this.longWeaponEnhancement = 0
    this.longWeaponDamageDie = ""
    this.tabulate()
  }

  displayAbilityScores() {
    let strText = `${this.strength} (${this.strMod})`
    this.strTargets.forEach((target) => {
      target.textContent = strText
    })
    let dexText = `${this.dexterity} (${this.dexMod})`
    this.dexTargets.forEach((target) => {
      target.textContent = dexText
    })
    let conText = `${this.constitution} (${this.conMod})`
    this.conTargets.forEach((target) => {
      target.textContent = conText
    })
    let intText = `${this.intelligence} {${this.intMod}}`
    this.intTargets.forEach((target) => {
      target.textContent = intText
    })
    let wisText = `${this.wisdom} {${this.wisMod}}`
    this.wisTargets.forEach((target) => {
      target.textContent = wisText
    })
    let chaText = `${this.charisma} {${this.chaMod}}`
    this.chaTargets.forEach((target) => {
      target.textContent = chaText
    })

    let abilText = `Str ${this.strength}, Dex ${this.dexterity}, Con ${this.constitution}, Int ${this.intelligence}, Wis ${this.wisdom}, Cha ${this.charisma}`
    this.abilTargets.forEach((target) => {
      target.textContent = abilText
    })
  }

  calculateAbilityMods() {
    this.strMod = Math.floor((this.strength - 10) / 2)
    this.dexMod = Math.floor((this.dexterity - 10) / 2)
    this.conMod = Math.floor((this.constitution - 10) / 2)
    this.intMod = Math.floor((this.intelligence - 10) / 2)
    this.wisMod = Math.floor((this.wisdom - 10) / 2)
    this.chaMod = Math.floor((this.charisma - 10) / 2)
  }

  update(e) {
    //console.log("updating")

    let values = JSON.parse(e.srcElement.value)

    //console.log(e.srcElement.id)
    if (this[e.srcElement.id]) {
      console.log("slot was filled")
      let oldValues = this[e.srcElement.id]

      oldValues.forEach((value) => {
        if (value.value == "specAbil") {
          // @TODO identical special abilities are removed together
          this[value.value] = this[value.value].filter((e) => e !== value.power)
        } else if (value.value == "mainWeaponDamageDie") {
          this[value.value] = "1d4 bludgeon"
        } else if (value.value == "maxDex") {
          this[value.value] = value.power
        } else {
          this[value.value] -= value.power
        }
      })
    } else {
      console.log("slot was empty")
    }

    this[e.srcElement.id] = values
    values.forEach((value) => {
      //this[e.srcElement.id] = value
      if (value.value == "specAbil") {
        this[value.value].push(value.power)
      } else if (value.value == "mainWeaponDamageDie") {
        this[value.value] = value.power
      } else if (value.value == "sideWeaponDamageDie") {
        this[value.value] = value.power
      } else if (value.value == "hideWeaponDamageDie") {
        this[value.value] = value.power
      } else if (value.value == "longWeaponDamageDie") {
        this[value.value] = value.power
      } else if (value.value == "maxDex") {
        this[value.value] = value.power
      } else {
        //console.log(value)
        //console.log(this[value.value])
        //console.log(this[value.value] + value.power)
        this[value.value] += value.power
        console.log(this[value.value])
      }
    })

    this.tabulate()
  }

  tabulate() {
    this.calculateAbilityMods()
    console.log(`Dexterity is ${this.dexterity}, Srength is ${this.strength}`)
    this.displayAbilityScores()

    //this.updateWeapons()
    this.updateAttacks()

    if (this.dexMod < this.maxDex) {
      console.log(`dexterity bonus is lower than maxDex`)
    } else {
      console.log(`dexterity bonus is higher than maxDex`)
    }

    this.armorClass =
      10 +
      (this.dexMod < this.maxDex ? this.dexMod : this.maxDex) +
      this.armorBonus +
      this.shieldBonus +
      this.sizeBonus +
      this.naturalBonus +
      this.miscBonus +
      this.deflectBonus

    let armorText = ` + ${this.armorBonus} armor`
    let shieldText = ` + ${this.shieldBonus} shield`
    let sizeText = ` + ${this.sizeBonus} size`
    let naturalText = ` + ${this.naturalBonus} natural`
    let miscText = ` + ${this.miscBonus} misc`
    let deflectText = ` + ${this.deflectBonus} deflect`
    let acPenaltyText = ` ${this.armorCheckPenalty} Armor Check Penalty`
    let acText = `${this.armorClass} 
    ( ${this.sizeBonus == 0 ? "" : sizeText}  
      ${this.armorBonus == 0 ? "" : armorText} 
      ${this.shieldBonus == 0 ? "" : shieldText}

      +${this.dexMod < this.maxDex ? this.dexMod : this.maxDex} Dex 
      ${this.naturalBonus == 0 ? "" : naturalText}
      ${this.miscBonus == 0 ? "" : miscText}
      ${this.deflectBonus == 0 ? "" : deflectText})
      
      ${this.armorCheckPenalty == 0 ? "" : acPenaltyText}`
    this.ACTargets.forEach((target) => {
      target.textContent = acText
    })
  }

  updateAttacks(){
    let babText
    if (this.bab < 6){
      babText = `+ ${this.bab}`
    } else if (this.bab > 5 && this.bab < 10) {
      babText = `+${this.bab} / +${this.bab - 5}`
    } else if (this.bab > 10 && this.bab < 15) {
      babText = `+ ${this.bab} / +${this.bab - 5} / +${this.bab - 10}`
    } else if (this.bab > 14) {
      babText = `+ ${this.bab} / +${this.bab - 5} / +${this.bab - 10} / +${this.bab - 15}`
    }

    this.babTargets.forEach((target) => {
      target.textContent = babText
    })
    this.specAbilTargets.forEach((target) => {
      target.textContent = this.specAbil
    })

    let fullHitText = ``
    this.fullHitTargets.forEach((target) => {
      target.textContent = fullHitText
    })
  }
  
  /* updateWeapons() {
    //@todo finesse option check
    let mainHitText
    if (this.mainWeaponFinesse == true) {
      console.log("weapon has finesse")
      mainHitText = `  
      +${this.dexMod + this.bab + this.mainWeaponEnhancement} melee
     (${this.mainWeaponDamageDie} + ${this.strMod + this.mainWeaponEnhancement})
     `
    } else {
      mainHitText = `
      +${this.strMod + this.bab + this.mainWeaponEnhancement} melee
     (${this.mainWeaponDamageDie} + ${this.strMod + this.mainWeaponEnhancement})
     `
    }
    this.mainHitTargets.forEach((target) => {
      target.textContent = mainHitText
    })

    let sideHitText
    if (this.sideWeaponFinesse == true) {
      sideHitText = `
    +${this.dexMod + this.bab + this.sideWeaponEnhancement} melee
   (${this.sideWeaponDamageDie} + ${this.strMod + this.sideWeaponEnhancement})
   `
    } else {
      sideHitText = `
    +${this.strMod + this.bab + this.sideWeaponEnhancement} melee
   (${this.sideWeaponDamageDie} + ${this.strMod + this.sideWeaponEnhancement})
   `
    }
    this.sideHitTargets.forEach((target) => {
      target.textContent = sideHitText
    })

    let hideHitText
    if (this.hideWeaponFinesse == true) {
      hideHitText = `
    +${this.dexMod + this.bab + this.hideWeaponEnhancement} melee
   (${this.hideWeaponDamageDie} + ${this.strMod + this.hideWeaponEnhancement})
   `
    }else{
      hideHitText = `
    +${this.strMod + this.bab + this.hideWeaponEnhancement} melee
   (${this.hideWeaponDamageDie} + ${this.strMod + this.hideWeaponEnhancement})
   `
    }
    

    this.hideHitTargets.forEach((target) => {
      target.textContent = hideHitText
    })

    let longHitText
    if (this.longWeaponFinesse == true) {
      longHitText = `
    +${this.dexMod + this.bab + this.longWeaponEnhancement} ranged
   (${this.longWeaponDamageDie} + ${this.longWeaponEnhancement})
   `
    }else{
      longHitText = `
      +${this.strMod + this.bab + this.longWeaponEnhancement} ranged
     (${this.longWeaponDamageDie} + ${this.longWeaponEnhancement})
     `
    }
    

    this.longHitTargets.forEach((target) => {
      target.textContent = longHitText
    })

    let sneakText = `+ ${this.sneakDice}${this.sneakDie}`
    this.sneakDiceTargets.forEach((target) => {
      target.textContent = sneakText
    })
  } */
}
