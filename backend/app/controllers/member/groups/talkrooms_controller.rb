class Member::Groups::TalkroomsController < Member::Groups::Base
  def index
    talkrooms = @group.talkrooms.filter { |room| room.members.include?(current_user) }

    render json: {
      data: {
        talkrooms:
      }
    }, status: :ok
  end

  def create
    # Group's talkroom
    talkroom = @group.talkrooms.new(name: talkroom_params[:name])
    
    if talkroom.save
      talkroom.members << current_user
      talk_entry = current_user.talk_entries.find_by(talkroom_id: talkroom.id)
      talk_entry.role = 'staff'
      talk_entry.save!
      
      render json: {
        message: "トークルームを作成しました。",
        data: {
          talkroom: talkroom,
          talk_entry: talk_entry
        }
      }, status: :ok
    else
      render json: {
        message: "トークルームを作成できませんでした。",
        data: {
          talkroom: nil
        }
      }, status: 400
    end
  end

  def destroy
    talkroom = current_user.talkrooms.find(params[:id])
    talkroom.destroy
    render json: {
      message: 'トークルームを削除しました。'
    }, status: :ok
  end

  private

  def talkroom_params
    params.require(:talkroom).permit(:name)
  end
end
