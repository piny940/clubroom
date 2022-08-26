Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [
      'http://localhost:3001',
      'https://clubrooms.herokuapp.com'
    ]
    resource '*',
             method: %i[get post put patch delete],
             headers: :any,
             credentials: true
  end
end
