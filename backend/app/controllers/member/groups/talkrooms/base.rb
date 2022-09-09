class Member::Groups::Talkrooms::Base < Member::Groups::Base
  before_action :set_talkroom

  private

  def set_talkroom
    @talkroom = Talkroom.find(params[:talkroom_id])

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
end
