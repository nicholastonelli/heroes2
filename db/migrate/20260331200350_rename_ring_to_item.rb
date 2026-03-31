class RenameRingToItem < ActiveRecord::Migration[8.1]
  def change
    rename_table :rings, :items

  end
end
