require "test_helper"

class DashboardControllerTest < ActionDispatch::IntegrationTest
  test "redirects to login when not authenticated" do
    get root_path
    assert_redirected_to new_session_path
  end

  test "shows the page when authenticated" do
    user = users(:one) # adjust to your fixture
    post session_path, params: { email_address: user.email_address, password: "password" }

    get root_path
    assert_response :success
  end
end
