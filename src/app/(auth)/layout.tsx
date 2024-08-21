// PROJECT IMPORTS
import GuestGuard from 'utils/route-guard/GuestGuard';
import { ClerkProvider } from "@clerk/nextjs";

// ==============================|| AUTH LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider><GuestGuard>{children}</GuestGuard></ClerkProvider>;
}



/*import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import GuestGuard from 'utils/route-guard/GuestGuard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <GuestGuard>
          {children}
          </GuestGuard>
        </body>
      </html>
    </ClerkProvider>
  )
}
*/


