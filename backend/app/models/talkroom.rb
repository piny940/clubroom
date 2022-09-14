require 'securerandom'

class Talkroom < ApplicationRecord
  has_many :talk_entries, dependent: :destroy, inverse_of: :talkroom
  has_many :members, through: :talk_entries, source: :user
  has_many :talks, dependent: :destroy
  belongs_to :group, optional: true

  validates :group_id, presence: true, if: :kind_group?
  validates :entry_token, presence: true, if: :kind_group?
  validates :name, presence: true, if: :kind_group?

  before_validation :set_token, on: :create

  enum kind: { group: 0, direct: 10 }, _prefix: true

  def set_token
    self.entry_token = SecureRandom.hex(10)
  end
end
