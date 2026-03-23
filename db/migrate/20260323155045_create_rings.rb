class CreateRings < ActiveRecord::Migration[8.1]
  def change
    create_table :rings do |t|
      t.string :name

      t.timestamps
    end
  end
end
