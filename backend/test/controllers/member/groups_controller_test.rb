require 'test_helper'

class Member::GroupsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
  end

  test '正常に自身の属するグループのリストを取得できる' do
    @group1.members << @user

    sign_in @user
    get '/member/groups'
    assert_response :success
    json = JSON.parse(response.body)

    assert json['data']['groups'].length, 1
    assert json['data']['groups'][0]['name'], 'group1'
  end

  test 'ログインしていない状態では400を返す' do
    get '/member/groups'
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'ログインしてください。', json['message']
  end

  test 'どのグループにも属していない場合は空の配列をgroupsとして返す' do
    sign_in @user
    get '/member/groups'
    assert_response :success
    json = JSON.parse(response.body)
    assert json['data']['groups'].empty?
  end

  test '正常に自身の属するグループを作成できる' do
    sign_in @user
    before_count = @user.groups.length
    before_groups_count = Group.count
    before_joinings_count = Joining.count
    post '/member/groups', params: { group: { name: 'Test' } }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal before_groups_count + 1, Group.count
    assert_equal before_joinings_count + 1, Joining.count
    assert_equal before_count + 1, @user.groups.length
    assert_equal 'Test', json['data']['group']['name']
    assert_equal 'admin', json['data']['joining']['role']
    assert @user.joinings.find_by(group_id: json['data']['group']['id']).role_admin?
  end

  test 'paramsに不備がある場合は400を返す' do
    sign_in @user
    before_count = Group.count
    post '/member/groups', params: { group: { name: '' } }
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal before_count, Group.count
    assert_equal 'グループを作成できませんでした。', json['message']
  end

  test '正常にグループの情報を取得できる' do
    sign_in @user
    @group1.members << @user
    get "/member/groups/#{@group1.id}"
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'group1', json['data']['group']['name']
  end

  test '自身の属していないグループの情報は取得できない' do
    sign_in @user
    get "/member/groups/#{@group1.id}"
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'このグループには所属していません。', json['message']
  end

  test '正常にグループの情報を更新できる' do
    sign_in @user
    @user.joinings.create!(group_id: @group1.id, role: :staff)
    patch "/member/groups/#{@group1.id}", params: { group: { name: 'NewName' } }
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'グループの情報を更新しました。', json['message']
    assert_equal 'NewName', json['data']['group']['name']
  end

  test 'roleがstaffでないとグループの情報を更新できない' do
    sign_in @user
    @group1.members << @user
    patch "/member/groups/#{@group1.id}", params: { group: { name: 'NewName' } }
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal '権限がありません。', json['message']
  end

  test '正常にグループを削除できる' do
    sign_in @user
    @user.joinings.create!(group_id: @group1.id, role: :staff)
    delete "/member/groups/#{@group1.id}"
    assert_response :success
    json = JSON.parse(response.body)
    assert_equal 'グループを削除しました。', json['message']
  end

  test 'roleがstaffでないとグループを削除できない' do
    sign_in @user
    @user.joinings.create!(group_id: @group1.id)
    delete "/member/groups/#{@group1.id}"
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal '権限がありません。', json['message']
  end
end
