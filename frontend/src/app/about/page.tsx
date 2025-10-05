'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Mail, Phone, Github, Linkedin, Sparkles, Rocket, Satellite, Globe, Cpu, Zap } from 'lucide-react';

const teamMembers = [
  { 
    name: 'Eyad Oumar', 
    email: 'eiadoumer14@gmail.com', 
    avatarId: 'team-eyad',
    role: 'AI Specialist',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Adem Hamizi', 
    email: 'ademhamizi2005@gmail.com', 
    avatarId: 'team-adem',
    role: 'Frontend Developer',
    icon: Satellite,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Abdulrahman Zaatari', 
    email: 'zaatariabdulrahman@gmail.com', 
    avatarId: 'team-abdulrahman',
    role: 'ML Engineer',
    icon: Rocket,
    color: 'from-orange-500 to-red-500'
  },
  { 
    name: 'Karim Kichly', 
    email: 'karim.kishly@gmail.com', 
    avatarId: 'team-karim',
    role: 'Backend Developer',
    icon: Globe,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Ayman Kacan', 
    email: 'aymanalmanar@gmail.com', 
    avatarId: 'team-ayman',
    role: 'ML Engineer',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    name: 'Mohammed Dayeh', 
    email: 'dayeh800@gmail.com', 
    avatarId: 'team-mohammed',
    role: 'Full Stack Developer',
    icon: Sparkles,
    color: 'from-indigo-500 to-purple-500'
  },
];

export default function AboutPage() {
    const logoImage = PlaceHolderImages.find(img => img.id === 'tm-logo-square');
    
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline text-center mb-6">
        About <span className="text-accent">Astro Boys</span>
      </h1>
      
      <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl text-center mb-12">
        A project by <span className="font-bold text-accent">Astro Boys</span> to revolutionize exoplanet discovery using AI.
      </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        
  {/* Team Members Section - One per row */}
  <Card className="lg:col-span-2">
    <CardHeader className="pb-4">
      <CardTitle className="font-headline">Our Team</CardTitle>
      <CardDescription>The brilliant minds behind the mission</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4">
        {teamMembers.map((member) => {
          const memberImage = PlaceHolderImages.find(img => img.id === member.avatarId);
          const IconComponent = member.icon;
          
          return (
            <div 
              key={member.name}
              className="group relative p-3 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
              
              {/* Animated Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
              
              <div className="relative flex items-center gap-3">
                {/* Avatar with Icon Badge */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-background group-hover:border-accent/30 transition-colors duration-300">
                    {memberImage && <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint} />}
                    <AvatarFallback className="text-base font-semibold bg-gradient-to-br from-muted to-muted/80">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border">
                    <IconComponent className="h-4 w-4 text-accent" />
                  </div>
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg truncate">{member.name}</p>
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href="#" className="text-muted-foreground hover:text-accent transition-colors p-1">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-accent transition-colors p-1">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-sm text-accent font-medium">{member.role}</p>
                  
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group/email truncate"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate group-hover/email:underline">{member.email}</span>
                  </a>
                </div>
              </div>

              {/* Hover Effect Lines */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent group-hover:w-full transition-all duration-500" />
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>

        {/* Logo and Contact Section */}
        <div className="flex flex-col gap-6 h-full">
          {/* Logo Card - Fits box with edge corners */}
          <Card className="flex-1 p-0 overflow-hidden">
            <CardContent className="p-0 h-full">
              {logoImage && (
                <div className="w-full h-full flex justify-center items-center p-1">
                  <Image
                    src={logoImage.imageUrl}
                    alt="Astro Boys Logo"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                    data-ai-hint={logoImage.imageHint}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline">Support & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">WhatsApp Support</h3>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-accent hover:underline text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Send a Message</h3>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="text-sm h-9"
                  />
                  <Textarea 
                    placeholder="Your message..." 
                    required 
                    className="text-sm min-h-[80px] resize-none"
                  />
                  <Button type="submit" className="w-full h-9 text-sm">Send Email</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}