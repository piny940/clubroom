class Admin::UsersController < Admin::Base
  before_action :set_user, only: %i[show edit update destroy]

  def index
    @users = User.all
  end

  def show; end

  def new
    @user = User.new
  end

  def edit; end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_users_path, notice: 'ユーザーを作成しました'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      redirect_to admin_user_path(@user), notice: 'Userが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy

    redirect_to admin_users_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :email,
      :name,
      :kind,
      :global_profile,
      :global_icon,
      :school,
      :birth_date,
      :gender,
    )
  end
end
