class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def serialized
    as_json
  end

  def self.serialized
    all.as_json
  end
end
