import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    // Verificar se o script já foi carregado
    if (window.Tawk_API) {
      return;
    }

    // Configuração do Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Criar e configurar o script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/default/default'; // Placeholder - você precisará do seu ID real
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Adicionar o script ao head
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Configurações personalizadas
    window.Tawk_API.onLoad = function() {
      // Configurar mensagem de boas-vindas em português
      window.Tawk_API.setAttributes({
        'name': 'Visitante',
        'email': '',
        'hash': ''
      });
    };

    // Limpar quando componente for desmontado
    return () => {
      // O Tawk.to não fornece método oficial de cleanup, mas podemos remover o script
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
};

// Definir tipos para TypeScript
declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default TawkToWidget;