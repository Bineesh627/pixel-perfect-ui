import { useState } from 'react';
import { mockActivityLogs, mockUsers } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  ThumbsUp, 
  MessageSquare, 
  LogIn,
  Clock,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const actionIcons: Record<string, any> = {
  prediction_created: FileText,
  vote_up: ThumbsUp,
  feedback_submitted: MessageSquare,
  user_login: LogIn,
};

const actionColors: Record<string, string> = {
  prediction_created: 'bg-primary/10 text-primary',
  vote_up: 'bg-success/10 text-success',
  feedback_submitted: 'bg-warning/10 text-warning',
  user_login: 'bg-secondary text-secondary-foreground',
};

export default function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = mockActivityLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const getUser = (userId: string) => mockUsers.find(u => u.id === userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-muted-foreground">Monitor all system activity and user actions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="prediction_created">Predictions</SelectItem>
            <SelectItem value="vote_up">Votes</SelectItem>
            <SelectItem value="feedback_submitted">Feedback</SelectItem>
            <SelectItem value="user_login">Logins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Activity Timeline */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filteredLogs.map((log, index) => {
            const Icon = actionIcons[log.action] || Clock;
            const colorClass = actionColors[log.action] || 'bg-secondary text-secondary-foreground';
            const user = getUser(log.userId);

            return (
              <div 
                key={log.id} 
                className="p-4 hover:bg-secondary/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">{log.details}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                      {user && (
                        <span>by {user.username}</span>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {log.action.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">No activity logs found matching your criteria.</p>
        </div>
      )}

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {mockActivityLogs.length} logs
      </div>
    </div>
  );
}
