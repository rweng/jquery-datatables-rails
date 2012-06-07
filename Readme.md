# jquery-datatables-rails

This gem packages the jQuery [DataTables](http://datatables.net/) plugin for easy use with the Rails 3.1+ asset pipleine.

It provides all the basic DataTables files, and a few of the extras.

## General Installation

1. Add to the assets group in your Gemfile:

    `gem 'jquery-datatables-rails'`

1. Install the gem:

    `bundle install`

1. Add the JavaScript to `application.js`:

    //= require dataTables/jquery.dataTables

1. Add the stylesheets to `application.css`:

    *= require dataTables/jquery.dataTables

## Twitter Bootstrap 2 Installation

1. Complete steps 1-3 of the General Installation
1. Add the some more JavaScript to `application.js`:

    //= require dataTables/jquery.dataTables.bootstrap

1. Add this (and only this) stylesheet to `application.css`:

    *= require dataTables/jquery.dataTables.bootstrap

1. Initialize your datatables using one of these options:

```javascript
// For fluid containers
$('.datatable').dataTable({
  "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
  "sPaginationType": "bootstrap"
});
```
```javascript
// For fixed width containers
$('.datatable').dataTable({
  "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
  "sPaginationType": "bootstrap"
});
```

## Plugins

Only a few plugins are currently available

* api
    * fnReloadAjax
    * fnGetColumnData
* sorting
    * numbersHtml
* typeDetection
    * numberHtml

These files can be found in the [assets directory][assets].

## Extras

Only a few extras are currently available:

* FixedColumns
* FixedHeader

To add an extra into your application, include it like follow:

    //= require dataTables/extras/[ExtraName]

Make sure to also add it's initialization as described on [datatables extras' site][datatables_extras]


[assets]: https://github.com/rweng/jquery-datatables-rails/tree/master/vendor/assets/javascripts/dataTables
[datatables_extras]: http://datatables.net/extras/
