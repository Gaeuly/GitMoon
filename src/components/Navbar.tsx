import { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, UploadCloud, Smartphone } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { HomeIcon } from './icons/HomeIcon';
import { CommitIcon } from './icons/CommitIcon';
import { ReadmeIcon } from './icons/ReadmeIcon';
import { ChangelogIcon } from './icons/ChangelogIcon';
import { DiscordIcon } from './icons/DiscordIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Commit & Push', path: '/commit', icon: CommitIcon },
    { name: 'README Generator', path: '/readme', icon: ReadmeIcon },
    { name: 'Changelog AI', path: '/changelog', icon: ChangelogIcon },
    { name: 'Upload ZIP', path: '/upload-zip', icon: UploadCloud },
    { name: 'Responsive Checker', path: '/responsive-checker', icon: Smartphone }, 
    { name: 'Discord', path: 'https://discord.gg/your-invite', icon: DiscordIcon, external: true },
  ];
  
  const linkClass = "flex items-center gap-4 px-4 py-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200";
  const activeLinkClass = "bg-gray-700 text-white font-semibold";

  return (
    <>
      <header className="sticky top-0 z-30 w-full p-4 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-800">GitVeilcy</span>
            <img 
                src="/avatar.png" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-gray-300"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/e5e7eb/1f2937?text=G'; }}
            />
          </div>
        </div>
      </header>

      <Transition show={isOpen} as={Fragment}>
        <div className="relative z-40">
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/60" onClick={() => setIsOpen(false)} aria-hidden="true" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
            <div className="fixed inset-y-0 left-0 flex">
              <div className="w-screen max-w-xs bg-black text-white flex flex-col p-4">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-bold">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close menu">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-grow space-y-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return link.external ? (
                      <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <Icon className="w-6 h-6" />
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <NavLink key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? activeLinkClass : ''} ${linkClass}`}>
                        <Icon className="w-6 h-6" />
                        <span>{link.name}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}