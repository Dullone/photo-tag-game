class HighScoreController < ApplicationController
  
  def index
    respond_to do |format|
      render json: GamePhoto.find(params[:photo]).highScores.limit(5);
    end
  end

end
