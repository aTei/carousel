class Carousel
  AUTOPLAY_TIMER = 4000

  constructor: (@container) ->
    @carousel = @container.find '.carousel'

    # items
    @items = @container.find('.carousel-i')
    @lastIndex = @items.length - 1
    @itemWidth = @items.first().width()
    @itemMargin = parseInt @items.first().css('margin-left'), 10
    @selectedClass = 'carousel-i_selected'
    @items.on 'click', @itemClickHandler

    # controls
    @prev = @container.find('.carousel-control_prev')
    @next = @container.find('.carousel-control_next')
    @controlDisabledClass = 'carousel-control_disabled'
    @prev.on 'click', @prevClickHandler
    @next.on 'click', @nextClickHandler

    # autoplay
    @startAutoplay()
    @carousel.on
      mouseover: @stopAutoplay
      mouseout: @startAutoplay

  itemClickHandler: (e) =>
    e.preventDefault()
    item = $(e.currentTarget)
    return if item.hasClass @selectedClass
    @selectItem @indexOf(item)

  prevClickHandler: (e) =>
    e.preventDefault()
    return if @prev.hasClass @controlDisabledClass
    prevIndex = @selectedIndex() - 1
    @selectItem prevIndex

  nextClickHandler: (e) =>
    e.preventDefault()
    return if @next.hasClass @controlDisabledClass
    nextIndex = @selectedIndex() + 1
    @selectItem nextIndex

  startAutoplay: =>
    @interval = setInterval @autoplay, AUTOPLAY_TIMER

  stopAutoplay: =>
    clearInterval @interval

  autoplay: =>
    selectedIndex = @selectedIndex()
    if selectedIndex == @lastIndex
      nextIndex = 0
    else
      nextIndex = selectedIndex + 1
    @selectItem @items.eq(nextIndex), nextIndex

  selectItem: (itemIndex) ->
    # highlight item
    @selectedItem().removeClass @selectedClass
    @items.eq(itemIndex).addClass @selectedClass

    # move to item
    if itemIndex < @lastIndex
      if itemIndex != 0
        translateX = (itemIndex - 1) * (@itemWidth + @itemMargin)
      else
        translateX = 0
      @carousel.css('transform', "translateX(-#{ translateX }px)")

    @toggleControl @prev, (itemIndex == 0)
    @toggleControl @next, (itemIndex == @lastIndex)

  indexOf: (elem) ->
    @items.index elem

  selectedItem: ->
    @items.filter(".#{@selectedClass}")

  selectedIndex: ->
    @indexOf @selectedItem()

  toggleControl: (control, condition) ->
    control.toggleClass @controlDisabledClass, condition


$ ->
  new Carousel $('.carousel-container')
