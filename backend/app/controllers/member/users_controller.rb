class Member::UsersController < Member::Base
  def update
    if current_user.update(user_params)
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
      }, status: 400
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
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end
end
