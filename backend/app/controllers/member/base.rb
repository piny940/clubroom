class Member::Base < ApplicationController
  before_action :authenticate_user!

  private

  def authenticate_user!
    if current_user.nil?
      render json: {
        message: 'ログインしてください。'
      }, status: :bad_request
    end
  end
end
