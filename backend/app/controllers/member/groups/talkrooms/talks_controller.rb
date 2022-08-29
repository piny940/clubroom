class Member::Groups::Talkrooms::TalksController < Member::Groups::Talkrooms::Base
  def index
    render json: {
      data: {
        talks: @talkroom.talks
      }
    }, status: :ok
  end

  def create
    if !talk_params[:content].present?
      render json: {
        message: 'トークのcontentを入力してください'
      }, status: 400
      return
    end

    talk = @talkroom.talks.new(from_user: current_user, content: talk_params[:content])

    if talk.save
      render json: {
        message: 'トークを作成しました。',
        data: {
          talk: talk
        }
      }, status: :ok
    else
      render json: {
        message: 'トークを作成できませんでした。'
      }, status: 400
    end
  end

  private

  def talk_params
    params.require(:talk).permit(:content)
  end
end
