require "test_helper"

class Member::CsrfControllerTest < ActionDispatch::IntegrationTest
  test "正常にcsrf tokenをGETできる" do
    get '/csrf'
    json = JSON.parse(response.body)
    assert_response :success
    assert json["token"]
  end
end
