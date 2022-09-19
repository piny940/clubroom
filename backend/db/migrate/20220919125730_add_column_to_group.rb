class AddColumnToGroup < ActiveRecord::Migration[7.0]
  def change
    add_column :groups, :entry_token, :string, null: false, default: ''
  end
end
