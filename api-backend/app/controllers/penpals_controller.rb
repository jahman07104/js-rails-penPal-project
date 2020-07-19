class PenpalsController < ApplicationController
  def index
    penpals = Penpal.all 
    render json: penpals 
  end

  # POST /penpals/:id/choose
  def choose
    user = User.first
    Penpal.find(params[:penpal_id]).update! user_id: user.id
  end

  # POST /penpals/:id/remove
  def remove
    Penpal.find(params[:penpal_id]).update! user_id: nil
  end

  def remove_all
    Penpal.update_all(user_id: nil)
  end

  # def create 
  # #  binding.pry
  #     penpal = Penpal.create(penpal_params)
  #     if penpal.valid?
  #       render json: penpal
  #     else 
  #       render json: {error: "Penpal not valid"}
  #     end  
  # end

  # def show 
  #   penpal = Penpal.find(params[:id])  
  # end

 

  private

  def penpal_params
    params.require(:penpal).permit(:name, :city, :email, :photo)   
  end

end
