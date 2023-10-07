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

friend1 = User.create!(name: "友達1", email: "friend1@example.com",
  password: "password", password_confirmation: "password")
friend2 = User.create!(name: "友達2", email: "friend2@example.com",
  password: "password", password_confirmation: "password")
friend3 = User.create!(name: "友達3", email: "friend3@example.com",
  password: "password", password_confirmation: "password")
friend4 = User.create!(name: "友達4", email: "friend4@example.com",
  password: "password", password_confirmation: "password")
friend5 = User.create!(name: "友達5", email: "frined5@example.com",
  password: "password", password_confirmation: "password")
friend6 = User.create!(name: "友達6", email: "friend6@example.com",
  password: "password", password_confirmation: "password")

soccer_group = Group.create!(name: "サッカー部")

tanteidan.members << admin_user
tanteidan.members << konann
tanteidan.members << ai
tanteidan.members << genta
tanteidan.members << ayumi
tanteidan.members << mitsuhiko

teitanko.members << admin_user
teitanko.members << shinichi
teitanko.members << rann
teitanko.members << sonoko
teitanko.members << sera

akai_family.members << shuichi
akai_family.members << sera
akai_family.members << mary
akai_family.members << shukichi

soccer_group.members << admin_user
soccer_group.members << friend1
soccer_group.members << friend2
soccer_group.members << friend3
soccer_group.members << friend4
soccer_group.members << friend5
soccer_group.members << friend6

tanteidan_room1 = tanteidan.talkrooms.create!(name: "探偵団全体")
tanteidan_room2 = tanteidan.talkrooms.create!(name: "薬で小さくなった人達")
soccer_zentai_room = soccer_group.talkrooms.create!(name: "サッカー部全体")
soccer_gakusai_room = soccer_group.talkrooms.create!(name: "学祭準備")
soccer_gasshku_room = soccer_group.talkrooms.create!(name: "夏休み合宿！")
soccer_christmas_room = soccer_group.talkrooms.create!(name: "クリスマスパーティー")

tanteidan_room1.members << admin_user
tanteidan_room1.members << konann
tanteidan_room1.members << ai
tanteidan_room1.members << genta
tanteidan_room1.members << ayumi
tanteidan_room2.members << admin_user
tanteidan_room1.members << mitsuhiko
tanteidan_room2.members << konann
tanteidan_room2.members << ai

teitanko_room1 = teitanko.talkrooms.create!(name: "帝丹高校全体")
teitanko_room1.members << admin_user
teitanko_room1.members << shinichi
teitanko_room1.members << rann
teitanko_room1.members << sonoko
teitanko_room1.members << sera

akai_family_room1 = akai_family.talkrooms.create!(name: "赤井家全体")
akai_family_room1.members << sera
akai_family_room1.members << mary
akai_family_room1.members << shuichi
akai_family_room1.members << shukichi

soccer_zentai_room.members << admin_user
soccer_zentai_room.members << friend1
soccer_zentai_room.members << friend2
soccer_zentai_room.members << friend3
soccer_zentai_room.members << friend4
soccer_zentai_room.members << friend5
soccer_zentai_room.members << friend6

soccer_gakusai_room.members << admin_user
soccer_gakusai_room.members << friend1
soccer_gakusai_room.members << friend3
soccer_gakusai_room.members << friend5

soccer_gasshku_room.members << admin_user
soccer_gasshku_room.members << friend1
soccer_gasshku_room.members << friend2
soccer_gasshku_room.members << friend4
soccer_gasshku_room.members << friend6

soccer_christmas_room.members << admin_user
soccer_christmas_room.members << friend1
soccer_christmas_room.members << friend2
soccer_christmas_room.members << friend3
soccer_christmas_room.members << friend4
soccer_christmas_room.members << friend5

friend1.talks.create!(talkroom_id: soccer_zentai_room.id, content: "皆、明日の練習詳細だけ確認させてください！👀 10時からスタートで、最初の30分はランニングで暖を取りますね？")
friend2.talks.create!(talkroom_id: soccer_zentai_room.id, content: "了解です✅。それで、その後はテクニックの練習と戦術の話し合いをする時間も作りたいね！")
friend3.talks.create!(talkroom_id: soccer_zentai_room.id, content: "確かに👍。特にセットプレーの練習をもう少し増やしたい。先週の試合でちょっと苦労したからね。")
admin_user.talks.create!(talkroom_id: soccer_zentai_room.id, content: "いいね！🔥 セットプレーの練習は必要だね。それと、最後にはフリープレーの時間も取り入れて、実戦形式の練習もやりたいと思うんだけど、どうかな？")
friend1.talks.create!(talkroom_id: soccer_zentai_room.id, content: "良さそう！フリープレーで先週の試合の反省を活かしてみるのもいいかもね。😄 ちなみに、誰かボールを持ってきてくれるかな？")
friend2.talks.create!(talkroom_id: soccer_zentai_room.id, content: "ボールは僕が持ってくるよ🏐。あと、飲み物もみんなでシェアしようか。みんな何か1つずつ持ってくる？🥤")
friend3.talks.create!(talkroom_id: soccer_zentai_room.id, content: "いいね、ジュース持ってくるよ！🍹 それと、もし暑かったら日焼け止めも忘れずにね。")
admin_user.talks.create!(talkroom_id: soccer_zentai_room.id, content: "おお、ありがと、友人2！🙏 私はスポーツドリンク持参するね。🥤 友人1、君は何を持ってくる？")
friend1.talks.create!(talkroom_id: soccer_zentai_room.id, content: "う〜ん、お菓子かな？🍪 小腹が空いた時用に！ あとでエネルギー補給できるやつを！")
admin_user.talks.create!(talkroom_id: soccer_zentai_room.id, content: "それもいいね！それじゃ、明日は準備ばっちりで頑張りましょう！💪 みんな、お疲れ様〜！")

friend1.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "11月の学園祭の出し物を決めようと思います")
friend1.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "サッカー部として出品したいものを上げていってください！")
friend2.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "焼きそばとかどう？")
admin_user.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "いいね！")
friend3.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "僕はお化け屋敷がいいな")
friend4.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "僕はヨーヨー釣りがいいな")
friend1.talks.create!(talkroom_id: soccer_gakusai_room.id, content: "ヨーヨー釣りいいね！")

konann.talks.create!(talkroom_id: tanteidan_room1.id, content: "真実はいつも1つ!")
ai.talks.create!(talkroom_id: tanteidan_room1.id, content: "私はパス。")
