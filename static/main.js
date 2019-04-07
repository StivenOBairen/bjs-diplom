class Profile {
  constructor({ username, name, password }) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  createUser(callback) {
    return ApiConnector.createUser({ "username": this.username, "name": this.name, "password": this.password }, (err, data) => {
      console.log(`Creating user ${this.username}`);
      callback(err, data);
    });
  }

  performLogin(callback) {
    return ApiConnector.performLogin({ "username": this.username, "password": this.password }, (err, data) => {
      console.log(`Autorizing user ${this.username}`);
      callback(err, data);
    });
  }

  addMoney({ currency, amount }, callback) {
    return ApiConnector.addMoney({ currency, amount }, (err, data) => {
      console.log(`Adding ${amount} of ${currency} to ${this.username}`);
      callback(err, data);
    });
  }

  convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
      console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
      callback(err, data);
    });
  }

  transferMoney({ to, amount }, callback) {
    return ApiConnector.transferMoney({ to, amount }, (err, data) => {
      console.log(`Transfering ${amount} to ${to}`);
      callback(err, data);
    });
  }

  getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
      console.log(`Getting stock info ${data}`);
      callback(err, data);
    });
  }
}

function main() {
  const Igor = new Profile({
    username: 'igor',
    name: { firstName: 'Igor', lastName: 'Ivanov' },
    password: 'igorpass',
  })
  Igor.createUser((err, data) => {
    if (err) {
      console.error('Error during creating user Igor')
    } else {
      console.log(`Igor is created!`);
      Igor.performLogin((err, data) => {
        if (err) {
          console.error('Error during authorizing user Igor')
        } else {
          console.log(`Igor is authorized!`);
          Igor.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
            if (err) {
              console.error('Error during adding money to Igor');
            } else {
              console.log(`Added 500000 euros to Igor`);
              Igor.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: 36000 }, (err, data) => {
                if (err) {
                  console.error('Error during converting money for Igor');
                } else {
                  console.log(`Converted money`);
                  const Alex =  new Profile({
                    username: 'alex',
                    name: { firstName: 'Alexander', lastName: 'Makedonskiy' },
                    password: 'alexpass',
                  })
                   Alex.createUser((err, data) => {
                    if (err) {
                      console.error('Error during creating user Alex')
                    } else {
                      console.log(`Alex is created!`);
                      Alex.transferMoney({ to: 'alex', amount: 36000 }, (err, data) => {
                        if (err) {
                          console.error('Error during transfering netcoins to Alex');
                        } else {
                          console.log(`Transfered 36000 netkoins to Alex`);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

}  
main();