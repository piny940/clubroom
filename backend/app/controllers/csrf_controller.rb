class CsrfController < ApplicationController
  def show
    print request.headers.to_h.to_s.gsub(", ", "\n")

    render json: {
      data: {
        token: form_authenticity_token
      }
    }, status: :ok
  end
end
