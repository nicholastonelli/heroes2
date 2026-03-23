require 'pathname'

path = Pathname.new File.join Rails.root, 'db', 'seeds', 'templates'

Character.delete_all

Character.create! name: "Phearon", 
                  bab: 3, 
                  health: 32,
                  level: 6,
                    strength: 16, 
                    dexterity: 22, 
                    constitution: 10,
                    intelligence: 18,
                    wisdom: 13,
                    charisma: 15


Character.create! name: "Avery",
                  bab: 8, 
                  health: 2,
                  level: 8,
                    strength: 24, 
                    dexterity: 22, 
                    constitution: 10,
                    intelligence: 18,
                    wisdom: 13,
                    charisma: 15

Character.create! name: "Feargus",
                  bab: 8, 
                  health: 2,
                  level: 8,
                    strength: 24, 
                    dexterity: 22, 
                    constitution: 10,
                    intelligence: 18,
                    wisdom: 13,
                    charisma: 15

Character.create! name: "Roberts", 
                  bab: 8, 
                  health: 2,
                  level: 8,
                  strength: 24, 
                  dexterity: 22, 
                  constitution: 10,
                  intelligence: 18,
                  wisdom: 13,
                  charisma: 15

puts "Characters: #{Character.count}"