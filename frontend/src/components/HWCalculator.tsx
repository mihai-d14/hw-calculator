import { useState, type ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Alert, AlertDescription } from './ui/Alert';

interface CalculationResult {
  aa: number;
  aq: number;
  qq: number;
  executionTime: number;
  backend: string;
}

interface Results {
  [key: string]: CalculationResult;
}

const HWCalculator = () => {
  const [alleleFreq, setAlleleFreq] = useState('');
  const [results, setResults] = useState<Results>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backends = [
    { name: 'Haskell', url: '/api/haskell' },
    { name: 'Python', url: '/api/python' },
    { name: 'OCaml', url: '/api/ocaml' },
    { name: 'PHP', url: '/api/php' }
  ];

  const calculateAll = async () => {
    setLoading(true);
    setError('');
    const p = parseFloat(alleleFreq);
    
    if (isNaN(p) || p < 0 || p > 1) {
      setError('Please enter a valid frequency between 0 and 1');
      setLoading(false);
      return;
    }

    try {
      const promises = backends.map(async backend => {
        const startTime = performance.now();
        console.log(`Sending request to ${backend.url}`); // Debug log
        
        try {
          const response = await fetch(backend.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frequency: p })
          });

          if (!response.ok) {
            throw new Error(`${backend.name} returned ${response.status}`);
          }

          const endTime = performance.now();
          const data = await response.json();
          
          console.log(`${backend.name} response:`, data); // Debug log
          
          return {
            ...data,
            executionTime: endTime - startTime,
            backend: backend.name
          } as CalculationResult;
        } catch (error) {
          console.error(`${backend.name} error:`, error); // Debug log
          return {
            aa: 0,
            aq: 0,
            qq: 0,
            executionTime: 0,
            backend: backend.name,
            error: true
          } as CalculationResult;
        }
      });

      const results = await Promise.all(promises);
      setResults(results.reduce((acc, result) => {
        acc[result.backend] = result;
        return acc;
      }, {} as Results));
    } catch (err) {
      console.error('Error:', err); // Debug log
      setError('Error calculating results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Hardy-Weinberg Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Enter healthy allele frequency (p)"
              value={alleleFreq}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAlleleFreq(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={calculateAll}
              disabled={loading}
            >
              Calculate
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {Object.entries(results).map(([backend, result]) => (
            <Card key={backend} className="p-4">
              <h3 className="font-bold">{backend}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>AA frequency (p²):</div>
                <div>{result.aa.toFixed(4)}</div>
                <div>Aa frequency (2pq):</div>
                <div>{result.aq.toFixed(4)}</div>
                <div>aa frequency (q²):</div>
                <div>{result.qq.toFixed(4)}</div>
                <div>Execution time:</div>
                <div>{result.executionTime.toFixed(2)}ms</div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HWCalculator;