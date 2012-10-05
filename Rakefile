require "bundler/gem_tasks"

desc "Fixes css image paths in scss files."
task :fix_css do
  Dir.glob(File.join("vendor/assets/stylesheets/dataTables", "*.css.scss")).each do |filename|
    content = File.read(filename)
    content.gsub!(/url\('\.\.\/images\/([A-Za-z0-9_]*\.png)'\)/) do
      "image-url('dataTables/#{$1}')"
    end
  	File.open(filename, 'w') { |f| f << content }
  end
  print "Done.\n"
end
