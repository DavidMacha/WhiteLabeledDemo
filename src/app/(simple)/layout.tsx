// PROJECT IMPORTS
import SimpleLayout from 'layout/SimpleLayout';
//import { ClerkProvider } from "@clerk/nextjs";

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SimpleLayout>{children}</SimpleLayout>;
}
