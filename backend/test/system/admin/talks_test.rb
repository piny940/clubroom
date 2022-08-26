require 'application_system_test_case'

class Admin::TalksTest < ApplicationSystemTestCase
  setup do
    @admin_talk = admin_talks(:one)
  end

  test 'visiting the index' do
    visit admin_talks_url
    assert_selector 'h1', text: 'Talks'
  end

  test 'should create talk' do
    visit admin_talks_url
    click_on 'New talk'

    fill_in 'Content', with: @admin_talk.content
    fill_in 'Talkroom', with: @admin_talk.talkroom_id
    fill_in 'User', with: @admin_talk.user_id
    click_on 'Create Talk'

    assert_text 'Talk was successfully created'
    click_on 'Back'
  end

  test 'should update Talk' do
    visit admin_talk_url(@admin_talk)
    click_on 'Edit this talk', match: :first

    fill_in 'Content', with: @admin_talk.content
    fill_in 'Talkroom', with: @admin_talk.talkroom_id
    fill_in 'User', with: @admin_talk.user_id
    click_on 'Update Talk'

    assert_text 'Talk was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Talk' do
    visit admin_talk_url(@admin_talk)
    click_on 'Destroy this talk', match: :first

    assert_text 'Talk was successfully destroyed'
  end
end
