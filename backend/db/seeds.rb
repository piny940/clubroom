# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

admin_user = User.create!(name: "安済翔真", email: "s_ansai@icloud.com",
  kind: "admin", password: "password", password_confirmation: "password")

konann = User.create!(name: "江戸川コナン", email: "konann@example.com",
  password: "password", password_confirmation: "password")

shinichi = User.create!(name: "工藤新一", email: "shinichi@example.com",
  password: "password", password_confirmation: "password")

rann = User.create!(name: "毛利蘭", email: "rann@example.com",
  password: "password", password_confirmation: "password")

sonoko = User.create!(name: "鈴木園子", email: "sonoko@example.com",
  password: "password", password_confirmation: "password")

ai = User.create!(name: "灰原哀", email: "ai@example.com",
  password: "password", password_confirmation: "password")

mitsuhiko = User.create!(name: "円谷光彦", email: "mitsuhiko@example.com",
  password: "password", password_confirmation: "password")

genta = User.create!(name: "小嶋元太", email: "genta@example.com",
  password: "password", password_confirmation: "password")

ayumi = User.create!(name: "吉田歩美", email: "ayumi@example.com",
  password: "password", password_confirmation: "password")

sonoko = User.create!(name: "鈴木園子", email: "sonoko@example.com",
  password: "password", password_confirmation: "password")
