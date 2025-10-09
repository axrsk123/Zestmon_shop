-- Create public leaderboard table
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  game_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view leaderboard" 
ON public.leaderboard 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add scores" 
ON public.leaderboard 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_leaderboard_game_score ON public.leaderboard(game_name, score DESC);
CREATE INDEX idx_leaderboard_created_at ON public.leaderboard(created_at DESC);