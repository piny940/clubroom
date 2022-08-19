class CreateAdminTalkEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :talk_entries do |t|
      t.references :talkroom, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
