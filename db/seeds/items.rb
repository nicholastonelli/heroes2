require 'pathname'

path = Pathname.new File.join Rails.root, 'db', 'seeds', 'templates'

Ring.delete_all

Ring.create! name: "Example +2 Dex Ring"

Ring.create! name: "Example +2 AC Ring"

puts "Rings: #{Ring.count}"