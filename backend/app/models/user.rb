class User < ActiveRecord::Base
     has_many :comments
     has_many :pictures
     has_secure_password
 end