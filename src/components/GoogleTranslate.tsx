
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GoogleTranslateProps {
  text: string;
  onTranslate?: (translatedText: string, targetLanguage: string) => void;
  className?: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
];

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({ 
  text, 
  onTranslate, 
  className = "" 
}) => {
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const { toast } = useToast();

  const translateText = async () => {
    if (!text || !targetLanguage) {
      toast({
        title: "Translation Error",
        description: "Please provide text and select a target language",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    
    try {
      // Simulate Google Translate API call
      // In a real implementation, you would use the Google Translate API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock translation result
      const mockTranslations: Record<string, string> = {
        'es': '¡Descubrí @RENEGADE_ICP - un generador de contenido de IA construido en #InternetComputer que es realmente útil! Crear, programar y rastrear publicaciones en redes sociales con seguridad blockchain. ¡Cambio de juego para mi estrategia de contenido! #Web3 #IA',
        'fr': 'Je viens de découvrir @RENEGADE_ICP - un générateur de contenu IA construit sur #InternetComputer qui est vraiment utile ! Créer, programmer et suivre les publications sur les réseaux sociaux avec la sécurité blockchain. Révolutionnaire pour ma stratégie de contenu ! #Web3 #IA',
        'de': 'Gerade @RENEGADE_ICP entdeckt - einen KI-Content-Generator auf #InternetComputer, der wirklich nützlich ist! Social Media Posts mit Blockchain-Sicherheit erstellen, planen und verfolgen. Game-Changer für meine Content-Strategie! #Web3 #KI',
        'it': 'Appena scoperto @RENEGADE_ICP - un generatore di contenuti AI costruito su #InternetComputer che è davvero utile! Creare, programmare e tracciare post sui social media con sicurezza blockchain. Rivoluzionario per la mia strategia di contenuti! #Web3 #IA',
        'pt': 'Acabei de descobrir @RENEGADE_ICP - um gerador de conteúdo de IA construído no #InternetComputer que é realmente útil! Criar, agendar e rastrear posts de mídia social com segurança blockchain. Mudança de jogo para minha estratégia de conteúdo! #Web3 #IA',
        'ja': '@RENEGADE_ICPを発見しました - #InternetComputerに構築された実際に役立つAIコンテンツジェネレーター！ブロックチェーンセキュリティでソーシャルメディア投稿を作成、スケジュール、追跡。私のコンテンツ戦略のゲームチェンジャー！ #Web3 #AI',
        'zh': '刚发现@RENEGADE_ICP - 一个基于#InternetComputer构建的真正有用的AI内容生成器！使用区块链安全性创建、安排和跟踪社交媒体帖子。改变我内容策略的游戏规则！ #Web3 #AI',
        'ko': '@RENEGADE_ICP를 발견했습니다 - #InternetComputer에 구축된 정말 유용한 AI 콘텐츠 생성기! 블록체인 보안으로 소셜 미디어 게시물을 생성, 예약 및 추적하세요. 내 콘텐츠 전략의 게임 체인저! #Web3 #AI',
        'ar': 'اكتشفت للتو @RENEGADE_ICP - مولد محتوى ذكي مبني على #InternetComputer مفيد حقاً! إنشاء وجدولة وتتبع منشورات وسائل التواصل الاجتماعي بأمان البلوك تشين. يغير قواعد اللعبة لاستراتيجية المحتوى الخاصة بي! #Web3 #AI',
        'hi': 'अभी @RENEGADE_ICP की खोज की - #InternetComputer पर बनाया गया एक AI कंटेंट जेनरेटर जो वास्तव में उपयोगी है! ब्लॉकचेन सुरक्षा के साथ सोशल मीडिया पोस्ट बनाएं, शेड्यूल करें और ट्रैक करें। मेरी कंटेंट रणनीति के लिए गेम-चेंजर! #Web3 #AI'
      };
      
      const result = mockTranslations[targetLanguage] || text;
      setTranslatedText(result);
      
      if (onTranslate) {
        onTranslate(result, targetLanguage);
      }
      
      toast({
        title: "Translation complete",
        description: `Text translated to ${languages.find(l => l.code === targetLanguage)?.name}`,
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "There was an error translating the text",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
          <SelectTrigger className="w-40 bg-renegade-dark border-renegade-green/30">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          onClick={translateText}
          disabled={isTranslating || !text}
          variant="outline"
          className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
        >
          {isTranslating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Translate
            </>
          )}
        </Button>
      </div>
      
      {translatedText && (
        <div className="p-3 rounded border border-renegade-green/30 bg-renegade-green/5">
          <div className="text-sm font-medium mb-2">
            Translated to {languages.find(l => l.code === targetLanguage)?.name}:
          </div>
          <div className="text-sm">{translatedText}</div>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
