import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { revealAnimation, cardHoverAnimation, staggerContainer, staggerItem } from "@/lib/animations";

const testimonials = [
  {
    content: "A Nova Forge nos ajudou a começar nossa jornada com análise de dados. O sistema que eles desenvolveram é simples e nos ajuda a entender melhor nossos clientes. Estamos aprendendo juntos nesse novo caminho.",
    author: "Ricardo Martins",
    position: "Gerente de Projetos, TechBrasil",
    initials: "RM",
    rating: 5,
    industry: "Tecnologia"
  },
  {
    content: "Estamos dando os primeiros passos com automação de processos e a Nova Forge tem sido uma parceira paciente. Reduzimos alguns erros manuais e estamos animados com as possibilidades futuras.",
    author: "Ana Luiza Silva",
    position: "Coordenadora, DataInsight",
    initials: "AS",
    rating: 4,
    industry: "Análise de Dados"
  },
  {
    content: "A Nova Forge nos ajudou a implementar um sistema simples para atendimento online. É um começo importante para melhorarmos nossa comunicação com os clientes nesse momento desafiador.",
    author: "Miguel Oliveira",
    position: "Analista de Marketing, InovaBrasil",
    initials: "MO",
    rating: 5,
    industry: "Marketing"
  },
  {
    content: "Nossa pequena empresa deu os primeiros passos na digitalização com ajuda da Nova Forge. O processo foi gradual e educativo, permitindo que nossa equipe se adaptasse às mudanças sem grandes traumas.",
    author: "Carolina Mendes",
    position: "Proprietária, Loja Horizonte",
    initials: "CM",
    rating: 4,
    industry: "Varejo"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 relative">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-primary-600/10 filter blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <Badge variant="outline" className="mb-4 bg-primary-900/20 text-primary-400 border-primary-700">
            Depoimentos
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é nossa maior recompensa. Veja o que eles têm a dizer sobre nossas soluções.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          {...staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={staggerItem}
              {...cardHoverAnimation}
            >
              <Card className="h-full bg-zinc-800/70 border-zinc-700 overflow-hidden relative backdrop-blur-sm">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full filter blur-xl -translate-y-1/2 translate-x-1/2"></div>
                
                <CardContent className="pt-8 relative">
                  <div className="absolute -top-6 left-6">
                    <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center border border-primary-700 shadow-lg">
                      <Quote className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4 justify-between">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs bg-primary-900/30 border-primary-800 text-primary-300">
                      {testimonial.industry}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
                
                <CardFooter className="border-t border-zinc-700/50 pt-4">
                  <div className="flex items-center w-full">
                    <div className="mr-4">
                      <Avatar className="h-12 w-12 border-2 border-primary-700">
                        <AvatarFallback className="bg-primary-900 text-primary-200 font-bold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.author}</h4>
                      <p className="text-gray-400 text-xs">{testimonial.position}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-primary-300 font-semibold">
            Junte-se às empresas que estão dando os primeiros passos rumo à transformação digital
          </p>
        </motion.div>
      </div>
    </section>
  );
}
