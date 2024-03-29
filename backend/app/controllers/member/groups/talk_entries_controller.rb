class Member::Groups::TalkEntriesController < Member::Groups::Base
  before_action :set_talk_entry, only: %i[show destroy]

  def show
    talkroom = Talkroom.find(params[:talkroom_id])

    if @group.talkrooms.exclude?(talkroom)
      return render json: {
        message: '指定されたグループにこのトークルームはありません。'
      }, status: :bad_request
    end

    render json: {
      data: {
        talk_entry: @talk_entry&.serialized
      }
    }, status: :ok
  end

  def create
    talkroom = Talkroom.find(params[:talkroom_id])
    if talkroom.members.include? current_user
      talk_entry = current_user.talk_entries.find_by(talkroom_id: talkroom.id)

      return render json: {
        message: 'このトークルームにはすでに参加しています。',
        data: {
          talkroom: talkroom.serialized,
          talk_entry: talk_entry.serialized
        }
      }, status: :ok
    end

    if talkroom.entry_token == params[:entry_token]
      talkroom.members << current_user
      talk_entry = current_user.talk_entries.find_by(talkroom_id: talkroom.id)

      render json: {
        message: 'トークルームに参加しました。',
        data: {
          talkroom: talkroom.serialized,
          talk_entry: talk_entry.serialized
        }
      }, status: :ok
    else
      render json: {
        message: 'トークンが違います。'
      }, status: :bad_request
    end
  end

  def destroy
    if @talk_entry.nil?
      return render json: {
        message: 'このトークルームには属していません。'
      }, status: :bad_request
    end

    @talk_entry.destroy

    render json: {
      message: 'トークルームから抜けました。'
    }
  end

  private

  def set_talk_entry
    @talk_entry = current_user.talk_entries.find_by(talkroom_id: params[:talkroom_id])
  end
end
