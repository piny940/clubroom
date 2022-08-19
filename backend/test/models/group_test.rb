require "test_helper"

class GroupTest < ActiveSupport::TestCase
  def setup
    @group = Group.new(name: "Test")
  end

  test "正常にGroupを作成できる" do
    assert @group.valid?
  end

  test "nameなしではGroupを作成できない" do
    @group.name = ""
    assert_not @group.valid?
  end
end
