import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { revealAnimation } from "@/lib/animations";
import type { Variants } from "framer-motion";

// Define animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
import { Briefcase, TrendingUp, Award, BarChart3, Users, CheckCircle } from "lucide-react";

type PortfolioItem = {
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  icon: React.ReactNode;
};

export default function PortfolioSection() {
  const portfolioItems: PortfolioItem[] = [
    {
      title: "TechMarine Serviços Offshore",
      description: "Empresa de manutenção de equipamentos marítimos",
      industry: "Indústria Naval",
      challenge: "Processos de manutenção manual com planilhas e dificuldade para acompanhar o histórico de equipamentos.",
      solution: "Sistema básico de registro digital para manutenções com alertas simples para revisões programadas.",
      results: [
        "Melhor organização do histórico de manutenções",
        "Redução de esquecimentos em revisões programadas",
        "Primeiros passos para análise de dados de manutenção"
      ],
      icon: <Briefcase className="w-10 h-10" />
    },
    {
      title: "PixelGrow Marketing Digital",
      description: "Agência de marketing digital para pequenas empresas",
      industry: "Marketing Digital",
      challenge: "Dificuldade em organizar resultados de campanhas e apresentar dados para os clientes de forma clara.",
      solution: "Dashboard simples para visualização de métricas básicas e geração de relatórios mensais automatizados.",
      results: [
        "Melhor visualização dos resultados para clientes",
        "Economia de tempo na geração de relatórios",
        "Base para futuras análises mais detalhadas"
      ],
      icon: <TrendingUp className="w-10 h-10" />
    },
    {
      title: "AutoClinic Serviços Automotivos",
      description: "Oficina mecânica de bairro com atendimento personalizado",
      industry: "Automotivo",
      challenge: "Controle de agendamentos em papel e dificuldade em manter histórico de clientes e veículos.",
      solution: "Sistema simples de agendamento digital e cadastro de clientes com histórico de serviços.",
      results: [
        "Redução de conflitos de horários",
        "Histórico de serviços por veículo facilmente acessível",
        "Melhoria na comunicação com clientes via notificações"
      ],
      icon: <Award className="w-10 h-10" />
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-primary-900/10 filter blur-[100px] transform translate-x-1/4 rounded-full"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-blue-900/10 filter blur-[100px] transform -translate-x-1/4 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-primary-900/20 text-primary-400 border-primary-700 mb-4">
            Casos de Sucesso
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Primeiros Passos Digitais</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça alguns casos de empresas que iniciaram sua jornada digital com nosso apoio nesse momento desafiador.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              className="relative group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-blue-900/20 filter blur-md rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 shadow-xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-primary-900/50 rounded-lg text-primary-400">
                    {item.icon}
                  </div>
                  <Badge className="bg-zinc-700/70 text-gray-300 border-zinc-600">
                    {item.industry}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
                
                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" /> Desafio
                    </h4>
                    <p className="text-gray-300 text-sm">{item.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4" /> Nossa Solução
                    </h4>
                    <p className="text-gray-300 text-sm">{item.solution}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-primary-400 flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4" /> Resultados Alcançados
                  </h4>
                  <ul className="space-y-2">
                    {item.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mt-6 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}