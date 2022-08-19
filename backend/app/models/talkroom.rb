class Talkroom < ApplicationRecord
  has_many :talk_entries, dependent: :destroy
  belongs_to :group, optional: true

  validates :group_id, presence: true, if: :kind_group?

  enum kind: { group: 0, direct: 10 }, _prefix: true
end
