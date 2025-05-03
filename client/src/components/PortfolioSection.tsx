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
import { 
  Briefcase, TrendingUp, Award, BarChart3, Users, CheckCircle,
  Hotel, Stethoscope, Scissors, Wrench, MapPin, HeartPulse
} from "lucide-react";

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
      title: "Pousada Vista Mar",
      description: "Pousada à beira-mar com 15 quartos e acomodações personalizadas",
      industry: "Hotelaria",
      challenge: "Gerenciamento manual de reservas causava overbooking e conflitos de alocação, especialmente durante alta temporada.",
      solution: "Sistema integrado de reservas online com calendário visual, pagamento antecipado e gestão de ocupação em tempo real.",
      results: [
        "Eliminação de casos de overbooking",
        "Redução de 80% no tempo dedicado à gestão de reservas",
        "Aumento de 35% nas reservas diretas sem intermediários"
      ],
      icon: <Hotel className="w-10 h-10" />
    },
    {
      title: "Clínica Bem Estar",
      description: "Clínica médica com múltiplas especialidades e convênios",
      industry: "Saúde",
      challenge: "Alta taxa de faltas em consultas e dificuldade em gerenciar agenda com diferentes médicos e especialidades.",
      solution: "Sistema de agendamento integrado com lembretes automáticos via WhatsApp e confirmação simplificada pelo paciente.",
      results: [
        "Redução de 45% nas faltas às consultas",
        "Melhor aproveitamento da agenda dos médicos",
        "Aumento da satisfação dos pacientes com sistema de lembretes"
      ],
      icon: <Stethoscope className="w-10 h-10" />
    },
    {
      title: "Consultório Odontológico Dr. Santos",
      description: "Consultório com 3 dentistas e especialidades diversas",
      industry: "Odontologia",
      challenge: "Gerenciamento manual de fichas de pacientes, dificuldade em acompanhar tratamentos e cobranças pendentes.",
      solution: "Sistema digital de prontuário odontológico com registros de tratamentos, imagens e controle financeiro por paciente.",
      results: [
        "Recuperação de 40% em pagamentos pendentes",
        "Melhor acompanhamento de tratamentos longos",
        "Redução de 25% no tempo administrativo da equipe"
      ],
      icon: <HeartPulse className="w-10 h-10" />
    },
    {
      title: "Barbearia Vintage",
      description: "Barbearia moderna com 5 profissionais e serviços premium",
      industry: "Estética",
      challenge: "Gestão de agenda manual resultava em horários vazios e dificuldade de clientes agendarem com barbeiros específicos.",
      solution: "Aplicativo de agendamento online com perfil dos profissionais, histórico do cliente e sistema de fidelidade integrado.",
      results: [
        "Ocupação quase total da agenda em horários premium",
        "Redução de 90% em cancelamentos de última hora",
        "Aumento de 50% no ticket médio por cliente"
      ],
      icon: <Scissors className="w-10 h-10" />
    },
    {
      title: "AutoMecânica Silva",
      description: "Oficina mecânica familiar com foco em atendimento personalizado",
      industry: "Automotivo",
      challenge: "Controle de ordens de serviço em papel, dificuldade em encontrar histórico de veículos e perda de informações importantes.",
      solution: "Sistema digital de gerenciamento de ordens de serviço com registro fotográfico e histórico completo por veículo.",
      results: [
        "Acesso rápido ao histórico completo de cada veículo",
        "Melhor comunicação com clientes sobre status dos serviços",
        "Redução de 30% em retrabalhos por diagnósticos incompletos"
      ],
      icon: <Wrench className="w-10 h-10" />
    },
    {
      title: "Marketing Local Consultoria",
      description: "Consultoria especializada em presença digital para negócios locais",
      industry: "Marketing",
      challenge: "Empresas locais com dificuldade de competir com grandes redes e aparecer para clientes nas buscas da região.",
      solution: "Estratégia integrada de SEO local, gestão de perfil no Google Meu Negócio e sistema de incentivo a avaliações positivas.",
      results: [
        "Aumento médio de 85% nas buscas locais",
        "Crescimento de 4.3 para 4.8 na média de avaliações",
        "Domínio na primeira página para buscas locais relevantes"
      ],
      icon: <MapPin className="w-10 h-10" />
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
            Casos de Sucesso por Segmento
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Soluções para Negócios Locais</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça histórias reais de pousadas, clínicas, barbearias e oficinas que transformaram seus negócios com nossas soluções personalizadas.
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