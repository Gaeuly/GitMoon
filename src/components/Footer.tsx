import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} GitVeilcy. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}