class AddImageUrlToPenpals < ActiveRecord::Migration[6.0]
  def change
    add_column :penpals, :image_url, :string
  end
end
