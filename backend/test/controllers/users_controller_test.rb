require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test '正常に現在自身がログインしているユーザーを取得できる' do
    user = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
    sign_in user
    get '/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'john', json['data']['user']['name']
  end

  test 'ログインしていないときはuserをnullとして返す' do
    get '/user'
    assert_response :success
    json = JSON.parse(response.body)
    assert_nil json['data']['user']
  end
end
