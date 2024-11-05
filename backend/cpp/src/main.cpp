// src/main.cpp
#include <crow.h>
#include <nlohmann/json.hpp>
#include <chrono>

using json = nlohmann::json;

struct HWResult {
    double aa;
    double aq;
    double qq;
};

void to_json(json& j, const HWResult& result) {
    j = json{
        {"aa", result.aa},
        {"aq", result.aq},
        {"qq", result.qq}
    };
}

HWResult calculate_hw(double p) {
    double q = 1.0 - p;
    return HWResult{
        .aa = p * p,
        .aq = 2.0 * p * q,
        .qq = q * q
    };
}

class CORSMiddleware : public crow::ILocalMiddleware {
public:
    struct context {};

    void before_handle(crow::request&, crow::response& res, context&) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
    }

    void after_handle(crow::request&, crow::response& res, context&) {}
};

int main() {
    crow::App<CORSMiddleware> app;

    // Handle OPTIONS preflight requests
    CROW_ROUTE(app, "/calculate")
    .methods("OPTIONS"_method)
    ([](const crow::request&) {
        auto res = crow::response(200);
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        return res;
    });

    // Main calculation endpoint
    CROW_ROUTE(app, "/calculate")
    .methods("POST"_method)
    ([](const crow::request& req) {
        try {
            auto body = json::parse(req.body);
            double frequency = body["frequency"].get<double>();
            
            if (frequency < 0.0 || frequency > 1.0) {
                return crow::response(400, "Frequency must be between 0 and 1");
            }

            auto result = calculate_hw(frequency);
            
            crow::response res(json(result).dump());
            res.set_header("Content-Type", "application/json");
            return res;
        }
        catch (const std::exception& e) {
            return crow::response(400, std::string("Error: ") + e.what());
        }
    });

    app.port(3006)
       .multithreaded()
       .run();

    return 0;
}