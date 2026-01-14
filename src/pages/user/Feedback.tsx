import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const prediction = mockPredictions.find((p) => p.id === id);
  
  const [correctedLabel, setCorrectedLabel] = useState<'Real' | 'Fake'>(
    prediction?.prediction === 'Real' ? 'Fake' : 'Real'
  );
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping improve our model!",
    });
    
    setTimeout(() => {
      navigate('/predictions');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="text-muted-foreground mb-6">Your feedback has been submitted and will help improve our model.</p>
          <Link to="/predictions">
            <Button>View All Predictions</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to={`/prediction/${id}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to prediction
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Provide Feedback</h1>
          <p className="text-muted-foreground">
            Help us improve the model by providing the correct label for this article.
          </p>
        </div>

        {/* Original Prediction Summary */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-8 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Original Prediction</p>
          <p className="text-foreground line-clamp-2 mb-2">{prediction.text}</p>
          <p className="text-sm">
            Predicted as{' '}
            <span className={prediction.prediction === 'Real' ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
              {prediction.prediction}
            </span>
            {' '}with {Math.round(prediction.confidence * 100)}% confidence
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>What is the correct label?</Label>
              <Select 
                value={correctedLabel} 
                onValueChange={(v) => setCorrectedLabel(v as 'Real' | 'Fake')}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Real">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      Real - This news is authentic
                    </span>
                  </SelectItem>
                  <SelectItem value="Fake">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Fake - This news is misinformation
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Additional Notes (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Why do you think the prediction is wrong? Any sources to verify?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Correction
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
