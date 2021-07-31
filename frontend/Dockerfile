FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# ENV REACT_APP_GOOGLE_RECAPTCHA_KEY=6LfQi64bAAAAAFJJtVQs9BGRDERq4MtM381qFbvy
# ENV REACT_APP_SERVER_URL=http://localhost:5000

CMD ["npm","start"]
