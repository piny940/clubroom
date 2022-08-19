class AddIndexToGroup < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :university, :string
    add_index :groups, :name
    add_index :groups, [:name, :university], unique: true
  end
end
