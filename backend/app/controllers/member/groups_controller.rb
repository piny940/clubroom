class Member::GroupsController < Member::Base
  def index
    render json: {
      groups: current_user.groups
    }, status: :ok
  end

  def create
    group = current_user.groups.new(group_params)
    if group.save
      render json: {
        group: group,
        message: "グループを作成しました。"
      }, status: :ok
    else
      render json: {
        group: nil,
        message: "グループが作成できませんでした。"
      }
    end
  end

  private
  
  def group_params
    params.require(:group).permit(:name, :school)
  end
end