import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { revealAnimation, cardHoverAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Brain, Code, RefreshCw, BarChart3, Bot, Scissors,
  DollarSign, Lightbulb, Database, 
  LineChart, Workflow, ThumbsUp, Anchor
} from "lucide-react";

const services = [
  {
    icon: <Workflow className="w-10 h-10" />,
    title: "Soluções para Hotelaria",
    description: "Sistemas de gestão para pousadas e hotéis que facilitam reservas, check-in/check-out e gerenciamento de quartos, elevando a experiência dos hóspedes.",
    badges: ["Pousadas", "Hotéis", "Reservas"],
    features: ["Sistema de reservas online", "Gestão de ocupação", "Avaliações de hóspedes"],
  },
  {
    icon: <Brain className="w-10 h-10" />,
    title: "Clínicas Médicas",
    description: "Ferramentas digitais para otimizar a agenda de consultas, prontuários de pacientes e relacionamento com convênios, reduzindo a burocracia do dia a dia.",
    badges: ["Agendamento", "Prontuário", "Pacientes"],
    features: ["Agenda médica digital", "Histórico de pacientes", "Lembretes automáticos"],
  },
  {
    icon: <Bot className="w-10 h-10" />,
    title: "Consultórios Odontológicos",
    description: "Soluções específicas para dentistas gerenciarem seus atendimentos, histórico de tratamentos e controle financeiro com facilidade e precisão.",
    badges: ["Odontologia", "Pacientes", "Tratamentos"],
    features: ["Agenda integrada", "Ficha odontológica digital", "Controle de procedimentos"],
  },
  {
    icon: <Scissors className="w-10 h-10" />,
    title: "Barbearias",
    description: "Sistemas para barbearias modernizarem seu atendimento com agendamento online, fidelização de clientes e controle financeiro simplificado.",
    badges: ["Agenda", "Clientes", "Serviços"],
    features: ["Reserva de horários online", "Histórico de clientes", "Cadastro de serviços"],
  },
  {
    icon: <Anchor className="w-10 h-10" />,
    title: "Oficinas Mecânicas",
    description: "Ferramentas para gerenciar ordens de serviço, peças, histórico de manutenção de veículos e comunicação eficiente com os clientes.",
    badges: ["Veículos", "Serviços", "Peças"],
    features: ["Ordens de serviço digitais", "Controle de estoque", "Histórico de manutenções"],
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: "Marketing Digital Local",
    description: "Estratégias de presença online para negócios locais serem encontrados facilmente por clientes na região, com foco em resultados práticos.",
    badges: ["SEO Local", "Google", "Redes Sociais"],
    features: ["Perfil Google Meu Negócio", "Presença nas redes sociais", "Avaliações online"],
  },
  {
    icon: <Database className="w-10 h-10" />,
    title: "Gestão de Relacionamento",
    description: "Sistemas simples para manter contato com clientes, entender suas preferências e criar ações de fidelização que geram retorno frequente.",
    badges: ["CRM", "Fidelização", "Comunicação"],
    features: ["Histórico de interações", "Campanhas por WhatsApp", "Aniversários e datas especiais"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-zinc-900 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-600/10 filter blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-600/10 filter blur-[80px] rounded-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <Badge variant="outline" className="text-primary-400 border-primary-700 bg-primary-900/30 mb-4">
            Soluções por segmento
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Especialistas em negócios locais</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desenvolvemos sistemas personalizados para as necessidades específicas de pousadas, clínicas, barbearias e oficinas, resolvendo problemas reais do seu negócio.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={staggerItem}
              {...cardHoverAnimation}
            >
              <Card className="h-full bg-zinc-800/80 border-zinc-700 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full filter blur-xl -translate-y-1/2 translate-x-1/2"></div>
                
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-primary-900 rounded-lg flex items-center justify-center mb-4 border border-primary-700 shadow-lg text-primary-400">
                      {service.icon}
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {service.badges.map((badge, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary-900/50 text-primary-300 border-primary-800 text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <p className="text-gray-300 mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <ThumbsUp className="w-4 h-4 text-primary-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-primary-400 hover:text-primary-300 hover:bg-primary-900/50"
                    asChild
                  >
                    <a href="#contact">
                      Saiba mais
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
