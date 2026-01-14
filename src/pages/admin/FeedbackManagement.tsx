import { mockFeedback, mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function FeedbackManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Feedback Queue</h1>
        <p className="text-muted-foreground">Review user corrections and improve model accuracy</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockFeedback.length}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Approved This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Rejected This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {mockFeedback.map((feedback) => {
          const prediction = mockPredictions.find(p => p.id === feedback.predictionId);
          if (!prediction) return null;

          return (
            <div key={feedback.id} className="bg-card rounded-xl border border-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Prediction Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Prediction #{prediction.id}</span>
                  </div>
                  <p className="text-foreground">{prediction.text}</p>
                  
                  {/* Original vs Suggested */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Original:</span>
                      <Badge 
                        className={prediction.prediction === 'Real' 
                          ? 'bg-success/10 text-success border-0' 
                          : 'bg-destructive/10 text-destructive border-0'
                        }
                      >
                        {prediction.prediction}
                      </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Suggested:</span>
                      <Badge 
                        className={feedback.correctedLabel === 'Real' 
                          ? 'bg-success/10 text-success border-0' 
                          : 'bg-destructive/10 text-destructive border-0'
                        }
                      >
                        {feedback.correctedLabel}
                      </Badge>
                    </div>
                  </div>

                  {/* Note */}
                  {feedback.note && (
                    <div className="bg-secondary/50 rounded-lg p-3 mt-3">
                      <p className="text-sm text-muted-foreground mb-1">User Note:</p>
                      <p className="text-sm text-foreground">{feedback.note}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:w-32">
                  <Button variant="default" size="sm" className="flex-1 bg-success hover:bg-success/90">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-destructive border-destructive/50 hover:bg-destructive/10">
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
              
              {/* Meta */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <span>Submitted: {new Date(feedback.createdAt).toLocaleString()}</span>
                <span>User ID: {feedback.userId}</span>
              </div>
            </div>
          );
        })}
      </div>

      {mockFeedback.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
          <p className="text-muted-foreground">No pending feedback to review.</p>
        </div>
      )}
    </div>
  );
}
