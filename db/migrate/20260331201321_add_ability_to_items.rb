class AddAbilityToItems < ActiveRecord::Migration[8.1]
  def change
    add_column :items, :ability, :json
  end
end
