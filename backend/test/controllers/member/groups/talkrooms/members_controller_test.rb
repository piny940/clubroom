require 'test_helper'
require 'set'

class Member::Groups::Talkrooms::MembersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user1 = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @user2 = User.create!(name: 'bob', email: 'bob@example.com', password: 'password', password_confirmation: 'password')
    @user3 = User.create!(name: 'catherine', email: 'catherine@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')

    @group1.members << @user1
    @group1.members << @user2
    @group1.members << @user3

    @talkroom1 = @group1.talkrooms.create!(name: 'room1')
    @talkroom2 = @group1.talkrooms.create!(name: 'room2')

    @talkroom1.members << @user1
    @talkroom1.members << @user2

    sign_in @user1
  end

  test '正常に自身の属するトークルームのメンバー一覧を取得できる' do
    get "/member/groups/#{@talkroom1.group.id}/talkrooms/#{@talkroom1.id}/members"

    assert_response :success
    json = JSON.parse(response.body)

    assert_equal 2, json['data']['members'].length
    assert Set[json['data']['members'][0]['id'], json['data']['members'][1]['id']] == Set[@user1.id, @user2.id]
  end

  test '自身の属していないトークルームのメンバーは取得できない' do
    get "/member/groups/#{@talkroom2.group.id}/talkrooms/#{@talkroom2.id}/members"

    assert_response 400
  end
end
