module PhotoTagGameHelper
  
  def charactersToData(characters)
    data = []
    characters.each  do |character|
      data.push character.character
    end
    data
  end

  #only used for game session
  def getSession()
    session[:id] ||= SecureRandom.base64
  end

  def correctCharacterGuess(name)
    session[:characters].delete(name)
  end

  def wonGame?
    return session[:characters].length == 0
  end

  def remainingCharacters
    return session[:characters].length
  end

  def sessionStoreCharactersLeft(characters)
    session[:characters] = characters
  end

  def checkForCharacter(params)
    photo   = GamePhoto.where(name: params[:photo]).first
    x       = params[:x]
    y       = params[:y]
    padding = 15;
    character = photo.characterTags.where(character: params[:character]).first

    if character
      if withinHitSquare(character.coordX, character.coordY, padding, x, y)
        return true
      end
    else
      return false
    end

  end

  def withinHitSquare(centerX, centerY, width, pointX, pointY)
    pointX = pointX.to_i
    pointY = pointY.to_i
    return pointX > centerX - width && pointX < centerX + width &&
           pointY > centerY - width && pointY < centerY + width
  end

end
