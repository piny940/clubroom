require 'application_system_test_case'

class Admin::GroupsTest < ApplicationSystemTestCase
  setup do
    @admin_group = admin_groups(:one)
  end

  test 'visiting the index' do
    visit admin_groups_url
    assert_selector 'h1', text: 'Groups'
  end

  test 'should create group' do
    visit admin_groups_url
    click_on 'New group'

    fill_in 'Name', with: @admin_group.name
    click_on 'Create Group'

    assert_text 'Group was successfully created'
    click_on 'Back'
  end

  test 'should update Group' do
    visit admin_group_url(@admin_group)
    click_on 'Edit this group', match: :first

    fill_in 'Name', with: @admin_group.name
    click_on 'Update Group'

    assert_text 'Group was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Group' do
    visit admin_group_url(@admin_group)
    click_on 'Destroy this group', match: :first

    assert_text 'Group was successfully destroyed'
  end
end
