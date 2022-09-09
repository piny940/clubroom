require 'test_helper'

class Member::Groups::Talkrooms::TalkEntriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user1 = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')

    @group1.members << @user1
    @talkroom1 = @group1.talkrooms.create!(name: 'room1')
    @talkroom1.members << @user1

    sign_in @user1
  end

  test '正常にトークルームへの自身のTalkEntryを取得できる' do
    get "/member/groups/#{@talkroom1.group.id}/talkrooms/#{@talkroom1.id}/talk_entry"

    assert_response :success
    json = JSON.parse(response.body)

    assert_equal @talkroom1.talk_entries.find_by(member_id: @user1.id), json['data']['talk_entry']['id']
  end
end
