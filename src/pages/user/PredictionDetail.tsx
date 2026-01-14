import { useParams, Link } from 'react-router-dom';
import { mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  Clock, 
  ArrowLeft, 
  AlertTriangle,
  Share2
} from 'lucide-react';

export default function PredictionDetail() {
  const { id } = useParams();
  const prediction = mockPredictions.find((p) => p.id === id);

  if (!prediction) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Prediction Not Found</h1>
        <Link to="/predictions">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Predictions
          </Button>
        </Link>
      </div>
    );
  }

  const confidencePercent = Math.round(prediction.confidence * 100);

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link to="/predictions" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all predictions
        </Link>

        {/* Main Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          {/* Header */}
          <div className={`px-6 py-4 ${prediction.prediction === 'Real' ? 'bg-success/10' : 'bg-destructive/10'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge 
                  className={`text-lg px-4 py-1 ${
                    prediction.prediction === 'Real' 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-destructive text-destructive-foreground'
                  }`}
                >
                  {prediction.prediction}
                </Badge>
                <span className="text-sm font-medium text-foreground">
                  {confidencePercent}% confidence
                </span>
              </div>
              {prediction.isCorrection && (
                <Badge variant="outline" className="text-warning border-warning">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Flagged for Review
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(prediction.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {prediction.linkUrl && (
                <a 
                  href={prediction.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Source Link
                </a>
              )}
            </div>

            {/* Full Text */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Full Text</h2>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{prediction.text}</p>
              </div>
            </div>

            {/* Voting */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <Button variant="vote" size="lg" className="text-success hover:text-success">
                  <ThumbsUp className="h-5 w-5" />
                  <span className="font-semibold">{prediction.votesUp}</span>
                </Button>
                <Button variant="vote" size="lg" className="text-destructive hover:text-destructive">
                  <ThumbsDown className="h-5 w-5" />
                  <span className="font-semibold">{prediction.votesDown}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link to={`/feedback/${prediction.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Incorrect
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button className="w-full">
              Check Another Article
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
