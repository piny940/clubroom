class CsrfController < ApplicationController
  def show
    p request.headers

    render json: {
      data: {
        token: form_authenticity_token
      }
    }, status: :ok
  end
end
