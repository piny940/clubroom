Rails.application.routes.draw do
  devise_for :users
  root "homes#show"
  namespace :admin do
    resources :users
  end
end
