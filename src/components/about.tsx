import { Download } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

import ProfileImage from '@/assets/profile.png';

export function About() {
  return <section id="about" className='py-20 bg-muted/50'>
    <div className='container'>
      <div className='flex flex-col md:flex-row gap-12 items-center'>
        <div className='md:w-1/2 flex justify-center'>
          <div className='relative'>
            <div className='w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-primary/10 shadow-xl'>
              <Image src={ProfileImage} alt='Profile picture' width={320} height={320} className='object-cover' />
            </div>
            <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent opacity-70'></div>
          </div>
        </div>

        <div className='md:w-1/2 space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>About Me</h2>
            <div className='w-20 h-1 bg-primary rounded'></div>
          </div>

          <p className='text-muted-foreground'>
            Hello! I am Brahim SADIK, a passionate web developer with about 5 years of experience in creating beautiful, functional websites and applications. <br />
            I specialize in both front-end and back-end developement with expertise in React, Next.js, Node.js, Deno, and modern CSS frameworks.
          </p>

          <p className='text-muted-foreground'>
            My journey in web development began during my third year in the National School of Applied Sciences, where I discovered my passion for creating digital experiences. <br />
            Since then, I have been working with different technologies and growing my skills by building different projects.
          </p>

          <p className='text-muted-foreground'>
            When I am not coding nor working, you can find me watching some youtube entertainment videos (coding, game develepment, anime ...), reading some book, or experimenting with new technologies. <br />
            I believe in continuous learning and stying updated with the latest trends in web development and also in all other aspects of life.
          </p>

          <div className='pt-4'>
            <Button className='gap-2'>
              <Download className='h-4 w-4' /> Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
}
