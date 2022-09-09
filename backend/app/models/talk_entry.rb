class TalkEntry < ApplicationRecord
  belongs_to :talkroom, inverse_of: :talk_entries
  belongs_to :user, inverse_of: :talk_entries

  validate :entry_count_within_limit?
  validate :can_user_join?

  enum role: { member: 0, staff: 10 }, _prefix: true

  private

  def entry_count_within_limit?
    errors.add(:base, 'talk entry count limit') if talkroom.kind_direct? && talkroom.talk_entries.count >= 2
  end

  def can_user_join?
    errors.add(:base, 'user need to join the group') if talkroom.kind_group? && talkroom.group.members.exclude?(user)
  end
end
