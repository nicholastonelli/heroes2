require 'pathname'

path = Pathname.new File.join Rails.root, 'db', 'seeds', 'templates'

Character.delete_all

Character.create! name: "Phearon"

Character.create! name: "Avery"

Character.create! name: "Feargus"

Character.create! name: "Roberts"

puts "Characters: #{Character.count}"