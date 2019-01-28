$(document).ready(function() {
  
/*
    Primary Menu
*/
    // Opens the navigation menu
    // Also activates the Page Overlay block
    $('#primary-menu #menu-toggle').click(function() {
        $('#primary-menu ul').addClass('menu-visible');
        $('#page-header .page-overlay').addClass('visible');
    });


    // Closes the navigation menu and removes the Page Overlay block
    $('#primary-menu a.icon-menu-close').click(function(e) {
        e.preventDefault();
        $('#primary-menu ul').removeClass('menu-visible');
        $('#page-header .page-overlay').removeClass('visible');
    });

    // Closes the navigation menu when user clicks outside the navigation menu area
    $('#page-header .page-overlay').click(function() {        
        $('#page-header #primary-menu ul').removeClass('menu-visible');
        $('#page-header .page-overlay').removeClass('visible');
    });



    // Adds hover effect on the Btn Action Group 
    $('.btn-action-group .btn').mouseover(function() {
        $(this).find('.icon').addClass('hover');
    });

    $('.btn-action-group .btn').mouseout(function() {
        $(this).find('.icon').removeClass('hover');
    });


    // Primary Sidebar - Toggle Widget Function
    $('.primary-sidebar .widget-toggle').click(function() {
        $(this).toggleClass('open');
        $(this).next('.widget-group').slideToggle();
    });

})
