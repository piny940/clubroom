class Admin::TalkEntriesController < Admin::Base
  before_action :set_talk_entry, only: %i[show edit update destroy]

  def index
    @talk_entries = TalkEntry.all
  end

  def show; end

  def new
    @talk_entry = TalkEntry.new
  end

  def edit; end

  def create
    @talk_entry = TalkEntry.new(talk_entry_params)

    if @talk_entry.save
      redirect_to admin_talk_entries_path, notice: 'Talk entryが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @talk_entry.update(talk_entry_params)
      redirect_to admin_talk_entry_path(@talk_entry), notice: 'Talk entryが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @talk_entry.destroy
    redirect_to admin_talk_entries_path, notice: 'Talk entryが削除されました。'
  end

  private

  def set_talk_entry
    @talk_entry = TalkEntry.find(params[:id])
  end

  def talk_entry_params
    params.require(:talk_entry).permit(:talkroom_id, :user_id, :role)
  end
end
