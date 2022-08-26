require 'application_system_test_case'

class Admin::JoiningsTest < ApplicationSystemTestCase
  setup do
    @admin_joining = admin_joinings(:one)
  end

  test 'visiting the index' do
    visit admin_joinings_url
    assert_selector 'h1', text: 'Joinings'
  end

  test 'should create joining' do
    visit admin_joinings_url
    click_on 'New joining'

    fill_in 'Group', with: @admin_joining.group_id
    fill_in 'Role', with: @admin_joining.role
    fill_in 'User', with: @admin_joining.user_id
    click_on 'Create Joining'

    assert_text 'Joining was successfully created'
    click_on 'Back'
  end

  test 'should update Joining' do
    visit admin_joining_url(@admin_joining)
    click_on 'Edit this joining', match: :first

    fill_in 'Group', with: @admin_joining.group_id
    fill_in 'Role', with: @admin_joining.role
    fill_in 'User', with: @admin_joining.user_id
    click_on 'Update Joining'

    assert_text 'Joining was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Joining' do
    visit admin_joining_url(@admin_joining)
    click_on 'Destroy this joining', match: :first

    assert_text 'Joining was successfully destroyed'
  end
end
