/*! WOW - v1.1.2 - 2015-08-19
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),null!=a.scrollContainer&&(this.config.scrollContainer=document.querySelector(a.scrollContainer)),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);

jQuery.fn.outerHTML = function(s) {return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();};
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);

let __opts = {popup:{}}
__opts.popup.defaults = {
  tClose: 'Закрыть (Esc)',
  tLoading: 'Загрузка...',
  type: 'inline',
  fixedContentPos: true,
  fixedBgPos: true,
  image: {
    tError: 'Произошла ошибка при загрузке <a href="%url%">изображения</a>.'
  },
  ajax: {
    settings: null,
    cursor: 'isProcessed',
    tError: 'Ошибка при загрузке <a href="%url%">содержимого</a>'
  },
  /*closeMarkup: '<button title="%title%" type="button" class="mfp-close">sdsad;</button>',*/
  callbacks: {
    beforeOpen: function() {
      $('body').addClass('withModalOpen');
    },
    open: function() {
      $('table').not('.tableHolder table').wrap('<div class="tableHolder"></div>');
      EventMoreBlock(true);
      // $("select").chosen({"disable_search": true});
    },
    change: function() {
    },
    ajaxContentAdded: function() {
    },
    afterClose: function() {
      $('body').removeClass('withModalOpen');
    },
  },
  verticalFit: true,
  closeBtnInside: true,
  preloader: true,
  removalDelay: 500,
  mainClass:'mfp-move-horizontal'
};
__opts.popup.gallery = $.extend(true,{},__opts.popup.defaults,{
  gallery: {
    enabled: true,
    tPrev: 'Предыдущее (&larr;)',
    tNext: 'Следующее (&rarr;)',
    tCounter: '%curr% из %total%',
    preload: [1,2],
  },
  modal:false,
  type: 'image',
  closeBtnInside: false,
  mainClass:'mfp-move-horizontal mfp-mode-gallery'
});

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
  cache: false,
  beforeSend: function(xhr, settings) {
    var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

$('body').on('click','.closeBlock, .mfp-close, .actionMfpClose',function() {
  $.magnificPopup.close();
  return false;
});

var ajaxRequest = function(e) {
  var url, enctype, method;
  var gaCallback = '';
  var yaCallback = '';

  /*console.log(this,e);*/

  if (e.type=='submit')
  {
    url = this.action;
    enctype = this.enctype;
    method = this.method;
  }

  if (e.type=='click')
  {
    url = this.getAttribute('href');
    enctype = false;
    method = 'get';
  }

  if ($(this).is('[data-ga]') && $(this).is('[data-metrika]')) {
    gaCallback = $(this).data('ga');
    yaCallback = $(this).data('metrika');
  }

  var src = ($(this).data('request-source') || ('#'+url.split('#')[1])).trim();
  var trg = $(this).data('request-target');
  var url = url.split('#')[0];

  if (!src) {return}

  e.preventDefault();

  var owner = this;

  var data;

  method = (method||'get').toUpperCase();

  if (e.type=='submit')
  {
    if (method=='POST')
    {
      data = new FormData(this);
    }
    else
    {
      data = $(this).serializeArray();
    }
  }

  $(owner).addClass('isProcessing');
  $(trg=='@self'?owner:src).addClass('isWaiting');
  if(url)
  {

    $.ajax({url:url||window.location.href, processData:method=='POST'?false:true, contentType:false, cache:false, type:method, method:method, data:data}).done(function(data){

      $(owner).removeClass('isProcessing');

      var html = $('<div>'+data+'</div>').find(src);
      if (!html.length)
      {
        html = "<div class='message message-error'>Ошибка при загрузке</div>"
      }

      switch (trg)
      {
        case '@modal':
        case '@popup':
        {
          var type = trg.split('@')[1];
          var param = $(owner).data('request-param');
          param = param ? param.split(';') : [];
          for (var i=0;i<param.length;i++)
          {
            param[i]=param[i].split(':');
            param[i]="data-param-"+param[i][0]+(param[i][1]?("='"+param[i][1]+"'"):'');
          }
          var options = {items: {src:$("<div class='popupBlock popupBlock-"+type+"' data-request-source='"+src+"' data-request-url='"+url+"' "+($(owner).data('request-title')?('data-request-title="'+$(owner).data('request-title')+'"'):'')+(param.length?param.join(' '):'')+"><div class='blockWrapper'>"+($(owner).data('request-title')?("<h2 class='blockTitle'>"+$(owner).data('request-title')+"</h2>"):'')+"<div class='blockContent'>"+html.outerHTML()+"</div></div></div>")},type:'inline'};
          var magnificPopup = $.magnificPopup.instance;

          $.magnificPopup.open($.extend(true,{},__opts.popup.defaults,options));

          if (gaCallback.length && yaCallback.length) {
            $('.mfp-content').attr('data-metrika',yaCallback);
            $('.mfp-content').attr('data-ga',gaCallback);
          }


          break;
        }
        case '@blank':
        {
          var w = window.open();
          w.document.write(html.html());
          w.document.close();
          break;
        }
        case '@reload':
        {
          $.magnificPopup.close();
          if ($(owner).data('href') == undefined) {
            window.location.reload();
          } else {
            document.location.href = $(owner).data('href');
          }
          break;
        }
        default:
        {
          $(trg=='@self'?owner:src)[$(this).data('request-insert')?($(this).data('request-insert')=='prepend'?'prepend':'append'):'html'](html.html()).removeClass('isWaiting');

          /* update content behavior */
          $('table').not('.tableHolder table').wrap('<div class="tableHolder"></div>');
          $('.field :input').blur();
        }
      }
      if ($('.mfp-content .success_post_message').length) {
        metrickAdd($('.mfp-content').attr('data-metrika'),$('.mfp-content').attr('data-ga'));
      }
      $('input[type=radio]').on('change',function() {
        $('input[name='+$(this).attr("name")+']').removeAttr('checked');
      });
    });
  }
  else
  {
    var type = trg.split('@')[1];
    var param = $(owner).data('request-param');
    param = param ? param.split(';') : [];
    for (var i=0;i<param.length;i++)
    {
      param[i]=param[i].split(':');
      param[i]="data-param-"+param[i][0]+(param[i][1]?("='"+param[i][1]+"'"):'');
    }
    var options = {items: {src:$("<div class='popupBlock popupBlock-"+type+"' data-request-source='"+src+"' data-request-url='"+url+"' "+(param.length?param.join(' '):'')+"><div class='blockWrapper'>"+($(owner).data('request-title')?("<h2 class='blockTitle'>"+$(owner).data('request-title')+"</h2>"):'')+"<div class='blockContent'>"+$(src).html()+"</div></div></div>")},type:'inline'};
    $.magnificPopup.open($.extend(true,{},__opts.popup.defaults,options));
  }

  return false;
}

$(function () { // ready start
  // $("select").chosen({"disable_search": true});

  new WOW({
    callback: function(el) {
      $(el).addClass('wow-end');
    }
  }).init();

  if ($.fn.mask) {
    $(document).on('focus','input[type="tel"],input.phone',function(){
      $(this).mask('+7 (999) 999-99-99');
    })
  }
  $(document).click(e => {
    if (e.target.tagName === 'SELECT') {
      return;
    }
    $('select').removeClass('change');
  });

  /*$('[data-tab-js]').each(function(){
    $('.tab[data-tab-id]',this).on('click', function() {
      $('.tab-content').hide();
      const owner = $(this).closest('[data-tab-js]');
      $('.tab',owner).removeClass('tab--active')

      const id = $(this).attr('data-tab-id');
      $('.tab-content#'+id).show();
      $('.tab[data-tab-id='+id+']',owner).addClass('tab--active')
    });
    $('.tab[data-tab-id].tab--active',this).click();

  });*/

  $(document).on('click','[data-gallery-href][data-target]',function(e){
    if ($.fn.magnificPopup)
    {
      const src = $(this).data('target');
      const url = $(this).data('gallery-href');
      let items = [];
      let idx = 0;
      const owner = this;
      const method = 'POST';
      let data;

      $.ajax({url, processData:false, contentType:false, cache:false, type:method, method:method, data}).done(function(data){

        let html = $('<div>'+data+'</div>').find(src);
        if (!html.length)
        {
          html = "<div class='message message-error'>Ошибка при загрузке</div>"
        }

        $(html).find('[data-gallery] .item a').each(function(){
          items.push({src:this.href,type:$(this).is('[data-video]')?'iframe':'image'});//.is('[href*="youtube.com/watch?v="]')?'iframe':'image'});
          if (this === owner)
          {
            idx = items.length-1;
          }
        });
        var options = $.extend(true,{},__opts.popup.gallery,{items:items});
        $.magnificPopup.open(options,3);
      })

      return false;
    }
  });

  $(document).on('click','[data-gallery] a[data-gallery-item]',function(e){
    if ($.fn.magnificPopup)
    {
      e.preventDefault();

      let items = [];
      let idx = 0;
      const owner = this;

      $(this).closest('[data-gallery]').find('a[data-gallery-item]').each(function(){
        items.push({src:this.href,type:$(this).is('[data-video]')?'iframe':'image'});//.is('[href*="youtube.com/watch?v="]')?'iframe':'image'});
        if (this === owner)
        {
          idx = items.length-1;
        }
      });
      var options = $.extend(true,{},__opts.popup.gallery,{items:items});
      $.magnificPopup.open(options,idx);
      return false;
    }
  });



  $('body a[href*="#"]:not([href="#"])').on('click',function(e) {
    const el = ('#'+$(this).attr('href').split('#')[1]);
    $('body,.menuSwitch').removeClass('openMenu');
    if ($(el).length) {
      const elHeight = $(el).offset().top - $('header').height() - 10;// - $('header').height();
      $('html,body').animate(
        {scrollTop: elHeight},
        1000,
        console.log('click action #'));
      return false;
    }
  });

  /*function percentInViewport (el,viewportLimit) {
    if (typeof jQuery === "function" && el instanceof jQuery) el = el.get(0);
    if (!el) {return false;}

    var wH = window.innerHeight || document.documentElement.clientHeight;
    var wW = window.innerWidth || document.documentElement.clientWidth;
    var rect = el.getBoundingClientRect();
    rect.h = rect.bottom-rect.top;
    rect.w = rect.right-rect.left;
    if (viewportLimit)
    {
      rect.h = Math.min(rect.h,wH);
      rect.w = Math.min(rect.w,wW);
    }
    return {
      vertical: +(( (Math.min(wH,Math.max(0,rect.bottom)) - Math.max(0,Math.min(wH,rect.top))) / rect.h ).toFixed(2)),
      horizontal: +(( (Math.min(wW,Math.max(0,rect.right)) - Math.max(0,Math.min(wW,rect.left))) / rect.w ).toFixed(2)),
    };
  }*/

  $('body').on('submit','form[data-request-source]', ajaxRequest);
  $('body').on('click','a[data-request-source]', ajaxRequest);


  $('body').on('click','.header-switch',function(e) {
    e.preventDefault();
    if ($('body').hasClass('menuSwitched-inner'))
    {
      $('body').removeClass('menuSwitched-inner');
    }
    else
    {
      $(this).toggleClass('openMenu');
      $('body').toggleClass('openMenu');
    }
    return false;
  });

  /*$('.course-list').each(function() {
    $(this).wrap("<div class='scroller'><div class='scroller-scene swiper-container'></div></div>").addClass("scroller-track swiper-wrapper");
    $('.course-list__item', this).addClass("swiper-slide");
    const $owner = $(this).closest('.swiper-container');
    let list = new Swiper($owner.get(0), {
      speed: 800,
      slidesPerView: 1,
      loop: true,
      loopedSlides: 2,
      navigation: {
        nextEl: '.next-slide--course',
        prevEl: '.prev-slide--course',
      },
    });
  });*/

  $('select').click(e => {
    $(e.currentTarget)[$(e.currentTarget).hasClass('change') ? 'removeClass' : 'addClass']('change');
  });



  $('.review__list').each(function(i) {
    $(this).wrap("<div class='scroller'><div class='scroller-scene swiper-container'></div></div>").addClass("scroller-track swiper-wrapper");
    $('.review__item', this).addClass("swiper-slide");
    const $owner = $(this).closest('.swiper-container');
    $owner.parent().append(`<div class="actions">
                    <div class="prev-slide next-slide-${i}">
                      <div class="wrapper-slide">  
                        <span class="icon material-symbols-outlined">
                            arrow_back_ios
                        </span>
                      </div>
                    </div>
                    <div class="next-slide next-slide-${i}">
                       <div class="wrapper-slide">  
                          <span class="icon material-symbols-outlined">
                              arrow_forward_ios
                          </span>
                        </div>
                    </div>
            </div>`);
    let reward = new Swiper($owner.get(0), {
      speed: 800,
      slidesPerView: 'auto',
      // observer: true,
      navigation: {
        nextEl: `.next-slide.next-slide-${i}`,
        prevEl: `.prev-slide.next-slide-${i}`,
      },
      loop: true,
      loopedSlides: 8,
      breakpoints: {
        1361: {
          loopedSlides: 8,
          loop: true,
        },
        481: {
          loop: true,
          loopedSlides: 8,
        },
        0: {
          loop: true,
          loopedSlides: 0,
        }
      }
    });
  });

  $('.question__item .more.icon, .question__item .caption').on('click', function() {
    const $owner = $(this).closest('.question__item');
    console.log($owner);
    $owner.hasClass('open') ? $owner.removeClass('open') : $owner.addClass('open');
  });

  $('.more-block .more-block__caption').on('click', function() {
    const $owner = $(this).closest('.more-block');
    $owner.hasClass('hide') ? $owner.removeClass('hide') : $owner.addClass('hide');
  });

  $( window ).scroll(function () {
    $('body')[$(window).scrollTop() === 0 ? 'addClass' : 'removeClass']('scrollIsTop');
  }).scroll();

  EventMoreBlock();

  $('.videoBlock').on('click','[data-video]', function() {
    const $owner = $(this).closest('.videoBlock');
    const url = $(this).data('video');
    const iframe = '<iframe width="100%" height="100%" src="'+url+'"  allow="autoplay" frameborder="0" allowfullscreen></iframe>';
    $(this).remove();
    $owner.html(iframe);
  });

}); // ready end


function EventMoreBlock(isModal = false) {
  $(isModal ? '.mfp-content .more-block .more-block__caption' : '.more-block .more-block__caption').on('click', function() {
    const $owner = $(this).closest('.more-block');
    $owner.hasClass('hide') ? $owner.removeClass('hide') : $owner.addClass('hide');
  });
}
$('body').removeClass('jsLoading').addClass('jsLoaded');

