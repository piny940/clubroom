require 'test_helper'

class Member::Groups::Talkrooms_controller < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
    @group1.members << @user
    @room1 = @group1.talkrooms.create!(name: 'room1')
    @room2 = @group1.talkrooms.create!(name: 'room2')
    @room1.members << @user
  end

  test '指定されたグループに所属していない場合は400を返す' do
    sign_in @user
    
    get "/member/groups/#{@group2.id}/talkrooms"
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal json['message'], 'このグループには所属していません。'
  end

  test '指定されたグループのトークルームの中で、自身が入っているものだけを取得できる' do
    sign_in @user

    get "/member/groups/#{@group1.id}/talkrooms"
    assert_response 200
    json = JSON.parse(response.body)

    assert_equal json["data"]["talkrooms"][0]["name"], @room1.name
    assert_equal json["data"]["talkrooms"].length, 1
  end
end
