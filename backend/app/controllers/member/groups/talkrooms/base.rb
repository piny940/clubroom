class Member::Groups::Talkrooms::Base < Member::Groups::Base
  before_action -> { set_talkroom!(params[:talkroom_id]) }
end
