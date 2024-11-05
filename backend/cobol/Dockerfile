FROM ubuntu:22.04

# Install GnuCOBOL and Node.js
RUN apt-get update && apt-get install -y \
    gnucobol \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy COBOL source and Node.js wrapper
COPY hw-calculator.cbl .
COPY package*.json ./
COPY server.ts ./
COPY tsconfig.json ./

# Compile COBOL program
RUN cobc -x -o hw-calculator hw-calculator.cbl

# Install Node.js dependencies
RUN npm install

# Build TypeScript
RUN npm run build

EXPOSE 3009

CMD ["npm", "start"]