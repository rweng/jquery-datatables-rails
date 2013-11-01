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
                  dataTables/sort_desc.png 
                  dataTables/extras/background.png
                  dataTables/extras/collection_hover.png
                  dataTables/extras/collection.png
                  dataTables/extras/copy_hover.png
                  dataTables/extras/copy.png
                  dataTables/extras/csv_hover.png
                  dataTables/extras/csv.png
                  dataTables/extras/pdf_hover.png
                  dataTables/extras/pdf.png
                  dataTables/extras/print_hover.png
                  dataTables/extras/print.png
                  dataTables/extras/xls_hover.png
                  dataTables/extras/xls.png )
          end
        end
      end
    end
  end
end
