class PenpalsController < ApplicationController
  def index
    penpals = Penpal.all 
    render json: penpals 
  end

  # POST /penpals/:penpal_id/choose
  def choose
    user = User.first
    Penpal.find(params[:penpal_id]).update! user_id: user.id
  end

  # POST /penpals/:id/remove
  def remove
    Penpal.find(params[:penpal_id]).update! user_id: nil
  end

  def remove_all
    user = User.first
    Penpal.where(user_id: user.id).update_all(user_id: nil)
  end

  private

  def penpal_params
    params.require(:penpal).permit(:name, :city, :email, :photo)   
  end

end
