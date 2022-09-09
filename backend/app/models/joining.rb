class Joining < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validates :user, uniqueness: { scope: :group }
  enum role: { member: 0, staff: 10, admin: 15, ob: 20, left: 30 }, _prefix: true
end
