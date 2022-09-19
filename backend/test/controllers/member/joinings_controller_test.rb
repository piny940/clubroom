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
end
