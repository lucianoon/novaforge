import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Zap, Shield, Smile, TrendingUp, Cpu, BrainCircuit,
  Lock, LineChart, Network, CloudCog, Compass, Sparkles 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    icon: <BrainCircuit className="w-10 h-10" />,
    title: "Primeiros passos com IA",
    description: "Ajudamos você a entender e começar a utilizar ferramentas de IA como ChatGPT para melhorar gradualmente seus processos de negócio."
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Soluções práticas",
    description: "Desenvolvemos ferramentas simples e práticas que trazem resultados reais e imediatos para o dia a dia da sua empresa."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Segurança básica",
    description: "Implementamos práticas essenciais de segurança digital para proteger os dados da sua empresa contra os riscos mais comuns."
  },
  {
    icon: <CloudCog className="w-10 h-10" />,
    title: "Recursos na nuvem",
    description: "Utilizamos serviços em nuvem acessíveis para pequenas empresas, eliminando a necessidade de grandes investimentos em infraestrutura."
  },
  {
    icon: <Network className="w-10 h-10" />,
    title: "Conexão de sistemas",
    description: "Ajudamos a conectar seus diferentes sistemas e planilhas para reduzir a duplicação de trabalho e organizar suas informações."
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: "Visualização de dados",
    description: "Criamos relatórios e gráficos simples que ajudam a entender melhor o desempenho do seu negócio e tomar decisões mais informadas."
  },
  {
    icon: <Compass className="w-10 h-10" />,
    title: "Foco no essencial",
    description: "Priorizamos o que realmente importa para seu negócio, implementando soluções que resolvem problemas concretos do seu dia a dia."
  },
  {
    icon: <Cpu className="w-10 h-10" />,
    title: "Automação simples",
    description: "Automatizamos tarefas repetitivas básicas para economizar tempo da sua equipe, começando pelas que trazem benefícios imediatos."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-zinc-900 relative">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-30">
          <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-700/20 rounded-full filter blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <Badge variant="outline" className="bg-primary-900/20 border-primary-700 text-primary-400 mb-4">
            Por que nos escolher
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="relative inline-block">
              <span className="relative z-10">Vantagens da Nova Forge</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary-500/20 -z-1 transform -rotate-1"></span>
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos um caminho gradual e acessível para empresas que desejam iniciar sua jornada digital com soluções simples e eficazes.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          {...staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="group relative bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 overflow-hidden"
              variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-primary-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary-600/10 rounded-full blur-xl"></div>
                <div className="w-16 h-16 bg-primary-900 border border-primary-700 rounded-xl flex items-center justify-center relative z-10 text-primary-400">
                  {benefit.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors duration-200">
                {benefit.title}
              </h3>
              
              <p className="text-gray-300 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-16">
          <motion.div 
            className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 flex items-center gap-4 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-3 bg-primary-900 rounded-full text-primary-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-white text-sm">
              <span className="font-semibold">Conversa inicial gratuita:</span> Vamos conhecer seu negócio e entender juntos quais são os primeiros passos possíveis para sua jornada digital.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
