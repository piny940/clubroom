class Member::Groups::Talkrooms::Base < Member::Groups::Base
  before_action :set_talkroom
  
  private

  def set_talkroom
    @talkroom = Talkroom.find(params[:talkroom_id])

    if @group.talkrooms.exclude?(@talkroom)
      render json: {
        message: '指定されたグループにこのトークルームはありません。'
      }, status: 400
    end

    if @talkroom.members.exclude?(current_user)
      render json: {
        message: 'このトークルームのメンバーではありません。'
      }, status: 400
    end
  end
end
