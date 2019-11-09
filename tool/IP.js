const os = require('os');
//不严谨
var getIPv4 = function () {
  const network = os.networkInterfaces()
  let ipv4Address = null
  let addresses = Object.values(network).reduce((previous, current) => {
    previous.push(...current)
    return previous
  }, [])
  let ipv4 = addresses.filter(item => item.family === 'IPv4' && item.internal === false)[0]
  if (ipv4) {
    ipv4Address = ipv4.address
  }
  return ipv4Address
}
 module.exports = {
   IPv4:getIPv4()
 };