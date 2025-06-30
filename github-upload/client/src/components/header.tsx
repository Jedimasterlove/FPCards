import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
  backgroundColor?: string;
}

export function Header({ title, subtitle, showBackButton, onBackClick, children, backgroundColor }: HeaderProps) {
  const headerStyle = backgroundColor 
    ? { background: backgroundColor }
    : {};
  
  return (
    <div 
      className={backgroundColor ? "p-6 text-white" : "peace-gradient p-6 text-white"}
      style={headerStyle}
    >
      <div className="flex items-center">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 hover:bg-white/20 text-white"
            onClick={onBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        {title ? (
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold tracking-wider">FINDING</h1>
            <h2 className="text-3xl font-bold tracking-wider text-orange-200">PEACE</h2>
            <p className="text-sm font-light opacity-90">RELATIONSHIP BUILDING PLATFORM</p>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}
