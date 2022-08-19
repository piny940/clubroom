require "test_helper"

class JoiningTest < ActiveSupport::TestCase
  def setup
    @alice = users('alice')
    @group1 = groups('group1')
    @group2 = groups('group2')
    @joining = Joining.new(user_id: @alice.id, group_id: @group1.id)
  end

  test "正常にJoiningを作成できる" do
    assert @joining.valid?
  end

  test "存在しないuserのidを指定してもJoiningは作成できない" do
    @joining.user_id = -1
    assert_not @joining.valid?
  end

  test "User側からJoiningが作成できる" do
    joining = @alice.joinings.create(group_id: @group1.id)
    assert joining.save
  end

  test "Groupを指定しないとUser側からJoiningは作成できない" do
    joining = @alice.joinings.create()
    assert_not joining.save
  end

  test "User側から直接GroupとのJoiningを作成・削除できる" do
    before_count = @alice.groups.length
    before_joining_count = Joining.count
    @alice.groups << @group1
    assert_equal before_count+1, @alice.groups.length
    assert_equal before_joining_count+1, Joining.count

    @alice.groups.delete(@group1)
    assert_equal before_count, @alice.groups.length
    assert_equal before_joining_count, Joining.count
  end

  test "同じUser, Group間で複数のJoiningを作成することはできない" do
    @joining.save
    dup = @joining.dup
    assert_not dup.valid?
  end

  test "1つのUserでも複数のGroupに参加できる" do
    before_count = @alice.groups.length
    @group1.members << @alice
    @group2.members << @alice
    @alice.reload
    assert_equal before_count+2, @alice.groups.length
  end
end
