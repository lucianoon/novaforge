import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { revealAnimation, cardHoverAnimation, staggerContainer, staggerItem } from "@/lib/animations";

const testimonials = [
  {
    content: "The automation solution developed by Nova Forge reduced our processing time by 70% and virtually eliminated all manual errors. An investment that paid for itself in a few months.",
    author: "Richard Carter",
    position: "Operations Director, TechSolutions",
    initials: "RC"
  },
  {
    content: "We implemented Nova Forge's AI system for data analysis and were able to identify trends that previously went unnoticed. The ROI exceeded all our expectations.",
    author: "Alice Miller",
    position: "CEO, DataInsight",
    initials: "AM"
  },
  {
    content: "The application developed by Nova Forge revolutionized how we communicate with our customers. The intuitive interface and seamless integration with our existing systems made all the difference.",
    author: "Michael Sullivan",
    position: "Marketing Director, InnovateBiz",
    initials: "MS"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...revealAnimation}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">What our clients say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our clients' satisfaction is our greatest reward. See what they have to say about our solutions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={staggerItem}
              {...cardHoverAnimation}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 inline-block fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Avatar className="h-12 w-12 bg-primary-200">
                        <AvatarFallback className="bg-primary-200 text-primary font-bold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
