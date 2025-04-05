import { Link } from "wouter";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Phone, Mail, MapPin, Cpu, Brain, Rocket } from "lucide-react";

type FooterItem = 
  | { text: string; isDescription: true; href?: never; icon?: never }
  | { text: string; href: string; icon?: React.ReactNode }
  | { text: string; icon: React.ReactNode; href?: never };

type ColumnType = {
  title: string;
  items: FooterItem[];
  social?: boolean;
  logo?: boolean;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const columns: ColumnType[] = [
    {
      title: "Nova Forge",
      items: [
        { text: "Transformando empresas através de inteligência artificial, automação e inovação tecnológica.", isDescription: true }
      ],
      social: true,
      logo: true
    },
    {
      title: "Links Rápidos",
      items: [
        { text: "Serviços", href: "#services" },
        { text: "Sobre Nós", href: "#about" },
        { text: "Vantagens", href: "#benefits" },
        { text: "Depoimentos", href: "#testimonials" },
        { text: "Contato", href: "#contact" }
      ]
    },
    {
      title: "Soluções",
      items: [
        { text: "IA Generativa", href: "#", icon: <Brain className="w-4 h-4 text-primary-400 mr-2" /> },
        { text: "Desenvolvimento de Software", href: "#", icon: <Cpu className="w-4 h-4 text-primary-400 mr-2" /> },
        { text: "Automação de Processos", href: "#", icon: <Rocket className="w-4 h-4 text-primary-400 mr-2" /> },
        { text: "Big Data & Analytics", href: "#" },
        { text: "Consultoria Tecnológica", href: "#" }
      ]
    },
    {
      title: "Contato",
      items: [
        { text: "Av. Paulista, 1000 - São Paulo, SP", icon: <MapPin className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" /> },
        { text: "(11) 1234-5678", icon: <Phone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" /> },
        { text: "contato@novaforge.com.br", icon: <Mail className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" /> }
      ]
    }
  ];
  
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary-900/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className={colIndex === 0 ? "md:col-span-2 lg:col-span-1" : ""}>
              <h3 className={colIndex === 0 ? "text-xl font-bold mb-4" : "text-lg font-semibold mb-4"}>
                {column.logo ? (
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-900 p-2 rounded-lg mr-2">
                      <span className="text-primary-400 font-mono font-bold text-lg">NF</span>
                    </div>
                    <span>{column.title}</span>
                  </div>
                ) : (
                  column.title
                )}
              </h3>
              
              {column.items.map((item, itemIndex) => (
                item.isDescription ? (
                  <p key={itemIndex} className="text-gray-400 mb-4 max-w-xs">{item.text}</p>
                ) : item.icon ? (
                  <div key={itemIndex} className="flex items-start mb-3 group">
                    {item.icon}
                    <a 
                      href={item.href} 
                      className="text-gray-300 group-hover:text-primary-400 transition-colors"
                    >
                      {item.text}
                    </a>
                  </div>
                ) : (
                  <div key={itemIndex} className="mb-3">
                    <a 
                      href={item.href} 
                      className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                    >
                      <span className="h-1 w-1 bg-primary-500 rounded-full mr-2"></span>
                      {item.text}
                    </a>
                  </div>
                )
              ))}
              
              {column.social && (
                <div className="flex space-x-3 mt-6">
                  <a href="#" className="w-9 h-9 bg-zinc-800 rounded-md flex items-center justify-center text-primary-400 hover:bg-primary-900 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-zinc-800 rounded-md flex items-center justify-center text-primary-400 hover:bg-primary-900 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-zinc-800 rounded-md flex items-center justify-center text-primary-400 hover:bg-primary-900 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-zinc-800 rounded-md flex items-center justify-center text-primary-400 hover:bg-primary-900 transition-colors">
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nova Forge. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Termos de Uso</a>
              <Link href="/admin" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
