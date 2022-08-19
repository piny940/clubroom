class Joining < ApplicationRecord
  belongs_to :user
  belongs_to :group
  enum role: { member: 0, staff: 10, ob: 20, left: 30 }
end
