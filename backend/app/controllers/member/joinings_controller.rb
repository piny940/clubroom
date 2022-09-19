class Member::JoiningsController < Member::Base
  def show
    render json: {
      data: {
        joining: current_user.joinings.find_by(group_id: params[:group_id])
      }
    }, status: :ok
  end

  def create

  end
end
