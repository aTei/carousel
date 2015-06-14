// Generated by CoffeeScript 1.6.3
(function() {
  var Carousel,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Carousel = (function() {
    var AUTOPLAY_TIMER;

    AUTOPLAY_TIMER = 4000;

    function Carousel(container) {
      this.container = container;
      this.autoplay = __bind(this.autoplay, this);
      this.stopAutoplay = __bind(this.stopAutoplay, this);
      this.startAutoplay = __bind(this.startAutoplay, this);
      this.nextClickHandler = __bind(this.nextClickHandler, this);
      this.prevClickHandler = __bind(this.prevClickHandler, this);
      this.itemClickHandler = __bind(this.itemClickHandler, this);
      this.carousel = this.container.find('.carousel');
      this.items = this.container.find('.carousel-i');
      this.lastIndex = this.items.length - 1;
      this.itemWidth = this.items.first().width();
      this.itemMargin = parseInt(this.items.first().css('margin-left'), 10);
      this.selectedClass = 'carousel-i_selected';
      this.items.on('click', this.itemClickHandler);
      this.prev = this.container.find('.carousel-control_prev');
      this.next = this.container.find('.carousel-control_next');
      this.controlDisabledClass = 'carousel-control_disabled';
      this.prev.on('click', this.prevClickHandler);
      this.next.on('click', this.nextClickHandler);
      this.startAutoplay();
      this.carousel.on({
        mouseover: this.stopAutoplay,
        mouseout: this.startAutoplay
      });
    }

    Carousel.prototype.itemClickHandler = function(e) {
      var item;
      e.preventDefault();
      item = $(e.currentTarget);
      if (item.hasClass(this.selectedClass)) {
        return;
      }
      return this.selectItem(this.indexOf(item));
    };

    Carousel.prototype.prevClickHandler = function(e) {
      var prevIndex;
      e.preventDefault();
      if (this.prev.hasClass(this.controlDisabledClass)) {
        return;
      }
      prevIndex = this.selectedIndex() - 1;
      return this.selectItem(prevIndex);
    };

    Carousel.prototype.nextClickHandler = function(e) {
      var nextIndex;
      e.preventDefault();
      if (this.next.hasClass(this.controlDisabledClass)) {
        return;
      }
      nextIndex = this.selectedIndex() + 1;
      return this.selectItem(nextIndex);
    };

    Carousel.prototype.startAutoplay = function() {
      return this.interval = setInterval(this.autoplay, AUTOPLAY_TIMER);
    };

    Carousel.prototype.stopAutoplay = function() {
      return clearInterval(this.interval);
    };

    Carousel.prototype.autoplay = function() {
      var nextIndex, selectedIndex;
      selectedIndex = this.selectedIndex();
      if (selectedIndex === this.lastIndex) {
        nextIndex = 0;
      } else {
        nextIndex = selectedIndex + 1;
      }
      return this.selectItem(this.items.eq(nextIndex), nextIndex);
    };

    Carousel.prototype.selectItem = function(itemIndex) {
      var translateX;
      this.selectedItem().removeClass(this.selectedClass);
      this.items.eq(itemIndex).addClass(this.selectedClass);
      if (itemIndex < this.lastIndex) {
        if (itemIndex !== 0) {
          translateX = (itemIndex - 1) * (this.itemWidth + this.itemMargin);
        } else {
          translateX = 0;
        }
        this.carousel.css('transform', "translateX(-" + translateX + "px)");
      }
      this.toggleControl(this.prev, itemIndex === 0);
      return this.toggleControl(this.next, itemIndex === this.lastIndex);
    };

    Carousel.prototype.indexOf = function(elem) {
      return this.items.index(elem);
    };

    Carousel.prototype.selectedItem = function() {
      return this.items.filter("." + this.selectedClass);
    };

    Carousel.prototype.selectedIndex = function() {
      return this.indexOf(this.selectedItem());
    };

    Carousel.prototype.toggleControl = function(control, condition) {
      return control.toggleClass(this.controlDisabledClass, condition);
    };

    return Carousel;

  })();

  $(function() {
    return new Carousel($('.carousel-container'));
  });

}).call(this);