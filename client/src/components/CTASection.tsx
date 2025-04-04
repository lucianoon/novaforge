import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { revealAnimation } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-800 to-secondary-400 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          {...revealAnimation}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Contact us today and discover how our solutions can boost your company's efficiency and growth.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 font-semibold shadow-lg"
            asChild
          >
            <a href="#contact">
              Speak with an expert
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
