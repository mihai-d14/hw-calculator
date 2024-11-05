FROM perl:5.36

WORKDIR /app

# Install cpanminus and required modules
RUN cpanm Mojolicious JSON::Parse JSON::Create

COPY . .

EXPOSE 3007

CMD ["perl", "app.pl"]