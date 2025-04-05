import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { revealAnimation, staggeredReveal } from "@/lib/animations";
import { Brain, Cpu, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-zinc-950 to-primary-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1 lg:col-span-7"
            {...revealAnimation}
          >
            <div className="flex items-center gap-2 mb-4 bg-primary-900/50 w-fit px-4 py-2 rounded-full border border-primary-700/50">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-medium text-primary-200">Impulsionando o futuro com IA avançada</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Revolucionando empresas com <span className="text-primary-400">inteligência artificial</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Criamos soluções personalizadas de IA, automação e software empresarial que impulsionam eficiência, inovação e crescimento para o seu negócio.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                <div className="bg-primary-800 p-1.5 rounded-md">
                  <Brain className="w-4 h-4 text-primary-300" />
                </div>
                <span>IA Generativa</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                <div className="bg-primary-800 p-1.5 rounded-md">
                  <Cpu className="w-4 h-4 text-primary-300" />
                </div>
                <span>Automação Avançada</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                <div className="bg-primary-800 p-1.5 rounded-md">
                  <Sparkles className="w-4 h-4 text-primary-300" />
                </div>
                <span>Soluções Empresariais</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div {...staggeredReveal(0)}>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
                  asChild
                >
                  <a href="#contact">
                    Fale Conosco
                  </a>
                </Button>
              </motion.div>
              <motion.div {...staggeredReveal(0.1)}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-primary-500 text-white hover:bg-primary-900/50 font-semibold"
                  asChild
                >
                  <a href="#services">
                    Conheça Nossos Serviços
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
            {...revealAnimation}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-blue-600/20 rounded-2xl blur-md"></div>
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Conceito de Inteligência Artificial Avançada" 
                className="rounded-2xl shadow-2xl w-full max-w-lg object-cover relative z-10 border border-primary-700/50"
                width="600"
                height="400"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-800/90 p-4 rounded-xl shadow-lg border border-primary-700 backdrop-blur-sm z-20">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-primary-100">IA em Tempo Real</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Glassmorphism divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent"></div>
    </section>
  );
}
