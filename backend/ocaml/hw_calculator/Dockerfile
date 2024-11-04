FROM ocaml/opam:debian-ocaml-4.14

WORKDIR /app

COPY . .

RUN sudo apt-get update && sudo apt-get install -y pkg-config libssl-dev

RUN opam install . --deps-only --with-test

RUN opam exec -- dune build

EXPOSE 3003

CMD ["opam", "exec", "--", "dune", "exec", "hw_calculator"]