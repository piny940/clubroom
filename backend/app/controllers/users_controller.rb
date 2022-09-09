class UsersController < ApplicationController
  def show
    render json: {
      data: {
        user: current_user
      }
    }, status: :ok
  end

  def create
    if User.find_by(email: user_params['email'])
      render json: {
        data: {
          user: nil
        },
        message: 'このメールアドレスはすでに使用されています。'
      }, status: :bad_request
      return
    end

    user = User.new(user_params)

    if user.save
      sign_in user
      render json: {
        data: {
          user:
        },
        message: 'アカウントが作成されました。'
      }, status: :ok
    else
      render json: {
        data: {
          user: nil
        },
        message: 'アカウントが作成できませんでした。'
      }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end
end
