require 'test_helper'

class Member::Groups::Talkrooms_controller < ActionDispatch::IntegrationTest
  test '指定されたグループに所属していない場合は400を返す' do
    user = users('kaguya')
    group = groups('shiroganeke')
    sign_in user
    
    get "/member/groups/#{group.id}/talkrooms"
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal json['message'], 'このグループには所属していません。'
  end

  test '指定されたグループのトークルームの中で、自身が入っているものだけを取得できる' do
    user = users('kaguya')
    group = groups('shinomiyake')
    talk_room = talkrooms('shinomiyake-room1')
    sign_in user

    get "/member/groups/#{group.id}/talkrooms"
    assert_response 200
    json = JSON.parse(response.body)

    assert_equal json["data"]["talkrooms"][0]["name"], talk_room.name
    assert_equal json["data"]["talkrooms"].length, 1
  end
end
