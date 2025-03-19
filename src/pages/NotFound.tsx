
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container-custom py-20">
        <div className="max-w-lg mx-auto text-center animate-fade-up">
          <h1 className="heading-xl mb-6">404</h1>
          <p className="subtitle-lg mb-12">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button size="lg" asChild className="animate-fade-up stagger-delay-1">
            <a href="/" className="inline-flex items-center">
              <Home size={18} className="mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
