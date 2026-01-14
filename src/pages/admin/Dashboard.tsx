import { StatsCard } from '@/components/StatsCard';
import { mockPredictions, mockUsers, mockFeedback, mockActivityLogs } from '@/data/mockData';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const totalPredictions = mockPredictions.length;
  const realPredictions = mockPredictions.filter(p => p.prediction === 'Real').length;
  const fakePredictions = mockPredictions.filter(p => p.prediction === 'Fake').length;
  const totalUsers = mockUsers.length;
  const pendingFeedback = mockFeedback.length;

  const recentActivity = mockActivityLogs.slice(0, 5);
  const recentPredictions = mockPredictions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with TruthGuard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Predictions"
          value={totalPredictions}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value={totalUsers}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Pending Feedback"
          value={pendingFeedback}
          icon={MessageSquare}
        />
        <StatsCard
          title="Accuracy Rate"
          value="94%"
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Prediction Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Prediction Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Real
                </span>
                <span className="font-medium">{realPredictions} ({Math.round(realPredictions / totalPredictions * 100)}%)</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full" 
                  style={{ width: `${(realPredictions / totalPredictions) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  Fake
                </span>
                <span className="font-medium">{fakePredictions} ({Math.round(fakePredictions / totalPredictions * 100)}%)</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive rounded-full" 
                  style={{ width: `${(fakePredictions / totalPredictions) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Link to="/admin/logs">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="p-1.5 rounded bg-primary/10">
                  <Clock className="h-3 w-3 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{log.details}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Predictions Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Predictions</h2>
            <Link to="/admin/predictions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Text</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Result</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Confidence</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Votes</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((pred) => (
                <tr key={pred.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground line-clamp-1 max-w-xs">{pred.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={pred.prediction === 'Real' ? 'default' : 'destructive'}
                      className={pred.prediction === 'Real' 
                        ? 'bg-success/10 text-success border-0' 
                        : 'bg-destructive/10 text-destructive border-0'
                      }
                    >
                      {pred.prediction}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {Math.round(pred.confidence * 100)}%
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="text-success">↑{pred.votesUp}</span>
                    {' / '}
                    <span className="text-destructive">↓{pred.votesDown}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(pred.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
