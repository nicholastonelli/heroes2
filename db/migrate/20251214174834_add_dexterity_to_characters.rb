class AddDexterityToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :dexterity, :integer
  end
end
