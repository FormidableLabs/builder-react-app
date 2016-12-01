/**
 * Server-side template
 * --------------------
 *
 * **Note**: We lint this as client code but import it only into node-land.
 */

// CloudFlase base url.
const CLOUDFLARE = "//cdnjs.cloudflare.com/ajax/libs";

// A naive whitespace stripper to help with ES6 strings.
const strip = (text) => text.replace(/^\s*|\s*$/gm, "").replace(/\n/g, "");

export default (props) => strip(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <!--[if lt IE 9]>
        <script src="${CLOUDFLARE}/html5shiv/3.7.2/html5shiv-printshiv.js"></script>
      <![endif]-->

      ${props.bundles.css ?
        `<link rel="stylesheet" href="${props.bundles.css}" />` : ""}

      <title><%= packageName %></title>
    </head>
    <body>
      <div id="js-content">${props.content}</div>

      <!--[if lt IE 9]>
        <script src="${CLOUDFLARE}/es5-shim/4.1.1/es5-shim.min.js"></script>
        <script src="${CLOUDFLARE}/es5-shim/4.1.1/es5-sham.min.js"></script>
      <![endif]-->

      ${(props.render.js && props.bootstrap) ?
        `<script class="js-bootstrap" type="application/json">
          ${props.bootstrap}
        </script>` : ""}
      ${props.render.js ? `<script src="${props.bundles.js}"></script>` : ""}
    </body>
  </html>
`);
