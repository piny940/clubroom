class Talk < ApplicationRecord
  belongs_to :sent_by, class_name: "User"
  belongs_to :talkroom
end
