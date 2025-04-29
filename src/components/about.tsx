"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

import ProfileImage from "@/assets/profile.png";
import Link from "next/link";
import { getAboutMeDescription } from "@/actions";
import { useEffect, useState } from "react";

export function About() {
  const [description, setDescription] = useState("");

  useEffect(() => {
    getAboutMeDescription().then(value => setDescription(value));
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-primary/10 shadow-xl">
                <Image
                  src={ProfileImage}
                  alt="Profile picture"
                  width={320}
                  height={320}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent opacity-70">
              </div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
              <div className="w-20 h-1 bg-primary rounded"></div>
            </div>

            {
              description ? description.split("|||").map((item: string) => (
                <div key={item} className="text-muted-foreground">
                  {
                    item.split("||").map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))
                  }
                </div>
              )) : <div>Loading ...</div>
            }

            <div className="pt-4">
              <Button className="gap-2" asChild>
                <Link
                  href="/Brahim SADIK's Resume.pdf"
                  download="Brahim SADIK's Resume.pdf"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
