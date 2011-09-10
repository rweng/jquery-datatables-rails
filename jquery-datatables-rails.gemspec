# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jquery/datatables/rails/version"

Gem::Specification.new do |s|
  s.name        = "jquery-datatables-rails"
  s.version     = Jquery::Datatables::Rails::VERSION
  s.authors     = ["Robin Wenglewski"]
  s.email       = ["robin@wenglewski.de"]
  s.homepage    = "https://github.com/rweng/jquery-datatables-rails"
  s.summary     = %q{jquery datatables for rails}
  s.description = %q{}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "jquery-rails"
end
