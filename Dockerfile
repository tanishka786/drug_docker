FROM node:18
RUN apt-get update && apt-get install -y netcat-openbsd
WORKDIR /app
RUN npm install -g truffle ganache 
COPY . .
EXPOSE 7545
# Create directory for artifacts if it doesn't exist
RUN mkdir -p /app/client/src/artifacts
# Use CMD directly instead of an entrypoint script
CMD ganache -h 0.0.0.0 -p 7545 -d -i 5777 & sleep 5 && truffle compile && truffle migrate --reset && tail -f /dev/null
