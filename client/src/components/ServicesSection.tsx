import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { revealAnimation, cardHoverAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Brain, Code, RefreshCw, BarChart3, Bot, 
  DollarSign, Lightbulb, Database, 
  LineChart, Workflow, ThumbsUp, Anchor
} from "lucide-react";

const services = [
  {
    icon: <Brain className="w-10 h-10" />,
    title: "IA Generativa Avançada",
    description: "Construímos sistemas de IA personalizados com GPT-4o, Claude e outras tecnologias avançadas para automatizar processos, analisar dados e tomar decisões inteligentes.",
    badges: ["Transformadores", "GPT-4o", "RAG"],
    features: ["Análise de Sentimento", "Geração de Conteúdo", "Chatbots Inteligentes"],
  },
  {
    icon: <Database className="w-10 h-10" />,
    title: "Big Data & Analytics",
    description: "Extraímos insights valiosos de grandes volumes de dados com nossas ferramentas analíticas avançadas. Transforme dados em decisões de negócios estratégicas.",
    badges: ["Data Science", "Análise Preditiva", "BI"],
    features: ["Dashboards Interativos", "Relatórios Automatizados", "Previsões de Negócios"],
  },
  {
    icon: <Bot className="w-10 h-10" />,
    title: "Automação Cognitiva",
    description: "Implantamos robôs inteligentes e processos automatizados que aprendem e se adaptam, liberando sua equipe para focar em iniciativas estratégicas.",
    badges: ["RPA", "Machine Learning", "Automação"],
    features: ["Automação de Processos", "Chatbots", "Assistentes Virtuais"],
  },
  {
    icon: <Anchor className="w-10 h-10" />,
    title: "Tecnologia Offshore",
    description: "Soluções tecnológicas especializadas para empresas do setor offshore, incluindo sistemas de monitoramento, gestão de ativos e otimização de operações marítimas.",
    badges: ["Offshore", "Marítimo", "O&G"],
    features: ["Monitoramento Remoto", "Gestão de Ativos", "Otimização Operacional"],
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "Desenvolvimento Ágil",
    description: "Criamos software empresarial sob medida, desde aplicativos web e mobile até sistemas de gestão complexos com metodologias ágeis.",
    badges: ["SaaS", "API", "Microsserviços"],
    features: ["Desenvolvimento Web/Mobile", "Sistemas ERP", "Aplicações Cloud Native"],
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: "Inteligência de Negócios",
    description: "Transforme dados brutos em insights estratégicos com nossas ferramentas de BI, painéis interativos e relatórios personalizados.",
    badges: ["Visualização", "KPIs", "Dashboards"],
    features: ["Data Visualization", "ETL", "Relatórios Executivos"],
  },
  {
    icon: <Workflow className="w-10 h-10" />,
    title: "Transformação Digital",
    description: "Acompanhamos sua empresa em toda jornada de transformação digital, da estratégia à implementação e otimização contínua.",
    badges: ["Estratégia", "Inovação", "Otimização"],
    features: ["Consultoria Estratégica", "Reengenharia de Processos", "Treinamento"],
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
            Nossas soluções completas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Serviços de Tecnologia Avançada</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Desenvolvemos soluções tecnológicas completas para impulsionar o crescimento e a eficiência da sua empresa.
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
