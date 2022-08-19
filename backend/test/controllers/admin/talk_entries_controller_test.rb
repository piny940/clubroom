require "test_helper"

class Admin::TalkEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_talk_entry = admin_talk_entries(:one)
  end

  test "should get index" do
    get admin_talk_entries_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_talk_entry_url
    assert_response :success
  end

  test "should create admin_talk_entry" do
    assert_difference("Admin::TalkEntry.count") do
      post admin_talk_entries_url, params: { admin_talk_entry: { talkroom_id: @admin_talk_entry.talkroom_id, user_id: @admin_talk_entry.user_id } }
    end

    assert_redirected_to admin_talk_entry_url(Admin::TalkEntry.last)
  end

  test "should show admin_talk_entry" do
    get admin_talk_entry_url(@admin_talk_entry)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_talk_entry_url(@admin_talk_entry)
    assert_response :success
  end

  test "should update admin_talk_entry" do
    patch admin_talk_entry_url(@admin_talk_entry), params: { admin_talk_entry: { talkroom_id: @admin_talk_entry.talkroom_id, user_id: @admin_talk_entry.user_id } }
    assert_redirected_to admin_talk_entry_url(@admin_talk_entry)
  end

  test "should destroy admin_talk_entry" do
    assert_difference("Admin::TalkEntry.count", -1) do
      delete admin_talk_entry_url(@admin_talk_entry)
    end

    assert_redirected_to admin_talk_entries_url
  end
end
