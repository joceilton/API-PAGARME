const pagarme = require("pagarme")
const key = 'CHAVE DA API'

pagarme.client.connect({ api_key: key })
  .then(client => client.paymentLinks.create({
    "amount": 21000,
    "items": [
      {
        "id": "r123",
        "title": "Red pill",
        "unit_price": 10000,
        "quantity": 1,
        "tangible": true
      },
      {
        "id": "b123",
        "title": "Blue pill",
        "unit_price": 10000,
        "quantity": 1,
        "tangible": true
      }
    ],
    "payment_config": {
        "boleto": {
          "enabled": true,
          "expires_in": 20
        },
        "credit_card": {
          "enabled": true,
          "free_installments": 4,
          "interest_rate": 25,
          "max_installments": 12
        },
        "default_payment_method": "boleto"
      },
      "postback_config": {
           "orders": "http://postback.url/orders",
        "transactions": "http://postback.url/transactions"
        },
       "customer_config":{  
          "customer":{  
             "external_id":"#123456789",
             "name":"Fulano",
             "type":"individual",
             "country":"br",
             "email":"fulano@email.com",
             "documents":[  
                {  
                   "type":"cpf",
                   "number":"71404665560"
                }
             ],
             "phone_numbers":[  
                "+5511999998888",
                "+5511888889999"
             ],
             "birthday":"1985-01-01"
          },
          "billing":{  
             "name":"Ciclano de Tal",
             "address":{  
                "country":"br",
                "state":"SP",
                "city":"São Paulo",
                "neighborhood":"Fulanos bairro",
                "street":"Rua dos fulanos",
                "street_number":"123",
                "zipcode":"05170060"
             }
          },
          "shipping":{  
             "name":"Ciclano de Tal",
             "fee":12345,
             "delivery_date":"2017-12-25",
             "expedited":true,
             "address":{  
                "country":"br",
                "state":"SP",
                "city":"São Paulo",
                "neighborhood":"Fulanos bairro",
                "street":"Rua dos fulanos",
                "street_number":"123",
                "zipcode":"05170060"
             }
          }
       },
      "max_orders": 1,
      "expires_in": 60
  }))
  .then(paymentLinks => console.log(paymentLinks))
  .catch(error => console.log(JSON.stringify(error)))