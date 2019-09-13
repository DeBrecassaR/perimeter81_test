const maxmind = require('maxmind');

// async function getLocationByIp(ip){
// const lookup = maxmind.open('./geoDB/GeoLite2-City.mmdb');
//   return lookup.get(ip);
// };
async function getLocationByIp(ip){
const lookup = await maxmind.open('./geoDB/GeoLite2-City.mmdb');
console.log(lookup.get(ip).location.time_zone);
}




getLocationByIp('66.6.44.4');
getLocationByIp('62.219.131.0/24');

// maxmind.open('./geoDB/GeoLite2-Country.mmdb').then((lookup) => {
// console.log(lookup.get('66.6.44.4'));
// });

// maxmind.open('./geoDB/GeoLite2-ASN.mmdb').then((lookup) => {
//     console.log(lookup.get('66.6.44.4'));
//     });
