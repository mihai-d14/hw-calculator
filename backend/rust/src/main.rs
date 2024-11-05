use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse, Error};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct FrequencyRequest {
    frequency: f64,
}

#[derive(Serialize)]
struct FrequencyResponse {
    aa: f64,
    aq: f64,
    qq: f64,
}

async fn calculate(req: web::Json<FrequencyRequest>) -> Result<HttpResponse, Error> {
    let p = req.frequency;
    
    if p < 0.0 || p > 1.0 {
        return Ok(HttpResponse::BadRequest().json("Frequency must be between 0 and 1"));
    }

    let q = 1.0 - p;
    let response = FrequencyResponse {
        aa: p * p,
        aq: 2.0 * p * q,
        qq: q * q,
    };

    Ok(HttpResponse::Ok().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    println!("Starting Rust server on port 3005...");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .service(
                web::scope("")
                    .route("/calculate", web::post().to(calculate))
            )
    })
    .bind("127.0.0.1:3005")?
    .run()
    .await
}