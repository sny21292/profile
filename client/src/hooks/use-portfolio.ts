import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { projects, skills } from "@/data/portfolio-data";

// Projects Hook - uses static data
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => projects,
    staleTime: Infinity, // Static data never goes stale
  });
}

// Skills Hook - uses static data
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => skills,
    staleTime: Infinity, // Static data never goes stale
  });
}

// Contact Form Hook
export function useContactForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      // For now, just simulate success since we don't have a backend
      // You can integrate with a service like Formspree, EmailJS, or Netlify Forms
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: 1, ...data, createdAt: new Date().toISOString() };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
