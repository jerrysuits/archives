require 'sinatra'
class UsersController < ApplicationController

##fetches available users

     get "/users" do
         users = User.all
         users.to_json()
      end 

##adds a new user

post "/users/newuser" do
    _username=params[:username]
    _password=params[:password]

 

    if(_username.present?)
               
        check_username = User.exists?(username: _username)#true / false
     
        puts check_username
        if check_username==true
             status 406
             message = {:error=> "Username exists in our database choose another username"}
             message.to_json()
        
        else
                 user = User.create(username: _username,  password: _password)
                 if user
                     message = {:success=> "User has been created successfully"}
                     message.to_json()
                 else
                     message = {:error=> "Error saving the user"}
                     message.to_json()
                 end
         end
     
     else
         status 401
         message = {:error=> "All values are required"}
         message.to_json()
     end
 end
     # Get current user
     get "/current_user" do
        user = User.find_by(id: session[:user_id])
        
        if user
           {:currentUser => user}.to_json
        else
             message = {:error=> "Not logged in"}
             message.to_json
        end
       
     end
 
 end 


