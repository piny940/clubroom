class CreateAdminTalkEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :talk_entries do |t|
      t.integer :talkroom_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :talk_entries, :talkroom_id
    add_index :talk_entries, :user_id
  end
end
