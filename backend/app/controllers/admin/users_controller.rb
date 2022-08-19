class Admin::UsersController < Admin::Base
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /admin/users or /admin/users.json
  def index
    @users = User.all
  end

  # GET /admin/users/1 or /admin/users/1.json
  def show
  end

  # GET /admin/users/new
  def new
    @user = User.new
  end

  # GET /admin/users/1/edit
  def edit
  end

  # POST /admin/users or /admin/users.json
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_users_path, notice: "ユーザーを作成しました"
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin/users/1 or /admin/users/1.json
  def update
    if @user.update(user_params)
      redirect_to admin_user_path(@user), notice: "Userが更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /admin/users/1 or /admin/users/1.json
  def destroy
    @user.destroy

    redirect_to admin_users_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :kind)
    end
end
