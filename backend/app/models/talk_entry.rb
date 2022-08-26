class TalkEntry < ApplicationRecord
  belongs_to :talkroom
  belongs_to :user

  validate :entry_count_within_limit?
  validate :can_user_join?

  private

  def entry_count_within_limit?
    errors.add(:base, 'talk entry count limit') if talkroom.kind_direct? && talkroom.talk_entries.count >= 2
  end

  def can_user_join?
    errors.add(:base, 'user need to join the group') if talkroom.kind_group? && !talkroom.group.members.include?(user)
  end
end
