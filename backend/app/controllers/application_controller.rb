class ApplicationController < ActionController::Base
  def authenticate_user!
    if current_user.nil?
      render json: {
        message: 'ログインしてください。'
      }, status: :bad_request
    end
  end

  def set_group!(group_id)
    @group = Group.find(group_id)

    if @group.members.exclude?(current_user)
      render json: {
        message: 'このグループには所属していません。'
      }, status: :bad_request
    end
  end

  def check_group_role_staff!(group_id)
    joining = current_user.joinings.find_by(group_id:)
    unless joining&.role_staff? || joining&.role_admin?
      render json: {
        message: '権限がありません。'
      }, status: :bad_request
    end
  end

  def set_talkroom!(talkroom_id)
    @talkroom = Talkroom.find(talkroom_id)

    if @group.talkrooms.exclude?(@talkroom)
      render json: {
        message: '指定されたグループにこのトークルームはありません。'
      }, status: :bad_request
    end

    if @talkroom.members.exclude?(current_user)
      render json: {
        message: 'このトークルームのメンバーではありません。'
      }, status: :bad_request
    end
  end

  def check_talkroom_role_staff!(talkroom_id)
    talk_entry = current_user.talk_entries.find_by(talkroom_id:)
    unless talk_entry&.role_staff?
      render json: {
        message: '権限がありません。'
      }, status: :bad_request
    end
  end
end
