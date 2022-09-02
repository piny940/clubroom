class UsersController < ApplicationController
  def show
    render json: {
      data: {
        user: current_user
      }
    }, status: :ok
  end

  def create
    user = new User(user_params)

    if user.save
      sign_in user
      render json: {
        data: {
          user: user
        },
        message: 'アカウントが作成されました。'
      }, status: :ok
    else
      render json: {
        data: {
          user: nil
        },
        message: 'アカウントの作成に失敗しました。'
      }, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end
end
