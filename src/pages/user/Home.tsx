import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NewsSubmitForm } from '@/components/NewsSubmitForm';
import { PredictionCard } from '@/components/PredictionCard';
import { mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  // Get popular predictions (sorted by votes)
  const popularPredictions = [...mockPredictions]
    .sort((a, b) => (b.votesUp - b.votesDown) - (a.votesUp - a.votesDown))
    .slice(0, 3);

  const handleVote = (id: string, type: 'up' | 'down') => {
    console.log(`Voted ${type} on ${id}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Fact Checking</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in text-balance">
              Detect Fake News<br />Before It Spreads
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/80 mb-8 animate-fade-in">
              Our advanced AI analyzes news articles in seconds, helping you identify misinformation and verify facts with confidence.
            </p>
            {!isAuthenticated && (
              <div className="flex items-center justify-center gap-4 animate-fade-in">
                <Link to="/signup">
                  <Button variant="hero" size="xl">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, value: '50K+', label: 'Articles Analyzed' },
              { icon: CheckCircle, value: '94%', label: 'Accuracy Rate' },
              { icon: Users, value: '10K+', label: 'Active Users' },
              { icon: TrendingUp, value: '1M+', label: 'Votes Cast' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Form Section */}
      {isAuthenticated ? (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Check News Authenticity</h2>
                <p className="text-muted-foreground mb-6">Submit a news article link or paste the text to verify its authenticity.</p>
                <NewsSubmitForm />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-16 bg-secondary/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Fight Misinformation?</h2>
            <p className="text-muted-foreground mb-6">Create a free account to start analyzing news articles.</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Popular Submissions */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Popular Submissions</h2>
              <p className="text-muted-foreground">Most voted articles this week</p>
            </div>
            <Link to="/predictions">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPredictions.map((prediction) => (
              <PredictionCard 
                key={prediction.id} 
                prediction={prediction} 
                onVote={handleVote}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
