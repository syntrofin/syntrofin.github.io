(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });
$('.widgeticon').on('mouseover', function(){
    $(this).addClass("animated bounce");
});
$('.widgeticon').on('mouseout', function(){
  var _this = $(this);
  setTimeout(function(){
    _this.removeClass("animated bounce");
  }, 1000);
});
$('#spinner').removeClass("spinpng").addClass('spingif');
setTimeout(function(){
	$('#spinner').removeClass("spingif").addClass('spinpng');
}, 1000);
$('#spinner').on('mouseover', function(){
    $(this).removeClass("spinpng").addClass('spingif');
});
$('#spinner').on('mouseout', function(){
  $(this).removeClass("spingif").addClass('spinpng');
});
  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 70) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

//Social share
  var toggle = $('#ss_toggle');
  var menu = $('#ss_menu');
  var rot;

  $('#ss_toggle').on('click', function(ev) {
    rot = parseInt($(this).data('rot')) - 180;
    menu.css('transform', 'rotate(' + rot + 'deg)');
    menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
    if ((rot / 180) % 2 == 0) {
      $(this).children('div').addClass('bar');
      $(this).children('div').children('img').hide();
      //Moving in
      toggle.parent().addClass('ss_active');
      toggle.addClass('close');
    } else {
      $(this).children('div').removeClass('bar');
      $(this).children('div').children('img').show();
      //Moving Out
      toggle.parent().removeClass('ss_active');
      toggle.removeClass('close');
    }
    $(this).data('rot', rot);
  });

  menu.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
    if ((rot / 180) % 2 == 0) {
      $('#ss_menu div i').addClass('ss_animate');
    } else {
      $('#ss_menu div i').removeClass('ss_animate');
    }
  });
  var $timeline_block = $('.cd-timeline-block');

  	//hide timeline blocks which are outside the viewport
  	$timeline_block.each(function(){
  		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
  			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
  		}
  	});
  $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() == $(document).height()) {
         $('#ss_toggle').trigger('click');
     }else{
       if($('#ss_toggle').hasClass('close')){
         $('#ss_toggle').trigger('click');
       }
     }
     if($(window).scrollTop() > 450){
       $(".promoSection").fadeIn("slow").addClass("show");
     }else{
       $(".promoSection").fadeOut("slow").removeClass("show");
     }
     $timeline_block.each(function(){
       if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
         $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
       }
     });
  });
  $('#subscribe').on('click', function(){
    var val = $('#email').val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if ($.trim(val).length == 0) {
      $('#emailmessage').text('Please enter email').addClass('error-message');
    } else if (!filter.test(val)) {
      $('#emailmessage').text('Please enter valid email').addClass('error-message');
    }else{
      $('#emailmessage').text('').removeClass('error-message');
      $.ajax({
        type: "POST",
        url: "http://merritos.com/merritossubscribers",
        data: {email: val},
        cache: false,
        success: function(result){
          console.log(result);
          $('#email').val(' ');
          $('#emailmessage').text('Thank you! Will keep you posted.').addClass('success-message');
        }
      });
    }
    setTimeout(function(){
      $('#emailmessage').fadeOut( "slow", function(){
        $('#emailmessage').text('').removeClass('error-message').show();
      });
      $('#emailmessage').fadeOut( "slow", function(){
        $('#emailmessage').text('').removeClass('success-message').show();
      });
      return false;
    }, 3000);
  });
  function headerimganimate(){
    setTimeout(function(){
        $('.headerImg2').show().addClass("bounceInDown");
    }, 2000);
    setTimeout(function(){
        $('.headerImg1').addClass('hinge');
    }, 2500);
    setTimeout(function(){
        $('.headerImg1').show().removeClass('hinge');
        $('.headerImg2').hide().removeClass('bounceInDown');
        headerimganimate();
    }, 15500);
  }
  headerimganimate();
// type text animation
  var TxtType = function(el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = '';
          this.tick();
          this.isDeleting = false;
      };

      TxtType.prototype.tick = function() {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];

          if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

          var that = this;
          var delta = 200 - Math.random() * 100;

           if (this.isDeleting) { delta /= 10; }

           if (!this.isDeleting && this.txt === fullTxt) {
           delta = this.period;
           this.isDeleting = true;
           } else if (this.isDeleting && this.txt === '') {
           this.isDeleting = false;
           this.loopNum++;
           delta = 500;
           }

          setTimeout(function() {
          that.tick();
          }, delta);
      };

      window.onload = function() {
          var elements = document.getElementsByClassName('typewrite');
          for (var i=0; i<elements.length; i++) {
              var toRotate = elements[i].getAttribute('data-type');
              var period = elements[i].getAttribute('data-period');
              if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
              }
          }
          // INJECT CSS
          var css = document.createElement("style");
          css.type = "text/css";
          css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #007bff}";
          document.body.appendChild(css);
      };

      //  Tabs sliding
      $('.nav-link').on('click', function(){
        $(this).parent('div').addClass('static');
      });
      function tabsliding(n){
        setTimeout(function(){
          if(!$('#nav-tab').hasClass('static')){
          if($(window).scrollTop() < 760){
            $('#nav-tab').children('a').removeClass('active').removeClass('show');
            $('#nav-tab').children('a').eq(n).addClass('active').addClass('show');
            $('#nav-tabContent').children('div').removeClass('active').removeClass('show');
            $('#nav-tabContent').children('div').eq(n).addClass('active').addClass('show');
          }
          if(n === 3)
            tabsliding(0);
          else
            tabsliding(n+1);
          }
        }, 2500);
      }
      tabsliding(1);
      function secondtabsliding(n){
        setTimeout(function(){
          if(!$('#nav-tab2').hasClass('static')){
          if($(window).scrollTop() < 1950){
            $('#nav-tab2').children('a').removeClass('active').removeClass('show');
            $('#nav-tab2').children('a').eq(n).addClass('active').addClass('show');
            $('#nav-tabContent2').children('div').removeClass('active').removeClass('show');
            $('#nav-tabContent2').children('div').eq(n).addClass('active').addClass('show');
          }
          if(n === 3)
            secondtabsliding(0);
          else
            secondtabsliding(n+1);
          }
        }, 2500);
      }
      secondtabsliding(1);

})(jQuery); // End of use strict
