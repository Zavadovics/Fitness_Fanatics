FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# ENV CLOUDINARY_HOST=dywtied0r
# ENV CLOUDINARY_API_KEY=282492283825573
# ENV CLOUDINARY_API_SECRET=aGo9UjDf9O3YizdoM49VHcJssQ0
# ENV PORT=5000
# ENV DB_CONNECT=mongodb+srv://masterwork2:masterwork2@cluster0.m8vm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
# ENV TOKEN_SECRET=HúDeBetyárTitkosEzAJelszó

CMD ["npm","start"]
