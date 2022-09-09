class Member::Groups::Talkrooms::TalksController < Member::Groups::Talkrooms::Base
  def index
    render json: {
      data: {
        talks: @talkroom.talks
      }
    }, status: :ok
  end

  def create
    if talk_params[:content].blank?
      render json: {
        message: 'トークのcontentを入力してください'
      }, status: :bad_request
      return
    end

    talk = @talkroom.talks.new(from_user: current_user, content: talk_params[:content])

    if talk.save
      render json: {
        message: 'トークを作成しました。',
        data: {
          talk:
        }
      }, status: :ok
    else
      render json: {
        message: 'トークを作成できませんでした。'
      }, status: :bad_request
    end
  end

  private

  def talk_params
    params.require(:talk).permit(:content)
  end
end
