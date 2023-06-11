class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      # User attributes...
      t.timestamps
    end

    create_table :pictures do |t|
      t.references :user, foreign_key: true
      t.string :image_file
      # Picture attributes...
      t.timestamps
    end

    create_table :comments do |t|
      t.references :user, foreign_key: true
      t.references :picture, foreign_key: true
      t.text :content
      # Comment attributes...
      t.timestamps
    end
  end
end
