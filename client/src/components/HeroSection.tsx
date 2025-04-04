import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { revealAnimation, staggeredReveal } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            {...revealAnimation}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforming businesses with <span className="text-accent">artificial intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              We develop custom AI and automation solutions to drive efficiency and innovation for your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div {...staggeredReveal(0)}>
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg"
                  asChild
                >
                  <a href="#contact">
                    Contact Us
                  </a>
                </Button>
              </motion.div>
              <motion.div {...staggeredReveal(0.1)}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-primary hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <a href="#services">
                    Explore Our Services
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            {...revealAnimation}
          >
            <img 
              src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="AI Technology Concept" 
              className="rounded-lg shadow-2xl w-full max-w-lg object-cover"
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
