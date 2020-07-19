class UsersController < ApplicationController

  def index
    users = User.all 
    render json: users 
  end

  def create 
    #  binding.pry
        user = User.create(user_params)
        if user.valid?
          render json: user
        else 
          render json: {error: "User not valid"}
        end  
    end

  def show
    user = User.find(params[:id])
    render json: users, 
    include: [:penpals]
    
    #status: 200
  end

  private

  def penpal_params 
    params.require(:penpal).permit(:name,:city,:email,:photo)

  end

  

end
