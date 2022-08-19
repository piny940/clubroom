require "test_helper"

class TalkEntryTest < ActiveSupport::TestCase
  def setup
    @user = users('alice')
    @group1 = groups('group1')
  end

  test "正常にTalkEntryを作成できる" do
  end
end
