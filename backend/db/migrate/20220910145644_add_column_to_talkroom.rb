class AddColumnToTalkroom < ActiveRecord::Migration[7.0]
  def change
    add_column :talkrooms, :entry_token, :string, null: false, default: ''
  end
end
