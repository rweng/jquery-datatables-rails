# Important

The current gem is released without updated plugins. If you encounter any errors, please fork the repository, update the plugin files and send a pull-request.

# jquery-datatables-rails

This gem packages the jQuery [DataTables](http://datatables.net/) plugin for easy use with the Rails 3.1+ asset pipleine.

It provides all the basic DataTables files, and a few of the extras.

## General Installation

1. Add to your Gemfile:

        gem 'jquery-datatables-rails', git: 'git://github.com/rweng/jquery-datatables-rails.git'

1. Install the gem:

        bundle install

1. Add the JavaScript to `application.js`:

        //= require dataTables/jquery.dataTables

1. Add the stylesheets to `application.css`:

        *= require dataTables/jquery.dataTables

## Twitter Bootstrap 2 Installation

1. Complete steps 1-3 of the General Installation
1. Add some more JavaScript to `application.js`:

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
    * fnFilterOnReturn
    * fnSetFilteringDelay
* sorting
    * numbersHtml
* typeDetection
    * numberHtml

These files can be found in the [assets directory][assets].

## Extras

Official extras are available:

* AutoFill
* ColReorder
* ColVis
* FixedColumns
* FixedHeader
* KeyTable
* Scroller
* TableTools

Unofficial extra
* datatables.responsive.js [https://github.com/Comanche/datatables-responsive]

To add an extra into your application, add its JS file to `application.js` using the following pattern:

    //= require dataTables/extras/[ExtraName]

Additionally, you may need to add any associated CSS files. For instance the TableTools extra requires
you to add the following two lines to your `application.css` file:

    *= require dataTables/extras/TableTools
    *= require dataTables/extras/TableTools_JUI

Make sure to also add it's initialization as described on [datatables extras' site][datatables_extras]

[assets]: https://github.com/rweng/jquery-datatables-rails/tree/master/vendor/assets/javascripts/dataTables
[datatables_extras]: http://datatables.net/extras/

### datatables.responsive.js

  Gemfile

    # Dependency:
    gem 'lodash-rails' 

  application.js

    //= require dataTables/extras/datatables.responsive

  application.css

    *= require dataTables/extras/datatables.responsive

  Example:

  people.js.coffee

      jQuery ->
        responsiveHelper = undefined
        breakpointDefinition =
          tablet: 1024
          phone: 480

        tableContainer = $('#people_datatable')

        tableContainer.dataTable
          sDom: "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
          sPaginationType: "bootstrap"
          bProcessing: true
          bServerSide: true
          bAutoWidth:  false
          sWrapper: "dataTables_wrapper form-inline"
          sAjaxSource: $('#people_datatable').data('source')
          oLanguage:{
            sUrl: "datatable_i18n"
          }

          fnPreDrawCallback: ->
            # Initialize the responsive datatables helper once.
            responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition)  unless responsiveHelper

          fnRowCallback: (nRow, aData, iDisplayIndex, iDisplayIndexFull) ->
            responsiveHelper.createExpandIcon nRow

          fnDrawCallback: (oSettings) ->
            responsiveHelper.respond()

  people/index.html.haml

```html
%table#people_datatable.table.table-striped.table-bordered.table-hover.table-condensed{'data-source' => people_url(format: 'json')}
  %thead
    %tr
      %th{'data-class' => 'expand'}= model_class.human_attribute_name(:first_name)
      %th{'data-class' => 'phone,tablet'}= model_class.human_attribute_name(:last_name)
      %th{'data-hide'  => 'phone'}= model_class.human_attribute_name(:cpf)
      %th{'data-hide'  => 'phone,tablet'}= model_class.human_attribute_name(:phone)
      %th{'data-hide'  => 'phone,tablet'}= model_class.human_attribute_name(:mobile)
  %tbody
```          

