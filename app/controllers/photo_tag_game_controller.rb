class PhotoTagGameController < ApplicationController
  include PhotoTagGameHelper
  
  def show
    @photo_name = "photo.jpg"
    @photo = GamePhoto.where(name: @photo_name).first
    @characters = charactersToData @photo.characterTags
    photo_id = GamePhoto.where(name: "photo.jpg").first.id
    @highScores = GamePhoto.find(photo_id).highScores.limit(5)
  end

end
