import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Object,
  }

  static targets = [ "name", "results", "toHit", "AC", "str", "dex" ]
  connect() {
    console.log(this.dataValue)
    
    this.nameTarget.textContent = this.dataValue.name

    this.dexterity = this.dataValue.dexterity
    this.strength = this.dataValue.strength
    this.dexTarget.textContent = this.dexterity
    this.strTarget.textContent = this.strength

    this.strMod = Math.floor((this.strength  - 10) / 2)
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

  update(e){
    console.log('updating')
    console.log(e)
    console.log(e.srcElement);
    console.log(e.srcElement.id)


    let values = JSON.parse(e.srcElement.value)
    console.log(values)

    //save value to this.ring1
    if(this[e.srcElement.id]){
      console.log('slot was filled')
      console.log(this[e.srcElement.id])
      let oldValues = this[e.srcElement.id]
      this[oldValues.value] -= oldValues.power
    } else {
      console.log('slot was empty');
    }
    this[e.srcElement.id] = values
    this[values.value] += values.power

    this.tabulate()
  }

  tabulate(){
    console.log(`Dexterity is ${this.dexterity}, Srength is ${this.strength}`);
    this.strMod = Math.floor((this.strength  - 10) / 2)
    this.dexMod = Math.floor((this.dexterity - 10) / 2)

    this.dexTarget.textContent = this.dexterity
    this.strTarget.textContent = this.strength
    this.toHitTarget.textContent = `Str: ${this.strMod } + Base Attack Bonus: ${this.dataValue.bab} = + ${this.strMod + this.dataValue.bab}`

    this.ACTarget.textContent = 10 + this.dexMod + this.armorBonus + this.shieldBonus + this.sizeBonus + this.naturalBonus + this.miscBonus + this.deflectBonus
  }
}
