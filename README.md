# Hardy-Weinberg Calculator
A web application that calculates Hardy-Weinberg equilibrium using multiple backend implementations. Built by Mihai Dinu.

## Summary
The goal is to test and compare the performance of various programming languages in genetic/genomic calculations. The project implements Hardy-Weinberg equilibrium calculations across 10 different programming languages, ranging from functional to imperative paradigms. The hypothesis is that languages with specific characteristics might offer unique advantages for genetic/genomic computations.

### Immutability
DNA/RNA sequences are inherently immutable in nature. Languages like Haskell and OCaml, which emphasize immutability, naturally align with this characteristic. Genetic algorithms often involve creating new generations rather than modifying existing ones. Moreover, this reduces bugs when tracking lineages and mutations across generations.

### Purity
Pure functional languages (Haskell, OCaml) make it easier to reason about complex simulations, especially where accuracy is paramount. The absence of side effects helps ensure consistent results across multiple runs.

### High-Level Abstraction with Performance
Different languages offer various tradeoffs between abstraction and performance:
- Functional languages (Haskell, OCaml) provide expressive type systems and high-level abstractions
- Systems languages (Rust, C++) offer low-level control with high performance
- Dynamic languages (Python, PHP, Perl) prioritize developer productivity
- Specialized languages (R) provide built-in statistical capabilities

## Project Structure
```
hw-calculator/
├── frontend/           # Astro + React frontend
├── backend/
│   ├── haskell/       # Haskell implementation
│   ├── python/        # Python implementation
│   ├── ocaml/         # OCaml implementation
│   ├── php/           # PHP implementation
│   ├── rust/          # Rust implementation
│   ├── cpp/           # C++ implementation
│   ├── perl/          # Perl implementation
│   ├── r/             # R implementation
│   ├── cobol/         # COBOL implementation
│   └── typescript/    # TypeScript implementation
└── README.md
```

## Setup
### Prerequisites
- Docker and Docker Compose
- Node.js (for local frontend development)

Or for manual setup:
- Node.js
- Python 3.11+
- GHC (Glasgow Haskell Compiler)
- OCaml compiler
- PHP 8.0+
- Rust toolchain
- C++ compiler
- Perl
- R
- GnuCOBOL
- TypeScript

### Installation

#### Using Docker (Recommended)
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd hw-calculator
   ```

2. Start all services:
   ```bash
   docker-compose up
   ```

#### Manual Setup
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd hw-calculator
   ```

2. Set up backend services:
   ```bash
   # Python
   cd backend/python
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   cd ..

   # Haskell
   cd haskell
   cabal update
   cabal build
   cd ..

   # OCaml
   cd ocaml
   opam install . --deps-only
   dune build
   cd ..

   # Additional backend setup commands...
   # (Similar setup steps for other backends)
   ```

3. Set up frontend:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

#### Using Docker
```bash
docker-compose up
```

#### Manual Start
1. Start all backend services:
   ```bash
   # Start each backend in a separate terminal
   cd backend/[language]
   # Run appropriate start command for each backend
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at http://localhost:3000

## Usage
1. Enter an allele frequency between 0 and 1
2. Click Calculate
3. View the results and execution times across all 10 backend implementations
4. Compare performance metrics between different language implementations

## Performance Comparison
The application provides real-time performance metrics for each backend implementation, allowing users to compare:
- Execution time
- Memory usage
- Response latency
- Computational accuracy

## License
MIT
