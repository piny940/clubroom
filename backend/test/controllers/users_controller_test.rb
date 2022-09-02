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

  test '正常にユーザーを作成できる' do
    before_count = User.count

    post '/user', params: { user: { email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password'} }
    assert_response :success
    json = JSON.parse(response.body)

    assert_equal 'アカウントが作成されました。', json['message']
    assert_equal 'Alice', json['data']['user']['name']
    assert_equal before_count+1, User.count
  end

  test 'passwordとpassword_confirmationが違う場合はユーザーを作成できない' do
    before_count = User.count

    post '/user', params: { user: { email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'wrongPassword'} }
    assert_response 400
    json = JSON.parse(response.body)

    assert_equal 'アカウントが作成できませんでした。', json['message']
    assert_nil json['data']['user']
    assert_equal before_count, User.count
  end

  test 'emailが空欄の場合はユーザーを作成できない' do
    before_count = User.count

    post '/user', params: { user: { email: ' ', name: 'Alice', password: 'password', password_confirmation: 'password'} }
    assert_response 400
    json = JSON.parse(response.body)

    assert_equal 'アカウントが作成できませんでした。', json['message']
    assert_nil json['data']['user']
    assert_equal before_count, User.count
  end

  test 'nameが空欄の場合はユーザーを作成できない' do
    before_count = User.count

    post '/user', params: { user: { email: 'alice@example.com', name: ' ', password: 'password', password_confirmation: 'password'} }
    assert_response 400
    json = JSON.parse(response.body)

    assert_equal 'アカウントが作成できませんでした。', json['message']
    assert_nil json['data']['user']
    assert_equal before_count, User.count
  end

  test 'passwordが空欄の場合はユーザーを作成できない' do
    before_count = User.count

    post '/user', params: { user: { email: 'alice@example.com', name: 'Alice', password: ' ', password_confirmation: ' '} }
    assert_response 400
    json = JSON.parse(response.body)

    assert_equal 'アカウントが作成できませんでした。', json['message']
    assert_nil json['data']['user']
    assert_equal before_count, User.count
  end
end
