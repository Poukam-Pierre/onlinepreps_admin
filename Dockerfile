FROM node:18.12.1-alpine3.16

# #set the working directory
WORKDIR /app/admin

# # install app dependencies
COPY package.json .
COPY package-lock.json .

# #clean install dependecies
RUN npm install --legacy-peer-deps
RUN npm install -g serve --legacy-peer-deps

# # add app
COPY . /app/admin

# # build Landing app
RUN npm run build

# # run app
ENTRYPOINT [ "serve" ]

CMD ["-s", "/app/admin/build"]