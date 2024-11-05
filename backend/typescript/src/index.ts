// backend/typescript/src/index.ts
import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

// Interfaces
interface FrequencyRequest {
  frequency: number;
}

interface FrequencyResponse {
  aa: number;
  aq: number;
  qq: number;
}

// Middleware
app.use(cors());
app.use(express.json());

// Hardy-Weinberg calculation endpoint
const calculateHandler: RequestHandler = (req, res) => {
  try {
    const { frequency } = req.body as FrequencyRequest;
    
    if (typeof frequency !== 'number' || frequency < 0 || frequency > 1) {
      res.status(400).json({
        error: 'Frequency must be a number between 0 and 1'
      });
      return;
    }

    const p = frequency;
    const q = 1 - p;
    
    const result: FrequencyResponse = {
      aa: p * p,
      aq: 2 * p * q,
      qq: q * q
    };

    res.json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

app.post('/calculate', calculateHandler);

app.listen(port, () => {
  console.log(`TypeScript backend running at http://localhost:${port}`);
});