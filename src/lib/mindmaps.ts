import { supabase } from './supabase';

export interface Mindmap {
  id: string;
  user_id: string;
  title: string;
  markdown_content: string;
  ai_prompt: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export async function saveMindmap(
  userId: string,
  title: string,
  markdown: string,
  aiPrompt: string,
  isPublic: boolean = false
) {
  return supabase
    .from('mindmaps')
    .insert({
      user_id: userId,
      title,
      markdown_content: markdown,
      ai_prompt: aiPrompt,
      is_public: isPublic,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select();
}

export async function getUserMindmaps(userId: string) {
  return supabase
    .from('mindmaps')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
}

export async function getMindmapById(id: string) {
  return supabase
    .from('mindmaps')
    .select('*')
    .eq('id', id)
    .single();
}

export async function updateMindmap(
  id: string,
  updates: Partial<{
    title: string;
    markdown_content: string;
    is_public: boolean;
  }>
) {
  return supabase
    .from('mindmaps')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
}

export async function deleteMindmap(id: string) {
  return supabase
    .from('mindmaps')
    .delete()
    .eq('id', id);
}

export async function getPublicMindmaps() {
  return supabase
    .from('mindmaps')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
} 