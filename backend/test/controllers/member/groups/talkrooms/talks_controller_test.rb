require 'test_helper'

class Member::Groups::Talkrooms::TalksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user1 = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @user2 = User.create!(name: 'bob', email: 'bob@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
    @group3 = Group.create!(name: 'group3')

    @group1.members << @user1
    @group1.members << @user2
    @group3.members << @user1

    @talkroom1 = @group1.talkrooms.create!(name: 'room1')
    @talkroom2 = @group1.talkrooms.create!(name: 'room2')
    @talkroom3 = @group2.talkrooms.create!(name: 'room3')
    @talkroom4 = @group3.talkrooms.create!(name: 'room4')

    @talkroom1.members << @user1
    @talkroom1.members << @user2
    @talkroom4.members << @user1

    @talkroom1.talks.create!(from_user_id: @user1.id, content: 'Test1')
    @talkroom1.talks.create!(from_user_id: @user2.id, content: 'Test2')

    sign_in @user1
  end

  test '指定されたグループに入っていない場合は400を返す' do
    get "/member/groups/#{@group2.id}/talkrooms/#{@talkroom3.id}/talks"

    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'このグループには所属していません。', json['message']
  end

  test '指定されたトークルームに入っていない場合は400を返す' do
    get "/member/groups/#{@group1.id}/talkrooms/#{@talkroom2.id}/talks"

    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'このトークルームのメンバーではありません。', json['message']
  end

  test '指定されたトークルームが指定されたグループのものでない場合は400を返す' do
    get "/member/groups/#{@group1.id}/talkrooms/#{@talkroom4.id}/talks"

    assert_response 400
    json = JSON.parse(response.body)
    assert_equal '指定されたグループにこのトークルームはありません。', json['message']
  end

  test '自身の入っているトークルームのトークを正常に取得できる' do
    get "/member/groups/#{@group1.id}/talkrooms/#{@talkroom1.id}/talks"

    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 2, json['data']['talks'].length
  end
end
