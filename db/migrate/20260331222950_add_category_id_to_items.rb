class AddCategoryIdToItems < ActiveRecord::Migration[8.1]
  def change
    add_column :items, :category_id, :integer
  end
end
