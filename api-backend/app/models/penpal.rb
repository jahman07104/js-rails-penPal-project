class Penpal < ApplicationRecord
belongs_to :user, optional: true
 validates :name, presence: true

  def image=(image)
    image = image.tempfile if image.is_a?(ActionDispatch::Http::UploadedFile)
    # generates random image file name, with original extension
    file = "#{SecureRandom.urlsafe_base64}#{File.extname(image)}"
    FileUtils.cp image, "public/images/#{file}"
    self.image_url = "/images/#{file}"
  end


end
