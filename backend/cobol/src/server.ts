// src/server.ts
import express from 'express';
import { exec } from 'child_process';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3009;

app.post('/calculate', (req, res) => {
    const { frequency } = req.body;
    
    if (typeof frequency !== 'number' || frequency < 0 || frequency > 1) {
        return res.status(400).json({ error: 'Frequency must be between 0 and 1' });
    }

    const hwCalculator = path.join(__dirname, '..', 'dist', 'hw');
    
    exec(`echo "${frequency}" | ${hwCalculator}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: 'Calculation failed' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Calculation failed' });
        }
        
        try {
            const result = JSON.parse(stdout.trim());
            res.json(result);
        } catch (e) {
            console.error('Parse error:', e);
            res.status(500).json({ error: 'Invalid output format' });
        }
    });
});

app.listen(port, () => {
    console.log(`COBOL backend running on port ${port}`);
});