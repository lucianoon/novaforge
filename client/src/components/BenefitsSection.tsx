import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";
import { Zap, Shield, Smile, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "High Performance",
    description: "Our solutions are designed to offer exceptional speed and efficiency, significantly improving your processes."
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Guaranteed Security",
    description: "We implement best security practices to protect your data and systems against external threats."
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    title: "User Experience",
    description: "We create intuitive and pleasant interfaces that provide an exceptional experience for your users."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Scalability",
    description: "Our solutions grow with your business, easily adapting to new demands and work volumes."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Nova Forge?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine technical expertise with a deep understanding of business challenges to deliver solutions that truly matter.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          {...staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-6"
              variants={staggerItem}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">{benefit.title}</h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
