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

  mapInit = function() {
      var map;
      console.log('mapInit', ymaps);
      $('.contacts__map').each(function() {
          map = new ymaps.Map('map',{
              center: [52.269482083651134,104.33676899999999],
              zoom: 16,
              controls: ['zoomControl', 'fullscreenControl']
          },{
              autoFitToViewport: 'always'
          });
          if (!!('ontouchstart'in window) || !!('msmaxtouchpoints'in window.navigator)) {
              map.behaviors.disable('drag');
          } else {
              map.behaviors.disable('scrollZoom');
          }
          var clusterer = new ymaps.Clusterer({
              preset: 'islands#invertedRedClusterIcons',
              groupByCoordinates: false
          })
          placemarks = [];




              var coord = '52.269482083651134,104.33676899999999'
              if (!coord) {
                  return false;
              }
              coord = coord.split(',');
              var placemark = new ymaps.Placemark(coord,{
                  iconContent: '',
              },{
                  iconLayout: 'default#image',
                  iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA1MyA3NSI+CiAgPHBhdGggZmlsbD0iIzdGOEQ5NiIgZD0iTTUzIDI2Ljc2N2MwIDE0Ljc4My0xMS44NjQgMjYuNzY3LTI2LjUgMjYuNzY3UzAgNDAuNjg2IDAgMjYuNzY3QzAgMTEuOTg0IDExLjg2NCAwIDI2LjUgMFM1MyAxMS45ODQgNTMgMjYuNzY3WiIvPgogIDxwYXRoIGZpbGw9IiM3RjhEOTYiIGQ9Ik0yNy40OTEgNzUgMi44ODUgMzguNTQ1bDQ3LjYyNy0uNDM5TDI3LjQ5MiA3NVoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTAuMDc1IDM0LjgwNGgzLjkwNlYyMy42MWwxMi4yMzQtOC40NyAxMi4yMzMgOC40N3YxMS4xOTVoMy45MDd2Mi4yMmgtMzIuMjh2LTIuMjJabTE2LjE0LTI0LjE5MiA1LjMwNiAzLjY3NXYtMy42NzVoNi43NDJ2OC4zNDNsNy4xNDYgNC45NDktMi4wOSAzLjA3OC0xNy4xMDQtMTEuODQ0TDkuMTEgMjYuOTgybC0yLjA5LTMuMDc4IDE5LjE5NS0xMy4yOTJaIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjUuMDcyIDguOTI5YTIuMDA0IDIuMDA0IDAgMCAxIDIuMjg1IDBsMi4xNTIgMS40OWEyLjAyOSAyLjAyOSAwIDAgMSAyLjAxMi0xLjg0OGg2Ljc0MmEyLjAzIDIuMDMgMCAwIDEgMi4wMiAyLjA0MXY3LjI2OGw2LjI2OCA0LjM0YTIuMDU3IDIuMDU3IDAgMCAxIC41MjQgMi44MzdsLTIuMDg5IDMuMDhhMi4wMDggMi4wMDggMCAwIDEtMi44MDkuNTI5bC0xLjcwOC0xLjE4M3Y1LjI4aDEuODg2YTIuMDMgMi4wMyAwIDAgMSAyLjAyIDIuMDQxdjIuMjJhMi4wMyAyLjAzIDAgMCAxLTIuMDIgMi4wNGgtMzIuMjhhMi4wMyAyLjAzIDAgMCAxLTIuMDItMi4wNHYtMi4yMmEyLjAzIDIuMDMgMCAwIDEgMi4wMi0yLjA0aDEuODg2di01LjI4MWwtMS43MDkgMS4xODNjLS45Mi42MzctMi4xNzguNC0yLjgwOS0uNTNsLTIuMDg5LTMuMDc4YTIuMDU3IDIuMDU3IDAgMCAxIC41MjQtMi44MzhMMjUuMDcyIDguOTNabS05LjA3IDE1Ljc1NXYxMC4xMmMwIC4wNi0uMDAzLjEyLS4wMDguMTc4aDIwLjQ0MWEyLjA5NiAyLjA5NiAwIDAgMS0uMDA4LS4xNzh2LTEwLjEybC0xMC4yMTItNy4wNzEtMTAuMjEzIDcuMDcxWm0yMC4zODEtNC45OGEyLjA1OCAyLjA1OCAwIDAgMS0uMTQxLS43NDl2LTYuMzAyaC0yLjd2MS42MzNjMCAuNzU4LS40MTYgMS40NTMtMS4wOCAxLjgwNi0uMy4xNi0uNjI5LjIzOC0uOTU2LjIzNWw0Ljg3NyAzLjM3OFpNMjYuMjMgMTMuMDk4aC0uMDNsLjAxNS0uMDEuMDE1LjAxWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+CiAgPHBhdGggZmlsbD0iIzdGOEQ5NiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjkuNTczIDI0LjE4N2EuOTM4LjkzOCAwIDAgMS0uMDc4LjAyOGMuMDMuMDQuMDI3LjA4OS4wMzIuMTI1LjAwNy4wNTMuMDMzLjA4LjEzNi4xMTcuMTA0LjAzOS4yODYuMDkuNDkuMjE3LjIwNi4xMjguNDMzLjMzMi44NC45MTguNDA3LjU4NC45OTQgMS41NSAxLjMxMyAyLjA3Ni4zMTguNTI2LjM2OS42MTMuNDIuNjU2LjA1LjA0NC4xLjA0NC4xOTctLjAyMy4wOTYtLjA2Ni4yMzctLjE5OS40NTUtLjI5My4yMTctLjA5NS41MS0uMTUxLjY3Ny0uMTg3LjE2Ny0uMDM2LjIwOC0uMDUuMjI4LS4xMDUuMDItLjA1LjAyLS4xMzUuMDQtLjE5MmEuNjYuNjYgMCAwIDEtLjUzNS0uNjQzLjY2Mi42NjIgMCAwIDEgLjc5NC0uNjQ0Yy4wNTMtLjEyOC4xMS0uMjU1LjI1MS0uMzkuMTQ1LS4xMzguMzgtLjI4NC41NzQtLjIzOC4xOTQuMDQ2LjM0NS4yODQuMzguNTA1LjAzNi4yMi0uMDQ1LjQyNS0uMDc5LjU2Mi0uMDM0LjEzNi0uMDIxLjIwNS4wMzIuMjM2LjA1My4wMy4xNDYuMDIzLjIwNC0uMDEuMDU5LS4wMy4wODEtLjA4Ny4wNzItLjA2M2EuNDc1LjQ3NSAwIDAgMS0uMTM5LjJjLS4wOS4wNzItLjIyOC4xMS0uMzMuMDU3LS4xMDMtLjA1NC0uMTY5LS4yLS4yMDgtLjM0Mi0uMDQtLjE0NC0uMDUyLS4yODQtLjEtLjM2NmEuMTc1LjE3NSAwIDAgMC0uMjA0LS4wODRjLS4wNTQuMDE2LS4xMDIuMDU0LS4xNTMuMDczYS42NS42NSAwIDAgMSAuMjQuNTA0LjY2LjY2IDAgMCAxLS41OTQuNjUzdi4wMDFjLjAxOC4wNDYuMDE4LjEwMi4wMjYuMTUuMDA3LjA1LjAyMi4wOS4wODYuMTE4LjA2My4wMjguMTc0LjA0NC4zNTkuMTkyLjE4NC4xNDguNDQyLjQyOS42NzUuNjg3LjIzMy4yNTguNDQuNDkzLjYzNS42NjIuMTk0LjE2OC4zNzYuMjcuNDM0LjM0Ny4wNTkuMDc2LS4wMDcuMTI4LS4xMzEuMTVhLjY4My42ODMgMCAwIDEtLjUwNi0uMTEyYy0uMi0uMTMtLjQxNy0uMzg2LS41ODEtLjU0Ni0uMTY1LS4xNjEtLjI3Ni0uMjI4LS4zNS0uMjIzLS4wNzMuMDA1LS4xMDguMDgyLS4xMTYuMTY5LS4wMDcuMDg3LjAxMy4xODQuMi41NjIuMTg4LjM3OC41NDMgMS4wMzcuODk4IDEuNjk2aC0xLjFsLS4wODMgMy40MTdoLS41ODhMMzQgMzEuMzg3aC0xLjA2M2MuMjk0LS45My41ODctMS44Ni43MzQtMi4zNTguMTQ3LS40OTguMTQ3LS41NjQuMDg5LS41NzItLjA1OC0uMDA4LS4xNzUuMDQ0LS4zNDcuMTQzLS4xNzIuMS0uNC4yNDgtLjU2NC4zMjctLjE2NC4wOC0uMjY1LjA5LS40MTQtLjA0Ni0uMTUtLjEzNS0uMzQ3LS40MTYtLjY4My0uODYzYTYzLjE3NiA2My4xNzYgMCAwIDAtMS4wNjctMS4zNzdjLS4yNTYtLjMxNi0uMjkxLS4zMzctLjMzMS0uMDAyLS4wNC4zMzQtLjA4NiAxLjAyNC0uMDcxIDEuNDYuMDE1LjQzNy4wOS42MjEuMjYgMS4wNy4xNy40NS40MzMgMS4xNjUuNjk2IDEuODgtLjM2NSAwLS43My0uMDAyLTEuMDk0LS4wMDNsLS4xNDggMy43NThoLTEuMDEzbC0uNTQ0LTMuNzU4aC0uODU1Yy4xMS0uOTEzLjIyLTEuODI2LjI4LTIuNTk1LjA2MS0uNzY4LjA3MS0xLjM5MS4wNTQtMS42OTItLjAxOC0uMzAyLS4wNjQtLjI4MS0uMzkyLjE1OC0uMzMuNDQtLjk0MSAxLjI5OC0xLjI5OCAxLjc0Mi0uMzU2LjQ0NC0uNDU3LjQ3NS0uNTcxLjQ3LS4xMTQtLjAwNS0uMjQtLjA0Ni0uNTY3LS40MTYtLjMyNi0uMzctLjg1Mi0xLjA3LTEuMTE1LTEuMzU3LS4yNjMtLjI4Ni0uMjYzLS4xNTgtLjIzLjQxNHMuMDk5IDEuNTg5LjIwMyAyLjgzNWMuMTA0IDEuMjQ3LjI0NyAyLjcyMy4zOSA0LjJoLTEuMTE3bC0uNzIyLTMuODAxLS42OTggMy44aC0xLjE2OGMuMDc1LTEuMDIxLjE1MS0yLjA0My4xNzktMi44OTYuMDI4LS44NTMuMDA4LTEuNTM4LS4wMzgtMi4zNjMtLjA0NS0uODI1LS4xMTYtMS43OS0uMTg0LTIuMy0uMDY5LS41MTItLjEzNS0uNTY4LS40ODEtLjkzNi0uMzQ2LS4zNjgtLjk3My0xLjA0Ny0xLjMxMi0xLjUxNS0uMzQtLjQ2Ny0uMzktLjcyMi0uMzU3LS45MzcuMDMzLS4yMTQuMTUtLjM4OC40Mi0uNTk1LjI3LS4yMDcuNjk1LS40NDcuOTkxLS43MTMuMjk2LS4yNjUuNDYzLS41NTYuNjQtLjgxOC4xNzctLjI2LjM2NC0uNDkyLjU1Ni0uNjI4LjE5Mi0uMTM1LjM5LS4xNzQuNjg4LS4yMDdhNi4zMSA2LjMxIDAgMCAxIDEuMDAxLS4wMzdjLjMwNC4wMi41MTEuMDg2LjcxNi4zNy4yMDUuMjg0LjQwNy43ODQuNDk4IDEuMTYyLjA5MS4zNzguMDcuNjM0LS4wNDguOTQtLjExOS4zMDctLjMzNi42NjQtLjQ0NS44Ni0uMTA5LjE5Ny0uMTA5LjIzMy4xNy42NTUuMjc3LjQyMS44MzQgMS4yMjggMS4yMzMgMS44MDMuNC41NzUuNjQzLjkxNy43NzcgMS4wNzguMTM0LjE2LjE1OS4xNC40NjUtLjM1My4zMDYtLjQ5My44OTItMS40NTggMS4zMDItMi4wMi40MS0uNTYyLjY0Mi0uNzIuODYyLS44MTIuMjItLjA5Mi40MjgtLjExOC41MzItLjE2MS4wODUtLjAzNi4xLS4wODQuMS0uMTI1LS4yNTguMDIzLS40OTMuMDQzLS41NTcuMDZhMS4zMyAxLjMzIDAgMCAxLS41MDguMDNjLS4xNDMtLjAyNy0uMjE3LS4wOTgtLjIyOC0uMTItLjAxMS0uMDIxLjA0LjAwNy4xNTUtLjAxNS4xMTctLjAyMi4yOTktLjA5My4zMzgtLjI3Ny4wNC0uMTg0LS4wNjQtLjQ4LS4wNC0uOC4wMjQtLjMyMi4xNzUtLjY2Ni4zNjUtLjgzOWEuNjQ5LjY0OSAwIDAgMSAuNTUzLS4xNWMuMTM1LjAyNC4xNzguMDcuMjIuMTE2LjA0NC0uMDQ2LjA4Ny0uMDkyLjIyMi0uMTE1YS42NDguNjQ4IDAgMCAxIC41NTMuMTVjLjE5LjE3Mi4zNDEuNTE3LjM2NS44MzcuMDI0LjMyLS4wOC42MTctLjA0LjguMDM5LjE4NS4yMi4yNTYuMzM3LjI3OC4xMTYuMDIyLjE2Ny0uMDA2LjE1Ni4wMTUtLjAxMi4wMjItLjA4NS4wOTMtLjIyOC4xMmExLjMzIDEuMzMgMCAwIDEtLjUwOC0uMDMgMS4wMzYgMS4wMzYgMCAwIDEtLjM0LS4xNjMuNDk2LjQ5NiAwIDAgMS0uMTQxLjAzNFptLTkuOTIzLS41MjljLS4wODkuMDI1LS4yNjYuMTM4LS4zMDYuMjY2LS4wNC4xMjcuMDU2LjI3LjI2NS41MzYuMjEuMjY2LjUzNC42NTQuNzEzLjgxMi4xOC4xNTkuMjE1LjA4Ny4yNTMtLjA0My4wMzgtLjEzLjA3OS0uMzIuMDM2LS40ODgtLjA0My0uMTY5LS4xNy0uMzE3LS4zMjktLjQ3OC0uMTYtLjE2LS4zNTItLjMzNC0uNDQ4LS40NTItLjA5Ni0uMTE3LS4wOTYtLjE3OC0uMTg0LS4xNTNabTIuMzQ5LTEuODM1YTEuMSAxLjEgMCAwIDEgMS4xMDggMS4wOWMwIC42LS40OTYgMS4wODgtMS4xMDggMS4wODhhMS4wOTggMS4wOTggMCAwIDEtMS4xMDgtMS4wODljMC0uNjAxLjQ5Ni0xLjA4OSAxLjEwOC0xLjA4OVptLS4wMTgtMi40NWEuNzUuNzUgMCAwIDEgLjc1Ni43NDIuNzUuNzUgMCAwIDEtLjc1Ni43NDQuNzUuNzUgMCAwIDEtLjc1Ni0uNzQ0Ljc1Ljc1IDAgMCAxIC43NTYtLjc0M1oiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgogIDxwYXRoIGZpbGw9IiM3RjhEOTYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjk2IDM0LjgwNWEyLjAzIDIuMDMgMCAwIDEgMi4wMjEtMi4wNDFoMjQuNDY3YTIuMDMgMi4wMyAwIDAgMSAyLjAyIDIuMDQgMi4wMyAyLjAzIDAgMCAxLTIuMDIgMi4wNDJIMTMuOTgyYTIuMDMgMi4wMyAwIDAgMS0yLjAyMS0yLjA0MVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4K',
                  iconImageSize: [53, 75], // [46, 79],
                  iconImageOffset: [-26.5, -75],
                  balloonContentBody: null,
                  balloonContent: null,
                  hideIconOnBalloonOpen: false,
                  __opened: false
              });
          placemarks.push(placemark);


          var bounds = {
              min: [false, false],
              max: [false, false]
          };
          var one = true;
          $(".contactGeo-list").find('[data-geo-coord]').each(function() {
              var coord = this.getAttribute('data-geo-coord').split(',');
              coord = [parseFloat(coord[0]), parseFloat(coord[1])];
              if (bounds.min[0] === false || coord[0] <= bounds.min[0]) {
                  bounds.min[0] = coord[0]
              }
              if (bounds.min[1] === false || coord[1] <= bounds.min[1]) {
                  bounds.min[1] = coord[1]
              }
              if (bounds.max[0] === false || coord[0] >= bounds.max[0]) {
                  bounds.max[0] = coord[0]
              }
              if (bounds.max[1] === false || coord[1] >= bounds.max[1]) {
                  bounds.max[1] = coord[1]
              }
              if (one === true) {
                  map.setCenter(coord);
                  map.setZoom(14);
              } else {
                  map.setBounds([bounds.min, bounds.max], {
                      checkZoomRange: true,
                      zoomMargin: 50
                  });
              }
          })
          clusterer.add(placemarks);
          map.geoObjects.add(clusterer);
          map.events.add('click', function(e) {
              map.balloon.close();
          });
      });
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          myMap.behaviors.disable('drag');
      }
  }
  // mapInit();


}); // ready end


function EventMoreBlock(isModal = false) {
  $(isModal ? '.mfp-content .more-block .more-block__caption' : '.more-block .more-block__caption').on('click', function() {
    const $owner = $(this).closest('.more-block');
    $owner.hasClass('hide') ? $owner.removeClass('hide') : $owner.addClass('hide');
  });
}
$('body').removeClass('jsLoading').addClass('jsLoaded');
