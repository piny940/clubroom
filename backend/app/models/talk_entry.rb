class TalkEntry < ApplicationRecord  
  belongs_to :talkroom
  belongs_to :user

  validate :entry_count_within_limit?

  private

    def entry_count_within_limit?
      errors.add(:base, "talk entry count limit") if talkroom.kind_direct? || talkroom.entries.count >= 2 
    end
end
