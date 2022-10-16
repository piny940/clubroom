class Member::Groups::MembersController < Member::Groups::Base
  def index
    render json: {
      data: {
        members: @group.members.serialized
      }
    }, status: :ok
  end
end
