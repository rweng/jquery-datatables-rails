require 'rails/generators'

module Jquery
  module Datatables
    module Generators
      class InstallGenerator < ::Rails::Generators::Base
        desc "This generator installs jQuery dataTables to the Asset Pipeline"
        argument :style, :type => :string, :default => 'regular'

        def add_assets
          js_manifest = 'app/assets/javascripts/application.js'
          css_manifest = 'app/assets/stylesheets/application.css'
          js_strings = js_assets_map[style.to_sym].join

          insert_into_file js_manifest, js_strings, :after => "jquery_ujs\n" if File.exists?(js_manifest)
          insert_css_strings(css_manifest) if File.exists?(css_manifest)
        end

        private
        def insert_css_strings(css_manifest)
          content = File.read(css_manifest)
          css_strings = css_assets_map[style.to_sym].join

          if requires_tree(content)
            insert_into_file css_manifest, css_strings, :after => "require_tree .\n"
          elsif requires_self(content)
            insert_into_file css_manifest, css_strings, :before => " *= require_self\n"
          else
            insert_into_file css_manifest, css_strings, :before => " */"
          end
        end

        def requires_tree(content)
          content.match(/require_tree\s+\.\s*$/)
        end

        def requires_self(content)
          content.match(/require_self\s*$/)
        end

        def js_assets_map
          {
            :regular => ["//= require dataTables/jquery.dataTables\n"],
            :bootstrap2 => [
              "//= require dataTables/jquery.dataTables\n",
              "//= require dataTables/bootstrap/2/jquery.dataTables.bootstrap\n"
            ],
            :bootstrap3 => [
              "//= require dataTables/jquery.dataTables\n",
              "//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap\n"
            ],
            :foundation => [
              "//= require dataTables/jquery.dataTables\n",
              "//= require dataTables/jquery.dataTables.foundation\n"
            ],
            :responsive => [
              "//= require dataTables/jquery.dataTables\n",
              "//= require dataTables/extras/dataTables.responsive\n"
            ]
          }
        end

        def css_assets_map
          {
            :regular => [" *= require dataTables/jquery.dataTables\n"],
            :bootstrap2 => [" *= require dataTables/bootstrap/2/jquery.dataTables.bootstrap\n"],
            :bootstrap3 => [" *= require dataTables/bootstrap/3/jquery.dataTables.bootstrap\n"],
            :foundation => [" *= require dataTables/jquery.dataTables.foundation\n"],
            :responsive => [" *= require dataTables/extras/dataTables.responsive\n"]
          }
        end
      end
    end
  end
end
