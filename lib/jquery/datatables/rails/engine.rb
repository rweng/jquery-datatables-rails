# Configure for Rails 3.1
module Jquery
  module Datatables
    if defined?(::Rails) and Gem::Requirement.new('>= 3.1').satisfied_by?(Gem::Version.new ::Rails.version)
      module Rails
        class Engine < ::Rails::Engine
          # add initializer so that images get added to the manifest and placed in public/assets in Rails 4
          initializer "Jquery.Datatables.Rails.assets.precompile" do |app|
            app.config.assets.precompile += 
              %w( back_disabled.png
                  back_enabled_hover.png
                  back_enabled.png
                  extras
                  favicon.ico
                  forward_disabled.png
                  forward_enabled_hover.png
                  forward_enabled.png
                  sort_asc_disabled.png
                  sort_asc.png
                  sort_both.png
                  sort_desc_disabled.png
                  sort_desc.png )
          end
        end
      end
    end
  end
end
