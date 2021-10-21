const { sanitizeEntity } = require('strapi-utils');
const createsend = require('createsend-node');

module.exports = {
  async create(ctx) {
    console.log(ctx)
    let entity;

    entity = await strapi.services.mails.create(ctx.request.body);

    console.log(entity)

    const auth = { apiKey: 'EWpqenSx+bTJgpuk+XGzh+XRtsGic1kw6aXOyLtgMsXZ5Mhrfff/HeDegx7tykHojBkacywKviD8UPI0dEUfsAvSVBZtbUaUAa1ADOWmfChWpOICgLHPssEXbWwKei3qKPBjaOOM9rDwN0ed/UYL7Q==' }
    const api = createsend(auth)

    // Create a details object
    const details = {}

    // Add the unique identifier for the smart email
    details.smartEmailID = '2a1cf918-c15a-4926-a1ad-d756d32d7e9c'

    // Add the 'To' email address
    details.to = [
      'Querido Santa <' + entity.email + '>',
    ]

    // Add mail merge variables
    details.data = {
      link: entity.link
    }

    // Send the smart email(and provide a callback function that takes an error and a response parameter)
    api.transactional.sendSmartEmail(details, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })

    return sanitizeEntity(entity, { model: strapi.models.mails });
  },
};
