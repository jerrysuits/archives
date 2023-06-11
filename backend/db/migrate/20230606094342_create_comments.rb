class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :user, foreign_key: true
      t.references :picture, foreign_key: true
      t.text :content
      # Other attributes specific to comments
      t.timestamps
    end
  end
end
