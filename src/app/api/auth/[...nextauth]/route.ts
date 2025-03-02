import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Check if user exists
      const { data: existingUser } = await supabase
        .from('mark_users')
        .select()
        .eq('email', user.email)
        .single();

      if (!existingUser) {
        // Create new user
        await supabase.from('mark_users').insert([
          {
            email: user.email,
            full_name: user.name,
            image_url: user.image,
          },
        ]);
      }

      return true;
    },
    async session({ session, token }) {
      if (session?.user?.email) {
        const { data: user } = await supabase
          .from('mark_users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (user) {
          session.user.id = user.id;
        }
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 