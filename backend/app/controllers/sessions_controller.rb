class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      sign_in user
      render json: { message: 'ログインしました。'}, status: :ok
    else
      render json: { message: 'メールアドレスまたはパスワードが違います。'}, status: 400
    end
  end

  def destroy
    signout current_user
    render json: { message: 'ログアウトしました。'}, status: :ok
  end
end