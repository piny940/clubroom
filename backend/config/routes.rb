Rails.application.routes.draw do
  devise_for :users
  root 'homes#show'
  namespace :admin do
    resources :talks
    resources :talk_entries
    resources :talkrooms
    resources :joinings
    resources :groups
    resources :users
  end

  get 'csrf/', to: 'csrf#show'
  resource :session, only: %i[create destroy]
  resource :user, only: %i[show create]
  namespace :member do
    resources :groups, only: %i[index create] do
      scope module: :groups do
        resources :talkrooms do
          scope module: :talkrooms do
            resources :talks
          end
        end
      end
    end
  end
end
