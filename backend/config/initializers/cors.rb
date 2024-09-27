Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [
      'http://localhost:3001',
      'https://clubrooms.herokuapp.com',
      'https://clubroom.piny940.com',
      'https://stg-clubroom.piny940.com',
      'https://clubroom-backend.piny940.com',
      'https://stg-clubroom-backend.piny940.com'
    ]
    resource '*',
             method: %i[get post put patch delete],
             headers: :any,
             credentials: true
  end
end
