require 'test_helper'

class JoiningTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'john', email: 'john@example.com', password: 'password', password_confirmation: 'password')
    @group1 = Group.create!(name: 'group1')
    @group2 = Group.create!(name: 'group2')
    @joining = Joining.new(user_id: @user.id, group_id: @group1.id)
  end

  test '正常にJoiningを作成できる' do
    assert @joining.valid?
  end

  test '存在しないuserのidを指定してもJoiningは作成できない' do
    @joining.user_id = -1
    assert_not @joining.valid?
  end

  test 'User側からJoiningが作成できる' do
    joining = @user.joinings.create(group_id: @group1.id)
    assert joining.save
  end

  test 'Groupを指定しないとUser側からJoiningは作成できない' do
    joining = @user.joinings.create
    assert_not joining.save
  end

  test 'User側から直接GroupとのJoiningを作成・削除できる' do
    before_count = @user.groups.length
    before_joining_count = Joining.count
    @user.groups << @group1
    assert_equal before_count + 1, @user.groups.length
    assert_equal before_joining_count + 1, Joining.count

    @user.groups.delete(@group1)
    assert_equal before_count, @user.groups.length
    assert_equal before_joining_count, Joining.count
  end

  test '同じUser, Group間で複数のJoiningを作成することはできない' do
    @joining.save
    dup = @joining.dup
    assert_not dup.valid?
  end

  test '1つのUserでも複数のGroupに参加できる' do
    before_count = @user.groups.length
    @group1.members << @user
    @group2.members << @user
    @user.reload
    assert_equal before_count + 2, @user.groups.length
  end

  test 'Groupが削除されるとそのGroupのJoiningは全て削除される' do
    @group1.members << @user
    before_count = Joining.count
    before_john_groups_count = @user.groups.length

    @group1.destroy
    @user.reload
    assert_equal before_count - 1, Joining.count
    assert_equal before_john_groups_count - 1, @user.groups.length
  end

  test 'Userが削除されるとそのUserのJoiningは全て削除される' do
    @user.groups << @group1
    before_count = Joining.count
    before_group1_members_count = @group1.members.length

    @user.destroy
    @group1.reload
    assert_equal before_count - 1, Joining.count
    assert_equal before_group1_members_count - 1, @group1.members.length
  end
end
