
/**
* Some utility fcn's for listening for `video-in-view`
*/
var _bind = function(el, evt, fcn) {
        el[window.addEventListener ? 'addEventListener' : 'attachEvent']( window.addEventListener ? evt : 'on' + evt, fcn, false);
    },
    scrollPos = function() {
        var doc = document.documentElement;
        return {
            'left': (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0), 
            'top': (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
        };
    },    
    playerOffset = document.getElementById('player').offsetTop,
    playerInView = function() {
        var diff = playerOffset - scrollPos().top,
            adjust = window.innerHeight > (480/2) ? window.innerHeight : 100;
        return diff > -100 && diff < adjust;        
    },
    checker = null;

/**
* Create the player
*/

var player = jwplayer('player');

player.setup({
    file: '//content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4',
    image: '//content.jwplatform.com/thumbs/1g8jjku3-720.jpg',
    advertising: {
        client: 'vast',
        tag: 'https://www.adotube.com/php/services/player/OMLService.php?avpid=oRYYzvQ&platform_version=vast20&ad_type=linear&groupbypass=1&HTTP_REFERER=http://www.longtailvideo.com&video_identifier=longtailvideo.com,test'
    }
});

/**
* Bind the scroll event to check for `video-in-view`
*/
_bind(window, 'scroll', function(e) {
    clearTimeout(checker);
    if(playerInView()) {
        checker = setTimeout(function() {
            player.play(true);
        }, 100);
    }   
    else if(!playerInView()) {
        player.pause(true);
    } 
});
