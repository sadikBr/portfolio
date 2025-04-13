'use client';

import useTypeWriter from '@/hooks/useTypeWriter';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export function Hero() {
  const { typedText } = useTypeWriter(80);

  return <section className='relative pt-32 pb-20 md:pt-40 md:pb-32'>
    <div className='container flex flex-col items-center text-center'>
      <div className='absolute inset-0 -z-10 h-full w-full bg-background'>
        <div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary/20 opacity-50 blur-[80px]'></div>
      </div>

      <div className='space-y-2 mb-6'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
          Hello, I am <span className='text-destructive'>Brahim SADIK</span>
        </h1>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium h-12'>
          I am <span className='text-destructive'>{typedText}</span>
        </h2>
      </div>

      <p className='max-w-[600px] text-muted-foreground text-lg mb-8'>
        Crafting digital experiences with clean code and design. Passionate about building modern web applications that make an impact.
      </p>

      <div className='flex flex-col sm:flex-row gap-4 mb-12'>
        <Button size='lg' asChild>
          <Link href='#contact'>
            Contact Me <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <Link href='#projects'>
            View My Work
          </Link>
        </Button>
      </div>

      <div className='flex items-center gap-6'>
        <Link href='https://github.com' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
          <Github className='h-6 w-6' />
          <span className='sr-only'>GitHub</span>
        </Link>
        <Link href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
          <Linkedin className='h-6 w-6' />
          <span className='sr-only'>LinkedIn</span>
        </Link>
      </div>
    </div>
  </section>
}
