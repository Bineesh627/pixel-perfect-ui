import { Outlet } from 'react-router-dom';
import { UserNavbar } from './UserNavbar';

export function UserLayout() {
  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 TruthGuard. Helping you identify misinformation.</p>
        </div>
      </footer>
    </div>
  );
}
