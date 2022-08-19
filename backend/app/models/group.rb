class Group < ApplicationRecord
  validates :name, presence: true
  has_many :joinings
  has_many :members, through: :joinings, source: :user
end
