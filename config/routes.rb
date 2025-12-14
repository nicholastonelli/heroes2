Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

   # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
   get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
   get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  root "main_page#index"

  get "/avery", to: "avery#index"
  get "/phearon", to: "phearon#index"
  get "/roberts", to: "roberts#index"
  get "/feargus", to: "feargus#index"

  get "/ritza", to: "ritza#index"
  get "/gerald", to: "gerald#index"
  get "/francis", to: "francis#index"

end
