require 'test_helper'

class TalkEntryTest < ActiveSupport::TestCase
  def setup
    @user1 = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @user2 = User.create!(name: 'bob', email: 'bob@example.com', password: 'password', password_confirmation: 'password')
    @user3 = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
    @group = Group.create!(name: 'group1')
    @group.members << @user1
    @talkroom = @group.talkrooms.create!(kind: :group)
  end

  test '正常に自身の入っているGroupのTalkroomへのTalkEntryを作成できる' do
    talk_entry = TalkEntry.new(talkroom_id: @talkroom.id, user_id: @user1.id)
    assert talk_entry.valid?
  end

  test '自分の属していないGroupのTalkroomには参加できない' do
    talk_entry = TalkEntry.new(talkroom_id: @talkroom.id, user_id: @user2.id)
    assert_not talk_entry.valid?
  end

  test 'DMには2人しか参加できない' do
    dm = Talkroom.create!(kind: :direct)

    dm.talk_entries.create!(user_id: @user1.id)
    dm.talk_entries.create!(user_id: @user2.id)

    talk_entry = TalkEntry.new(talkroom_id: dm.id, user_id: @user3.id)
    assert_not talk_entry.valid?
  end

  test 'Talkroomから直接TalkEntryを作成・削除できる' do
    before_count = @talkroom.talk_entries.length
    before_talk_entries_count = TalkEntry.count
    before_user_talk_entries_count = @user1.talk_entries.length

    talk_entry = @talkroom.talk_entries.create!(user_id: @user1.id)
    @user1.reload
    assert_equal before_count + 1, @talkroom.talk_entries.length
    assert_equal before_talk_entries_count + 1, TalkEntry.count
    assert_equal before_user_talk_entries_count + 1, @user1.talk_entries.length

    @talkroom.talk_entries.destroy(talk_entry)
    @user1.reload
    assert_equal before_count, @talkroom.talk_entries.length
    assert_equal before_talk_entries_count, TalkEntry.count
    assert_equal before_user_talk_entries_count, @user1.talk_entries.length
  end

  test 'Userから直接TalkEntryを作成・削除できる' do
    before_count = @user1.talk_entries.length
    before_talk_entries_count = TalkEntry.count
    before_group_talk_entries_count = @talkroom.talk_entries.length

    talk_entry = @user1.talk_entries.create!(talkroom_id: @talkroom.id)
    @talkroom.reload
    assert_equal before_count + 1, @user1.talk_entries.length
    assert_equal before_talk_entries_count + 1, TalkEntry.count
    assert_equal before_group_talk_entries_count + 1, @talkroom.talk_entries.length

    @user1.talk_entries.destroy(talk_entry)
    @talkroom.reload
    assert_equal before_count, @user1.talk_entries.length
    assert_equal before_talk_entries_count, TalkEntry.count
    assert_equal before_group_talk_entries_count, @talkroom.talk_entries.length
  end

  test 'User上で直接Talkroomを追加できる' do
    before_count = @user1.talkrooms.length
    before_talkroom_member_count = @talkroom.members.length

    @user1.talkrooms << @talkroom
    @talkroom.reload
    assert_equal before_count + 1, @user1.talkrooms.length
    assert_equal before_talkroom_member_count + 1, @talkroom.members.length
  end

  test 'Talkroom上で直接Userを追加できる' do
    before_count = @talkroom.members.length
    before_user_talkrooms_count = @user1.talkrooms.length

    @talkroom.members << @user1
    @user1.reload
    assert_equal before_count + 1, @talkroom.members.length
    assert_equal before_user_talkrooms_count + 1, @user1.talkrooms.length
  end

  test 'Talkroomが削除されるとそのTalkroomのTalkEntryは全て削除される' do
    @talkroom.members << @user1

    before_count = TalkEntry.count
    @talkroom.destroy
    assert_equal before_count - 1, TalkEntry.count
  end

  test 'Userが削除されるとそのUserのTalkEntryは全て削除される' do
    @talkroom.members << @user1

    before_count = TalkEntry.count
    @user1.destroy
    assert_equal before_count - 1, TalkEntry.count
  end
end
