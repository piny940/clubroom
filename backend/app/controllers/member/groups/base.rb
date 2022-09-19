class Member::Groups::Base < Member::Base
  include GroupsHelper
  before_action :set_group
end
