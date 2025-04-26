import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { HelmetProvider } from 'react-helmet-async'



 const option={
        mode: 'payment',
      amount:1099,
        currency: 'usd',
      }

const stripePromise=loadStripe('pk_test_51R9VYz2USzmgd78cYBjibuN92Otb8xKgb1l708RrRD1W6QymOTR5NFflUIQhw7gOL7nZzx1ilGHSaaH637vi5x4K00yigHXA73')


createRoot(document.getElementById('root')).render(
    <Elements stripe={stripePromise} options={option}>
 <Provider store={store}>
 <HelmetProvider>
    <App />
  </HelmetProvider>
    </Provider>
     </Elements>
)
