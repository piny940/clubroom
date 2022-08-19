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
end
