import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Music, Gamepad2, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  id: string;
  label: string;
  icon: any;
  votes: number;
}

const VotingPoll = () => {
  const { toast } = useToast();
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState<PollOption[]>([
    { id: "music", label: "Musical Content", icon: Music, votes: 0 },
    { id: "gaming", label: "Gaming Videos", icon: Gamepad2, votes: 0 },
    { id: "other", label: "Other Fun Stuff", icon: Sparkles, votes: 0 },
  ]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) {
      toast({
        title: "Already Voted!",
        description: "You've already cast your vote. Thanks!",
      });
      return;
    }

    setOptions(prev =>
      prev.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setHasVoted(true);
    toast({
      title: "Vote Recorded! 🎉",
      description: "Thank you for helping shape our content!",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-2 shadow-elegant">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">What Should I Create Next?</CardTitle>
        <CardDescription className="text-base">
          Help me decide what type of content to make for my YouTube channel!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const Icon = option.icon;
          
          return (
            <div key={option.id} className="space-y-2">
              <Button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                variant={hasVoted ? "outline" : "default"}
                className="w-full h-auto py-4 justify-start gap-3 text-left transition-all hover:scale-[1.02]"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 font-semibold">{option.label}</span>
                {hasVoted && (
                  <span className="text-sm font-bold">{percentage.toFixed(0)}%</span>
                )}
              </Button>
              {hasVoted && (
                <Progress value={percentage} className="h-2" />
              )}
            </div>
          );
        })}
        
        {hasVoted && (
          <div className="pt-4 text-center text-sm text-muted-foreground border-t">
            Total votes: {totalVotes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VotingPoll;
