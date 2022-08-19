class Talkroom < ApplicationRecord
  validates :group_id, presence: true, if: :kind_group?
  has_many :entries

  enum kind: { group: 0, direct: 10 }, _prefix: true
end
