import { Home, Search, Bookmark, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function BottomNav() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Bookmark, label: "Saved", path: "/saved" },
    { icon: User, label: "Profile", path: "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Button
            key={path}
            variant="ghost"
            className={`flex flex-col items-center py-2 px-3 h-auto transition-colors ${
              location === path ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
            }`}
            onClick={() => setLocation(path)}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
