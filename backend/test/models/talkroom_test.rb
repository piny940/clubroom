require "test_helper"

class TalkroomTest < ActiveSupport::TestCase
  test "正常にGroupのTalkroomを作成できる" do
    group1 = groups('group1')
    talkroom = Talkroom.new(group_id: group1.id, kind: :group)
    assert talkroom.valid?
  end

  test "正常にDMのTalkroomを作成できる" do
    talkroom = Talkroom.new(kind: :direct)
    assert talkroom.valid?
  end

  test "kindがgroupの時はgroup_idを指定しなくてはならない" do
    talkroom = Talkroom.new
    assert_not talkroom.valid?
  end

  test "Groupから直接Talkroomを作成・削除できる" do
    group = groups('group1')
    before_count = group.talkrooms.length
    before_talkroom_count = Talkroom.count

    talkroom = group.talkrooms.create!
    assert_equal before_count+1, group.talkrooms.length
    assert_equal before_talkroom_count+1, Talkroom.count

    group.talkrooms.destroy(talkroom)
    assert_equal before_count, group.talkrooms.length
    assert_equal before_talkroom_count, Talkroom.count
  end

  test "Groupが削除されるとそのGroupのTalkroomは全て削除される" do
    group = groups('group1')
    group.talkrooms.create!
    before_count = Talkroom.count
    group.destroy
    assert_equal before_count-1, Talkroom.count
  end
end
