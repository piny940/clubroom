class Group < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :school }
  has_many :joinings, dependent: :destroy, inverse_of: :group
  has_many :members, through: :joinings, source: :user
  has_many :talkrooms, dependent: :destroy
end
