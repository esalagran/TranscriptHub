require "test_helper"

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_registration_url

    assert_response :success
  end

  test "should create registration" do
    assert_difference("User.count", 1) do
      post registration_url, params: {
        user: {
          email_address: "test@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      }
    end

    assert_redirected_to root_url
  end

  test "should not create registration with invalid data" do
    assert_no_difference("User.count") do
      post registration_url, params: {
        user: {
          email_address: "",
          password: "",
          password_confirmation: ""
        }
      }
    end

    assert_response :unprocessable_entity
  end
end