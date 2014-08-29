# Arena Passport

Wires up the common auth handlers for Arena front end using Artsy's [Ezel](http://ezeljs.com)-based apps using [passport](http://passportjs.org/). Used internally at Arena to DRY up authentication code.

Most definitely forked (read copied wholesale, with tiny modifications) from Artsy's artsy-passport. Thank you Craig Spaeth.

## Setup

#### Make sure you first mount session, body parser.

````coffeescript
app.use express.bodyParser()
app.use express.cookieParser('foobar')
app.use express.cookieSession()
````

#### Then mount Arena Passport passing a big configuration hash.

_Values indicate defaults._

````coffeescript
app.use arenaPassport
  SECURE_ARENA_URL: # SSL Arena url e.g. https://api.are.na
  APP_URL: # Url pointing back to your app e.g. http://master.are.na
  loginPath: '/users/sign_in' # POST `email` and `password` to this path to login
  signupPath: '/users/invitation/accept' # POST `email` and `password` to this path to signup
  # The user data to cache in the session
  CurrentUser: # Backbone Model class to serialize the user into e.g. `CurrentUser`
````

The keys are cased so it's convenient to pass in a configuration hash. A minimal setup could look like this:

````coffeescript
app.use arenaPassport _.extend config,
  CurrentUser: CurrentUser
````

**Note:** CurrentUser must be a Backbone model with typical `get` and `toJSON` methods.

#### Create a login form pointing to your paths.

````jade
h1 Login
form( action='/users/sign_in', method='POST' )
  h3 Login via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  button( type='submit' ) Signup
````

#### And maybe a signup form...

````jade
h1 Signup
form( action='/users/invitation/accept', method='POST' )
  h3 Signup via Email
  input( name='name' )
  input( name='email' )
  input( name='password' )
  button( type='submit' ) Signup
````

#### Handle login and signup callbacks.

````coffeescript
{ loginPath, signupPath, twitterCallbackPath,
  twitterLastStepPath, facebookCallbackPath } = artsyPassport.options

app.post loginPath, (req, res) ->
  res.redirect '/'
app.post signupPath, (req, res) ->
  res.redirect '/personalize'
````

#### Access a logged in Arena user in a variety of ways...

In your server-side templates

````jade
h1 Hello #{user.get('username')}
````

In your client-side code

````coffeescript
CurrentUser = require '../models/current_user.coffee'
sd = require('sharify').data

user = new CurrentUser(sd.CURRENT_USER)
````

In your routers

````coffeescript
app.get '/', (req, res) ->
  res.send 'Hello ' + req.user.get('name')
````

_These forms of user will be null if they're not logged in._

## Contributing

First install node modules `npm install` then write a ./config.coffee that looks something like this:

````coffeescript
module.exports =
  SECURE_ARENA_URL: 'https://staging.are.na'
  APP_URL: 'http://localhost:4000'
  # An Arena user that's linked to facebook and twitter
  ARENA_EMAIL: 'cab@are.na'
  ARENA_PASSWORD: '***'
````

Then you can check the example by running `make example` and opening [localhost:4000](http://localhost:4000). The tests are integration tests that use the example, so once you set this up run `make test` to run tests.
