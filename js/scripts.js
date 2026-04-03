function applyWeddingConfig() {
    var C = window.WEDDING_CONFIG;
    if (!C) {
        return;
    }
    if (C.pageTitle) {
        document.title = C.pageTitle;
    }
    if (C.metaDescription) {
        $('meta[name="description"]').attr('content', C.metaDescription);
        $('meta[property="og:description"]').attr('content', C.metaDescription);
    }
    if (C.pageTitle) {
        $('meta[property="og:title"]').attr('content', C.pageTitle);
    }
    if (C.ogImage) {
        $('meta[property="og:image"]').attr('content', C.ogImage);
    }
    if (C.invitationLineHtml) {
        $('#wedding-invitation-line').html(C.invitationLineHtml);
    }
    if (C.rsvpDeadlineText) {
        $('#rsvp-deadline').text(C.rsvpDeadlineText);
    }
    if (C.footerHtml) {
        $('#footer-message').html(C.footerHtml);
    }
    if (C.instagramHashtag && C.instagramHashtagDisplay) {
        $('#instagram-hashtag-link')
            .text(C.instagramHashtagDisplay)
            .attr(
                'href',
                'https://instagram.com/explore/tags/' +
                    encodeURIComponent(C.instagramHashtag.replace(/^#/, '')) +
                    '/'
            );
    }
    if (C.videoTitle) {
        $('#video-section-title').text(C.videoTitle);
    }
    if (C.videoSubtitle) {
        $('#video-section-subtitle').text(C.videoSubtitle);
    }
    if (C.youtubeVideoUrl) {
        var vidProp =
            "{videoURL:'" +
            C.youtubeVideoUrl.replace(/'/g, "\\'") +
            "',containment:'#video-bg',autoPlay:true, mute:true, showControls:false, startAt:0, stopAt:120, opacity:1}";
        $('#bgndVideo').attr('data-property', vidProp);
    }
    if (C.venueName) {
        $('#venue-name').text(C.venueName);
    }
    if (C.venueAddress) {
        $('#venue-address').text(C.venueAddress);
    }
    if (C.contactName) {
        $('#contact-name').text(C.contactName);
    }
    if (C.contactPhones && C.contactPhones.length) {
        var phoneLines = C.contactPhones
            .filter(function (p) {
                return p && String(p).trim().length;
            })
            .map(function (phone) {
                var digits = String(phone).replace(/[^\d+]/g, '');
                return (
                    '<i class="fa fa-mobile"></i> <a href="tel:' +
                    digits +
                    '">' +
                    $('<div>').text(phone).html() +
                    '</a>'
                );
            })
            .join('<br>');
        if (phoneLines) {
            $('#contact-phones').html(phoneLines);
        }
    }
    if (C.uberDeepLink && C.uberDeepLink.indexOf('YOUR_') === -1) {
        $('#uber-book-link').attr('href', C.uberDeepLink).show();
    }
}

function loadGoogleMapsScript() {
    var C = window.WEDDING_CONFIG;
    var key = C && C.mapsApiKey;
    if (!key || String(key).indexOf('YOUR_') === 0) {
        return;
    }
    var s = document.createElement('script');
    s.async = true;
    s.defer = true;
    s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) + '&callback=initMap';
    document.body.appendChild(s);
}

function loadAnalyticsIfConfigured() {
    var C = window.WEDDING_CONFIG;
    var uaId = C && C.analytics && C.analytics.uaId;
    if (!uaId || !String(uaId).trim()) {
        return;
    }
    window.GoogleAnalyticsObject = 'ga';
    window.ga =
        window.ga ||
        function () {
            (window.ga.q = window.ga.q || []).push(arguments);
        };
    window.ga.l = 1 * new Date();
    var a = document.createElement('script');
    a.async = 1;
    a.src = 'https://www.google-analytics.com/analytics.js';
    var m = document.getElementsByTagName('script')[0];
    m.parentNode.insertBefore(a, m);
    ga('create', uaId, 'auto');
    ga('send', 'pageview');
}

/**
 * Absolute URL for a site-root-relative asset (e.g. "img/hero.jpg").
 * Derives the site root from the main stylesheet URL so it works for:
 * - GitHub Pages project URLs with or without a trailing slash
 * - Custom domains at /
 * - pathname quirks (ogImage / meta tags do not affect this — hero is separate)
 */
function resolveAssetUrl(relativePath) {
    var rel = String(relativePath || '').replace(/^\//, '');
    var link = document.querySelector('link[rel="stylesheet"][href*="styles.min"]');
    if (link && link.href) {
        try {
            var siteRoot = new URL('../', link.href).href;
            return new URL(rel, siteRoot).href;
        } catch (err) {
            /* fall through */
        }
    }
    var p = window.location.pathname;
    var basePath;
    if (p.endsWith('/')) {
        basePath = p;
    } else if (/\.html?$/i.test(p)) {
        basePath = p.replace(/[^/]+$/, '');
    } else {
        basePath = p + '/';
    }
    return window.location.origin + basePath + rel;
}

/** Safe CSS background-image value from absolute URL (handles quotes / odd chars). */
function heroBackgroundImage(url) {
    return 'url(' + JSON.stringify(String(url)) + ')';
}

function initHeroSlideshow() {
    var C = window.WEDDING_CONFIG || {};
    var heroCfg = C.heroSlideshow || {};
    var images = (heroCfg.images || []).filter(function (img) {
        return img && String(img).trim().length;
    });

    if (images.length === 0) {
        images = ['img/hero-min.jpg'];
    }

    images = images.map(function (src) {
        return resolveAssetUrl(src);
    });

    var slides = document.querySelectorAll('.hero-slideshow .hero-slide');
    if (!slides || slides.length < 2) {
        return;
    }

    var fadeMs = Number(heroCfg.fadeMs) || 2600;
    var intervalMs = Number(heroCfg.intervalMs) || 8000;

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.transitionDuration = fadeMs + 'ms';
    }

    var currentImageIndex = 0;
    var activeSlideIndex = 0;

    slides[activeSlideIndex].style.backgroundImage = heroBackgroundImage(images[currentImageIndex]);
    slides[activeSlideIndex].classList.add('is-active');

    if (images.length === 1) {
        return;
    }

    function advanceSlide() {
        var nextImageIndex = (currentImageIndex + 1) % images.length;
        var nextSlideIndex = activeSlideIndex === 0 ? 1 : 0;

        slides[nextSlideIndex].style.backgroundImage = heroBackgroundImage(images[nextImageIndex]);
        slides[nextSlideIndex].classList.add('is-active');
        slides[activeSlideIndex].classList.remove('is-active');

        activeSlideIndex = nextSlideIndex;
        currentImageIndex = nextImageIndex;
    }

    /* Preload every frame so the next slide is decoded before we fade — avoids empty/black backgrounds on desktop. */
    var preloadRemaining = images.length;
    var rotationStarted = false;
    function onPreloaded() {
        preloadRemaining -= 1;
        if (preloadRemaining <= 0 && !rotationStarted) {
            rotationStarted = true;
            setInterval(advanceSlide, intervalMs);
        }
    }
    images.forEach(function (src) {
        var img = new Image();
        img.onload = onPreloaded;
        img.onerror = onPreloaded;
        img.src = src;
    });
}

$(document).ready(function () {
    applyWeddingConfig();
    initHeroSlideshow();
    loadGoogleMapsScript();
    loadAnalyticsIfConfigured();

    /***************** Waypoints ******************/

    [
        { selector: '.wp1', animation: 'fadeInLeft' },
        { selector: '.wp2', animation: 'fadeInRight' },
        { selector: '.wp3', animation: 'fadeInLeft' },
        { selector: '.wp4', animation: 'fadeInRight' },
        { selector: '.wp5', animation: 'fadeInLeft' },
        { selector: '.wp6', animation: 'fadeInRight' },
        { selector: '.wp7', animation: 'fadeInUp' },
        { selector: '.wp8', animation: 'fadeInLeft' },
        { selector: '.wp9', animation: 'fadeInRight' }
    ].forEach(function (wp) {
        $(wp.selector).waypoint(
            function () {
                $(wp.selector).addClass('animated ' + wp.animation);
            },
            { offset: '75%' }
        );
    });

    /***************** Initiate Flexslider ******************/

    $('.flexslider').flexslider({
        animation: 'slide'
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/

    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    function closeMobileNav() {
        $('.nav-toggle').removeClass('active').attr('aria-expanded', 'false');
        $('.header-nav').removeClass('open');
        $('body').removeClass('nav-open');
    }

    $('.nav-toggle').click(function (e) {
        var willOpen = !$('.header-nav').hasClass('open');
        $(this).toggleClass('active', willOpen).attr('aria-expanded', willOpen ? 'true' : 'false');
        $('.header-nav').toggleClass('open', willOpen);
        $('body').toggleClass('nav-open', willOpen);
        e.preventDefault();
    });

    /***************** Header BG Scroll ******************/

    function syncNavigationState() {
        var scroll = $(window).scrollTop();
        if (scroll >= 20) {
            $('section.navigation').addClass('fixed');
        } else {
            $('section.navigation').removeClass('fixed');
        }
    }

    $(window).on('scroll resize', syncNavigationState);
    syncNavigationState();

    /***************** Smooth Scrolling ******************/

    var scrollLinksSelector =
        '.header-nav a[href^="#"], ' +
        '.member-actions a[href^="#"], ' +
        '.hero-rsvp-btn[href^="#"], ' +
        '.down-arrow a[href^="#"], ' +
        '.to-top[href^="#"]';

    $(scrollLinksSelector).click(function (e) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                closeMobileNav();
                e.preventDefault();
                $('html,body').animate(
                    {
                        scrollTop: target.offset().top - 90
                    },
                    2000
                );
            }
        }
    });

    /********************** Embed youtube video *********************/

    $('.player').YTPlayer();

    /********************** Toggle Map Content **********************/

    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/

    var cal = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.calendar) || {};
    var calendarWidget = createCalendar({
        options: {
            class: '',
            id: ''
        },
        data: {
            title: cal.title || 'Our wedding',
            start: cal.start || new Date(),
            end: cal.end || new Date(),
            address: cal.address || '',
            description: cal.description || ''
        }
    });

    $('#add-to-cal').html(calendarWidget);

    /********************** RSVP **********************/

    function normalizeInviteInput(str) {
        return String(str)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '');
    }

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var cfg = window.WEDDING_CONFIG || {};
        var scriptUrl = cfg.googleAppsScriptUrl;
        var rawCodes = cfg.validInviteCodes;
        var codes = Array.isArray(rawCodes) ? rawCodes : rawCodes ? [rawCodes] : [];

        var entered = String($('#invite_code').val()).trim();
        var enteredNorm = normalizeInviteInput(entered);
        var codeOk;
        if (!codes || codes.length === 0) {
            codeOk = enteredNorm.length > 0;
        } else {
            codeOk = codes.some(function (c) {
                return normalizeInviteInput(c) === enteredNorm;
            });
        }

        if (!codeOk) {
            $('#alert-wrapper').html(
                alertMarkup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.')
            );
            return;
        }

        if (!scriptUrl || String(scriptUrl).trim() === '') {
            $('#alert-wrapper').html(
                alertMarkup(
                    'danger',
                    '<strong>RSVP is not set up yet.</strong> Add your Google Apps Script URL in js/wedding-config.js.'
                )
            );
            return;
        }

        var rsvpFormData = $(this).serialize();
        $('#alert-wrapper').html(alertMarkup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        $.post(scriptUrl, rsvpFormData)
            .done(function (responseData) {
                if (typeof responseData === 'string') {
                    try {
                        responseData = JSON.parse(responseData);
                    } catch (err) {
                        $('#alert-wrapper').html(
                            alertMarkup(
                                'danger',
                                '<strong>Sorry!</strong> Unexpected response from the RSVP server.'
                            )
                        );
                        return;
                    }
                }
                if (responseData.result === 'error') {
                    $('#alert-wrapper').html(alertMarkup('danger', responseData.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function () {
                $('#alert-wrapper').html(
                    alertMarkup('danger', '<strong>Sorry!</strong> There is some issue with the server. ')
                );
            });
    });
});

/********************** Extras **********************/

function initMap() {
    var C = window.WEDDING_CONFIG || {};
    var lat = typeof C.mapLat === 'number' ? C.mapLat : 40.7128;
    var lng = typeof C.mapLng === 'number' ? C.mapLng : -74.006;
    var location = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: location,
        scrollwheel: false
    });

    new google.maps.Marker({
        position: location,
        map: map
    });
}

function alertMarkup(alertType, msg) {
    return (
        '<div class="alert alert-' +
        alertType +
        '" role="alert">' +
        msg +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>'
    );
}
