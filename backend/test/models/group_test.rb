require 'test_helper'

class GroupTest < ActiveSupport::TestCase
  def setup
    @group = Group.new(name: 'Test')
  end

  test '正常にGroupを作成できる' do
    assert @group.valid?
  end

  test 'nameなしではGroupを作成できない' do
    @group.name = ''
    assert_not @group.valid?
  end

  test 'nameとschoolが同じGroupは複数作成できない' do
    @group.school = ''
    dup = @group.dup
    @group.save
    assert_not dup.valid?

    @group.school = 'Kyoto'
    dup = @group.dup
    assert @group.valid?
    @group.save
    assert_not dup.valid?
  end

  test '作成時にentry_tokenが生成される' do
    @group.save!
    assert_not_nil @group.entry_token
  end
end
