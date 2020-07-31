# weatherapi

## technologies:
- [Express] for RESTful API
- [MongoDB]for database

## Requirements

- [Node.js]

## Running

Install Dependencies
```npm install```

Change database config in config/appConfig.js
```APPKEY:"sl_myJwtSecret"```
```MONGO_URI:'mongodb://127.0.0.1:27017'```
```MONGO_DB_NAME:'apiaudit' ```

Start Server
```npm start```

Run Tests
```npm run test```
# API details
1)response from static json file
Visit [http://localhost:3000/weather?appkey=sl_myJwtSecret](http://localhost:3000/weather)
api code: ```curl --location --request GET 'http://localhost:3000/weather?appkey=sl_myJwtSecret```  
2)response from https://samples.openweathermap.org
Visit [http://localhost:3000/liveweather?&appkey=sl_myJwtSecret](http://localhost:3000/weather)
api code: ```curl --location --request GET 'http://localhost:3000/liveweather?appkey=sl_myJwtSecret```
