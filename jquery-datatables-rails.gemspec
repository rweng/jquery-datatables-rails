# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jquery/datatables/rails/version"

Gem::Specification.new do |s|
  s.name = "jquery-datatables-rails"
  s.version = Jquery::Datatables::Rails::VERSION
  s.authors = ["Marlin W. Pierce"]
  s.email = ["marlin_pierce_2000@yahoo.com"]
  s.homepage = "https://github.com/marlinpierce/jquery-datatables-rails"
  s.summary = %q{jquery datatables for rails}
  s.description = <<-HEREDOC
    This gem gathers components for datatables for rails.

    Datatables is a jquery javascript library for efficient rendering of tables of data fetched from a web service.
    This gem does the following:

    -   Includes the javascript, stylesheets, and other files from database and installs them in the rails asset pipeline.
    -   Has dependencies to collect the gems needed to use datatables with rails.
    -   Provides rails generators for datatables and datatables plugins.
  HEREDOC
  s.license = 'MIT'

  s.files = `git ls-files`.split("\n")
  s.files = Dir["{app,lib,vendor}/**/*"]
  s.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "jquery-rails", '~> 4.3'
  s.add_dependency "sassc-rails", '~> 2.0'
  s.add_dependency 'railties',   '>= 3.1'
  s.add_dependency 'actionpack', '>= 3.1'
  s.add_development_dependency 'rake'
end
