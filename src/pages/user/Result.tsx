import { useParams, Link } from 'react-router-dom';
import { mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Home, ArrowRight } from 'lucide-react';

export default function Result() {
  const { id } = useParams();
  // For demo, use the first prediction or find by id
  const prediction = mockPredictions.find((p) => p.id === id) || mockPredictions[0];

  const isReal = prediction.prediction === 'Real';
  const confidencePercent = Math.round(prediction.confidence * 100);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Result Icon */}
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-fade-in ${
          isReal ? 'bg-success/10' : 'bg-destructive/10'
        }`}>
          {isReal ? (
            <CheckCircle className="h-12 w-12 text-success" />
          ) : (
            <XCircle className="h-12 w-12 text-destructive" />
          )}
        </div>

        {/* Result Heading */}
        <h1 className={`text-4xl lg:text-5xl font-bold mb-4 animate-fade-in ${
          isReal ? 'text-success' : 'text-destructive'
        }`}>
          {prediction.prediction}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
          Confidence: <span className="font-semibold text-foreground">{confidencePercent}%</span>
        </p>

        {/* Analyzed Text */}
        <div className="bg-card rounded-xl border border-border p-6 text-left mb-8 animate-fade-in">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Analyzed Text</h2>
          <p className="text-foreground leading-relaxed">{prediction.text}</p>
        </div>

        {/* Confidence Bar */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8 animate-fade-in">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Confidence Level</h2>
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                isReal ? 'bg-success' : 'bg-destructive'
              }`}
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link to={`/feedback/${prediction.id}`}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Mark as Incorrect
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* View Details Link */}
        <Link 
          to={`/prediction/${prediction.id}`} 
          className="inline-flex items-center gap-1 text-primary hover:underline mt-6 text-sm"
        >
          View full details
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
