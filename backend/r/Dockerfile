FROM r-base:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install R packages
RUN R -e "install.packages(c('plumber', 'jsonlite'), repos='https://cloud.r-project.org/')"

# Create app directory
WORKDIR /app

# Copy R scripts
COPY plumber.R .
COPY start.R .

EXPOSE 3008

CMD ["Rscript", "start.R"]