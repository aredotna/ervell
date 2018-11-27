loggedOutNav = require '../../../components/logged_out_nav/client/index.coffee'

module.exports = ->
  loggedOutNav()
  $("a", $('.BlogPost')).on 'click', (e) ->

    # Make sure this.hash has a value before overriding default behavior
    if this.hash != ""
      # Prevent default anchor click behavior
      event.preventDefault()

      # Store hash
      hash = this.hash

      # Using jQuery's animate() method to add smooth page scroll
      # The optional number (800) specifies the number of milliseconds it
      # takes to scroll to the specified area
      $('html, body').animate {
        scrollTop: $(hash).offset().top - $('.js-logged-out-header').outerHeight();
      }, 500
