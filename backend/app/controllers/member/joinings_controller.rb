class Member::JoiningsController < Member::Base
  def show
    render json: {
      data: {
        joining: current_user.joinings.find_by(group_id: params[:group_id])
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
          group: group,
          joining: joining
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
          group: group,
          joining: joining
        }
      }, status: :ok
    else
      render json: {
        message: 'トークンが違います。'
      }, status: :bad_request
    end
  end
end
