require 'test_helper'

class UsersTest < SystemTestCase
  test 'visiting root page' do
    visit root_path
    assert_text 'Welcome'
  end
end