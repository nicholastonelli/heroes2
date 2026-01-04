import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Object,
  }

  static targets = ["name", "results", "toHit", "AC", "str", "dex", "specAbil"]
  connect() {
    console.log(this.dataValue)
    this.specAbil = []
    this.nameTarget.textContent = this.dataValue.name

    this.dexterity = this.dataValue.dexterity
    this.strength = this.dataValue.strength
    this.dexTarget.textContent = this.dexterity
    this.strTarget.textContent = this.strength

    this.strMod = Math.floor((this.strength - 10) / 2)
    this.dexMod = Math.floor((this.dexterity - 10) / 2)

    // AC calculation
    this.armorBonus = 3
    this.shieldBonus = 0
    this.sizeBonus = 0
    this.naturalBonus = 0
    this.deflectBonus = 0
    this.miscBonus = 0

    this.tabulate()
  }

  update(e) {
    console.log("updating")

    let values = JSON.parse(e.srcElement.value)

    console.log(e.srcElement.id)
    if (this[e.srcElement.id]) {
      console.log("slot was filled")
      let oldValues = this[e.srcElement.id]

      oldValues.forEach((value) => {
        console.log(value)
        //this[e.srcElement.id] = value
        if (value.value == "specAbil") {
          // TODO identical special abilitied are removed together  
          this[value.value] = this[value.value].filter((e) => e !== value.power)
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
      } else {
        this[value.value] += value.power
      }
    })

    this.tabulate()
  }

  tabulate() {
    //console.log(`Dexterity is ${this.dexterity}, Srength is ${this.strength}`);
    this.strMod = Math.floor((this.strength - 10) / 2)
    this.dexMod = Math.floor((this.dexterity - 10) / 2)

    this.specAbilTarget.textContent = this.specAbil
    this.dexTarget.textContent = this.dexterity
    this.strTarget.textContent = this.strength
    this.toHitTarget.textContent = `Str: ${this.strMod} + Base Attack Bonus: ${
      this.dataValue.bab
    } = + ${this.strMod + this.dataValue.bab}`

    this.ACTarget.textContent =
      10 +
      this.dexMod +
      this.armorBonus +
      this.shieldBonus +
      this.sizeBonus +
      this.naturalBonus +
      this.miscBonus +
      this.deflectBonus
  }
}
