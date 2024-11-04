FROM haskell:9.4
WORKDIR /app
COPY . .
RUN cabal update && \
    cabal build
EXPOSE 3001
CMD ["cabal", "run"]