import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, User, Mail, Phone, Building, MessageSquare, Clock, ChevronDown, ChevronUp, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipo para os formulários de contato
type ContactForm = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Buscar formulários de contato
  const { data: contactForms, isLoading, isError, refetch } = useQuery<ContactForm[]>({
    queryKey: ['/api/contact'],
  });
  
  // Função para formatar data
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };
  
  // Filtrar os formulários com base na pesquisa
  const filteredForms = contactForms?.filter(form => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      form.name.toLowerCase().includes(searchLower) ||
      form.email.toLowerCase().includes(searchLower) ||
      (form.company && form.company.toLowerCase().includes(searchLower)) ||
      form.message.toLowerCase().includes(searchLower)
    );
  });
  
  // Ordenar por data (mais recente primeiro)
  const sortedForms = filteredForms?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Alternar expandir/colapsar mensagem
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary-400" />
            <h1 className="text-2xl font-bold">Painel de Administração</h1>
          </div>
          <Button onClick={() => window.location.href = "/"} variant="outline" className="border-primary-600 text-primary-400 hover:bg-primary-950">
            Voltar para o site
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 shadow-xl mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary-400" />
                Formulários de Contato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Buscar por nome, email ou conteúdo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-800 border-zinc-700 focus:border-primary-500"
                  />
                </div>
                <Button onClick={() => refetch()} className="bg-primary-600 hover:bg-primary-700">
                  Atualizar
                </Button>
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="spinner h-8 w-8 rounded-full border-4 border-t-primary-500 border-zinc-700 animate-spin mx-auto mb-4"></div>
                  <p className="text-zinc-400">Carregando formulários de contato...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-8">
                  <p className="text-red-400">Erro ao carregar os formulários de contato.</p>
                  <Button onClick={() => refetch()} className="mt-2">Tentar novamente</Button>
                </div>
              ) : !sortedForms?.length ? (
                <div className="text-center py-8">
                  <p className="text-zinc-400">Nenhum formulário de contato encontrado.</p>
                </div>
              ) : (
                <div className="rounded-md border border-zinc-800 overflow-hidden">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader className="bg-zinc-800">
                        <TableRow className="hover:bg-zinc-800 border-zinc-700">
                          <TableHead className="text-zinc-300 w-[200px]">Nome</TableHead>
                          <TableHead className="text-zinc-300 w-[200px]">Email / Telefone</TableHead>
                          <TableHead className="text-zinc-300 w-[150px]">Empresa</TableHead>
                          <TableHead className="text-zinc-300">Mensagem</TableHead>
                          <TableHead className="text-zinc-300 text-right w-[180px]">Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedForms.map((form) => (
                          <TableRow 
                            key={form.id} 
                            className="hover:bg-zinc-800/50 border-zinc-800"
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary-400" />
                                {form.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-primary-400" />
                                  <span className="text-sm">{form.email}</span>
                                </div>
                                {form.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary-400" />
                                    <span className="text-sm">{form.phone}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {form.company ? (
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-primary-400" />
                                  <span>{form.company}</span>
                                </div>
                              ) : (
                                <span className="text-zinc-500 text-sm">Não informado</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div 
                                  className="cursor-pointer flex items-center justify-between" 
                                  onClick={() => toggleExpand(form.id)}
                                >
                                  <div className="text-sm line-clamp-1">
                                    {form.message}
                                  </div>
                                  {expandedId === form.id ? (
                                    <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                                  )}
                                </div>
                                
                                {expandedId === form.id && (
                                  <div className="mt-2 text-sm bg-zinc-800/50 p-3 rounded-md">
                                    {form.message}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex flex-col items-end gap-1">
                                <Badge variant="outline" className="bg-primary-900/20 text-primary-400 border-primary-700">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDate(form.createdAt)}
                                </Badge>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}