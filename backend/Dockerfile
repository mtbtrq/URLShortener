FROM node:latest
WORKDIR /app
ENV PORT=5000
EXPOSE 5000
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]