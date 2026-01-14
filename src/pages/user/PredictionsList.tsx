import { useState } from 'react';
import { mockPredictions } from '@/data/mockData';
import { PredictionCard } from '@/components/PredictionCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SortAsc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PredictionsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Real' | 'Fake'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'votes'>('newest');

  const filteredPredictions = mockPredictions
    .filter((p) => {
      const matchesSearch = p.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || p.prediction === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return (b.votesUp - b.votesDown) - (a.votesUp - a.votesDown);
    });

  const handleVote = (id: string, type: 'up' | 'down') => {
    console.log(`Voted ${type} on ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Predictions</h1>
          <p className="text-muted-foreground">Browse and vote on submitted news articles</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search predictions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Real">Real Only</SelectItem>
                  <SelectItem value="Fake">Fake Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="votes">Most Voted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredPredictions.length} predictions
        </p>

        {/* Predictions List */}
        <div className="space-y-4">
          {filteredPredictions.length > 0 ? (
            filteredPredictions.map((prediction, index) => (
              <div key={prediction.id} style={{ animationDelay: `${index * 50}ms` }}>
                <PredictionCard prediction={prediction} onVote={handleVote} />
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">No predictions found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery('');
                setFilterType('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
