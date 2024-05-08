# Run back end
1. $ cd be_source
2. create .env file follow this:
DB_DATABASE=*your database name*
DB_PASSWORD=*password*
DB_USERNAME=*username*
SECRET=*secret key*
EXPIRES_IN_ACCESS_TOKEN=*time expire access token, example: 1d*
EXPIRES_IN_REFRESH_TOKEN=*time expire refresh token, example: 2d*
CLOUDINARY_CLOUD_NAME=*cloudinary cloud name*
CLOUDINARY_API_KEY=*key*
CLOUDINARY_API_SECRET=*scret key*
3. $ yarn install
4. $ yarn start:dev

# Run front end
1. $ cd fe_source
2. create .env file follow this:
API_URL=*your host backend*
3. $ npm install
4. $ npx react-native start --reset-cache

# Run admin 
1. $ cd admin
2. create file .env.local follow this:
APP_API_URL = *your host back end*
NEXT_PUBLIC_APP_NAME = *name app*
3. $ yarn install
4. $ yarn run dev