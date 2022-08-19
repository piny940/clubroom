class Group < ApplicationRecord
  has_many :joinings
  has_many :members, through: :joinings, source: :user
end
