import { Link } from "wouter";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const columns = [
    {
      title: "Nova Forge",
      items: [
        { text: "Transforming businesses through technology and innovation.", isDescription: true }
      ],
      social: true
    },
    {
      title: "Quick Links",
      items: [
        { text: "Services", href: "#services" },
        { text: "About Us", href: "#about" },
        { text: "Benefits", href: "#benefits" },
        { text: "Testimonials", href: "#testimonials" },
        { text: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Services",
      items: [
        { text: "Artificial Intelligence", href: "#" },
        { text: "Software Development", href: "#" },
        { text: "Process Automation", href: "#" },
        { text: "Data Analysis", href: "#" },
        { text: "Technological Consulting", href: "#" }
      ]
    },
    {
      title: "Contact",
      items: [
        { text: "123 Innovation Ave, Tech City", icon: <MapPin className="w-5 h-5 text-gray-300 mr-3 mt-1" /> },
        { text: "(555) 123-4567", icon: <Phone className="w-5 h-5 text-gray-300 mr-3 mt-1" /> },
        { text: "contact@novaforge.com", icon: <Mail className="w-5 h-5 text-gray-300 mr-3 mt-1" /> }
      ]
    }
  ];
  
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              <h3 className={colIndex === 0 ? "text-xl font-bold mb-4" : "text-lg font-semibold mb-4"}>{column.title}</h3>
              
              {column.items.map((item, itemIndex) => (
                item.isDescription ? (
                  <p key={itemIndex} className="text-gray-300 mb-4">{item.text}</p>
                ) : item.icon ? (
                  <div key={itemIndex} className="flex items-start mb-2">
                    {item.icon}
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ) : (
                  <div key={itemIndex} className="mb-2">
                    <a 
                      href={item.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  </div>
                )
              ))}
              
              {column.social && (
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-300 text-sm">
            © {currentYear} Nova Forge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
