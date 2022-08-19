require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(kind: :member, email: "test@gmail.com",
      password: "test1234", password_confirmation: "test1234")
  end

  test "正常にUserを作成できる" do
    assert @user.valid?
  end

  test "emailなしではUserを作成できない" do
    @user.email = ""
    assert_not @user.valid?
  end

  test "同じemailのユーザーを複数作ることはできない" do
    dup = @user.dup
    @user.save
    assert_not dup.valid?
  end
end
