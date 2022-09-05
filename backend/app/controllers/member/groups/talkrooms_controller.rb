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
    talkroom = Talkroom.new(name: talkroom_params[:name], group_id: params[:group_id])
    
    if talkroom.save
      talkroom.members << current_user
      
      render json: {
        message: "トークルームを作成しました。",
        data: {
          talkroom: talkroom
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

  private

  def talkroom_params
    params.require(:talkroom).permit(:name)
  end
end
