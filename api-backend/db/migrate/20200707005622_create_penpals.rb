class CreatePenpals < ActiveRecord::Migration[6.0]
  def change
    create_table :penpals do |t|
        t.string :name
        t.string :city
        t.string :email
        t.string :photo
        t.references :user, null: false, foreign_key: true


      t.timestamps
    end
  end
end
