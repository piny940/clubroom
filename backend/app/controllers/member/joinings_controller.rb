class Member::JoiningsController < Member::Base
  before_action :set_joining, only: %i[show destroy]

  def show
    render json: {
      data: {
        joining: @joining&.serialized
      }
    }, status: :ok
  end

  def create
    group = Group.find(params[:group_id])
    if group.members.include? current_user
      joining = current_user.joinings.find_by(group_id: group.id)

      return render json: {
        message: 'このグループにはすでに参加しています。',
        data: {
          group: group.serialized,
          joining: joining.serialized
        }
      }, status: :ok
    end

    if group.entry_token == params[:entry_token]
      group.members << current_user
      group.set_token
      group.save!
      joining = current_user.joinings.find_by(group_id: group.id)

      render json: {
        message: 'グループに参加しました。',
        data: {
          group: group.serialized,
          joining: joining.serialized
        }
      }, status: :ok
    else
      render json: {
        message: 'トークンが違います。'
      }, status: :bad_request
    end
  end

  def destroy
    if @joining.nil?
      return render json: {
        message: 'このグループには属していません。'
      }, status: :bad_request
    end

    @joining.destroy

    render json: {
      message: 'グループから抜けました。'
    }, status: :ok
  end

  private

  def set_joining
    @joining = current_user.joinings.find_by(group_id: params[:group_id])
  end
end
