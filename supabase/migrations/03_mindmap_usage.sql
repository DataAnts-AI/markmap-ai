-- Create mindmap_usage table
CREATE TABLE mark_mindmap_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES mark_users(id) NOT NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE mark_mindmap_usage ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own usage
CREATE POLICY read_own_usage ON mark_mindmap_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own usage
CREATE POLICY insert_own_usage ON mark_mindmap_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
