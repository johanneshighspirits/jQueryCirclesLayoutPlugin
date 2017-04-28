/*  =============================== jQuery Circles Layout plugin ============================== 
//  data-nav-image is a url for a thumbnail image

//  data-nav-headline is an optional text that will be shown on
//  top of the thumbnail image. If no data-nav-headline is provided,
//  the h3 text will be shown instead.

//  Example Html markup:
    <div id="uniqueId">
      <ul>
        <li data-nav-image="*.jpg" data-nav-headline="Shorter Headline">
            <h3>Circle 1</h3>
              <img src="">
            <p>Circle 1 content</p>
            <p class="rightLink"><a href="">För mer information &raquo;</a></p>
          </li>
          <li>
              <h3>Circle 2</h3>
              <img src="">
              <p>Circle 2 content</p>
              <p class="rightLink"><a href="">För mer information &raquo;</a></p>
          </li>
      </ul>
  </div><!-- end .circles -->

//  Activate plugin
  $(document).ready(function(e) {
    $("#uniqueId").circlesLayout();
  });
*/
(function($){
  $.fn.circlesLayout = function() {
      var circleId = $(this).attr("id");
      $(this).addClass("circles");
      $("#" + circleId + " > ul").addClass("circles-content");

    var numberOfItems = $("#" + circleId + " .circles-content > li").length;

    // Extract item info and add to items array
      var items = [];
      var mainItem;
      var index = 0;
      $("#" + circleId + " .circles-content > li").each(function(i, element) {
        $(element).append('<div class="clearer"></div>');

        var navigationImageURL = $(element).attr("data-nav-image");
        var navigationHeadline = ($(element).attr("data-nav-headline")) === undefined ? $(element).find("h3").html() : $(element).attr("data-nav-headline");
          var li;
        if ($(element).hasClass("mainItem") === true) {
          numberOfItems -= 1;
        $(element).attr("id", circleId + "-circles-mainItem");
          li = '' + 
  '     <li id="' + circleId + '-circles-navigation-mainItem"><div class="navigation-container">' + 
  '       <a href="#' + circleId + '-circles-mainItem">' + 
  '         <img src="' + navigationImageURL + '">' + 
  '         <div class="itemHeadline">' + 
  '           <p>' + navigationHeadline + '</p>' + 
  '         </div>' + 
  '       </a>' + 
  '     </div></li>';
        mainItem = li;
        }else{
        $(element).attr("id", circleId + "-circles-" + index);
        li = '' + 
  '     <li id="' + circleId + '-circles-navigation-' + index + '"><div class="navigation-container">' + 
  '       <a href="#' + circleId + '-circles-' + index + '">' + 
  '         <img src="' + navigationImageURL + '">' + 
  '         <div class="itemHeadline">' + 
  '           <p>' + navigationHeadline + '</p>' + 
  '         </div>' + 
  '       </a>' + 
  '     </div></li>';
        items.push(li);
        index++;
        }
    });

      // Write navigation <ul> to html
      $("#" + circleId + " .circles-content").before("<ul class=\"circles-navigation\">");
      // Loop through items and write <li>'s to html
      var degreeDistance = 360 / numberOfItems;
      for (var itemNr = 0; itemNr <= numberOfItems; itemNr++) {
        var navigationUl = $("#" + circleId + " .circles-navigation");
        var liContainer, li;
        if ((itemNr == numberOfItems) && (mainItem !== undefined)) {
          // This is our mainItem and should be placed in the center
        navigationUl.append(mainItem);
        liContainer = $("#" + circleId + "-circles-navigation-mainItem" + " div.navigation-container");
        li = $("#" + circleId + "-circles-navigation-mainItem");
        li.css("transform", "scale(0)");
        li.attr("data-rotation", 0);
        }else{
        navigationUl.append(items[itemNr]);
        liContainer = $("#" + circleId + "-circles-navigation-" + itemNr + " div.navigation-container");
        li = $("#" + circleId + "-circles-navigation-" + itemNr);
        li.css("transform", "rotate(" + (itemNr * degreeDistance) + "deg) translateY(-0px) rotate(-" + (itemNr * degreeDistance) + "deg) scale(0)");
        li.attr("data-rotation", itemNr * degreeDistance);
        }
      }
      
    // Layout functions
    // Milliseconds between element animation start
    var interval = 85;
    function circleLayout() {
      $(".circles-navigation li").each(function(index, element){
          if ($(element).hasClass("active") === true) {
            $(element).removeClass("active");
          }
        if (index == numberOfItems) {
            if (mainItem !== undefined) {
              setTimeout(function(){
                $("#" + circleId + "-circles-navigation-mainItem").css("transform", "scale(1.5)");
              }, interval * (numberOfItems + 1));
            }
        }else{
            var rotation = $(element).attr("data-rotation");
            var translation = 300;
            setTimeout(function(){
              $(element).css("transform", "rotate(" + rotation + "deg) translateY(-" + translation + "px) rotate(-" + rotation + "deg) scale(1.0)");          
            }, interval * index);
        }
        });
    }

    function topLayout() {
      var moveInX = mainItem === undefined ? $("#" + circleId).width() / (numberOfItems - 1) : $("#" + circleId).width() / numberOfItems;
      var xOffset = ($("#" + circleId).width() - moveInX) / -2;
      var i = 0;
      $(".circles-navigation li").each(function(index, element){
          if ($(element).hasClass("active") === false) {
            var translation = 250;
          if (i % 2 === 0) {
            translation = 300;
          }
            var rotation = 0;
            var xPos = (moveInX * i) + xOffset;
            $(element).css("transform", "rotate(" + rotation + "deg) translateY(-" + translation + "px) rotate(-" + rotation + "deg) scale(0.8) translateX(" + xPos + "px)"); 
            i++;
          }
        });
        setTimeout(function(){
          var circleContentHeight = $("#circles-content-container").outerHeight() + $(".navigation-container").outerHeight();
          var marginB = circleContentHeight > 700 ? (circleContentHeight - 700) : 0;
          $(".circles").css("margin-bottom", marginB + "px");
        }, 400);
    }
    
    // Click functions
      $(".circles-navigation li").click(function(e){
        e.preventDefault();
        $(".circles-navigation li").each(function(index, element){
          var rotation = $(element).attr("data-rotation");
          var translation = 500;
          if ($(element).hasClass("active") === true) {
            $(element).removeClass("active");
          }
          $(element).css("transform", "rotate(" + rotation + "deg) translateY(-" + translation + "px) rotate(-" + rotation + "deg)");
        });
        $(this).addClass("active");

        // Hide content div during updating
        $("#circles-content-container").addClass("changing");
      // Show content
        var showThis = $(this).attr("id").replace("-navigation", "");
        var mainItemNr = $(this).attr("id").replace(circleId + "-circles-navigation-", "");
        if (mainItemNr == "mainItem") {
        showThis = circleId + "-circles-" + mainItemNr;
      }
        setTimeout(function () {
            $("#circles-content-container").html($("#" + showThis).html()).prepend('<a href="#" class="closer">X</a>').removeClass("changing").css("zIndex",10);
        }, 126);
        topLayout();
      });

    $(document).on('click', '.closer', function(e){
      e.preventDefault();
        $("#circles-content-container").addClass("changing").html("");
      circleLayout();
    });

      // Hide content
      $("#" + circleId + " .circles-content").hide();
      // Add content container
    $("#" + circleId).prepend('<div id="circles-content-container" class="changing"></div>');

    // Position circles
    circleLayout();

    return this;
  };
}(jQuery));