# Builder stage
FROM rust:1.74-slim as builder

WORKDIR /usr/src/hw-calculator
# Create a new empty shell project
RUN cargo new --bin rust
WORKDIR /usr/src/hw-calculator/rust

# Copy our manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

# Build only the dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# Copy the source code
COPY ./src ./src

# Build for release
RUN rm ./target/release/deps/hw_calculator_rust*
RUN cargo build --release

# Final stage
FROM debian:bookworm-slim

# Copy the build artifact from the builder stage
COPY --from=builder /usr/src/hw-calculator/rust/target/release/hw-calculator-rust .

# Set the startup command
CMD ["./hw-calculator-rust"]

# Document that the service listens on port 3003
EXPOSE 3003