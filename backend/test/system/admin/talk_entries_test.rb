require 'application_system_test_case'

class Admin::TalkEntriesTest < ApplicationSystemTestCase
  setup do
    @admin_talk_entry = admin_talk_entries(:one)
  end

  test 'visiting the index' do
    visit admin_talk_entries_url
    assert_selector 'h1', text: 'Talk entries'
  end

  test 'should create talk entry' do
    visit admin_talk_entries_url
    click_on 'New talk entry'

    fill_in 'Talkroom', with: @admin_talk_entry.talkroom_id
    fill_in 'User', with: @admin_talk_entry.user_id
    click_on 'Create Talk entry'

    assert_text 'Talk entry was successfully created'
    click_on 'Back'
  end

  test 'should update Talk entry' do
    visit admin_talk_entry_url(@admin_talk_entry)
    click_on 'Edit this talk entry', match: :first

    fill_in 'Talkroom', with: @admin_talk_entry.talkroom_id
    fill_in 'User', with: @admin_talk_entry.user_id
    click_on 'Update Talk entry'

    assert_text 'Talk entry was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Talk entry' do
    visit admin_talk_entry_url(@admin_talk_entry)
    click_on 'Destroy this talk entry', match: :first

    assert_text 'Talk entry was successfully destroyed'
  end
end
