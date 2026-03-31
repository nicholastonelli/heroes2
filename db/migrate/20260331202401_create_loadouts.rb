class CreateLoadouts < ActiveRecord::Migration[8.1]
  def change
    create_table :loadouts do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
