class HighScore < ActiveRecord::Base
  default_scope { order(:score) }
  validates :name, presence: true, length: { maximum: 10 }
  validates :score, presence: true
  belongs_to :gamePhoto
end
