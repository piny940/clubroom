require "application_system_test_case"

class Admin::TalkroomsTest < ApplicationSystemTestCase
  setup do
    @admin_talkroom = admin_talkrooms(:one)
  end

  test "visiting the index" do
    visit admin_talkrooms_url
    assert_selector "h1", text: "Talkrooms"
  end

  test "should create talkroom" do
    visit admin_talkrooms_url
    click_on "New talkroom"

    fill_in "Group", with: @admin_talkroom.group_id
    fill_in "Name", with: @admin_talkroom.name
    click_on "Create Talkroom"

    assert_text "Talkroom was successfully created"
    click_on "Back"
  end

  test "should update Talkroom" do
    visit admin_talkroom_url(@admin_talkroom)
    click_on "Edit this talkroom", match: :first

    fill_in "Group", with: @admin_talkroom.group_id
    fill_in "Name", with: @admin_talkroom.name
    click_on "Update Talkroom"

    assert_text "Talkroom was successfully updated"
    click_on "Back"
  end

  test "should destroy Talkroom" do
    visit admin_talkroom_url(@admin_talkroom)
    click_on "Destroy this talkroom", match: :first

    assert_text "Talkroom was successfully destroyed"
  end
end
