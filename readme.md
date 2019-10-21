# just-task

## Project development setup
#### 1) Install server dependencies
```
cd server/ && npm install
```
#### 2) Install client dependencies
```
cd src/ && npm install
```

#### 3) create default.json file in the /server/config/ directory exposing next variables: ####
```javascript
// example default.json
{
  "development": {
    "ORIGIN": "http://localhost:8000",
    "MONGODB_URI": // uri for the DB e.g. "mongodb://localhost/just-task",
    "SECRET": // any app secret you choose e.g. "0_do_5_not_4_tell_2_anyone_"
  }
}
```
#### 4) install mongo client for your OS or launch if it's already installed
```javascript
// an example for mac os
```
```bash
$ mongo

MongoDB shell version v3.4.2
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
```

### Launch development server
```
cd server/ && npm run dev
```

### Compiles and hot-reloads client for development
```
cd src/ && npm run dev
```

### Compiles and minifies client for production
```
cd src/ && npm run build
```

### Run the tests
#### Server tests
```
cd server/ && npm run test
```

#### Client tests
```
cd src/ && npm run test
```