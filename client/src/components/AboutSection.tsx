import { motion } from "framer-motion";
import { revealAnimation, staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "100+", label: "Completed projects" },
  { value: "50+", label: "Satisfied clients" },
  { value: "24/7", label: "Technical support" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...revealAnimation}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Our technology team" 
              className="rounded-lg shadow-xl"
              width="600"
              height="400"
            />
          </motion.div>
          <motion.div {...revealAnimation}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Nova Forge</h2>
            <p className="text-lg text-gray-600 mb-6">
              Nova Forge was born from a passion for technology and the belief that every company deserves access to cutting-edge digital solutions, regardless of size or industry.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team consists of experts in software development, artificial intelligence, and automation, united by a commitment to deliver solutions that truly make a difference for our clients.
            </p>
            <motion.div 
              className="grid grid-cols-2 gap-6 mt-8"
              {...staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col"
                  variants={staggerItem}
                >
                  <span className="text-4xl font-bold text-accent">{stat.value}</span>
                  <span className="text-gray-600">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
