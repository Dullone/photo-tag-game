module PhotoTagGameHelper
  
  def charactersToData(characters)
    data = []
    characters.each  do |character|
      data.push character.character
    end
    data
  end

end
