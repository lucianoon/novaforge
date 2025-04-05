import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Clock, HeartHandshake } from "lucide-react";

const stats = [
  { 
    value: "5+", 
    label: "Anos de Experiência",
    icon: <Clock className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "100+", 
    label: "Projetos Concluídos",
    icon: <CheckCircle className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "50+", 
    label: "Clientes Satisfeitos",
    icon: <HeartHandshake className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "24/7", 
    label: "Suporte Técnico",
    icon: <Star className="w-5 h-5 text-primary-400" />
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/3 top-0 w-1/3 h-1/3 bg-primary-900/30 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/3 bottom-0 w-1/3 h-1/3 bg-blue-900/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-5 relative"
            {...revealAnimation}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-blue-600/30 rounded-2xl blur-md transform -rotate-2"></div>
            <div className="bg-zinc-900 p-1.5 rounded-2xl border border-zinc-700 transform rotate-2 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Nossa equipe de tecnologia" 
                className="rounded-xl shadow-2xl"
                width="600"
                height="400"
              />
              
              <div className="absolute -bottom-5 -right-5 bg-zinc-800 border border-zinc-700 p-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                  <span className="font-mono text-xs text-white">AI-Powered Solutions</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-7"
            {...revealAnimation}
          >
            <Badge variant="outline" className="mb-4 bg-primary-900/20 text-primary-400 border-primary-700">
              Quem Somos
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Nova Forge</span></h2>
            
            <div className="text-lg text-gray-300 space-y-6">
              <p>
                A Nova Forge nasceu da paixão por tecnologia e da crença de que toda empresa merece acesso às soluções digitais mais avançadas, independentemente do tamanho ou setor.
              </p>
              <p>
                Nossa equipe é formada por especialistas em <span className="text-primary-400 font-medium">inteligência artificial</span>, <span className="text-primary-400 font-medium">desenvolvimento de software</span> e <span className="text-primary-400 font-medium">automação</span>, unidos pelo compromisso de entregar soluções que realmente fazem a diferença para nossos clientes.
              </p>
              <p>
                Utilizamos as mais recentes tecnologias como GPT-4o, modelos de visão computacional e aprendizado de máquina para criar soluções que não apenas resolvem problemas atuais, mas também preparam sua empresa para o futuro.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4"
                  variants={staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
