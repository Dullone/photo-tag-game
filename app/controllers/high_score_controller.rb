class HighScoresController < ApplicationController
  include PhotoTagGameHelper
  
  def index
    respond_to do |format|
      render json: GamePhoto.find(params[:photo]).highScores.limit(5);
    end
  end

  def create
    respond_to do |format|
      if session[:gameTime] && wonGame?
        photo = GamePhoto.where(name:  session[:photo]).first
        photo.highScores.create(name:  params[:high_score][:name], 
                                score: session[:gameTime])

        format.json { render json:  message: "Score posted"  }      
      else
        format.json { render json:  message: "Error."  }
      end
    end
  end

end
