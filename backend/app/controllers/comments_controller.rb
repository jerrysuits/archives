class CommentsController < ApplicationController
      get "/comments" do
        comments = Comment.all
        comments.to_json(include: :user)
      end
    
      # Adds a new comment
      post "/comments/newcomment" do
        comment = params[:comment]
        user_id = params[:user_id]
        picture_id = params[:picture_id]
    
        if comment.present? && picture_id.present? && user_id.present?
          check_user = User.exists?(id: user_id)
          check_picture = Picture.exists?(id: picture_id)
    
          if check_user == false
            status 406
            message = { error: "User trying to add comment does not exist!" }
            message.to_json
          elsif check_picture == false
            status 406
            message = { error: "The Picture you are trying to comment doesn't exist!" }
            message.to_json
          else
            comment = Comment.create(content: comment, picture_id: picture_id, user_id: user_id)
    
            if comment.valid?
              message = { success: "Comment created successfully" }
              message.to_json
            else
              status 406
              message = { error: "Error saving the comment" }
              message.to_json
            end
          end
        else
          status 406
          message = { error: "All fields are required" }
          message.to_json
        end
      end
    
      # Edit comment
      patch "/comments/editcomment/:id" do
        content = params[:content]
        user_id = params[:user_id]
        picture_id = params[:picture_id]
    
        if content.present? && picture_id.present? && user_id.present?
          check_user = User.exists?(id: user_id)
          check_picture = Picture.exists?(id: picture_id)
    
          comment = Comment.find_by(id: params[:id])
    
          if comment
            comment.update(content: content)
    
            if comment.valid?
              message = { success: "Comment updated successfully" }
              message.to_json
            else
              status 406
              message = { error: "Error updating the comment" }
              message.to_json
            end
          else
            status 404
            message = { error: "Comment not found" }
            message.to_json
          end
        else
          status 406
          message = { error: "All fields are required" }
          message.to_json
        end
      end
    end
    