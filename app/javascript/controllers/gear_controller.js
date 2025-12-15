import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    data: Object,
  }

  static targets = [ "name", "results", "toHit", "AC" ]
  connect() {
    console.log(this.dataValue)
    
    this.nameTarget.textContent = this.dataValue.name

    this.strMod = Math.floor((this.dataValue.strength  - 10) / 2)
    this.dexMod = Math.floor((this.dataValue.dexterity - 10) / 2)



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
    this.miscBonus = 1
    this.tabulate()
  }

  tabulate(){
    this.toHitTarget.textContent = `Str: ${this.strMod } + Base Attack Bonus: ${this.dataValue.bab} = + ${this.strMod + this.dataValue.bab}`

    this.ACTarget.textContent = 10 + this.dexMod + this.armorBonus + this.shieldBonus + this.sizeBonus + this.naturalBonus + this.miscBonus
  }
}
