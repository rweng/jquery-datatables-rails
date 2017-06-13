# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jquery/datatables/rails/version"

Gem::Specification.new do |s|
  s.name = "jquery-datatables-rails-plus"
  s.version = Jquery::Datatables::Rails::VERSION
  s.authors = ["Kornraphop Kawintiranon"]
  s.email = ["kornosk130@gmail.com "]
  s.homepage = "https://github.com/kornosk/jquery-datatables-rails-plus"
  s.summary = %q{jquery-datatables gem for rails, edited by kornosk for specific purpose}
  s.description = %q{}
  s.license = 'MIT'

  s.files = `git ls-files`.split("\n")
  s.files = Dir["{app,lib,vendor}/**/*"]
  s.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "jquery-rails"
  s.add_dependency "sass-rails"
  s.add_dependency 'railties',   '>= 3.1'
  s.add_dependency 'actionpack', '>= 3.1'
  s.add_development_dependency 'rake'
end
