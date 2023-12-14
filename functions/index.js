/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const {
  log,
  info,
  debug,
  warn,
  error,
  write
} = require('firebase-functions/logger')

const { setGlobalOptions } = require('firebase-functions/v2')
setGlobalOptions({ maxInstances: 10 })

exports.createStripePayments = onRequest({ cors: true }, async (req, res) => {
  // instantiate stripe by passing secret key
  const stripe = require('stripe')(
    'sk_test_51ON53pEoKdN7VGcFIq4yULuJsD0leXT1dkyyGaPllvu6KpU7tTCPwpqXyC2MbBeWKzHc0LSr8bz5gE4DdBKbiurZ00cPUXZaUA'
  )

  /* create stripe payment session */

  //Form payload data for stripe session with data from client
  let line_items = []
  const cartItems = req.body

  cartItems.forEach(item => {
    let images = []
    images[0] = item.image
    line_items.push({
      price_data: {
        currency: 'usd',
        unit_amount: Number(item.price) * 100,
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image]
        }
      },
      quantity: item.qty
    })
  })

  //Creating stripe session using above payload
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: line_items,
    mode: 'payment',
    redirect_on_completion: 'never'
  })

  res.send({ clientSecret: session.client_secret, sessionId: session.id })
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
