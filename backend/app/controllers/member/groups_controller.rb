class Member::GroupsController < Member::Base
  include GroupsHelper
  before_action :set_group, only: %i[show]
  before_action :check_role_staff!, only: %i[update destroy]

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

  def show
    render json: {
      data: {
        group: @group
      }
    }, status: :ok
  end

  def update
    if @group.update(group_params)
      render json: {
        data: {
          group: @group
        },
        message: 'グループの情報を更新しました。'
      }, status: :ok
    else
      render json: {
        message: 'グループの情報を更新できませんでした。',
        data: {
          group: Group.find(@group.id)
        }
      }, status: 400
    end
  end

  def destroy
    @group.destroy
    render json: {
      message: 'グループを削除しました。'
    }, status: :ok
  end

  private

  def group_params
    params.require(:group).permit(:name, :school)
  end

  def set_group
    @group = Group.find(params[:id])

    if @group.members.exclude?(current_user)
      render json: {
        message: 'このグループには所属していません。'
      }, status: :bad_request
    end
  end
end
