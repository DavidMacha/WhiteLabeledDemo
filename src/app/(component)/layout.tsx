// PROJECT IMPORTS
import ComponentLayout from 'layout/ComponentLayout';
import { ClerkProvider } from "@clerk/nextjs";

// ==============================|| COMPONENT - LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider><ComponentLayout>{children}</ComponentLayout></ClerkProvider>;
}
