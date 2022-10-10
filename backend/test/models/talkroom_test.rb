require 'test_helper'

class TalkroomTest < ActiveSupport::TestCase
  def setup
    @group = Group.create!(name: 'group1')
  end

  test '正常にGroupのTalkroomを作成できる' do
    talkroom = Talkroom.new(group_id: @group.id, kind: :group, name: 'Test')
    assert talkroom.valid?
  end

  test '正常にDMのTalkroomを作成できる' do
    talkroom = Talkroom.new(kind: :direct)
    assert talkroom.valid?
  end

  test 'kindがgroupの時はnameは空ではいけない' do
    talkroom = Talkroom.new(group_id: @group.id, name: ' ')
    assert_not talkroom.valid?
  end

  test 'kindがdirectの時はnameは空でも良い' do
    talkroom = Talkroom.new(kind: :direct)
    assert talkroom.valid?
  end

  test 'kindがgroupの時はgroup_idを指定しなくてはならない' do
    talkroom = Talkroom.new(name: 'Test')
    assert_not talkroom.valid?
  end

  test 'kindがgroupの時はTalkroom作成時に自動的にentry_tokenがセットされる' do
    talkroom = Talkroom.create!(name: 'Test', group_id: @group.id)
    assert talkroom.entry_token
  end

  test 'Groupから直接Talkroomを作成・削除できる' do
    before_count = @group.talkrooms.length
    before_talkroom_count = Talkroom.count

    talkroom = @group.talkrooms.create!(name: 'Test')
    assert_equal before_count + 1, @group.talkrooms.length
    assert_equal before_talkroom_count + 1, Talkroom.count

    @group.talkrooms.destroy(talkroom)
    assert_equal before_count, @group.talkrooms.length
    assert_equal before_talkroom_count, Talkroom.count
  end

  test 'Groupが削除されるとそのGroupのTalkroomは全て削除される' do
    @group.talkrooms.create!(name: 'Test')
    before_count = Talkroom.count
    @group.destroy
    assert_equal before_count - 1, Talkroom.count
  end
end
