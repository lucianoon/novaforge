import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { revealAnimation, cardHoverAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { Lightbulb, Code, RefreshCw } from "lucide-react";

const services = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "AI Solutions",
    description: "We develop and implement custom artificial intelligence solutions to automate processes, analyze data, and make intelligent decisions.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Software Development",
    description: "We create tailor-made software to meet your business's specific needs, from web and mobile applications to complex management systems.",
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-primary" />,
    title: "Process Automation",
    description: "We optimize your workflows through the automation of repetitive processes, freeing your team to focus on strategic activities.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a complete range of technological solutions to boost your company's growth and efficiency.
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
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary">{service.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
