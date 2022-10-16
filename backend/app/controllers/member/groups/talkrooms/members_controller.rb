class Member::Groups::Talkrooms::MembersController < Member::Groups::Talkrooms::Base
  def index
    render json: {
      data: {
        members: @talkroom.members.serialized
      }
    }, status: :ok
  end
end
