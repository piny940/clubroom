require 'test_helper'

class Member::JoiningsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')

    sign_in @user
    @group1.members << @user
  end

  test 'Joiningを正常に取得できる' do
    get "/member/groups/#{@group1.id}/joining"

    assert_response :success
    json = JSON.parse(response.body)

    assert_equal @user.joinings.find_by(group_id: @group1.id).id, json['data']['joining']['id']
  end

  test '自身が属していないグループに対してはjoiningをnilとして返す' do
    get "/member/groups/#{@group2.id}/joining"

    assert_response :success
    json = JSON.parse(response.body)

    assert_nil json['data']['joining']
  end

  test '正常に正しいentry_tokenを用いてグループに参加できる' do
    before_count = @group2.members.length
    before_token = @group2.entry_token
    post "/member/groups/#{@group2.id}/joining", params: { entry_token: @group2.entry_token }

    assert_response :success
    json = JSON.parse(response.body)
    @group2.reload

    assert_equal before_count + 1, @group2.members.length
    assert_equal 'group2', json['data']['group']['name']
    assert_equal 'member', json['data']['joining']['role']
    assert_not_equal before_token, @group2.entry_token
  end

  test 'entry_tokenが間違っている場合グループに参加できない' do
    before_count = @group2.members.length
    before_token = @group2.entry_token
    post "/member/groups/#{@group2.id}/joining", params: { entry_token: 'wrong_token' }

    assert_response 400
    json = JSON.parse(response.body)
    @group2.reload

    assert_equal before_count, @group2.members.length
    assert_equal before_token, @group2.entry_token
    assert_equal 'トークンが違います。', json['message']
  end

  test 'すでにグループに参加している場合は200を返す' do
    @group2.members << @user
    before_count = @group2.members.length
    before_token = @group2.entry_token
    post "/member/groups/#{@group2.id}/joining", params: { entry_token: 'wrong_token' }

    assert_response :success
    json = JSON.parse(response.body)
    @group2.reload

    assert_equal before_count, @group2.members.length
    assert_equal before_token, @group2.entry_token
    assert_equal 'group2', json['data']['group']['name']
    assert_equal 'このグループにはすでに参加しています。', json['message']
  end
end
