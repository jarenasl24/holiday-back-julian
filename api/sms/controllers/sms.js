const { sanitizeEntity } = require('strapi-utils');
var https = require('follow-redirects').https;
var fs = require('fs');
var qs = require('querystring');

module.exports = {
  async create(ctx) {
    console.log(ctx)
    let entity;

    entity = await strapi.services.sms.create(ctx.request.body);

    var options = {
      'method': 'POST',
      'hostname': 'app.eztexting.com',
      'path': '/sending/messages?format=json',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=dfd36c3d8e4355b9c6364fd54dbe95ba'
      },
      'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    const phone = entity.phone // '9396300428'
    const link = entity.link // 'https://buzondenavidad.com/list/12'

    var postData = qs.stringify({
      'User': 'joseph.lopez@ddblatinapr.com',
      'Password': 'Cage@2019',
      'PhoneNumbers[]': phone,
      'Message': 'Querido Santa, esta es mi lista de regalos: ' + link
    });

    req.write(postData);

    req.end();

    return sanitizeEntity(entity, { model: strapi.models.sms });
  },
};
