import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

let users = [
  {
    id: 1,
    name: 'Min Htet',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1' // Plain password for simplicity
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );

        if (user) {
          // Return user object with `id` as string
          return {
            id: user.id.toString(), // Convert `id` to string
            name: user.name,
            email: user.email,
            accessToken: 'simulated-access-token', // Simulated token
          };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    }),

    // Register provider
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        const newUser = {
          id: (users.length + 1).toString(), // Ensure id is a string
          name: `${credentials?.firstname} ${credentials?.lastname}`,
          email: credentials?.email,
          password: credentials?.password,
        };

        //users.push(newUser);

        return {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          accessToken: 'simulated-access-token',
        };
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.id = token.id;
      session.token = token;
      return session;
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },

  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },

  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};

/*
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'utils/axios';

let users = [
  {
    id: 1,
    name: 'Min Htet',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            'https://lawonearth.co.uk/api/auth/core/login',
            {
              email: credentials?.email,
              password: credentials?.password
            },
            {
              headers: {
                'COMPANY-CODE': 'def-mc-admin',
                'FRONTEND-KEY':'XXX', //  || process.env.FRONTEND_KEY
                //'Authorization': `Bearer ${process.env.AUTH_TOKEN}`, // Replace with actual Bearer token
              }
            }
          );

          if (response && response.data.user) {
            response.data.user['accessToken'] = response.data.serviceToken;
            return response.data.user;
          }
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || 'Login failed';
          throw new Error(errorMessage);
        }
      }
    }),
    // Register provider can remain as it is
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
*/

/*
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'utils/axios';

let users = [
  {
    id: 1,
    name: 'Jone Doe',
    email: 'minmattral@gmail.com',
    password: 'aAertyuiop@1'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/login', {
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            user.data.user['accessToken'] = user.data.serviceToken;
            return user.data.user;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('https://lawonearth.co.uk/api/auth/core/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
*/