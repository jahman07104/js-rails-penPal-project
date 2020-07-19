class MakePenpalsUserIdOptional < ActiveRecord::Migration[6.0]
  def change
    change_column_null :penpals, :user_id, true
  end
end
