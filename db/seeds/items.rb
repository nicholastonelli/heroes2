require 'pathname'

path = Pathname.new File.join Rails.root, 'db', 'seeds', 'templates'

Item.delete_all

Item.create! name: "Example +2 Dex Ring"

Item.create! name: "Example +2 AC Ring"

puts "Items: #{Item.count}"