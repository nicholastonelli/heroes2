class AddIntelligenceToCharacters < ActiveRecord::Migration[8.1]
  def change
    add_column :characters, :intelligence, :integer
  end
end
