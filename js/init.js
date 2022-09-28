(function($) {

    // STATIC VARS



    // ON DOM READY
    $(document).ready(function (){

        $('.bxslider').bxSlider({
            controls: false,
            auto: true
        });
        
        onResize();
    });

    $(window).load(function(){
        
    });



    $( window ).resize(function() {
        onResize();
    });





    // OTHER FUNCTIONS
    //---------------------------------------------
    
    function onResize() {
        
        availableHeight = $(window).height();
        availableWidth = $(window).width();

        //making some blocks same with and available heights
        $('.screensize').outerHeight(availableHeight);
        $('.screensize').outerWidth(availableWidth);
        
    }
    
    
    

    // END OTHER FUNCTIONS
    //---------------------------------------------
    

})(jQuery);