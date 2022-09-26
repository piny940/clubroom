require 'test_helper'

class Member::Groups::MembersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user1 = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @user2 = User.create!(name: 'bob', email: 'bob@example.com', password: 'password', password_confirmation: 'password')
    @user3 = User.create!(name: 'catherine', email: 'catherine@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
    @group1.members << @user1
    @group1.members << @user2
    @group2.members << @user3
    sign_in @user1
  end

  test '正常にグループのメンバー一覧を取得できる' do
    get "/member/groups/#{@group1.id}/members"
    assert_response :success
    json = JSON.parse(response.body)

    assert_equal 2, json['data']['members'].length
    assert Set[json['data']['members'][0]['id'], json['data']['members'][1]['id']] == Set[@user1.id, @user2.id]
  end

  test '自身の属していないグループのメンバーは取得できない' do
    get "/member/groups/#{@group2.id}/members"
    assert_response 400
    assert_nil json['data'] && json['data']['members']
  end
end
