var myip = require('quick-local-ip')

let config = {
  hostname: myip.getLocalIP4() || 'localhost',
  port: 8081
}

module.exports = config
