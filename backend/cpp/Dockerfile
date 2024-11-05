FROM ubuntu:22.04

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    curl \
    zip \
    unzip \
    tar \
    pkg-config \
    ninja-build \
    && rm -rf /var/lib/apt/lists/*

# Install vcpkg
WORKDIR /opt
RUN git clone https://github.com/Microsoft/vcpkg.git
WORKDIR /opt/vcpkg
RUN ./bootstrap-vcpkg.sh

# Copy project files
WORKDIR /app
COPY . .

# Build project
RUN cmake -B build -S . \
    -DCMAKE_TOOLCHAIN_FILE=/opt/vcpkg/scripts/buildsystems/vcpkg.cmake \
    -DCMAKE_BUILD_TYPE=Release \
    -GNinja
RUN cmake --build build

EXPOSE 3006
CMD ["./build/hw_calculator_cpp"]