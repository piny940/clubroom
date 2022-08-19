require "test_helper"

class Admin::TalkroomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_talkroom = admin_talkrooms(:one)
  end

  test "should get index" do
    get admin_talkrooms_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_talkroom_url
    assert_response :success
  end

  test "should create admin_talkroom" do
    assert_difference("Admin::Talkroom.count") do
      post admin_talkrooms_url, params: { admin_talkroom: { group_id: @admin_talkroom.group_id, name: @admin_talkroom.name } }
    end

    assert_redirected_to admin_talkroom_url(Admin::Talkroom.last)
  end

  test "should show admin_talkroom" do
    get admin_talkroom_url(@admin_talkroom)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_talkroom_url(@admin_talkroom)
    assert_response :success
  end

  test "should update admin_talkroom" do
    patch admin_talkroom_url(@admin_talkroom), params: { admin_talkroom: { group_id: @admin_talkroom.group_id, name: @admin_talkroom.name } }
    assert_redirected_to admin_talkroom_url(@admin_talkroom)
  end

  test "should destroy admin_talkroom" do
    assert_difference("Admin::Talkroom.count", -1) do
      delete admin_talkroom_url(@admin_talkroom)
    end

    assert_redirected_to admin_talkrooms_url
  end
end
