class AddColumnToTalkEntry < ActiveRecord::Migration[7.0]
  def change
    add_column :talk_entries, :role, :integer, null: false, default: 0
  end
end
