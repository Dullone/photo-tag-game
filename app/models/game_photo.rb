class GamePhoto < ActiveRecord::Base
  has_many :characterTags
  has_many :highScores
  validates_uniqueness_of :name
end
