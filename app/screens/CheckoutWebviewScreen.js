import React from 'react';
import { WebView } from 'react-native-webview';

export default function CheckoutWebViewScreen(props) {

  handleChange = (e) => {
    console.log(e.url);
    if(!e.loading && e.url==='http://192.168.1.4:3000/.netlify/functions/api/payment/success') {
      
    }
    else if(!e.loading && e.url==='http://192.168.1.4:3000/.netlify/functions/api/payment/cancel') {

    }
  }
  
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlPage('pk_test_ENcvwuFgRGUey2rsT2GN1A6u', props.route.params.sessionId) }}
      onNavigationStateChange={this.handleChange}
      ref={(ref) => { webview = ref; }}
    />
  )
}

const htmlPage = (stripePublicKey, sessionId) => {  
return (
`<html>
  <body>
    <!-- Load Stripe.js on your website. -->
    <script src="https://js.stripe.com/v3"></script>
    <h1>Redirecting you to Checkout...</h1>
    <div id="error-message"></div>
    <script>
      (function () {
        var stripe = Stripe('${stripePublicKey}');
        window.onload = function () {
          stripe.redirectToCheckout({
            sessionId: '${sessionId}'
          })
          .then(function (result) {
            if (result.error) {
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
        };
      })();
    </script>
  </body>
</html>`
);}