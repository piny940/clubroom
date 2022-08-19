Rails.application.routes.draw do
  devise_for :users
  root "homes#show"
  namespace :admin do
    resources :talkrooms
    resources :joinings
    resources :groups
    resources :users
  end
end
