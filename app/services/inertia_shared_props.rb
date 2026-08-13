class InertiaSharedProps
  def initialize(current:, flash:)
    @current = current
    @flash = flash
  end

  def to_h
    {
      flash: { notice: flash[:notice], alert: flash[:alert] },
      user: user_props
    }
  end

  private

  attr_reader :current, :flash

  def user_props
    return nil unless current.user
    { email_address: current.user.email_address }
  end
end