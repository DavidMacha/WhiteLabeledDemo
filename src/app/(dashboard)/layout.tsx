// PROJECT IMPORTS
import DashboardLayout from 'layout/DashboardLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { ClerkProvider } from "@clerk/nextjs";
import { StreamVideoProvider } from "providers/StreamClientProvider";

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   <ClerkProvider>
    <AuthGuard>
      <DashboardLayout><StreamVideoProvider>{children}</StreamVideoProvider></DashboardLayout>
    </AuthGuard>
    </ClerkProvider>
  );
}
