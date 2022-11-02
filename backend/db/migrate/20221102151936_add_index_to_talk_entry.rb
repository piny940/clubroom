class AddIndexToTalkEntry < ActiveRecord::Migration[7.0]
  def change
    add_index :talk_entries, [:user_id, :talkroom_id], unique: true
  end
end
