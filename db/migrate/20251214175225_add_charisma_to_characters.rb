class AddCharismaToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :charisma, :integer
  end
end
