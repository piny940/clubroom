class Member::Base < ApplicationController
  before_action :authenticate_user!
end
