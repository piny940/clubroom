class Admin::TalksController < ApplicationController
  before_action :set_talk, only: %i[ show edit update destroy ]

  def index
    @talks = Talk.all
  end

  def show; end

  def new
    @talk = Talk.new
  end

  def edit; end

  def create
    @talk = Talk.new(talk_params)

    if @talk.save
      redirect_to admin_talks_path, notice: "Talkが作成されました。"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @talk.update(talk_params)
      redirect_to @talk, notice: "Talkが更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @talk.destroy
    redirect_to admin_talks_path, notice: "Talkが削除されました。"
  end

  private

  def set_talk
    @talk = Talk.find(params[:id])
  end

  def talk_params
    params.require(:talk).permit(:user_id, :talkroom_id, :content)
  end
end
