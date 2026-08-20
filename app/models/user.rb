class User < ApplicationRecord
  validates :email_address, presence: true, uniqueness: { message: "A user with this email address already exists." }
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :stored_files, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
