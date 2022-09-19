class ApplicationController < ActionController::Base
  def authenticate_user!
    if current_user.nil?
      render json: {
        message: 'ログインしてください。'
      }, status: :bad_request
    end
  end
end
