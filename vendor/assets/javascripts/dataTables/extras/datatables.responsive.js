/**
 * File:        datatables.responsive.js
 * Version:     0.1.1
 * Author:      Seen Sai Yang
 * Info:        https://github.com/Comanche/datatables-responsive
 *
 * Copyright 2013 Seen Sai Yang, all rights reserved.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

'use strict';

/**
 * Constructor for responsive datables helper.
 *
 * This helper class makes datatables responsive to the window size.
 *
 * The parameter, breakpoints, is an object for each breakpoint key/value pair
 * with the following format: { breakpoint_name: pixel_width_at_breakpoint }.
 *
 * An example is as follows:
 *
 *     {
 *         tablet: 1024,
 *         phone: 480
 *     }
 *
 * These breakpoint name may be used as possible values for the data-hide
 * attribute.  The data-hide attribute is optional and may be defined for each
 * th element in the table header.
 *
 * @param {Object|string} tableSelector jQuery wrapped set or selector for
 *                                      datatables container element.
 * @param {Object} breakpoints          Object defining the responsive
 *                                      breakpoint for datatables.
 */
function ResponsiveDatatablesHelper(tableSelector, breakpoints) {
    if (typeof tableSelector === 'string') {
        this.tableElement = $(tableSelector);
    } else {
        this.tableElement = tableSelector;
    }

    // State of column indexes and which are shown or hidden.
    this.columnIndexes = [];
    this.columnsShownIndexes = [];
    this.columnsHiddenIndexes = [];

    // Index of the th in the header tr that stores where the attribute
    //     data-class="expand"
    // is defined.
    this.expandColumn = undefined;

    // Stores the break points defined in the table header.
    // Each th in the header tr may contain an optional attribute like
    //     data-hide="phone,tablet"
    // These attributes and the breakpoints object will be used to create this
    // object.
    this.breakpoints = {
        /**
         * We will be generating data in the following format:
         *     phone : {
         *         lowerLimit   : undefined,
         *         upperLimit   : 320,
         *         columnsToHide: []
         *     },
         *     tablet: {
         *         lowerLimit   : 320,
         *         upperLimit   : 724,
         *         columnsToHide: []
         *     }
         */
    };

    // Expand icon template
    this.expandIconTemplate = '<span class="responsiveExpander"></span>';

    // Row template
    this.rowTemplate = '<tr class="row-detail"><td><ul><!--column item--></ul></td></tr>';
    this.rowLiTemplate = '<li><span class="columnTitle"><!--column title--></span>: <!--column value--></li>';

    // Responsive behavior on/off flag
    this.disabled = false;

    // Skip next windows width change flag
    this.skipNextWindowsWidthChange = false;

    // Initialize settings
    this.init(breakpoints);
}

/**
 * Responsive datatables helper init function.  Builds breakpoint limits
 * for columns and begins to listen to window resize event.
 *
 * See constructor for the breakpoints parameter.
 *
 * @param {Object} breakpoints
 */
ResponsiveDatatablesHelper.prototype.init = function (breakpoints) {
    /** Generate breakpoints in the format we need. ***************************/
    // First, we need to create a sorted array of the breakpoints given.
    var breakpointsSorted = [];
    _.each(breakpoints, function (value, key) {
        breakpointsSorted.push({
            name         : key,
            upperLimit   : value,
            columnsToHide: []
        });
    });
    breakpointsSorted = _.sortBy(breakpointsSorted, 'upperLimit');

    // Set lower and upper limits for each breakpoint.
    var lowerLimit = undefined;
    _.each(breakpointsSorted, function (value) {
        value.lowerLimit = lowerLimit;
        lowerLimit = value.upperLimit;
    });

    // Add the default breakpoint which shows all (has no upper limit).
    breakpointsSorted.push({
        name         : 'default',
        lowerLimit   : lowerLimit,
        upperLimit   : undefined,
        columnsToHide: []
    });

    // Copy the sorted breakpoint array into the breakpoints object using the
    // name as the key.
    breakpointsSorted.forEach(function (element) {
        this.breakpoints[element.name] = element;
    }, this);

    /** Create range of possible column indexes *******************************/
    // Get all visible column indexes
    var columns = this.tableElement.fnSettings().aoColumns;
    columns.forEach(function (element, index) {
        if (element.bVisible) {
            this.columnIndexes.push(index)
        }
    }, this);

    // We need the range of possible column indexes to calculate the columns
    // to show:
    //     Columns to show = all columns - columns to hide
    var headerElements = $('thead th', this.tableElement);

    /** Add columns into breakpoints respectively *****************************/
        // Read column headers' attributes and get needed info
    _.each(headerElements, function (element, index) {
        // Get the column with the attribute data-class="expand" so we know
        // where to display the expand icon.
        if ($(element).attr('data-class') === 'expand') {
            this.expandColumn = index;
        }

        // The data-hide attribute has the breakpoints that this column
        // is associated with.
        // If it's defined, get the data-hide attribute and sort this
        // column into the appropriate breakpoint's columnsToHide array.
        var dataHide = $(element).attr('data-hide');
        if (dataHide !== undefined) {
            var splitBreakingPoints = dataHide.split(/,\s*/);
            _.each(splitBreakingPoints, function (e) {
                if (this.breakpoints[e] !== undefined) {
                    // Translate visible column index to internal column index.
                    this.breakpoints[e].columnsToHide.push(this.columnIndexes[index]);
                }
            }, this);
        }
    }, this);

    // Watch the window resize event and response to it.
    var that = this;
    $(window).bind("resize", function () {
        that.respond();
    });

    // Respond to click event on expander icon.
    this.tableElement.on('click', 'span.responsiveExpander', {responsiveDatatablesHelperInstance: this}, this.showRowDetailEventHandler);
};

/**
 * Respond window size change.  This helps make datatables responsive.
 */
ResponsiveDatatablesHelper.prototype.respond = function () {
    if (this.disabled) {
        return;
    }

    // Get new windows width
    var newWindowWidth = $(window).width();
    var updatedHiddenColumnsCount = 0;

    // Loop through breakpoints to see which columns need to be shown/hidden.
    var newColumnsToHide = [];
    _.each(this.breakpoints, function (element) {
        if ((!element.lowerLimit || newWindowWidth > element.lowerLimit) && (!element.upperLimit || newWindowWidth <= element.upperLimit)) {
            newColumnsToHide = element.columnsToHide;
        }
    }, this);

    // Find out if there a column show/hide should happen.
    // Skip column show/hide if this window width change follows immediately
    // after a previous column show/hide.  This will help prevent a loop.
    var columnShowHide = false;
    if (!this.skipNextWindowsWidthChange) {
        // Check difference in length
        if (this.columnsHiddenIndexes.length !== newColumnsToHide.length) {
            // Difference in length
            columnShowHide = true;
        } else {
            // Same length but check difference in values
            var d1 = _.difference(this.columnsHiddenIndexes, newColumnsToHide).length;
            var d2 = _.difference(newColumnsToHide, this.columnsHiddenIndexes).length;
            columnShowHide = d1 + d2 > 0;
        }
    }

    if (columnShowHide) {
        // Showing/hiding a column at breakpoint may cause a windows width
        // change.  Let's flag to skip the a column show/hide that may be is
        // caused by the next windows width change.
        this.skipNextWindowsWidthChange = true;
        this.columnsHiddenIndexes = newColumnsToHide;
        this.columnsShownIndexes = _.difference(this.columnIndexes, this.columnsHiddenIndexes);
        this.showHideColumns();
        updatedHiddenColumnsCount = this.columnsHiddenIndexes.length;
        this.skipNextWindowsWidthChange = false;
    }


    // We don't skip this part.
    // If one or more columns have been hidden, add the has-columns-hidden class to table.
    // This class will help keep us know what state the table is in.
    if (this.columnsHiddenIndexes.length) {
        this.tableElement.addClass('has-columns-hidden');
        var that = this;

        // Show details for each row that is tagged with the class .detail-show.
        $('tr.detail-show', this.tableElement).each(function (index, element) {
            var tr = $(element);
            if (tr.next('.row-detail').length === 0) {
                ResponsiveDatatablesHelper.prototype.showRowDetail(that, tr);
            }
        });
    } else {
        this.tableElement.removeClass('has-columns-hidden');
    }
};

/**
 * Show/hide datatables columns.
 */
ResponsiveDatatablesHelper.prototype.showHideColumns = function () {
    // Calculate the columns to show
    // Show columns that may have been previously hidden.
    this.columnsShownIndexes.forEach(function (element) {
        this.tableElement.fnSetColumnVis(element, true);
    }, this);

    // Hide columns that need to been previously shown.
    this.columnsHiddenIndexes.forEach(function (element) {
        this.tableElement.fnSetColumnVis(element, false);
    }, this);
};

/**
 * Create the expand icon on the column with the data-class="expand" attribute
 * defined for it's header.
 *
 * @param {Object} tr table row object
 */
ResponsiveDatatablesHelper.prototype.createExpandIcon = function (tr) {
    if (this.disabled) {
        return;
    }

    // Get the td for tr with the same index as the th in the header tr
    // that has the data-class="expand" attribute defined.
    var tds = $('td', tr);
    if (this.expandColumn !== undefined && this.expandColumn < tds.length) {
        var td = $(tds[this.expandColumn]);
        // Create expand icon if there isn't one already.
        if ($('span.responsiveExpander', td).length == 0) {
            td.prepend(this.expandIconTemplate);
        }
    }
};

/**
 * Show row detail event handler.
 *
 * This handler is used to handle the click event of the expand icon defined in
 * the table row data element.
 *
 * @param {Object} event jQuery event object
 */
ResponsiveDatatablesHelper.prototype.showRowDetailEventHandler = function (event) {
    if (this.disabled) {
        return;
    }

    // Get the parent tr of which this td belongs to.
    var tr = $(this).closest('tr');

    // Show/hide row details
    if (tr.hasClass('detail-show')) {
        ResponsiveDatatablesHelper.prototype.hideRowDetail(event.data.responsiveDatatablesHelperInstance, tr);
    } else {
        ResponsiveDatatablesHelper.prototype.showRowDetail(event.data.responsiveDatatablesHelperInstance, tr);
    }

    tr.toggleClass('detail-show');
};

/**
 * Show row details
 *
 * @param {ResponsiveDatatablesHelper} responsiveDatatablesHelperInstance instance of ResponsiveDatatablesHelper
 * @param {Object}                     tr                                 jQuery wrapped set
 */
ResponsiveDatatablesHelper.prototype.showRowDetail = function (responsiveDatatablesHelperInstance, tr) {
    // Get column because we need their titles.
    var tableContainer = responsiveDatatablesHelperInstance.tableElement;
    var columns = tableContainer.fnSettings().aoColumns;

    // Create the new tr.
    var newTr = $(responsiveDatatablesHelperInstance.rowTemplate);

    // Get the ul that we'll insert li's into.
    var ul = $('ul', newTr);

    // Loop through hidden columns and create an li for each of them.
    _.each(responsiveDatatablesHelperInstance.columnsHiddenIndexes, function (index) {
        var li = $(responsiveDatatablesHelperInstance.rowLiTemplate);
        $('.columnTitle', li).html(columns[index].sTitle);
        li.append(tableContainer.fnGetData(tr[0], index));
        ul.append(li);
    });

    // Create tr colspan attribute
    var colspan = responsiveDatatablesHelperInstance.columnIndexes.length - responsiveDatatablesHelperInstance.columnsHiddenIndexes.length;
    $('td', newTr).attr('colspan', colspan);

    // Append the new tr after the current tr.
    tr.after(newTr);
};

/**
 * Hide row details
 *
 * @param {ResponsiveDatatablesHelper} responsiveDatatablesHelperInstance instance of ResponsiveDatatablesHelper
 * @param {Object}                     tr                                 jQuery wrapped set
 */
ResponsiveDatatablesHelper.prototype.hideRowDetail = function (responsiveDatatablesHelperInstance, tr) {
    tr.next('.row-detail').remove();
};

/**
 * Disable responsive behavior and restores changes made.
 *
 * @param {Boolean} disable, default is true
 */
ResponsiveDatatablesHelper.prototype.disable = function (disable) {
    this.disabled = (disable === undefined) || true;

    if (this.disabled) {
        // Remove all trs that have row details.
        $('tbody tr.row-detail', this.tableElement).remove();

        // Remove all trs that are marked to have row details shown.
        $('tbody tr', this.tableElement).removeClass('detail-show');

        // Remove all expander icons
        $('tbody tr span.responsiveExpander', this.tableElement).remove();

        this.columnsHiddenIndexes = [];
        this.columnsShownIndexes = this.columnIndexes;
        this.showHideColumns();
        this.tableElement.removeClass('has-columns-hidden');

        this.tableElement.off('click', 'span.responsiveExpander', this.showRowDetailEventHandler);
    }
}
