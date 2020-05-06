const checkoutHtmlPage = (stripePublicKey, sessionId) => {  
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
  );
}

const checkoutSuccessHtmlPage = () => {  
  return (
  `<html>
    <body>
      <h1>Payment Success</h1>
      <script>
        window.close();
      </script>
    </body>
  </html>`
  );
}

const checkoutCanceledHtmlPage = () => {  
  return (
  `<html>
    <body>
      <h1>Payment Canceled</h1>
      <script>
        window.close();
      </script>
    </body>
  </html>`
  );
}

module.exports = {
  checkoutHtmlPage,
  checkoutSuccessHtmlPage,
  checkoutCanceledHtmlPage
}