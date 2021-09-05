Rails.application.routes.draw do
  get 'homepage/index'
  namespace :api do
    namespace :v1 do
      get 'recipes/index', to: 'recipes#index'
      post 'recipes', to: 'recipes#store'
      get 'recipes/:id', to: 'recipes#show'
      delete 'recipes/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
