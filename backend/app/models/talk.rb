class Talk < ApplicationRecord
  belongs_to :from_user, class_name: 'User', optional: true
  belongs_to :talkroom

  validates :content, presence: true
  validates :from_user, presence: true, on: :create
  validate :from_user_in_talkroom?

  def self.serialized
    all.as_json.map do |talk|
      talk.merge({
        from_user: User.find(talk["from_user_id"]).for_talk
      })
    end
  end

  private

  def from_user_in_talkroom?
    errors.add(:base, 'user need to join the talkroom') if !from_user.nil? && talkroom.members.exclude?(from_user)
  end
end
