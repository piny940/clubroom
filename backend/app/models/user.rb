class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, length: { maximum: 255 }
  validates :name, presence: true, length: { maximum: 50 }

  enum kind: { member: 0, admin: 1 }, _prefix: true
  has_many :joinings, dependent: :destroy, inverse_of: :user
  has_many :groups, through: :joinings
  has_many :talk_entries, dependent: :destroy, inverse_of: :user
  has_many :talkrooms, through: :talk_entries
  has_many :talks, foreign_key: 'from_user_id', dependent: :nullify
end
