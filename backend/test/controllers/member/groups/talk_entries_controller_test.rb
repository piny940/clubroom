require 'test_helper'

class Member::Groups::TalkEntriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'alice', email: 'alice@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group1.members << @user
    @room1 = @group1.talkrooms.create!(name: 'room1')
    sign_in @user
  end

  test '正常にトークルームへの自身のTalkEntryを取得できる' do
    @room1.members << @user
    get "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}/talk_entry"

    assert_response :success
    json = JSON.parse(response.body)

    assert_equal @room1.talk_entries.find_by(user_id: @user.id).id, json['data']['talk_entry']['id']
  end

  test 'トークルームに属していない場合はTalkEntryはnilとして返ってくる' do
    get "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}/talk_entry"

    assert_response :success
    json = JSON.parse(response.body)

    assert_nil json['data']['talk_entry']
  end

  test '正常に正しいentry_tokenを用いてトークルームに参加できる' do
    before_count = @room1.members.length
    before_token = @room1.entry_token
    post "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}/talk_entry", params: { entry_token: @room1.entry_token }

    assert_response :success
    json = JSON.parse(response.body)
    @room1.reload

    assert_equal before_count + 1, @room1.members.length
    assert_equal 'room1', json['data']['talkroom']['name']
    assert_equal 'member', json['data']['talk_entry']['role']
    assert_not_equal before_token, @room1.entry_token
  end

  test 'entry_tokenが間違っている場合トークルームに参加できない' do
    before_count = @room1.members.length
    before_token = @room1.entry_token
    post "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}/talk_entry", params: { entry_token: 'wrong_token' }

    assert_response 400
    json = JSON.parse(response.body)
    @room1.reload

    assert_equal before_count, @room1.members.length
    assert_equal before_token, @room1.entry_token
    assert_equal 'トークンが違います。', json['message']
  end

  test 'すでにトークルームに参加している場合は200を返す' do
    @room1.members << @user
    before_count = @room1.members.length
    before_token = @room1.entry_token
    post "/member/groups/#{@room1.group.id}/talkrooms/#{@room1.id}/talk_entry", params: { entry_token: 'wrong_token' }

    assert_response :success
    json = JSON.parse(response.body)
    @room1.reload

    assert_equal before_count, @room1.members.length
    assert_equal before_token, @room1.entry_token
    assert_equal 'room1', json['data']['talkroom']['name']
    assert_equal 'このトークルームにはすでに参加しています。', json['message']
  end

  test '正常にトークルームから抜けることができる' do
    @room1.members << @user
    before_count = @room1.members.length

    delete "/member/groups/#{@group1.id}/talkrooms/#{@room1.id}/talk_entry"
    assert_response :success
    @room1.reload

    json = JSON.parse(response.body)

    assert_equal before_count - 1, @room1.members.length
    assert json['message']
  end

  test '入っていないトークルームから抜けようとすると400を返す' do
    before_count = @room1.members.length

    delete "/member/groups/#{@group1.id}/talkrooms/#{@room1.id}/talk_entry"
    assert_response 400
    @room1.reload

    json = JSON.parse(response.body)

    assert json['message']
    assert_equal before_count, @room1.members.length
  end
end
