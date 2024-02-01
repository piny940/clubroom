RAILS_ENV=production bin/rails db:migrate
RAILS_ENV=production bin/rails assets:precompile
RAILS_ENV=production bin/rails server -b 0.0.0.0 -p 3000
