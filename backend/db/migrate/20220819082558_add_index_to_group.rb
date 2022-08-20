class AddIndexToGroup < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :school, :string
    add_index :groups, :name
    add_index :groups, [:name, :school], unique: true
  end
end
