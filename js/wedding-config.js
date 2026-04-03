/**
 * Meron & Tirhas — site configuration (single source of truth for copy + integrations).
 * After editing, run: npx gulp  (updates js/scripts.min.js used by index.html)
 */
window.WEDDING_CONFIG = {
    pageTitle: 'Meron & Tirhas — Wedding',
    metaDescription: 'We would love for you to join us on our wedding day.',
    /** Link-preview image (Open Graph / iMessage). Hero slideshow uses heroSlideshow.images — not this field. */
    ogImage: 'https://mtirfe1.github.io/Wedding-Invite/img/hero-min.jpg',

    /** HTML line under “We are getting hitched” (you can use <sup> for ordinals). */
    invitationLineHtml:
        'Our celebration is on <strong>Saturday, July 25, 2026</strong> — we hope you can be there.',

    /** Instagram hashtag without # (used in explore URL). */
    instagramHashtag: 'MeronAndTirhas2026',
    /** Visible label e.g. #AlexAndJordan2026 */
    instagramHashtagDisplay: '#MeronAndTirhas2026',

    /** Background video: YouTube watch URL or youtu.be link (see data-property in index). */
    youtubeVideoUrl: 'https://youtu.be/6fa4TDNeTG8',
    videoTitle: 'Edmonton city',
    videoSubtitle: 'A glimpse of the place we love',
    heroSlideshow: {
        images: ['img/hero.jpg', 'img/hero2.jpg', 'img/hero3.jpg', 'img/hero4.jpg'],
        intervalMs: 8000,
        fadeMs: 2600,
    },

    /** Google Maps (get a key at https://console.cloud.google.com/ — restrict by HTTP referrer). */
    mapsApiKey: 'AIzaSyBGhPHE1v3YBXv7lJ5XgHlHfL0myFzk7yY',
    /** Srpska Sala / Edmonton Serbian Cultural Centre */
    mapLat: 53.587935,
    mapLng: -113.513931,

    venueName: 'Srpska Sala - Edmonton Serbian Cultural Centre',
    venueAddress: '12920 122St NW, Edmonton, AB T5E 6J1, Canada',
    contactName: 'Saturday July 25th',
    /** E.164 or formatted strings; empty strings are skipped. */
    contactPhones: ['+1 (780) 655-7461', ''],

    /** Uber deep link — create at https://developer.uber.com/ — or set uberDeepLink to '' to hide. */
    uberDeepLink:
        'https://m.uber.com/ul/?action=setPickup&client_id=XS5Wr2y9MECwcDGMNR8m55hPyPdUeI4t&pickup=my_location&dropoff[formatted_address]=12920%20122St%20NW%2C%20Edmonton%2C%20AB%20T5E%206J1%2C%20Canada&dropoff[latitude]=53.587935&dropoff[longitude]=-113.513931',

    /** “Add to calendar” modal (after successful RSVP). */
    calendar: {
        title: "Meron & Tirhas's wedding",
        start: new Date('Jul 25, 2026 18:00'),
        end: new Date('Jul 26, 2026 00:00'),
        address: '12920 122St NW, Edmonton, AB T5E 6J1, Canada',
        description:
            "We can't wait to celebrate with you. Questions? Reach out to the contacts listed on our site.",
    },

    /**
     * RSVP posts to Google Apps Script. Set up per the original template’s blog post.
     * Leave blank to disable posting (guests will see a notice).
     */
    googleAppsScriptUrl:
        'https://script.google.com/macros/s/AKfycbwogg_imFMs20SfgimQjhsOfymmyjAia8QQrTKoxABO1aMm4dyoBoJTeyb4NT6Cyd-zGg/exec',

    /**
     * Valid invite codes (guests enter exactly this). Change to your own.
     * Empty array = any non-empty code is accepted (not recommended).
     */
    validInviteCodes: ['Love2026'],

    rsvpDeadlineText: 'Please RSVP by May 1, 2026',

    /** Universal Analytics — leave uaId empty to disable. */
    analytics: {
        uaId: '',
    },

    footerHtml: 'Made with love for our family & friends',
};
