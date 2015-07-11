Rails.application.routes.draw do
  root 'photo_tag_game#show'
  resources :photo_tag_game, only: [ :show ]
  get "guess" => "photo_tag_game#guess"
  post "high_scores" => "high_scores#create"
end
