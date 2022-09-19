module GroupsHelper
  def check_role_staff!
    set_group

    joining = current_user.joinings.find_by(group_id: @group.id)
    if !joining.role_staff?
      render json: {
        message: '権限がありません。'
      }, status: 400
    end
  end
end
