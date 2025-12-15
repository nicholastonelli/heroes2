class AddWisdomToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :wisdom, :integer
  end
end
