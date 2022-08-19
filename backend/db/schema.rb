# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_19_153918) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "university"
    t.index ["name", "university"], name: "index_groups_on_name_and_university", unique: true
    t.index ["name"], name: "index_groups_on_name"
  end

  create_table "joinings", force: :cascade do |t|
    t.integer "group_id", null: false
    t.integer "user_id", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id", "user_id"], name: "index_joinings_on_group_id_and_user_id", unique: true
    t.index ["group_id"], name: "index_joinings_on_group_id"
    t.index ["user_id"], name: "index_joinings_on_user_id"
  end

  create_table "talk_entries", force: :cascade do |t|
    t.bigint "talkroom_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talkroom_id"], name: "index_talk_entries_on_talkroom_id"
    t.index ["user_id"], name: "index_talk_entries_on_user_id"
  end

  create_table "talkrooms", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.integer "group_id"
    t.integer "kind", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "talks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "talkroom_id", null: false
    t.text "content", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["talkroom_id"], name: "index_talks_on_talkroom_id"
    t.index ["user_id"], name: "index_talks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "kind", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "talk_entries", "talkrooms"
  add_foreign_key "talk_entries", "users"
  add_foreign_key "talks", "talkrooms"
  add_foreign_key "talks", "users"
end
