Rails.application.routes.draw do
  resources :users
  resources :penpals do
    post :choose
    post :remove
  #    do it on whole colection, not one member, no /:id
      #  delete :remove_all, on: :collection
   end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
