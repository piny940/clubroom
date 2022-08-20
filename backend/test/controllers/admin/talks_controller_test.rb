require "test_helper"

class Admin::TalksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_talk = admin_talks(:one)
  end

  test "should get index" do
    get admin_talks_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_talk_url
    assert_response :success
  end

  test "should create admin_talk" do
    assert_difference("Admin::Talk.count") do
      post admin_talks_url, params: { admin_talk: { content: @admin_talk.content, talkroom_id: @admin_talk.talkroom_id, user_id: @admin_talk.user_id } }
    end

    assert_redirected_to admin_talk_url(Admin::Talk.last)
  end

  test "should show admin_talk" do
    get admin_talk_url(@admin_talk)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_talk_url(@admin_talk)
    assert_response :success
  end

  test "should update admin_talk" do
    patch admin_talk_url(@admin_talk), params: { admin_talk: { content: @admin_talk.content, talkroom_id: @admin_talk.talkroom_id, user_id: @admin_talk.user_id } }
    assert_redirected_to admin_talk_url(@admin_talk)
  end

  test "should destroy admin_talk" do
    assert_difference("Admin::Talk.count", -1) do
      delete admin_talk_url(@admin_talk)
    end

    assert_redirected_to admin_talks_url
  end
end
