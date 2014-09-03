jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
    var _that = this;

    if ( iDelay === undefined ) {
        iDelay = 250;
    }

    this.each( function ( i ) {
        $.fn.dataTableExt.iApiIndex = i;
        var aanFeatures = _that.fnSettings().aanFeatures;
        if (aanFeatures.f) {
            var
                $this = this,
                oTimerId = null,
                sPreviousSearch = null,
                anControl = $( 'input',  aanFeatures.f );

            anControl.off( 'keyup search input' ).on( 'keyup search input', function() {
                var $$this = $this;

                if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                    window.clearTimeout(oTimerId);
                    sPreviousSearch = anControl.val();
                    oTimerId = window.setTimeout(function() {
                        $.fn.dataTableExt.iApiIndex = i;
                        _that.fnFilter( anControl.val() );
                    }, iDelay);
                }
            });
        }

        return this;
    } );
    return this;
};
