const isProdMode = process.env.NODE_ENV === 'production';
const assets = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

export const renderPage = () => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${isProdMode ? `<link rel='stylesheet' href='${assets['main.css']}' />` : ''}
    <title>React Social Network</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="${isProdMode ? assets['main.js'] : '/main.js'}"></script>
    </body>
  </html>
`