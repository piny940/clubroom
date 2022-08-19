require "test_helper"

class JoiningTest < ActiveSupport::TestCase
  def setup
    @john = users('john')
    @group1 = groups('group1')
    @group2 = groups('group2')
    @joining = Joining.new(user_id: @john.id, group_id: @group1.id)
  end

  test "正常にJoiningを作成できる" do
    assert @joining.valid?
  end

  test "存在しないuserのidを指定してもJoiningは作成できない" do
    @joining.user_id = -1
    assert_not @joining.valid?
  end

  test "User側からJoiningが作成できる" do
    joining = @john.joinings.create(group_id: @group1.id)
    assert joining.save
  end

  test "Groupを指定しないとUser側からJoiningは作成できない" do
    joining = @john.joinings.create()
    assert_not joining.save
  end

  test "User側から直接GroupとのJoiningを作成・削除できる" do
    before_count = @john.groups.length
    before_joining_count = Joining.count
    @john.groups << @group1
    assert_equal before_count+1, @john.groups.length
    assert_equal before_joining_count+1, Joining.count

    @john.groups.delete(@group1)
    assert_equal before_count, @john.groups.length
    assert_equal before_joining_count, Joining.count
  end

  test "同じUser, Group間で複数のJoiningを作成することはできない" do
    @joining.save
    dup = @joining.dup
    assert_not dup.valid?
  end

  test "1つのUserでも複数のGroupに参加できる" do
    before_count = @john.groups.length
    @group1.members << @john
    @group2.members << @john
    @john.reload
    assert_equal before_count+2, @john.groups.length
  end
end
