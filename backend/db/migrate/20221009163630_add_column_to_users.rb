class AddColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :global_profile, :string, null: false, default: ''
    add_column :users, :school, :string
    add_column :users, :birth_date, :date
    add_column :users, :gender, :integer
  end
end
