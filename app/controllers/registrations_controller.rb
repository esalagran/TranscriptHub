class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  def new
    render inertia: "Registrations/New"
  end

  def create
    user = User.new(user_params)
    if user.save
      start_new_session_for(user)
      redirect_to root_path, notice: "Registration successful!"
    else
      render inertia: "Registrations/New",
             props: {
               errors: user.errors.to_hash.transform_keys do |key|
                            "user.#{key}"
                          end
             },
             status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.expect(user: [ :email_address, :password, :password_confirmation ])
    end
end
