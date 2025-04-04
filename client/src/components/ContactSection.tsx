import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

// Extend the schema with validation rules
const contactFormSchema = insertContactFormSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };
  
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-accent" />,
      title: "Phone",
      content: "(555) 123-4567"
    },
    {
      icon: <Mail className="w-6 h-6 text-accent" />,
      title: "Email",
      content: "contact@novaforge.com"
    },
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: "Address",
      content: "123 Innovation Ave, Tech City"
    }
  ];
  
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div {...revealAnimation}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Get in touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're ready to help transform your company with cutting-edge technology solutions. Fill out the form to start a conversation.
              </p>
              
              <motion.div 
                className="space-y-6"
                {...staggerContainer}
              >
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={staggerItem}
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="mt-1 text-gray-600">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div className="pt-4" variants={staggerItem}>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Social Media</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      <span className="sr-only">Twitter</span>
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div {...revealAnimation}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="mb-6">
                  <Label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your name"
                    className={form.formState.errors.name ? "border-red-500" : ""}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    className={form.formState.errors.email ? "border-red-500" : ""}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="company" className="block text-gray-700 font-medium mb-2">Company</Label>
                  <Input
                    id="company"
                    {...form.register("company")}
                    placeholder="Your company name"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    {...form.register("message")}
                    placeholder="How can we help?"
                    className={form.formState.errors.message ? "border-red-500" : ""}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
