class Member::Groups::Talkrooms::MembersController < Member::Groups::Talkrooms::Base
  def index
    render json: {
      data: {
        members: @talkroom.members
      }
    }, status: :ok
  end
end
