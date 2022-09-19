module GroupsHelper
  def set_group
    @group = Group.find(params[:group_id])

    if @group.members.exclude?(current_user)
      render json: {
        message: 'このグループには所属していません。'
      }, status: :bad_request
    end
  end
end
