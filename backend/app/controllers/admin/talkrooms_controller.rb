class Admin::TalkroomsController < Admin::Base
  before_action :set_talkroom, only: %i[show edit update destroy]

  def index
    @talkrooms = Talkroom.all
  end

  def show; end

  def new
    @talkroom = Talkroom.new
  end

  def edit; end

  def create
    @talkroom = Talkroom.new(talkroom_params)

    if @talkroom.save
      redirect_to admin_talkrooms_path, notice: 'Talkroomが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @talkroom.update(talkroom_params)
      redirect_to admin_talkroom_path(@talkroom), notice: 'Talkroomが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @talkroom.destroy
    redirect_to admin_talkrooms_path, notice: 'Talkroomが削除されました。'
  end

  private

  def set_talkroom
    @talkroom = Talkroom.find(params[:id])
  end

  def talkroom_params
    params.require(:talkroom).permit(:name, :group_id)
  end
end
