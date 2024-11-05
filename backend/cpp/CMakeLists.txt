cmake_minimum_required(VERSION 3.15)
project(hw_calculator_cpp)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Find required packages
find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)

# Add executable
add_executable(hw_calculator_cpp src/main.cpp)

# Link libraries
target_link_libraries(hw_calculator_cpp PRIVATE 
    Crow::Crow
    nlohmann_json::nlohmann_json
)

# Add include directories
target_include_directories(hw_calculator_cpp PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src)