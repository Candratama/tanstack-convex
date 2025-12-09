import { Link } from "@tanstack/react-router"
import { Button } from "~/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          SaaS Boilerplate
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}