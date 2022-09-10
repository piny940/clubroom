class Member::Groups:::TalkEntriesController < Member::Groups::Base
  def create
    talkroom = Talkroom.find(params[:talkroom_id])
    
  end
end
