class Member::GroupsController < Member::Base
  include GroupsHelper

  def index
    render json: {
      data: {
        groups: current_user.groups
      }
    }, status: :ok
  end

  def create
    group = current_user.groups.new(group_params)

    if group.save
      joining = current_user.joinings.find_by(group_id: group.id)
      joining.role = 'admin'
      joining.save!

      render json: {
        data: {
          group:,
          joining:
        },
        message: 'グループを作成しました。'
      }, status: :ok
    else
      render json: {
        data: {
          group: nil
        },
        message: 'グループを作成できませんでした。'
      }, status: :bad_request
    end
  end

  def update
    
  end

  def show

  end

  def destroy

  end

  private

  def group_params
    params.require(:group).permit(:name, :school)
  end
end
