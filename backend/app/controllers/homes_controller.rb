class HomesController < ApplicationController
  def show
    p ENV.fetch('GOOGLE_JSON', nil)
  end
end
