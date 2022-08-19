class TalkEntry < ApplicationRecord
  belongs_to :talkroom
  belongs_to :user
end
