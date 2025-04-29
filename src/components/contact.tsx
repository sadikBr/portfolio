"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle2 } from "lucide-react";
import { getContactInfo } from "@/actions";

import { DynamicIcon, IconName } from "lucide-react/dynamic";

type ContactInfo = {
  id: string;
  iconName: IconName;
  title: string;
  value: string;
  link: string;
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        const form = e.target as HTMLFormElement;
        form.reset();
      }, 5000);
    }, 1500);
  }

  useEffect(() => {
    getContactInfo().then(value => {
      setContactInfo(value.map(item => {
        return {
          ...item,
          iconName: item.iconName as IconName
        }
      }));
    })
  }, []);

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me using the
            form below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="text-muted-foreground">
              Feel free to reach out to me through any of these channels. I am always open to discussing new projects,
              creative ideas, or opportunities.
            </p>

            <div className="space-y-4 mt-8">
              {contactInfo.map((info) => (
                <a
                  key={info.id}
                  href={info.link}
                  target={info.title === "Location" ? "_blank" : undefined}
                  rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <DynamicIcon name={info.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send Me a Message</CardTitle>
              <CardDescription>Fill out the form below and I will get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for trying to reach out. This form is not functional at the moment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Subject of your message" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>

                    <Textarea id="message" placeholder="Your message" rows={5} required />
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-current border-r-transparent animate-spin rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
