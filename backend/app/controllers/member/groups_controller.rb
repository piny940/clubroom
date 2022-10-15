class Member::GroupsController < Member::Base
  before_action -> { set_group!(params[:id]) }, only: %i[show update destroy]
  before_action -> { check_group_role_staff!(params[:id]) }, only: %i[update destroy]

  def index
    render json: {
      data: {
        groups: current_user.groups.serialized
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
          group: group.serialized,
          joining: joining.serialized
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
        group: @group.serialized
      }
    }, status: :ok
  end

  def update
    if @group.update(group_params)
      render json: {
        data: {
          group: @group.serialized
        },
        message: 'グループの情報を更新しました。'
      }, status: :ok
    else
      render json: {
        message: 'グループの情報を更新できませんでした。',
        data: {
          group: @group.reload.serialized
        }
      }, status: :bad_request
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
end
