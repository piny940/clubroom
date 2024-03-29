require 'test_helper'

class Member::Groups::TalkroomsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
    @group1.members << @user
    @room1 = @group1.talkrooms.create!(name: 'room1')
    @room2 = @group1.talkrooms.create!(name: 'room2')
    @room1.members << @user
  end

  test '指定されたグループに所属していない場合は400を返す' do
    sign_in @user

    get "/member/groups/#{@group2.id}/talkrooms"
    assert_response 400
    json = JSON.parse(response.body)
    assert_equal 'このグループには所属していません。', json['message']
  end

  test '指定されたグループのトークルームの中で、自身が入っているものだけを取得できる' do
    sign_in @user

    get "/member/groups/#{@group1.id}/talkrooms"
    assert_response 200
    json = JSON.parse(response.body)

    assert_equal @room1.name, json['data']['talkrooms'][0]['name']
    assert_equal 1, json['data']['talkrooms'].length
  end

  test '正常に自身が入っているグループのトークルームを作成できる' do
    sign_in @user
    before_count = Talkroom.count
    before_user_talkroom_count = @user.talkrooms.length
    before_group_talkroom_count = @group1.talkrooms.length

    post "/member/groups/#{@group1.id}/talkrooms", params: { talkroom: { name: 'Test' } }

    assert_response :success
    json = JSON.parse(response.body)
    @user.reload
    @group1.reload

    assert_equal before_count + 1, Talkroom.count
    assert_equal before_user_talkroom_count + 1, @user.talkrooms.length
    assert_equal before_group_talkroom_count + 1, @group1.talkrooms.length
    assert_equal 'Test', json['data']['talkroom']['name']
    assert_equal 'group', json['data']['talkroom']['kind']
    assert_equal 'staff', json['data']['talk_entry']['role']
    assert @user.talk_entries.find_by(talkroom_id: json['data']['talkroom']['id']).role_staff?
  end

  test '自身の入っていないグループのトークルームは作成できない' do
    sign_in @user
    before_count = Talkroom.count

    post "/member/groups/#{@group2.id}/talkrooms", params: { talkroom: { name: 'Test' } }

    assert_response 400
    json = JSON.parse(response.body)

    assert_equal json['message'], 'このグループには所属していません。'
    assert_equal before_count, Talkroom.count
  end

  test 'トークルームを削除できる' do
    sign_in @user
    talk_entry = @user.talk_entries.find_by(talkroom_id: @room1.id)
    talk_entry.role = 'staff'
    talk_entry.save!

    before_count = Talkroom.count
    before_group_talkroom_count = @group1.talkrooms.length

    delete "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}"

    assert_response :success

    @group1.reload
    assert_equal before_count - 1, Talkroom.count
    assert_equal before_group_talkroom_count - 1, @group1.talkrooms.length
  end

  test 'roleがstaffでない場合はトークルームを削除できない' do
    sign_in @user

    before_count = Talkroom.count
    before_group_talkroom_count = @group1.talkrooms.length

    delete "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}"

    assert_response 400
    json = JSON.parse(response.body)

    @group1.reload
    assert_equal before_count, Talkroom.count
    assert_equal before_group_talkroom_count, @group1.talkrooms.length
    assert_equal '権限がありません。', json['message']
  end

  test 'トークルームを更新できる' do
    new_name = 'NewName'
    sign_in @user
    talk_entry = @user.talk_entries.find_by(talkroom_id: @room1.id)
    talk_entry.role = 'staff'
    talk_entry.save!

    patch "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}", params: { talkroom: { name: new_name } }

    assert_response :success
    json = JSON.parse(response.body)

    assert_equal new_name, json['data']['talkroom']['name']
    assert_equal new_name, Talkroom.find(@room1.id).name
  end

  test 'roleがstaffでない場合はトークルームを更新できない' do
    sign_in @user

    patch "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}", params: { talkroom: { name: 'NewName' } }

    assert_response 400
    json = JSON.parse(response.body)

    assert_equal '権限がありません。', json['message']
  end

  test '更新後のトークルームの内容が不適切である場合は更新に失敗する' do
    sign_in @user
    sign_in @user
    talk_entry = @user.talk_entries.find_by(talkroom_id: @room1.id)
    talk_entry.role = 'staff'
    talk_entry.save!

    patch "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}", params: { talkroom: { name: ' ' } }

    assert_response 400
    json = JSON.parse(response.body)

    assert_equal 'room1', json['data']['talkroom']['name']
    assert_equal 'room1', Talkroom.find(@room1.id).name
  end
end
