require 'test_helper'

class TalkTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @group = Group.create!(name: 'group1')
    @group.members << @user
    @talkroom = @group.talkrooms.create!
  end

  test 'Talkを正常に作成できる' do
    @talkroom.members << @user
    talk = Talk.new(from_user_id: @user.id, talkroom_id: @talkroom.id, content: 'Test')
    talk.save!
    assert talk.valid?
  end

  test 'TalkroomからTalkを作成できる' do
    @talkroom.members << @user
    before_count = Talk.count
    @talkroom.talks.create(content: 'Test', from_user_id: @user.id)
    assert_equal before_count + 1, Talk.count
  end

  test 'UserからTalkを作成できる' do
    @talkroom.members << @user
    before_count = Talk.count
    @user.talks.create(content: 'Test', talkroom_id: @talkroom.id)
    assert_equal before_count + 1, Talk.count
  end

  test '自分の入っていないTalkroomのTalkは作成できない' do
    talk = Talk.new(from_user_id: @user.id, talkroom_id: @talkroom.id, content: 'Test')
    assert_not talk.valid?
  end

  test 'Talkroomを削除するとそのTalkroomのTalkは全て削除される' do
    @talkroom.members << @user
    @user.talks.create!(content: 'Test', talkroom_id: @talkroom.id)
    before_count = Talk.count
    @talkroom.destroy
    assert_equal before_count - 1, Talk.count
  end

  test 'FromUserを削除するとそのUser送ったTalkのfrom_user_idはnilになる' do
    @talkroom.members << @user
    talk = @user.talks.create!(content: 'Test', talkroom_id: @talkroom.id)
    before_count = Talk.count
    @user.destroy
    assert_equal before_count, Talk.count
    talk.reload
    assert_nil talk.from_user_id
  end

  test 'Contentは空白ではいけない' do
    @talkroom.members << @user
    talk = Talk.new(from_user_id: @user.id, talkroom_id: @talkroom.id, content: '')
    assert_not talk.valid?
  end

  test 'Talk作成時はFromUserを空白にはできない' do
    talk = Talk.new(talkroom_id: @talkroom.id, content: 'Test')
    assert_not talk.valid?
  end
end
