class Group < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :university }
  has_many :joinings, dependent: :destroy
  has_many :members, through: :joinings, source: :user
  has_many :talkrooms, dependent: :destroy
end
