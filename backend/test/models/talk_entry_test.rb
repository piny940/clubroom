require "test_helper"

class TalkEntryTest < ActiveSupport::TestCase
  test "正常にGroupのTalkroomへのTalkEntryを作成できる" do
    alice = users('alice')
    group1 = groups('group1')
    alice.groups << group1
    group1_1 = group1.talkrooms.create!(kind: :group)

    talk_entry = TalkEntry.new(talkroom_id: group1_1.id, user_id: alice.id)
    assert talk_entry.valid?
  end

  test "自分の属していないGroupのTalkroomには参加できない" do
    bob = users('bob')
    group1 = groups('group1')
    group1_1 = group1.talkrooms.create!(kind: :group)

    talk_entry = TalkEntry.new(talkroom_id: group1_1.id, user_id: bob.id)
    assert_not talk_entry.valid?
  end

  test "DMには2人しか参加できない" do
    alice = users('alice')
    bob = users('bob')
    john = users('john')
    dm = Talkroom.create!(kind: :direct)

    dm.talk_entries.create!(user_id: alice.id)
    dm.talk_entries.create!(user_id: bob.id)

    talk_entry = TalkEntry.new(talkroom_id: dm.id, user_id: john.id)
    assert_not talk_entry.valid?
  end

  test "Talkroomから直接TalkEntryを作成・削除できる" do
    alice = users('alice')
    group = groups('group1')
    group.members << alice
    talkroom = group.talkrooms.create!
    before_count = talkroom.talk_entries.length
    before_talk_entries_count = TalkEntry.count
    before_user_talk_entries_count = alice.talk_entries.length

    talk_entry = talkroom.talk_entries.create!(user_id: alice.id)
    alice.reload
    assert_equal before_count+1, talkroom.talk_entries.length
    assert_equal before_talk_entries_count+1, TalkEntry.count
    assert_equal before_user_talk_entries_count+1, alice.talk_entries.length

    talkroom.talk_entries.destroy(talk_entry)
    alice.reload
    assert_equal before_count, talkroom.talk_entries.length
    assert_equal before_talk_entries_count, TalkEntry.count
    assert_equal before_user_talk_entries_count, alice.talk_entries.length
  end

  test "Userから直接TalkEntryを作成・削除できる" do
    alice = users('alice')
    group = groups('group1')
    group.members << alice
    talkroom = group.talkrooms.create!
    before_count = alice.talk_entries.length
    before_talk_entries_count = TalkEntry.count
    before_group_talk_entries_count = talkroom.talk_entries.length

    talk_entry = alice.talk_entries.create!(talkroom_id: talkroom.id)
    talkroom.reload
    assert_equal before_count+1, alice.talk_entries.length
    assert_equal before_talk_entries_count+1, TalkEntry.count
    assert_equal before_group_talk_entries_count+1, talkroom.talk_entries.length

    alice.talk_entries.destroy(talk_entry)
    talkroom.reload
    assert_equal before_count, alice.talk_entries.length
    assert_equal before_talk_entries_count, TalkEntry.count
    assert_equal before_group_talk_entries_count, talkroom.talk_entries.length
  end

  test "User上で直接Talkroomを追加できる" do
    alice = users('alice')
    group = groups('group1')
    group.members << alice
    talkroom = group.talkrooms.create!
    before_count = alice.talkrooms.length
    before_talkroom_member_count = talkroom.members.length

    alice.talkrooms << talkroom
    talkroom.reload
    assert_equal before_count+1, alice.talkrooms.length
    assert_equal before_talkroom_member_count+1, talkroom.members.length
  end

  test "Talkroom上で直接Userを追加できる" do
    alice = users('alice')
    group = groups('group1')
    group.members << alice
    talkroom = group.talkrooms.create!
    before_count = talkroom.members.length
    before_user_talkrooms_count = alice.talkrooms.length

    talkroom.members << alice
    alice.reload
    assert_equal before_count+1, talkroom.members.length
    assert_equal before_user_talkrooms_count+1, alice.talkrooms.length
  end
end
