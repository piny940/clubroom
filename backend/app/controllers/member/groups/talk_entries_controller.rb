class Member::Groups::TalkEntriesController < Member::Groups::Base
  def create
    talkroom = Talkroom.find(params[:talkroom_id])
    if talkroom.entry_token == params[:entry_token]
      talkroom.members << current_user
      talkroom.set_token
      talkroom.save!
      talk_entry = current_user.talk_entries.find_by(talkroom_id: talkroom.id)
      
      render json: {
        message: 'トークルームに参加しました。',
        data: {
          talkroom: talkroom,
          talk_entry: talk_entry
        }
      }, status: :ok
    else
      render json: {
        message: 'トークンが違います。'
      }, status: :bad_request
    end
  end
end
