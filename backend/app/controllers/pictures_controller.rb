class PicturesController < ApplicationController
  get "/pictures" do
    pictures = Picture.all
    pictures.to_json()
  end

  post "/pictures/newpicture" do
  
    image_file = params[:image_file]
    user_id = params[:user_id]

    if user_id.present?
      check_user = User.exists?(id: user_id)

      if check_user === false
        status 406
        puts "USER NOT EXIST"
        message = { error: "User trying to add post does not exist!" }
        message.to_json
      else
        picture = Picture.create(image_file: image_file, user_id: user_id)

        if picture
          message = { success: "Post created successfully" }
          message.to_json
        else
          status 406
          message = { error: "Error saving the post" }
          message.to_json
        end
      end
    else
      status 406
      message = { error: "All fields are required" }
      message.to_json
    end
  end

  delete "/pictures/delete/:id" do
    # Code for delete action
    

    check_picture = Picture.exists?(id: params[:id] ) 
    if check_picture
        picture = Picture.find(params[:id])
        picture.destroy
        message = {:success=> "Picture deleted successfully"}
        message.to_json
    else
        status 406
        message = {:error=> "Picture does not exist"}
        message.to_json
    end

  end
end


