This is a gem for Rails >= 3.1 applications. It provides all the basic DataTables files, but not (yet) the extras.

# Install and Usage

First, put the gem in your Gemfile (`gem 'jquery-datatables-rails'`) and run `bundle install`

After installing it you can require it in your _application.js_ file with `\\= require jquery.dataTables.min`.
Also, add the css to your application.html.erb:

    <%= stylesheet_link_tag    "/assets/dataTables/css/jquery.dataTables.css", :media => "all" %>

However, if you use the stylesheets include them separately and not compiled in the application.css.
This is because images in the stylesheets are referenced to without a path. So if you include the stylesheet `dataTables/demo_table_jui` it works, because the images are also under `dataTables`. But if you include the stylesheet in the application.css, it won't work.

# Plugins

Right now, the only plugin that is available is fnReloadAjax. Check out the [assets directory][assets].

[assets]: https://github.com/rweng/jquery-datatables-rails/tree/master/vendor/assets/javascripts

