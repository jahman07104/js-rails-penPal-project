class PenpalSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :email, :image_url
  belongs_to :user
end
