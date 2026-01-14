import { useState } from 'react';
import { mockPredictions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MoreVertical,
  Filter,
  Download,
  ThumbsUp,
  ThumbsDown,
  ExternalLink
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PredictionsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Real' | 'Fake'>('all');

  const filteredPredictions = mockPredictions.filter(pred => {
    const matchesSearch = pred.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || pred.prediction === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Predictions</h1>
          <p className="text-muted-foreground">View and manage all predictions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search predictions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Real">Real Only</SelectItem>
            <SelectItem value="Fake">Fake Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">ID</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Text</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Result</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Confidence</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Votes</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date</th>
                <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPredictions.map((pred) => (
                <tr key={pred.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-6 py-4 text-sm text-muted-foreground">#{pred.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground line-clamp-1 max-w-xs">{pred.text}</p>
                      {pred.linkUrl && (
                        <a href={pred.linkUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-primary" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      className={pred.prediction === 'Real' 
                        ? 'bg-success/10 text-success border-0' 
                        : 'bg-destructive/10 text-destructive border-0'
                      }
                    >
                      {pred.prediction}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pred.prediction === 'Real' ? 'bg-success' : 'bg-destructive'}`}
                          style={{ width: `${pred.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{Math.round(pred.confidence * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-success">
                        <ThumbsUp className="h-3 w-3" />
                        {pred.votesUp}
                      </span>
                      <span className="flex items-center gap-1 text-destructive">
                        <ThumbsDown className="h-3 w-3" />
                        {pred.votesDown}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {pred.isCorrection ? (
                      <Badge variant="outline" className="text-warning border-warning/50">Flagged</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(pred.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Prediction</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPredictions.length} of {mockPredictions.length} predictions
      </div>
    </div>
  );
}
