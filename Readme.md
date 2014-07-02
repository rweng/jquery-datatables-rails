

# jquery-datatables-rails
[![Gem Version](https://badge.fury.io/rb/jquery-datatables-rails.svg)](http://badge.fury.io/rb/jquery-datatables-rails)

This gem packages the jQuery [DataTables](http://datatables.net/) plugin for easy use with the Rails 3.1+ asset pipleine.
It provides all the basic DataTables files, and a few of the extras.

# Important

**The current gem is released without updated plugins.**
**Take care of using the gem from master repository, there are general changes. [CHANGELOG.md](CHANGELOG.md)**

If you encounter any errors, please fork the repository, update the plugin files and send a pull-request.

## General Installation

**This is README is valid only for 2.1.10.0.2 version**

1 - Add to your Gemfile:

```ruby
gem 'jquery-datatables-rails', '~> 2.1.10.0.2'
```

2 - Install the gem:

```bash
bundle install
```

3 - Add the JavaScript to `application.js`:

```javascript
//= require dataTables/jquery.dataTables
```

4 - Add the stylesheets to `application.css`:

```css
*= require dataTables/jquery.dataTables
```

## Twitter Bootstrap 2 Installation

1 - Complete steps 1-3 of the General Installation.

2 - Add some more JavaScript to `application.js`:

```javascript
//= require dataTables/bootstrap/2/jquery.dataTables.bootstrap
```

3 - Add this (and only this) stylesheet to `application.css`:

```css
*= require dataTables/bootstrap/2/jquery.dataTables.bootstrap
```

4 - Initialize your datatables using one of these options:

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

## Twitter Bootstrap 3 Installation

1 - Complete steps 1-3 of the General Installation.

2 - Add some more JavaScript to `application.js`:

```javascript
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
```

3 - Add this (and only this) stylesheet to `application.css`:

```css
*= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
```

4 - Initialize your datatables using these option:

```javascript
$('.datatable').dataTable({
  "sPaginationType": "bootstrap"
});
```


## Zurb Foundation Installation

1 - Complete steps 1-3 of the General Installation

2 - Add some more JavaScript to `application.js`:

```javascript
//= require dataTables/jquery.dataTables.foundation
```

3 - Add this (and only this) stylesheet to `application.css`:

```css
*= require dataTables/jquery.dataTables.foundation
```

4 - Initialize your datatables using these option:

```javascript
$('.datatable').dataTable({
  "sPaginationType": "foundation"
});
```

## Responsive Installation

1 - Complete steps 1-3 of the General Installation.

2 - Add the lodash gem to your application:

```ruby
gem 'lodash-rails'
```

3 - Add some more JavaScript to `application.js`:

```javascript
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require dataTables/extras/dataTables.responsive
```

4 - Add this (and only this) stylesheet to `application.css`:

```css
*= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
*= require dataTables/extras/dataTables.responsive
```

5 - Initialize your datatables using:

```coffeescript
responsiveHelper = undefined
breakpointDefinition =
  tablet: 1024
  phone: 480

tableElement = $("#example")
tableElement.dataTable
  autoWidth: false
  preDrawCallback: ->

    # Initialize the responsive datatables helper once.
    responsiveHelper = new ResponsiveDatatablesHelper(tableElement, breakpointDefinition)  unless responsiveHelper
    return

  rowCallback: (nRow) ->
    responsiveHelper.createExpandIcon nRow
    return

  drawCallback: (oSettings) ->
    responsiveHelper.respond()
    return
```

6 - To use see the author of responsive files and follow the instructions as described on [datatables-responsive]

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
````ruby
[Plugin]     : [ExtraName]
AutoFill     : dataTables.autoFill
ColReorder   : dataTables.colReorder
ColVis       : dataTables.colVis
FixedColumns : dataTables.fixedColumn
FixedHeader  : dataTables.fixedHeader
KeyTable     : dataTables.keyTable
Scroller     : dataTables.scroller
TableTools   : dataTables.tableTools
````

Unofficial extra is available:
````
Responsive   : dataTables.responsive
````

### How to use Extras
1 - To add an extra into your application, add its JS file to `application.js` using the following pattern:

```javascript
//= require dataTables/extras/[ExtraName]
```

2 - Additionally, you may need to add any associated CSS files. For instance the TableTools extra requires
you to add the following two lines to your `application.css` file:

```css
*= require dataTables/extras/dataTables.tableTools
*= require dataTables/extras/TableTools_JUI
```

3 - TableTools also requires this to be included in 'application.js':

```javascript
//= require dataTables/extras/ZeroClipboard.js
```

Make sure to also add it's initialization as described on [datatables extras' site][datatables_extras]

## Articles and Extras

[RailsCast #340 DataTables] Apr 11, 2012.

[ajax-datatables-rails] a wrapper around datatable's ajax methods that allow synchronization with server-side

## Thanks

Thanks to Comanche for responsive support files [datatables-responsive]

[assets]: app/assets/javascripts/dataTables
[datatables_extras]: http://datatables.net/extras/
[datatables-responsive]: https://github.com/Comanche/datatables-responsive
[RailsCast #340 DataTables]: http://railscasts.com/episodes/340-datatables
[ajax-datatables-rails]: https://github.com/antillas21/ajax-datatables-rails
