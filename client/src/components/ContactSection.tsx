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
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Send, MessageSquare, Sparkles, BrainCircuit, Rocket } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

// Extend the schema with validation rules
const contactFormSchema = insertContactFormSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, informe um email válido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres")
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
        title: "Mensagem enviada",
        description: "Entraremos em contato o mais breve possível.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };
  
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary-400" />,
      title: "Telefone",
      content: "(11) 1234-5678"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary-400" />,
      title: "Email",
      content: "contato@novaforge.com.br"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-400" />,
      title: "Endereço",
      content: "Av. Paulista, 1000 - São Paulo, SP"
    }
  ];
  
  const solutions = [
    {
      icon: <BrainCircuit className="w-5 h-5" />,
      title: "Soluções de IA"
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Automação Empresarial"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Transformação Digital"
    }
  ];
  
  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-primary-900/10 filter blur-[100px] transform -translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-blue-900/10 filter blur-[100px] transform translate-x-1/4 translate-y-1/4 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-primary-900/20 text-primary-400 border-primary-700 mb-4">
            Vamos Conversar
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Entre em Contato</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para ajudar a transformar sua empresa com soluções tecnológicas de ponta. 
            Preencha o formulário para iniciar uma conversa.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="lg:order-2"
              {...revealAnimation}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-blue-900/20 filter blur-md rounded-2xl"></div>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="relative bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 shadow-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="block text-white font-medium mb-2">Nome completo</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        placeholder="Seu nome"
                        className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-primary-500 focus:ring-primary-500 ${form.formState.errors.name ? "border-red-500" : ""}`}
                      />
                      {form.formState.errors.name && (
                        <p className="mt-1 text-sm text-red-400">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="block text-white font-medium mb-2">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="seu.email@exemplo.com"
                        className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-primary-500 focus:ring-primary-500 ${form.formState.errors.email ? "border-red-500" : ""}`}
                      />
                      {form.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-400">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <Label htmlFor="phone" className="block text-white font-medium mb-2">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder="(11) 98765-4321"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company" className="block text-white font-medium mb-2">Empresa</Label>
                      <Input
                        id="company"
                        {...form.register("company")}
                        placeholder="Nome da sua empresa"
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="message" className="block text-white font-medium mb-2">Mensagem</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      {...form.register("message")}
                      placeholder="Como podemos ajudar sua empresa?"
                      className={`bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-primary-500 focus:ring-primary-500 ${form.formState.errors.message ? "border-red-500" : ""}`}
                    />
                    {form.formState.errors.message && (
                      <p className="mt-1 text-sm text-red-400">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar mensagem</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:order-1 space-y-8"
              {...revealAnimation}
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Como podemos ajudar</h3>
                <p className="text-lg text-gray-300 mb-8">
                  Nossa equipe de especialistas está pronta para entender suas necessidades e desenvolver soluções personalizadas que impulsionem sua empresa para o próximo nível.
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {solutions.map((solution, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 bg-primary-900/20 border border-primary-800/50 rounded-lg py-3 px-4 text-white"
                    >
                      <div className="p-2 bg-primary-900 rounded-md text-primary-400">
                        {solution.icon}
                      </div>
                      <span>{solution.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="space-y-6"
                {...staggerContainer}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Informações de Contato</h3>
                
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4"
                    variants={staggerItem}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex-shrink-0 p-2 bg-primary-900 rounded-md">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="mt-1 text-gray-300">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div className="pt-6" variants={staggerItem}>
                  <h3 className="text-lg font-medium text-white mb-3">Redes Sociais</h3>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/novaforge_rj/" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-900/50 border border-primary-800 rounded-lg text-primary-400 hover:bg-primary-800 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
