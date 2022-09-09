class Member::Groups::Talkrooms::TalkEntriesController < Member::Groups::Talkrooms::Base
  def show
    render json: {
      data: {
        talk_entry: current_user.talk_entries.find_by(talkroom_id: @talkroom.id)
      }
    }, status: :ok
  end
end
