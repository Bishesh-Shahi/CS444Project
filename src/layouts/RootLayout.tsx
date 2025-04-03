import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              Arboretum Explorer
            </Link>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-primary-100">
                About
              </Link>
              <Link to="/plants" className="hover:text-primary-100">
                Plants
              </Link>
              <Link to="/locations" className="hover:text-primary-100">
                Locations
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t bg-background py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Arboretum Explorer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
