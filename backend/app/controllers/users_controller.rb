class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[update destroy]

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

  def update
    if current_user.update(user_params_without_password)
      render json: {
        data: {
          user: current_user
        },
        message: 'ユーザー情報を更新しました。'
      }, status: :ok
    else
      render json: {
        data: {
          user: User.find(current_user.id)
        },
        message: 'ユーザー情報を更新できませんでした。'
      }, status: :bad_request
    end
  end

  def destroy
    current_user.destroy

    render json: {
      message: 'ユーザーを削除しました。',
      data: {
        user: nil
      }
    }, status: :ok
  end

  private

  def user_params
    permits = %i[email name kind global_profile global_icon school birth_date gender]
    permits += %i[password password_confirmation] if params[:user][:password].present?
    params.require(:user).permit(*permits)
  end
end
