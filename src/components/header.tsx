"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { ThemeToggler } from './theme-toggler';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return <header className={cn('fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5')}>
    <div className='container flex items-center justify-between'>
      <Link href='/' className='text-2xl font-bold tracking-tight'>
        Brahim<span className='text-destructive'>.Protfolio</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex items-center space-x-8'>
        {
          navItems.map((item) => (
            <Link key={item.name} href={item.href} className='text-sm font-medium transition-colors hover:text-primary'>{item.name}</Link>
          ))
        }
        <Button asChild>
          <Link href='/resume'>Resume</Link>
        </Button>
        <ThemeToggler />
      </nav>

      {/* Mobile Menu Button */}
      <Button variant='ghost' size='icon' className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {
          mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />
        }
        <span className='sr-only'>Toggle Menu</span>
      </Button>

      {/* Mobile Navigation */}
      {
        mobileMenuOpen && (
          <nav className='md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md p-4 border-b shadow-lg'>
            <div className='flex flex-col space-y-4'>
              {
                navItems.map((item) => (
                  <Link key={item.name} href={item.href} className='text-sm font-medium py-2 transition-colors hover:text-primary' onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
                ))
              }
              <Button className='w-full' asChild>
                <Link href='/resume'>Resume</Link>
              </Button>
            </div>
          </nav>
        )
      }
    </div>
  </header>;
}
