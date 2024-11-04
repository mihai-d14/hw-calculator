open Lwt
open Cohttp_lwt_unix
open Cohttp

(* Types *)
type frequency_request = {
  frequency : float
} [@@deriving yojson]

type frequency_response = {
  aa : float;
  aq : float;
  qq : float
} [@@deriving yojson]

(* Hardy-Weinberg calculation *)
let calculate_hw p =
  let q = 1.0 -. p in
  {
    aa = p *. p;
    aq = 2.0 *. p *. q;
    qq = q *. q
  }

(* Request handling *)
let handle_post_request body =
  try
    match frequency_request_of_yojson (Yojson.Safe.from_string body) with
    | Error msg -> `String ("Invalid request format: " ^ msg) |> Yojson.Safe.to_string
    | Ok req ->
        if req.frequency < 0.0 || req.frequency > 1.0 then
          `String "Frequency must be between 0 and 1" |> Yojson.Safe.to_string
        else
          let result = calculate_hw req.frequency in
          frequency_response_to_yojson result |> Yojson.Safe.to_string
  with e ->
    `String ("Error: " ^ Printexc.to_string e) |> Yojson.Safe.to_string

(* Server *)
let server =
  let callback _conn req body =
    let uri = req |> Request.uri |> Uri.path in
    match (Request.meth req, uri) with
    | `OPTIONS, _ ->
        Server.respond_string ~status:`OK
          ~headers:(Header.init_with
            "Access-Control-Allow-Origin" "*"
            |> fun h -> Header.add h "Access-Control-Allow-Methods" "POST, OPTIONS"
            |> fun h -> Header.add h "Access-Control-Allow-Headers" "Content-Type")
          ~body:"" ()
    | `POST, "/calculate" ->
        body |> Cohttp_lwt.Body.to_string >|= handle_post_request >>= fun body ->
        Server.respond_string ~status:`OK
          ~headers:(Header.init_with
            "Content-Type" "application/json"
            |> fun h -> Header.add h "Access-Control-Allow-Origin" "*")
          ~body ()
    | _, _ ->
        Server.respond_string ~status:`Not_found ~body:"Not found" ()
  in
  Server.create ~mode:(`TCP (`Port 3003)) (Server.make ~callback ())

let () =
  Printf.printf "Starting server on port 3003...\n%!";
  Lwt_main.run server