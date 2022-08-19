class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  validates :email, presence: true, length: { maximum: 255 }
  
  enum kind: { member: 0, admin: 1 }, _prefix: true
  has_many :joinings
  has_many :groups, through: :joinings
end
