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
    title: "Integrações com IA",
    description: "Ajudamos você a utilizar ferramentas de IA como ChatGPT para tarefas simples do dia a dia, criando assistentes básicos que ajudam em tarefas repetitivas.",
    badges: ["ChatGPT", "Automação", "Prompts"],
    features: ["Suporte ao cliente", "Criação de conteúdo simples", "Rascunhos de documentos"],
  },
  {
    icon: <Database className="w-10 h-10" />,
    title: "Gestão de Dados Básica",
    description: "Organizamos seus dados em sistemas simples que facilitam a visualização e interpretação, ajudando a tomar decisões mais embasadas e estratégicas.",
    badges: ["Excel", "Relatórios", "Dashboards"],
    features: ["Planilhas organizadas", "Relatórios mensais", "Visualizações simples"],
  },
  {
    icon: <Bot className="w-10 h-10" />,
    title: "Automação de Tarefas",
    description: "Criamos pequenas automações para tarefas repetitivas que consomem o tempo da sua equipe, permitindo foco em atividades que realmente importam.",
    badges: ["Scripts", "Automação", "Processos"],
    features: ["Automação de emails", "Preenchimento de formulários", "Geração de relatórios"],
  },
  {
    icon: <Anchor className="w-10 h-10" />,
    title: "Soluções para Pequenas Empresas",
    description: "Ferramentas digitais especialmente desenvolvidas para pequenas empresas que desejam iniciar sua jornada de transformação digital com investimento acessível.",
    badges: ["PMEs", "Acessível", "Simples"],
    features: ["Sites institucionais", "Sistemas básicos de cadastro", "Controle de estoque"],
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "Desenvolvimento Web Básico",
    description: "Criamos websites e aplicações web simples e funcionais que atendem às necessidades do seu negócio, com foco em usabilidade e bom desempenho.",
    badges: ["Websites", "Landing Pages", "E-commerce"],
    features: ["Sites responsivos", "Formulários de contato", "Integração com redes sociais"],
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: "Análise de Dados Simplificada",
    description: "Transformamos dados da sua empresa em informações úteis através de relatórios e gráficos fáceis de entender, auxiliando em decisões importantes.",
    badges: ["Relatórios", "Gráficos", "Insights"],
    features: ["Visualização de vendas", "Análise de clientes", "Relatórios periódicos"],
  },
  {
    icon: <Workflow className="w-10 h-10" />,
    title: "Consultoria Digital",
    description: "Acompanhamos os primeiros passos da sua empresa no mundo digital, com suporte e orientação para implementar soluções tecnológicas de forma gradual.",
    badges: ["Orientação", "Planejamento", "Suporte"],
    features: ["Diagnóstico digital", "Plano de transformação", "Treinamento básico"],
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
            Nossas soluções acessíveis
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Tecnologia para Pequenos Negócios</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções tecnológicas simples e acessíveis para ajudar sua empresa a dar os primeiros passos no mundo digital.
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
