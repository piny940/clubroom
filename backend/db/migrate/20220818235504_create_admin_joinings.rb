class CreateAdminJoinings < ActiveRecord::Migration[7.0]
  def change
    create_table :joinings do |t|
      t.integer :group_id, null: false
      t.integer :user_id, null: false
      t.integer :role, null: false, default: 0

      t.timestamps
    end
    add_index :joinings, :group_id
    add_index :joinings, :user_id
    add_index :joinings, [:group_id, :user_id], unique: true
  end
end
