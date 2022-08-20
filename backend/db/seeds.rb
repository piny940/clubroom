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

sera = User.create!(name: "世良真純", email: "sera@example.com",
    password: "password", password_confirmation: "password")

shuichi = User.create!(name: "赤井秀一", email: "shuichi@example.com",
    password: "password", password_confirmation: "password")

mary = User.create!(name: "メアリー・世良", email: "mary@example.com",
    password: "password", password_confirmation: "password")

shukichi = User.create!(name: "羽田秀吉", email: "shukichi@example.com",
    password: "password", password_confirmation: "password")

tanteidan = Group.create!(name: "少年探偵団", school: "帝丹小学校")
teitanko = Group.create!(name: "帝丹高校")
akai_family = Group.create!(name: "赤井一家")

tanteidan.members << konann
tanteidan.members << ai
tanteidan.members << genta
tanteidan.members << ayumi
tanteidan.members << mitsuhiko

teitanko.members << shinichi
teitanko.members << rann
teitanko.members << sonoko
teitanko.members << sera

akai_family.members << shuichi
akai_family.members << sera
akai_family.members << mary
akai_family.members << shukichi

tanteidan_room1 = tanteidan.talkrooms.create!(name: "探偵団全体")
tanteidan_room2 = tanteidan.talkrooms.create!(name: "薬で小さくなった人達")
tanteidan_room1.members << konann
tanteidan_room1.members << ai
tanteidan_room1.members << genta
tanteidan_room1.members << ayumi
tanteidan_room1.members << mitsuhiko
tanteidan_room2.members << konann
tanteidan_room2.members << ai

teitanko_room1 = teitanko.talkrooms.create!(name: "帝丹高校全体")
teitanko_room1.members << shinichi
teitanko_room1.members << rann
teitanko_room1.members << sonoko
teitanko_room1.members << sera

akai_family_room1 = akai_family.talkrooms.create!(name: "赤井家全体")
akai_family_room1.members << sera
akai_family_room1.members << mary
akai_family_room1.members << shuichi
akai_family_room1.members << shukichi

konann.talks.create!(talkroom_id: tanteidan_room1.id, content: "真実はいつも1つ!")
ai.talks.create!(talkroom_id: tanteidan_room1.id, content: "私はパス。")
