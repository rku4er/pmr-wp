/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {

        $(".imgLiquidFill").imgLiquid();

        // Sticky Headers
        $(".no-touch .sticky").stick_in_parent({
            'offset_top': 70
        });

        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(ipad)/);
        if (agentID) {
            $(".touch .sticky").stick_in_parent({
                'offset_top': 70
            });
        }

        if ( ($(window).width() == 768)) {
            $(".touch .sticky").stick_in_parent({
                'offset_top': 70
            });
        }

        if ( ($(window).width() == 601)) {
            $(".touch .sticky").stick_in_parent({
                'offset_top': 70
            });
        }

        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if(isAndroid) {
            $(".touch .sticky").stick_in_parent({
                'offset_top': 0
            });
        }


        $(".touch .sticky").stick_in_parent({
            'offset_top': 0
        });

        $(".sticky").stick_in_parent()
        .on("sticky_kit:stick", function(e) {

            if(typeof woopra != "undefined"){
                woopra.track("Page - Sections", {
                    Block: "Page",
                    Element: "Section",
                    Title: e.target.innerHTML
                });
            }

            $(this).addClass('hide_stick');
        })
        .on("sticky_kit:unstick", function(e) {
            $(this).removeClass('hide_stick');
        });


        // Webinar


        // Video Triggers
        $(".v-tabs a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

            var tab = $(this).attr("href");
            $(".tab-content").not(tab).css("display", "none");
            $(tab).fadeIn();
        });

        // Author Bio
        $('.no-touch .author').on('mouseenter', function() {
            $('.author-bio').stop().fadeIn(200);
        }).on('mouseleave', function() {
            $('.author-bio').stop().fadeOut(200);
        });

        $('.touch .author').on('click', function() {
            $('.author-bio').fadeToggle(50,

            function() {
               if( $('.author-bio').is(':visible') ) {
                   $(".play").css({'z-index':'-1'});
               } else if ( $('.author-bio').is(':hidden') ) {
                   $(".play").css({'z-index':'15'});
               };
            })
        });

        // Webinar
        var timer,
              sec;

        var playVideo = function(_this) {
            clearInterval(timer);
            sec = 9;

            $(_this).fadeOut(50);
            $(".about p").addClass('hidden');
            $(".touch .about p").removeClass('hidden');
            $(_this).parent().find('.video').addClass('active'); //Video
            $(".webinar .sticky").addClass('hidden');
            $(".touch .sticky").addClass('hidden');
            // Question
            $(_this).parent().find('.question').fadeIn(200);
            document.ontouchmove = function(e){ e.preventDefault(); }
            // Counter
            timer = setInterval(function() {

               $(_this).parent().find('.question #counter').text(sec--);
               if (sec == -1) {
                  clearInterval(timer);

                    if(typeof woopra != "undefined"){
                        woopra.track("Webinar Question - Expire", {
                            Block: "Webinar Question",
                            Element: "Expire button",
                            Title: document.title
                        });
                    }
                  //$("video").each(function () {
                        //this.pause();
                        //this.currentTime = 0;
                    //});
                  $(_this).parent().find('.question').fadeOut(200);
                  document.ontouchmove = function(e){ return true; }
                  $(_this).parent().find('video').fadeIn(100);
                  //$(_this).parent().find('video').each(function () {
                        //this.play();
                    //});
                    var wistiaEmbed = $(_this).parent().find('.wistia_embed')[0].wistiaApi;
                    wistiaEmbed.play();
               }
            }, 1000);


            $(".answer").on('click', function() {
                clearInterval(timer);
                //$("video").each(function () {
                    //this.pause();
                    //this.currentTime = 0;
                //});
                $(_this).parent().find('.question').fadeOut(200);
                $(_this).parent().find('video').fadeIn(99);
                //$(_this).parent().find('video').each(function () {
                    //this.play();

                //});
                var wistiaEmbed = $(_this).parent().find('.wistia_embed')[0].wistiaApi;
                wistiaEmbed.play();

                $(".touch .sticky").removeClass('hidden');
                document.ontouchmove = function(e){ return true; }
                return false;
            });

        };

        $(".tab-content").on('click','.play', function() {
            //$("video").each(function () {
                //this.pause();
                //this.currentTime = 0;
            //});
            playVideo(this);
        });

        //$('.webinar .current-v .tab-content').each(function(){
            //var link = $(this).find('a.video_embed').eq(0),
                //src = link.attr('href'),
                //vid = link.data('vid'),
                //uid = guid(),
                //container = $('<div id="video_'+ uid +'" class="wistia_embed wistia_async_'+ vid +' videoFoam=true embedType=api async=true" style="width:100%;height:100%;">&nbsp;</div>');

            //link.append(container);

            //link.on('click', function(e){
                //e.preventDefault();
            //});
        //});

        $(".touch .pre-v").on('click', function() {
            $('.author-bio').fadeOut(50);
        });

        $(".pre-v").first().trigger('click').addClass('current');

        $('.pre-v').on('click', function() {
            sec = 9;
            //$("video").each(function () {
                //this.pause();
                //this.currentTime = 0;
            //});
            $('video').fadeOut(50);
            $(".about p").removeClass('hidden');
            $(".webinar .sticky").removeClass('hidden');
            $(".play").show();
            $(".question").hide();
            $(".video").removeClass('active');
            clearInterval(timer);

            $(".webinar .sticky").removeClass('hidden');
            $(".about p").removeClass('hidden');
            $('.pre-v.current').removeClass('current');
            $(this).addClass('current');

        });

        // Search
        $('.srch-btn').on('click', function() {
            window.open("http://www.empr.com/search/" + $('#s-input').val() );
            return false;
        });

        // Map Trigger
        $(".trigger a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("active");
            $(this).parent().siblings().removeClass("active");

            var tab = $(this).attr("href");
            $(".mtab-content").not(tab).css("display", "none");
            $(tab).fadeIn();
        });


        // Map Regions
        var regions=[
            {
                "region_name": "Alabama",
                "region_code": "US-AL",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/AL_State_Monitor_External.pdf"
            },
            {
                "region_name": "Arkansas",
                "region_code": "US-AR",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/AR_State_Monitor_External.pdf"
            },
            {
                "region_name": "Arizona",
                "region_code": "US-AZ",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/AZ_State_Monitor_External.pdf"
            },
            {
                "region_name": "California",
                "region_code": "US-CA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/CA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Colorado",
                "region_code": "US-AZ",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/CO_State_Monitor_External.pdf"
            },
            {
                "region_name": "Connecticut ",
                "region_code": "US-CT",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/CT_State_Monitor_External.pdf"
            },
            {
                "region_name": "Colorado ",
                "region_code": "US-CO",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/CO_State_Monitor_External.pdf"
            },
            {
                "region_name": "District of Columbia",
                "region_code": "US-DC",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/DC_State_Monitor_External.pdf"
            },
            {
                "region_name": "Delaware ",
                "region_code": "US-DE",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/DE_State_Monitor_External.pdf"
            },
            {
                "region_name": "Florida ",
                "region_code": "US-FL",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/FL_State_Monitor_External.pdf"
            },
            {
                "region_name": "Georgia ",
                "region_code": "US-GA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/GA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Indiana  ",
                "region_code": "US-IA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/IN_State_Monitor_External.pdf"
            },
            {
                "region_name": "Idaho ",
                "region_code": "US-ID",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/ID_State_Monitor_External.pdf"
            },
            {
                "region_name": "Illinois",
                "region_code": "US-IL",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/IL_State_Monitor_External.pdf"
            },
            {
                "region_name": "Indiana ",
                "region_code": "US-IN",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/IN_State_Monitor_External.pdf"
            },
            {
                "region_name": "Kansas ",
                "region_code": "US-KS",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/KS_State_Monitor_External.pdf"
            },
            {
                "region_name": "Kentucky",
                "region_code": "US-KY",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/KY_State_Monitor_External.pdf"
            },
            {
                "region_name": "Louisiana",
                "region_code": "US-LA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/LA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Maryland",
                "region_code": "US-MD",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MD_State_Monitor_External.pdf"
            },
            {
                "region_name": "Michigan",
                "region_code": "US-MI",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MI_State_Monitor_External.pdf"
            },
            {
                "region_name": "Michigan",
                "region_code": "US-MII",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MI_State_Monitor_External.pdf"
            },
            {
                "region_name": "Maine",
                "region_code": "US-ME",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/ME_State_Monitor_External.pdf"
            },
            {
                "region_name": "Minnesota",
                "region_code": "US-MN",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MN_State_Monitor_External.pdf"
            },
            {
                "region_name": "Minnesota",
                "region_code": "US-MO",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MN_State_Monitor_External.pdf"
            },
            {
                "region_name": "Massachusetts",
                "region_code": "US-MCH",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Missouri",
                "region_code": "US-MO",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MO_State_Monitor_External.pdf"
            },
            {
                "region_name": "Mississippi",
                "region_code": "US-MS",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MS_State_Monitor_External.pdf"
            },
            {
                "region_name": "Montana",
                "region_code": "US-MT",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/MT_State_Monitor_External.pdf"
            },
            {
                "region_name": "North Carolina",
                "region_code": "US-NC",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NC_State_Monitor_External.pdf"
            },
            {
                "region_name": "North Dakota",
                "region_code": "US-ND",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/ND_State_Monitor_External.pdf"
            },
            {
                "region_name": "Nebraska",
                "region_code": "US-NE",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NE_State_Monitor_External.pdf"
            },
            {
                "region_name": "New Hampshire",
                "region_code": "US-NH",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NH_State_Monitor_External.pdf"
            },
            {
                "region_name": "New Jersey",
                "region_code": "US-NJ",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NJ_State_Monitor_External.pdf"
            },
            {
                "region_name": "New Mexico",
                "region_code": "US-NM",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NM_State_Monitor_External.pdf"
            },
            {
                "region_name": "Nevada",
                "region_code": "US-NV",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NV_State_Monitor_External.pdf"
            },
            {
                "region_name": "New York",
                "region_code": "US-NY",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/NY_State_Monitor_External.pdf"
            },
            {
                "region_name": "Ohio",
                "region_code": "US-OH",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/OH_State_Monitor_External.pdf"
            },
            {
                "region_name": "Oklahoma",
                "region_code": "US-OK",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/OK_State_Monitor_External.pdf"
            },
            {
                "region_name": "Oregon",
                "region_code": "US-OR",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/OR_State_Monitor_External.pdf"
            },
            {
                "region_name": "Pennsylvania",
                "region_code": "US-PA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/PA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Rhode Island",
                "region_code": "US-RI",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/RI_State_Monitor_External.pdf"
            },
            {
                "region_name": "South Carolina",
                "region_code": "US-SC",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/SC_State_Monitor_External.pdf"
            },
            {
                "region_name": "South Dakota",
                "region_code": "US-SD",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/SD_State_Monitor_External.pdf"
            },
            {
                "region_name": "Tennessee",
                "region_code": "US-TN",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/TN_State_Monitor_External.pdf"
            },
            {
                "region_name": "Texas",
                "region_code": "US-TX",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/TX_State_Monitor_External.pdf"
            },
            {
                "region_name": "Utah",
                "region_code": "US-UT",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/UT_State_Monitor_External.pdf"
            },
            {
                "region_name": "Vermont",
                "region_code": "US-VT",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/VT_State_Monitor_External.pdf"
            },
            {
                "region_name": "Washington",
                "region_code": "US-WA",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/WA_State_Monitor_External.pdf"
            },
            {
                "region_name": "Wisconsin",
                "region_code": "US-WI",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/WI_State_Monitor_External.pdf"
            },
            {
                "region_name": "Virginia",
                "region_code": "US-VI",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/VA_State_Monitor_External.pdf"
            },
            {
                "region_name": "West Virginia",
                "region_code": "US-WV",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/WV_State_Monitor_External.pdf"
            },
            {
                "region_name": "Wyoming",
                "region_code": "US-WY",
                "state_link" : "http://questdiagnostics.com/dms/Documents/State-Monitors/WY_State_Monitor_External.pdf"
            }
        ];


        var temp_array= regions.map(function(item){
            return item.population;
        });
        var highest_value = Math.max.apply(Math, temp_array);

        for(i = 0; i < regions.length; i++) {

            $('#'+ regions[i].region_code)
            .data('region', regions[i]);
        }

        $('.map path').click(function (e) {
            var region_data=$(this).data('region');
            window.open(region_data.state_link);
        });

        $('.map path').mouseover(function (e) {
            var region_data=$(this).data('region');
            $('<div class="info_panel">'+
                region_data.region_name +
                '</div>'
             )
            .appendTo('body');
        })
        .mouseleave(function () {
            $('.info_panel').remove();
        })
        .mousemove(function(e) {
            var mouseX = e.pageX,
                mouseY = e.pageY;

            $('.info_panel').css({
                top: mouseY-40,
                left: mouseX - ($('.info_panel').width()/2)
            });
        });

        //Meeting News section text boxes
        $('.meeting-news .news .title').each(function(){
            var box_holder = $('.mn-boxes').eq(0),
                boxes = box_holder.find('.item'),
                close = box_holder.find('.close-btn');

            box_holder.hide();

            $(this).on('click', function(e){
                e.preventDefault();
                var id = $(this).attr('href'),
                    curr_box = boxes.filter(id);

                box_holder.carousel($(id).index()).fadeIn(400);
            });

            close.on('click', function(e){
                e.preventDefault();
                box_holder.fadeOut(300);
            });
        });

        $(window).load(function(){
            $('.mn-boxes').css('visibility', 'visible');
        });

        $('.magnific-popup').magnificPopup({
            type : 'iframe',
            midClick: true
        });

        $('.webinar .current-v .tab-content').each(function(){
            var link = $(this).find('a.video_embed').eq(0),
                src = link.attr('href'),
                vid = link.data('vid'),
                uid = guid(),
                container = $('<div id="video_'+ uid +'" class="wistia_embed wistia_async_'+ vid +' videoFoam=true embedType=api async=true" style="width:100%;height:100%;">&nbsp;</div>');

            link.append(container);

            link.on('click', function(e){
                e.preventDefault();
            });
        });

        function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + s4();
        }


      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
