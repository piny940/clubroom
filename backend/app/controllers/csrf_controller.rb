class CsrfController < ApplicationController
  def show
    render json: {
      data: {
        token: form_authenticity_token
      }
    }, status: :ok
  end
end
