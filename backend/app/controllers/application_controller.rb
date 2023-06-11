class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  set :session =>true  
  
  use Rack::Session::Cookie,
    key: 'myapp_session',
    expire_after: 3600, # 1 hour in seconds
    secret: 'myapp_secret_key'

  before do
    content_type :json
  end

  def authorize
    if session[:user_id].blank?
      halt 401, { error: 'Not Authorized' }.to_json
    end
  end

  get "/" do
    "<h1>Hello world</h1>"
  end
end
