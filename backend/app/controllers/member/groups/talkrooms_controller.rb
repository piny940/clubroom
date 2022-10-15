class Member::Groups::TalkroomsController < Member::Groups::Base
  before_action lambda {
    set_talkroom!(params[:id])
    check_talkroom_role_staff!(params[:id])
  }, only: %i[update destroy]

  def index
    talkrooms = current_user.talkrooms.where(group_id: @group.id)

    render json: {
      data: {
        talkrooms: talkrooms.serialized
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
        message: 'トークルームを作成しました。',
        data: {
          talkroom: talkroom.serialized,
          talk_entry: talk_entry.serialized
        }
      }, status: :ok
    else
      render json: {
        message: 'トークルームを作成できませんでした。',
        data: {
          talkroom: nil
        }
      }, status: :bad_request
    end
  end

  def update
    if @talkroom.update(talkroom_params)
      render json: {
        message: 'トークルームを更新しました。',
        data: {
          talkroom: @talkroom.serialized
        }, status: :ok
      }
    else
      render json: {
        message: 'トークルームを更新できませんでした。',
        data: {
          talkroom: @talkroom.reload.serialized
        }
      }, status: :bad_request
    end
  end

  def destroy
    @talkroom.destroy
    render json: {
      message: 'トークルームを削除しました。'
    }, status: :ok
  end

  private

  def talkroom_params
    params.require(:talkroom).permit(:name)
  end
end
