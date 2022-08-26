class Member::GroupsController < Member::Base
  def index
    render json: {
      data: {
        groups: current_user.groups
      }
    }, status: :ok
  end

  def create
    group = current_user.groups.create(group_params)

    if group.id
      render json: {
        group:,
        message: 'グループを作成しました。'
      }, status: :ok
    else
      render json: {
        group: nil,
        message: 'グループを作成できませんでした。'
      }, status: :bad_request
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :school)
  end
end
