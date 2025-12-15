class AddBabToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :bab, :integer
  end
end
