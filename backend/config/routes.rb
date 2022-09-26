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
      resource :joining, only: %i[create show]
      scope module: :groups do
        resources :members, only: %i[index]
        resources :talkrooms, only: %i[index create show destroy update] do
          resource :talk_entry, only: %i[create show]
          scope module: :talkrooms do
            resources :talks, only: %i[index create]
            resources :members, only: %i[index]
          end
        end
      end
    end
  end
end
