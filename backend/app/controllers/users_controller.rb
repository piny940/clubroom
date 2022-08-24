class UsersController < ApplicationController
  def show
    render json: {
      data: {
        user: current_user
      }
    }, status: :ok
  end
end
