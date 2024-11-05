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
    { name: 'PHP', url: '/api/php' },
    { name: 'Rust', url: '/api/rust' },
    { name: 'C++', url: '/api/cpp' },
    { name: 'Perl', url: '/api/perl' },
    { name: 'R', url: '/api/r' },
    { name: 'Cobol', url: '/api/cobol' },
    { name: 'Typescript', url: '/api/cobol' }
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
        
        try {
          console.log(`${backend.name}: Sending request`);
          const response = await fetch(backend.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frequency: p })
          });
    
          if (!response.ok) {
            throw new Error(`${backend.name} returned ${response.status}`);
          }
    
          const endTime = performance.now();
          const rawData = await response.text();
          console.log(`${backend.name} raw response:`, rawData);
          
          const data = JSON.parse(rawData);
          console.log(`${backend.name} parsed data:`, data);
          
          const result = {
            aa: Number(data.aa),
            aq: Number(data.aq),
            qq: Number(data.qq),
            executionTime: endTime - startTime,
            backend: backend.name,
            error: false
          };
          
          console.log(`${backend.name} final result:`, result);
          return result;
    
        } catch (error) {
          console.error(`${backend.name} error:`, error);
          return {
            aa: 0,
            aq: 0,
            qq: 0,
            executionTime: 0,
            backend: backend.name,
            error: true
          };
        }
      });
    
      const results = await Promise.all(promises);
      console.log('All results:', results);
      
      const processedResults = results.reduce((acc, result) => {
        acc[result.backend] = result;
        return acc;
      }, {} as Results);
      
      console.log('Processed results:', processedResults);
      setResults(processedResults);
    } catch (err) {
      console.error('Error:', err);
      setError('Error calculating results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(results).map(([backend, result]) => (
              <Card key={backend} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 pt-2">{backend}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AA (p²):</span>
                      <span className="font-mono">{result.aa.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aa (2pq):</span>
                      <span className="font-mono">{result.aq.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>aa (q²):</span>
                      <span className="font-mono">{result.qq.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Time:</span>
                      <span className="font-mono">{result.executionTime.toFixed(2)}ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HWCalculator;