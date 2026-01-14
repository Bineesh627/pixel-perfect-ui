import { Link } from 'react-router-dom';
import { Prediction } from '@/types';
import { ThumbsUp, ThumbsDown, ExternalLink, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PredictionCardProps {
  prediction: Prediction;
  onVote?: (id: string, type: 'up' | 'down') => void;
}

export function PredictionCard({ prediction, onVote }: PredictionCardProps) {
  const confidencePercent = Math.round(prediction.confidence * 100);

  return (
    <article className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Badge 
            variant={prediction.prediction === 'Real' ? 'default' : 'destructive'}
            className={prediction.prediction === 'Real' 
              ? 'bg-success/10 text-success border-success/20 hover:bg-success/20' 
              : 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20'
            }
          >
            {prediction.prediction}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {confidencePercent}% confidence
          </span>
        </div>
        {prediction.isCorrection && (
          <Badge variant="outline" className="text-warning border-warning/50">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        )}
      </div>

      <Link to={`/prediction/${prediction.id}`} className="block group">
        <p className="text-foreground line-clamp-3 group-hover:text-primary transition-colors">
          {prediction.text}
        </p>
      </Link>

      {prediction.linkUrl && (
        <a 
          href={prediction.linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          Source Link
        </a>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {new Date(prediction.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="vote"
            size="sm"
            onClick={() => onVote?.(prediction.id, 'up')}
            className="text-success hover:text-success"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{prediction.votesUp}</span>
          </Button>
          <Button
            variant="vote"
            size="sm"
            onClick={() => onVote?.(prediction.id, 'down')}
            className="text-destructive hover:text-destructive"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{prediction.votesDown}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
