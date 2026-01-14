import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link2, FileText, Loader2, Sparkles } from 'lucide-react';

export function NewsSubmitForm() {
  const [newsLink, setNewsLink] = useState('');
  const [newsText, setNewsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsLink && !newsText) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Navigate to result page with mock data
    navigate('/result/1');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="newsLink" className="flex items-center gap-2 text-foreground">
          <Link2 className="h-4 w-4 text-primary" />
          News Link (Automatic Scraping)
        </Label>
        <Input
          id="newsLink"
          type="url"
          placeholder="https://example.com/news-article"
          value={newsLink}
          onChange={(e) => setNewsLink(e.target.value)}
          className="h-12"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newsText" className="flex items-center gap-2 text-foreground">
          <FileText className="h-4 w-4 text-primary" />
          Paste Raw Text
        </Label>
        <Textarea
          id="newsText"
          placeholder="Paste the news content here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          rows={5}
          className="resize-none"
        />
      </div>

      <Button 
        type="submit" 
        variant="hero" 
        size="lg" 
        className="w-full"
        disabled={isLoading || (!newsLink && !newsText)}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Analyze News
          </>
        )}
      </Button>
    </form>
  );
}
