require "test_helper"

class Admin::JoiningsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_joining = admin_joinings(:one)
  end

  test "should get index" do
    get admin_joinings_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_joining_url
    assert_response :success
  end

  test "should create admin_joining" do
    assert_difference("Admin::Joining.count") do
      post admin_joinings_url, params: { admin_joining: { group_id: @admin_joining.group_id, role: @admin_joining.role, user_id: @admin_joining.user_id } }
    end

    assert_redirected_to admin_joining_url(Admin::Joining.last)
  end

  test "should show admin_joining" do
    get admin_joining_url(@admin_joining)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_joining_url(@admin_joining)
    assert_response :success
  end

  test "should update admin_joining" do
    patch admin_joining_url(@admin_joining), params: { admin_joining: { group_id: @admin_joining.group_id, role: @admin_joining.role, user_id: @admin_joining.user_id } }
    assert_redirected_to admin_joining_url(@admin_joining)
  end

  test "should destroy admin_joining" do
    assert_difference("Admin::Joining.count", -1) do
      delete admin_joining_url(@admin_joining)
    end

    assert_redirected_to admin_joinings_url
  end
end
