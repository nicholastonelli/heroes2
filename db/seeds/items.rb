require 'pathname'

path = Pathname.new File.join Rails.root, 'db', 'seeds', 'templates'


Slot.delete_all
Item.delete_all
Category.delete_all

Slot.create! name:"Face"
Slot.create! name:"Head"
Slot.create! name:"Throat"
Slot.create! name:"Shoulders"
Slot.create! name:"Body"
Slot.create! name:"Torso"
Slot.create! name:"Arms"
Slot.create! name:"Hands"
Slot.create! name:"Waist"
Slot.create! name:"Ring1"
Slot.create! name:"Ring2"
Slot.create! name:"Feet"
Slot.create! name:"Weapon1"
Slot.create! name:"Weapon2"
Slot.create! name:"Weapon3"
Slot.create! name:"Shield"
Slot.create! name:"Other"

Category.create! name:"Face"
Category.create! name:"Head"
Category.create! name:"Throat"
Category.create! name:"Shoulders"
Category.create! name:"Body"
Category.create! name:"Torso"
Category.create! name:"Arms"
Category.create! name:"Hands"
Category.create! name:"Waist"
Category.create! name:"Ring"
Category.create! name:"Feet"
Category.create! name:"Weapon1"
Category.create! name:"Weapon2"
Category.create! name:"Weapon3"
Category.create! name:"Shield"
Category.create! name:"Other"


Item.create! name: "Example +2 Dex Ring",
             ability: '{"value":"dexterity", "power":2}',
             description: "Adds +2 to Dexterity.",
             category_id: Category.find_by(name:"Ring")

Item.create! name: "Example +2 AC Ring",
             ability: '{"value":"deflectBonus", "power":2}',
             description: "Adds +2 deflect bonus to Armor Class.",
             category_id: Category.find_by(name:"Ring")

puts "Category: #{Category.count}"
puts "Slots: #{Slot.count}"
puts "Items: #{Item.count}"