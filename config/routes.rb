Rails.application.routes.draw do
  root 'photo_tag_game#show'
  resources :photo_tag_game, only: [ :show ]
  get "guess" => "photo_tag_game#guess"
  resources :high_score, only: [ :index, :create, :new ]
end
