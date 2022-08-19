class CreateAdminTalkrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :talkrooms do |t|
      t.string :name, null: false, default: ""
      t.integer :group_id
      t.integer :kind, null: false, default: 0

      t.timestamps
    end
  end
end
