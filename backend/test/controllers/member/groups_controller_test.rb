require 'test_helper'

class Member::GroupsControllerTest < ActionDispatch::IntegrationTest
  test '正常にgroupsを取得できる' do
    user = users('miyuki')
    sign_in user
    get '/member/groups'
    assert_response :success
    json = JSON.parse(response.body)
    assert json['data']['groups']
    assert_not json['data']['groups'].empty?
  end

  test 'ログインしていない状態では400を返す' do
    get '/member/groups'
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal json['message'], 'ログインしてください。'
  end

  test 'どのグループにも属していない場合は空の配列をgroupsとして返す' do
    user = users('john')
    sign_in user
    get '/member/groups'
    assert_response :success
    json = JSON.parse(response.body)
    assert json['data']['groups'].empty?
  end

  test '正常に自身の属するグループを作成できる' do
    user = users('john')
    sign_in user
    before_count = user.groups.length
    before_groups_count = Group.count
    post '/member/groups', params: { group: { name: 'Test' } }
    assert_response :success
    json = JSON.parse(response.body)
    user.reload
    assert_equal before_groups_count + 1, Group.count
    assert_equal before_count + 1, user.groups.length
    assert_equal json['data']['group']['name'], 'Test'
  end

  test 'paramsに不備がある場合は400を返す' do
    user = users('john')
    sign_in user
    before_count = Group.count
    post '/member/groups', params: { group: { name: '' } }
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal before_count, Group.count
    assert_equal json['message'], 'グループを作成できませんでした。'
  end
end
