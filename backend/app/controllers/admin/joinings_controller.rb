class Admin::JoiningsController < Admin::Base
  before_action :set_joining, only: %i[ show edit update destroy ]

  def index
    @joinings = Joining.all
  end

  def show; end

  def new
    @joining = Joining.new
  end

  def edit; end

  def create
    @joining = Joining.new(joining_params)

    if @joining.save
      redirect_to [:admin, @joining], notice: "Joiningが作成されました。"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @joining.update(joining_params)
      redirect_to [:admin, @joining], notice: "Joiningが更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @joining.destroy
    redirect_to admin_joinings_path, notice: "Joiningが削除されました。"
  end

  private

  def set_joining
    @joining = Joining.find(params[:id])
  end

  def joining_params
    params.require(:joining).permit(:group_id, :user_id, :role)
  end
end
