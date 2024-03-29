require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
  end

  test '正常にログインできる' do
    post '/session', params: { email: @user.email, password: 'password' }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'ログインしました。', json['message']
  end

  test 'メールアドレスまたはパスワードが違う場合はログインできない' do
    post '/session', params: { email: @user.email, password: 'wrongPassword' }
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'メールアドレスまたはパスワードが違います。', json['message']
  end

  test '正常にログアウトできる' do
    delete '/session'
    assert_response 200
    json = JSON.parse(response.body)
    assert_equal 'ログアウトしました。', json['message']
  end
end
