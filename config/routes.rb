Rails.application.routes.draw do
  root 'photo_tag_game#show'
  resources :photo_tag_game, only: [:show ]
end
