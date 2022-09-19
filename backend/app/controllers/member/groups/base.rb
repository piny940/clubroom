class Member::Groups::Base < Member::Base
  before_action -> { set_group!(params[:group_id]) }
end
