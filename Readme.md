# jquery-datatables-rails

This gem packages the jQuery [DataTables](http://datatables.net/) plugin for easy use with the Rails 3.1+ asset pipleine.

It provides all the basic DataTables files, but not (yet) the extras.

## Installation

1. Add `gem 'jquery-datatables-rails'` to the assets group in your Gemfile and run `bundle install`.
1. Add the JavaScript to `application.js`:

`//= require dataTables/jquery.dataTables`

1. Add the stylesheets to `application.css`:

`*= require dataTables/jquery.dataTables`

## Twitter Bootstrap 2 support

1. Add the JavaScript to `application.js`:

`//= require dataTables/jquery.dataTables.bootstrap`

1. Remove the initial stylesheets from `application.css`
1. Add the stylesheets to `application.css`:

`*= require dataTables/jquery.dataTables.bootstrap`

1. Initialize your datatables like this:

```javascript
// For fluid containers
$('.datatable').dataTable({
  "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
  "sPaginationType": "bootstrap"
});

// For fixed width containers
$('.datatable').dataTable({
  "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
  "sPaginationType": "bootstrap"
});
```

## Plugins

Right now, the only plugin that is available is fnReloadAjax. Check out the [assets directory][assets].

[assets]: https://github.com/rweng/jquery-datatables-rails/tree/master/vendor/assets/javascripts
