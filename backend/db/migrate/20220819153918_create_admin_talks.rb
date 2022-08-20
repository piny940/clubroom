class CreateAdminTalks < ActiveRecord::Migration[7.0]
  def change
    create_table :talks do |t|
      t.integer :from_user_id
      t.integer :talkroom_id, null: false
      t.text :content, null: false

      t.timestamps
    end
    add_index :talks, :talkroom_id
  end
end
