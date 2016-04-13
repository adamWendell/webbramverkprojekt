const path = require('path')

module.exports = {
  // Vilken context som dina paths är
  context: __dirname,
  // Bas filen. Från denna filen ska allt knytas i hop i.
  entry: './app/app.js',
  // output är vart din bundle fil ska hamna
  output: {
    // Vilken mapp ska bundle filen ligga i.
    path:  '/public/js',
    // Filens namn
    filename: 'bundle.js',
    // Detta är för devServern. Den utgår från samma patch som contentBase (eller index.html i vårat fall)
    publicPath: '/js'
  },
  // resolve gör så att man kan skriva require('./fil') istället för require('./fil.js')
  resolve: {
    // vilka fil extensions som du kommer använda dig av. Jag la till .json ifall man vill använda dummy data.
    extensions: ['', '.js', '.json']
  },
  // devServer!!!!!!! Live reload !!! Körs via webbsockets så det funkar på externa enheter som mobilen.
  devServer: {
    // Efter som vår index.html fil ligger i public så är det basen som webservern ska skicka upp.
    contentBase: 'public',
    // inline är fixar så att man får live reload utan webpacks status bar bara att gå in på http://localhost:8080/
    inline: true,
    // Hots '0.0.0.0' gör det möjligt att nå dev servern med externa enheter
    host: '0.0.0.0'
  }
}