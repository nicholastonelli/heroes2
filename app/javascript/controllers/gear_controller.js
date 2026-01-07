import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Object,
  }

  static targets = [
    "name",
    "results",
    "mainHit",
    "sideHit",
    "hideHit",
    "longHit",
    "AC",
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

    this.strength = this.dataValue.strength
    this.dexterity = this.dataValue.dexterity
    this.constitution = this.dataValue.constitution
    this.intelligence = this.dataValue.intelligence
    this.wisdom = this.dataValue.wisdom
    this.charisma = this.dataValue.charisma

    this.calculateAbilityMods()

    //this.displayAbilityScores()

    // AC calculation
    this.armorBonus = 3
    this.shieldBonus = 0
    this.sizeBonus = 0
    this.naturalBonus = 0
    this.deflectBonus = 0
    this.miscBonus = 0

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
    this.strTarget.textContent = `${this.strength} (${this.strMod})`
    this.dexTarget.textContent = `${this.dexterity} (${this.dexMod})`
    this.conTarget.textContent = `${this.constitution} (${this.conMod})`
    this.intTarget.textContent = `${this.intelligence} {${this.intMod}}`
    this.wisTarget.textContent = `${this.wisdom} {${this.wisMod}}`
    this.chaTarget.textContent = `${this.charisma} {${this.chaMod}}`
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
        //console.log(value)
        //this[e.srcElement.id] = value
        if (value.value == "specAbil") {
          // TODO identical special abilitied are removed together
          this[value.value] = this[value.value].filter((e) => e !== value.power)
        } else if (value.value == "mainWeaponDamageDie") {
          this[value.value] = "1d4 bludgeon"
        } else if (value.value == "maxDex") {
          this[value.value] = value.power
        } else {
          this[value.value] -= value.power
        }
      })
      //this[oldValues.value] -= oldValues.power
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
      } else if (value.value == "maxDex") {
        this[value.value] = value.power
      } else {
        console.log(value)
        console.log(this[value.value])
        console.log(this[value.value] + value.power);
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

    this.specAbilTarget.textContent = this.specAbil

    this.updateWeapons()

    console.log(this.dexMod, this.maxDex);
    console.log(this.dexMod < this.maxDex ? this.dexMod : this.maxDex )

    if (this.dexMod < this.maxDex) {
      console.log(this.maxDex);
      console.log(`dexterity bonus is lower than maxDex`);
    } else {
      console.log(`dexterity bonus is higher than maxDex`);
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

    this.ACTarget.textContent = this.armorClass
  }

  updateWeapons(){
    this.mainHitTarget.textContent = `
    
    Str: ${this.strMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.mainWeaponEnhancement} = + ${
      this.strMod + this.dataValue.bab + this.mainWeaponEnhancement
    }
    \n OR
    Dex: ${this.dexMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.mainWeaponEnhancement} = + ${
      this.dexMod + this.dataValue.bab + this.mainWeaponEnhancement
    }
    Damage: ${this.mainWeaponDamageDie}
    `

    this.sideHitTarget.textContent = `
    
    Str: ${this.strMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.sideWeaponEnhancement} = + ${
      this.strMod + this.dataValue.bab + this.sideWeaponEnhancement
    }
    \n OR
    Dex: ${this.dexMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.sideWeaponEnhancement} = + ${
      this.dexMod + this.dataValue.bab + this.sideWeaponEnhancement
    }
    Damage: ${this.sideWeaponDamageDie}
    `

    this.hideHitTarget.textContent = `
    
    Str: ${this.strMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.hideWeaponEnhancement} = + ${
      this.strMod + this.dataValue.bab + this.hideWeaponEnhancement
    }
    \n OR
    Dex: ${this.dexMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.hideWeaponEnhancement} = + ${
      this.dexMod + this.dataValue.bab + this.hideWeaponEnhancement
    }
    Damage: ${this.hideWeaponDamageDie}
    `

    this.longHitTarget.textContent = `
    
    Str: ${this.strMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.longWeaponEnhancement} = + ${
      this.strMod + this.dataValue.bab + this.longWeaponEnhancement
    }
    \n OR
    Dex: ${this.dexMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } + Weapon Enhancement: ${this.longWeaponEnhancement} = + ${
      this.dexMod + this.dataValue.bab + this.longWeaponEnhancement
    }
    Damage: ${this.longWeaponDamageDie}
    `
  }
}
