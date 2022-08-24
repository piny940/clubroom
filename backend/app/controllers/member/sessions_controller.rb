class Member::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in user
      render json: { message: 'ログインしました。'}, status: :ok
    else
      render json: { message: 'メールアドレスまたはパスワードが違います。'}, status: 400
    end
  end

  def destroy
    sign_out current_user
    render json: { message: 'ログアウトしました。'}, status: :ok
  end
end