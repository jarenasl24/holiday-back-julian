const { sanitizeEntity } = require('strapi-utils');
const createsend = require('createsend-node');

module.exports = {
  async create(ctx) {
    let entity;
    const auth = { apiKey: 'EWpqenSx+bTJgpuk+XGzh+XRtsGic1kw6aXOyLtgMsXZ5Mhrfff/HeDegx7tykHojBkacywKviD8UPI0dEUfsAvSVBZtbUaUAa1ADOWmfChWpOICgLHPssEXbWwKei3qKPBjaOOM9rDwN0ed/UYL7Q==' }
    const api = createsend(auth)

    // Create a details object
    const details = {}

    // Add the unique identifier for the smart email
    details.smartEmailID = '2a1cf918-c15a-4926-a1ad-d756d32d7e9c'

    // Add the 'To' email address
    details.to = [
      'Freddy Llano <freddy.llano@ddblatinapr.com>',
      'Julián Arenas <julian.arenas@ddblatinapr.com>',
      'Santiago Roman <santiago.roman@ddblatinapr.com>',
      'Sergio Pinto <sergio.ortiz@ddblatinapr.com>'
    ]

    // Add mail merge variables
    details.data = {
      variableName: 'Prueba',
      1: 'probando'
    }

    // Send the smart email(and provide a callback function that takes an error and a response parameter)
    api.transactional.sendSmartEmail(details, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })

    entity = await strapi.services.mails.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.mails });
  },
};
