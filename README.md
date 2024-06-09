Please read this before running the code.

STEPS
1.Code is in master branch, clone the repo.
2. Go to "src\config\db.js" change the db configuration.
3. Create a db then create tables.

SQL QUERIES FOR CREATING TABLES

    CREATE TYPE userType AS ENUM ('admin', 'nonAdmin');
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(20) NOT NULL,
        type userType NOT NULL
    );
    
    CREATE TABLE train (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        source VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        totalSeats INT NOT NULL,
        seatsAvailable INT NOT NULL
    );
    
    
    CREATE TABLE booking (
        id SERIAL PRIMARY KEY,
        userId INT,
        trainId VARCHAR(255),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (trainId) REFERENCES train(id)
    );

4.Now run command "node server.js" or "npm run start:dev" to start the server.
5.For simplicity I  have kept the jwt secret and api-key(for admin) in util.js file not in .env file, please check that.
5. Use postman to test apis.
6. For admin api i.e "addTrain" copy api-key from util.js.
7. In login api response you will get accessToken use this token in all non-admin apis(other than addTrain api) as bearer token.


API PATHS AND REQUEST STRUCTURE
1. api/v1/user/addUser
    {
    "name":"ABHAY",
    "email":"ABHAY@gmail.com",
    "password":"123456789",
    "type":"nonAdmin"
  }
2. api/v1/user/loginUser
     {
    "email":"abhay@gmail.com",
    "password":"123456789"
  }
3. api/v1/train/addTrain
     {
    "trainId":"14095","name":"tejas express" ,"source":"lusa","destination":"lucknow","totalSeats":500
    }
4.api/v1/train/findTrains
    {
    "source":"lusa",
    "destination":"lucknow"
    }
5. api/v1/booking/bookTicket
     {
    "userId":4,
    "trainId":"15076"
    }
6. api/v1/booking/bookingDetails/{:id}



ASSUMPTIONS
1.Date is not considered.
2. Berth(SL/2A/3A) not considered.
3. Seat number is also not there if you have ticket can sit anywhere.


If there is any problem id runnning the code please contact.
