class AddHealthToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :health, :integer
  end
end
