import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Clock, HeartHandshake } from "lucide-react";

const stats = [
  { 
    value: "2+", 
    label: "Anos de Experiência",
    icon: <Clock className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "30+", 
    label: "Projetos Concluídos",
    icon: <CheckCircle className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "20+", 
    label: "Clientes Atendidos",
    icon: <HeartHandshake className="w-5 h-5 text-primary-400" />
  },
  { 
    value: "Seg-Sex", 
    label: "Atendimento Comercial",
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
                  <span className="font-mono text-xs text-white">Soluções Digitais</span>
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
                A Nova Forge foi criada para atender pequenas e médias empresas que desejam dar seus primeiros passos no mundo digital com soluções acessíveis e práticas.
              </p>
              <p>
                Nossa equipe combina conhecimentos em <span className="text-primary-400 font-medium">tecnologias digitais</span>, <span className="text-primary-400 font-medium">desenvolvimento web</span> e <span className="text-primary-400 font-medium">ferramentas de produtividade</span> para criar soluções simples que resolvem problemas reais do dia a dia das empresas.
              </p>
              <p>
                Entendemos que cada negócio tem seu próprio ritmo de adaptação tecnológica. Por isso, oferecemos um acompanhamento personalizado, começando com pequenos passos que trazem resultados concretos e construindo gradualmente conforme sua empresa evolui.
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
