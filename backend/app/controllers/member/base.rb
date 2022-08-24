class Member::Base < ApplicationController
  before_action :authenticate_user!

  private

  def authenticate_user!
    render json: {
      message: "ログインしてください。"
    }, status: 400 if current_user.nil?
  end
end
