class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      user.remember_me = params[:remember_me]
      sign_in user
      render json: { message: 'ログインしました。',
                     data: {
                       user:
                     } }, status: :ok
    else
      render json: { message: 'メールアドレスまたはパスワードが違います。' }, status: :bad_request
    end
  end

  def destroy
    sign_out current_user
    render json: { message: 'ログアウトしました。', data: {
      user: nil
    } }, status: :ok
  end
end
