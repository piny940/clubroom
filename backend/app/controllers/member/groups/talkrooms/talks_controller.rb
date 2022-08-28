class Member::Groups::Talkrooms::TalksController < Member::Groups::Talkrooms::Base
  def index
    render json: {
      data: {
        talks: @talkroom.talks
      }, status: :ok
    }
  end
end
