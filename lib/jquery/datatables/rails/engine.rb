# Configure for Rails 3.1
module Jquery
  module Datatables
    if defined?(::Rails) and ::Rails.version >= "3.1"
      module Rails
        class Engine < ::Rails::Engine
        end
      end
    end
  end
end
