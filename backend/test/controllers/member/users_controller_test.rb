require 'test_helper'

class Member::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
  end

  test 'ログインしていない状態では400を返す' do
    patch '/member/user'
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'ログインしてください。', json['message']
  end

  test 'ユーザーの情報を正常に更新できる' do
    sign_in @user

    patch '/member/user', params: { user: { name: 'michael' } }
    assert_response :success
    json = JSON.parse(response.body)
    
    assert_equal 'michael', json['data']['user']['name']
  end

  test '更新後のユーザーの情報が不適切である場合は400を返す' do
    sign_in @user

    patch '/member/user', params: { user: { name: ' ' } }
    assert_response 400
    json = JSON.parse(response.body)
    
    assert_equal 'ユーザー情報を更新できませんでした。', json['message']
  end

  test 'ユーザーを削除できる' do
    sign_in @user

    delete '/member/user'
    assert_response :success
    json = JSON.parse(response.body)

    assert_equal 'ユーザーを削除しました。', json['message']
    assert_nil json['data']['user']
  end
end
