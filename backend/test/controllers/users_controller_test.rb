require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test '正常に現在自身がログインしているユーザーを取得できる' do
    user = users('john')
    sign_in user
    get '/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal json['data']['user']['name'], 'john'
  end

  test 'ログインしていないときはuserをnullとして返す' do
    get '/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_nil json['data']['user']
  end
end
