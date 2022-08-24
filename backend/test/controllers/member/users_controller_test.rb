require 'test_helper'

class Member::UsersControllerTest < ActionDispatch::IntegrationTest
  test '正常に現在自身がログインしているユーザーを取得できる' do
    user = users('john')
    sign_in user
    get '/member/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal json["user"]["name"], 'john'
  end

  test 'ログインしていないときはuserをnullとして返す' do
    get '/member/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_nil json["user"]
  end
end
