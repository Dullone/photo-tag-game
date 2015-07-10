class PhotoTagGameController < ApplicationController
  include PhotoTagGameHelper
  include ApplicationHelper

  def show
    @photo_name = "photo.jpg"
    @photo = GamePhoto.where(name: @photo_name).first
    @key = getSession
    @characters = charactersToData @photo.characterTags
    sessionStoreCharactersLeft @characters
    photo_id = GamePhoto.where(name: "photo.jpg").first.id
    @highScores = GamePhoto.find(photo_id).highScores.limit(5)
  end

  def guess
    @key = params[:key]
    respond_to do |format|
      feedback = false
      if checkForCharacter(params)
        feedback = true
        correctCharacterGuess params[:character]
      end
      format.json { render json: { 
        feedback: feedback, 
        character: params[:character],
        key: getSession,
        wonGame: wonGame?,
        remaining: remainingCharacters
        } 
      }
    end
  end

end
