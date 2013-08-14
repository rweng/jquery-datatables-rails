# Configure for Rails 3.1
module Jquery
  module Datatables
    if defined?(::Rails) and Gem::Requirement.new('>= 3.1').satisfied_by?(Gem::Version.new ::Rails.version)
      module Rails
        class Engine < ::Rails::Engine
          # add initializer so that images get added to the manifest and placed in public/assets in Rails 4
          initializer "datatables.assets.precompile" do |app|
            app.config.assets.precompile += 
              %w( dataTables/back_disabled.png
                  dataTables/back_enabled_hover.png
                  dataTables/back_enabled.png
                  dataTables/extras
                  dataTables/favicon.ico
                  dataTables/forward_disabled.png
                  dataTables/forward_enabled_hover.png
                  dataTables/forward_enabled.png
                  dataTables/sort_asc_disabled.png
                  dataTables/sort_asc.png
                  dataTables/sort_both.png
                  dataTables/sort_desc_disabled.png
                  dataTables/sort_desc.png )
          end
        end
      end
    end
  end
end
