This is a gem for Rails >= 3.1 applications. It provides all the basic DataTables files, but not (yet) the extras.

# Install and Usage

First, put the gem in your Gemfile (`gem 'jquery-datatables-rails'`) and run `bundle install`

After installing it you can require it in your _application.js_ file with `\\= require jquery.dataTables.min`, or use the images and stylesheets in the _dataTables_ directory: `<%= image_tag 'dataTables/sortBoth.png' %>`

# Plugins

Right now, the only plugin that is available is fnReloadAjax. Check out the [assets directory][assets].

[assets]: https://github.com/rweng/jquery-datatables-rails/tree/master/vendor/assets/javascripts

