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
  resource :user, only: %i[show create update destroy]
  namespace :member do
    resources :groups, only: %i[index create update destroy show] do
      scope module: :groups do
        resources :talkrooms, only: %i[index create destroy update] do
          scope module: :talkrooms do
            resources :talks, only: %i[index create]
            resources :members, only: %i[index]
            resource :talk_entry, only: %i[show]
          end
          resource :talk_entry, only: %i[create]
        end
      end
    end
  end
end
