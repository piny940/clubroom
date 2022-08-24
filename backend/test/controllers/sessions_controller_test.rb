require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test '正常にログインできる' do
    user = users('alice')
    post '/session', params: { email: user.email, password: 'password' }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal json['message'], 'ログインしました。'
  end

  test 'メールアドレスまたはパスワードが違う場合はログインできない' do
    user = users('alice')
    post '/session', params: { email: user.email, password: 'wrongPassword' }
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal json['message'], 'メールアドレスまたはパスワードが違います。'
  end

  test '正常にログアウトできる' do
    delete '/session'
    assert_response 200
    json = JSON.parse(response.body)
    assert_equal json['message'], 'ログアウトしました。'
  end
end
