class Penpal < ApplicationRecord
belongs_to :user, optional: true
 validates :name, presence: true

  def image=(image)def destroy
    @penpal = Penpal.find(params[:id])
    # @penpal = Penpal.where([:id]).first
    if @penpal.destroy
      head(:ok)
    else
      head(:unprocessable_entity)

      # head is how rails just the content in the header no content in the response..so this code says if everything went well with the destruction just return ok if not return the other thing and on the client side we can show alerts

     redirect_to penpals_path
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

    image = image.tempfile if image.is_a?(ActionDispatch::Http::UploadedFile)
    # generates random image file name, with original extension
    file = "#{SecureRandom.urlsafe_base64}#{File.extname(image)}"
    FileUtils.cp image, "public/images/#{file}"
    self.image_url = "/images/#{file}"
  end


  def image_url=(url)
  end
end
