class AddLevelToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :level, :integer
  end
end
