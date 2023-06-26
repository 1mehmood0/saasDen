FROM node:16.6

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

ENV AZURE_CLIENT_ID <your-client-id>
ENV AZURE_TENANT_ID <your-tenant-id>
ENV AZURE_CLIENT_SECRET <your-client-secret>
ENV VAULT_NAME saasyvault
ENV PORT 9020

EXPOSE 9020

CMD [ "node", "index.js" ]
