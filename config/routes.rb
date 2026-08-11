Rails.application.routes.draw do
  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end

  root "home#index"

  get "home/index"
  get "inertia-example", to: "inertia_example#index"

  # Authentication
  get    "/login",  to: "sessions#new",     as: :login
  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#destroy", as: :logout

  # Registration
  get "/signup", to: "registrations#new", as: :signup
  post "/signup", to: "registrations#create"

  # Password management
  resources :passwords, param: :token, only: [ :new, :create, :edit, :update ]

  # Health check
  get "up", to: "rails/health#show", as: :rails_health_check
end
