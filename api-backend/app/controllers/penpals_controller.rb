class PenpalsController < ApplicationController
  def index
    penpals = Penpal.all 
    render json: penpals 
  end

  def create
    @penpal = Penpal.new(penpal_params)
  
    @penpal.save
    redirect_back fallback_location: ''
  end

  def destroy
    @penpal = Penpal.find(params[:id])
    # @penpal = Penpal.where([:id]).first
    if @penpal.destroy
      head(:ok)
    else
      head(:unprocessable_entity)

      # head is how rails just the content in the header no content in the response..so this code says if everything went well with the destruction just return ok if not return the other thing and on the client side we can show alerts
    end
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
    params.require(:penpal).permit(:name, :city, :email, :image)   
  end  

  
 

end
