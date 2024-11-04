# Hardy-Weinberg Calculator

A web application that calculates Hardy-Weinberg equilibrium using multiple backend implementations. Built by Mihai Dinu.

## Summary

The goal is to test the performance of Haskell in genetic/genomic calculations. Hypothesis is that Haskell's strenghts might make it a solid contender to programming languages with a more robust ecosystem. 

### Immutability
DNA/RNA sequences are inherently immutable in nature and immutability is one oh Haskell's main strenghts. Genetic algorithms often involve creating new generations rather than modifying existing ones. Moreover, this reduces bugs when tracking lineages and mutations across generations.

### Purity
Haskell’s pure functional nature also make it a good fit for complex simulations, especially where accuracy is paramount.

### High-Level Abstraction with Performance
Haskell’s expressive type system and support for high-level abstractions make it possible to write concise code that closely mirrors mathematical formulations, which are common in genetic modeling.


## Project Structure

```
hw-calculator/
├── frontend/         # Astro + React frontend
├── backend/
│   ├── haskell/     # Haskell implementation
│   └── python/      # Python implementation
└── README.md
```

## Setup

### Prerequisites
- Node.js
- Python 3.11+
- GHC (Glasgow Haskell Compiler)
- Cabal

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd hw-calculator
   ```

2. Set up Python backend:
   ```bash
   cd backend/python
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

3. Set up Haskell backend:
   ```bash
   cd ../haskell
   cabal update
   cabal build
   ```

4. Set up frontend:
   ```bash
   cd ../../frontend
   npm install
   ```

### Running the Application

1. Start Python backend:
   ```bash
   cd backend/python
   source venv/bin/activate
   python main.py
   ```

2. Start Haskell backend:
   ```bash
   cd ../haskell
   cabal run
   ```

3. Start frontend:
   ```bash
   cd ../../frontend
   npm run dev
   ```

The application will be available at http://localhost:4321

## Usage

1. Enter an allele frequency between 0 and 1
2. Click Calculate
3. View the results and execution times for different backend implementations

## License

MIT
