import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, MapPin, Mail, Github, Linkedin, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";

import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBar } from "@/components/SkillBar";
import { useProjects, useSkills, useContactForm } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const contactMutation = useContactForm();

  // Filter state for portfolio
  const [filter, setFilter] = useState("All");
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Form Setup
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  // Unique categories for filtering
  const categories = ["All", ...new Set(projects?.map(p => p.category) || [])];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects?.filter(p => p.category === filter);

  // Group skills by category
  const skillCategories = skills ? [...new Set(skills.map(s => s.category))] : [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Welcome</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              I'm <span className="text-gradient">Sunil Kumar</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
              Full-Stack Developer | <span className="text-foreground font-medium">7 Years Exp.</span>
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Crafting scalable web solutions with expertise in Laravel, Shopify, and modern JavaScript frameworks. Based in Mandi, HP.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <ScrollLink to="portfolio" smooth={true} offset={-80}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25">
                  View Portfolio
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} offset={-80}>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5">
                  Get in Touch
                </Button>
              </ScrollLink>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-6 mt-12">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={24} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={24} /></a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-pulse blur-xl" />
              {/* Profile Image Placeholder - using a gradient/abstract shape for now as no image provided */}
              <div className="absolute inset-4 bg-secondary/50 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-9xl font-display font-bold opacity-10">SK</span>
              </div>
              
              {/* Floating tech badges */}
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 p-4 glass rounded-2xl shadow-xl"
              >
                <SiIcons.SiLaravel className="w-8 h-8 text-red-500" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 p-4 glass rounded-2xl shadow-xl"
              >
                <SiIcons.SiReact className="w-8 h-8 text-blue-400" />
              </motion.div>

              <motion.div 
                animate={{ x: [0, 15, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-4 p-4 glass rounded-2xl shadow-xl"
              >
                <SiIcons.SiShopify className="w-8 h-8 text-green-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-bold mb-6">
              About <span className="text-primary">Me</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              With over 7 years of hands-on experience in web development, I have specialized in building robust, scalable applications using PHP, Laravel, and WordPress. Recently, I've expanded my stack to include the modern React ecosystem, mastering Next.js and Node.js to deliver blazing-fast, SEO-optimized user experiences.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="mt-8 flex justify-center items-center gap-2 text-primary font-medium">
              <MapPin size={20} />
              <span>Mandi, Himachal Pradesh, India</span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { label: "Experience", value: "7+ Years" },
              { label: "Projects", value: "50+" },
              { label: "Clients", value: "30+" },
              { label: "Coffees", value: "∞" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card text-center"
              >
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of my recent work across different technologies and industries.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-secondary/50 animate-pulse" />
              ))
            ) : filteredProjects?.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No projects found in this category.
              </div>
            ) : (
              filteredProjects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Technical <span className="text-primary">Proficiency</span></h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                My journey started with PHP & WordPress, evolving into complex Laravel systems. 
                Currently, I'm diving deep into the React ecosystem to build modern, high-performance web applications.
              </p>
              
              <div className="p-8 rounded-3xl glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <SiIcons.SiReact className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-bold mb-4">Currently Learning</h3>
                <ul className="space-y-4">
                  {[
                    { name: "Next.js 14 (App Router)", icon: <SiIcons.SiNextdotjs /> },
                    { name: "React Server Components", icon: <SiIcons.SiReact /> },
                    { name: "Advanced Node.js Patterns", icon: <SiIcons.SiNodedotjs /> },
                    { name: "TypeScript Strict Mode", icon: <SiIcons.SiTypescript /> }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="p-2 rounded-lg bg-white/5 text-primary">{item.icon}</span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <Tabs defaultValue={skillCategories[0] || "Frontend"} className="w-full">
                <TabsList className="w-full mb-8 bg-secondary/50 p-1 h-auto flex-wrap justify-start gap-1">
                  {skillCategories.map((cat) => (
                    <TabsTrigger 
                      key={cat} 
                      value={cat}
                      className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {skillsLoading ? (
                  <div className="space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : (
                  skillCategories.map((cat) => (
                    <TabsContent key={cat} value={cat}>
                      <div className="bg-card rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl">
                        {skills
                          ?.filter(s => s.category === cat)
                          .sort((a, b) => b.proficiency - a.proficiency)
                          .map((skill, idx) => (
                            <SkillBar key={skill.id} skill={skill} index={idx} />
                          ))
                        }
                      </div>
                    </TabsContent>
                  ))
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Let's Work <span className="text-primary">Together</span></h2>
              <p className="text-muted-foreground">
                Have a project in mind or want to discuss modern web technologies? Drop me a message!
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="bg-secondary/50 border-white/10 h-12 focus:border-primary/50 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            {...field} 
                            className="bg-secondary/50 border-white/10 h-12 focus:border-primary/50 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="bg-secondary/50 border-white/10 min-h-[150px] focus:border-primary/50 transition-colors resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-600 hover:opacity-90 transition-opacity"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sunil Kumar. Built with React, Tailwind & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Import hack for si icons (dynamic require workaround)
import * as SiIcons from "react-icons/si";
