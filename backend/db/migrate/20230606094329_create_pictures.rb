class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.references :user, foreign_key: true
      t.string :image_file
      t.text :description
      # Other attributes specific to pictures
      t.timestamps
    end
    
  end
end
