class Member::Groups::TalkroomsController < Member::Groups::Base
  def index
    talkrooms = @group.talkrooms.filter { |room| room.members.include?(current_user) }

    render json: {
      data: {
        talkrooms:
      }
    }, status: :ok
  end
end
