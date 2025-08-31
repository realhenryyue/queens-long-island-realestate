import { useLanguage } from "@/contexts/LanguageContext";

export const FAQSchema = () => {
  const { language } = useLanguage();

  const faqData = language === 'zh' ? [
    {
      question: "Henry岳先生提供哪些房地产服务？",
      answer: "我提供全方位的房地产服务，包括住宅和商业地产买卖、投资分析、市场咨询、双语服务等。我专注于纽约地区，特别是皇后区和长岛地区。"
    },
    {
      question: "如何联系Henry岳先生？",
      answer: "您可以通过电话(718) 717-5210联系我，或发送邮件至forangh@gmail.com。我提供中英文双语服务，工作时间是周一至周五9:00-18:00，周末10:00-17:00。"
    },
    {
      question: "什么是房地产投资ROI计算？",
      answer: "ROI（投资回报率）计算是评估房地产投资盈利能力的重要工具。我的AI驱动分析工具可以帮助您计算租金收益、资本增值和总体投资回报，让您做出明智的投资决策。"
    },
    {
      question: "Henry岳先生的服务区域有哪些？",
      answer: "我主要服务纽约州地区，重点包括皇后区、长岛、曼哈顿和拿骚县。凭借对当地市场的深入了解，我能为客户提供最专业的建议。"
    },
    {
      question: "首次购房者能得到什么帮助？",
      answer: "我为首次购房者提供全程指导，包括预算规划、贷款咨询、房屋搜索、价格谈判和过户手续。我会用您熟悉的语言详细解释每个步骤，确保您充分理解整个购房流程。"
    }
  ] : [
    {
      question: "What real estate services does Henry Yue provide?",
      answer: "I provide comprehensive real estate services including residential and commercial property buying/selling, investment analysis, market consulting, and bilingual services. I specialize in the NYC area, particularly Queens and Long Island."
    },
    {
      question: "How can I contact Henry Yue?",
      answer: "You can reach me at (718) 717-5210 or email forangh@gmail.com. I provide bilingual services in English and Chinese. My business hours are Monday-Friday 9:00 AM-6:00 PM, weekends 10:00 AM-5:00 PM."
    },
    {
      question: "What is real estate investment ROI calculation?",
      answer: "ROI (Return on Investment) calculation is a crucial tool for evaluating the profitability of real estate investments. My AI-powered analysis tool helps you calculate rental yields, capital appreciation, and overall investment returns to make informed decisions."
    },
    {
      question: "What areas does Henry Yue serve?",
      answer: "I primarily serve the New York State area, with focus on Queens, Long Island, Manhattan, and Nassau County. With deep local market knowledge, I provide the most professional advice to my clients."
    },
    {
      question: "What assistance is available for first-time homebuyers?",
      answer: "I provide complete guidance for first-time buyers including budget planning, loan consultation, property search, price negotiation, and closing procedures. I explain every step in your preferred language to ensure you fully understand the home buying process."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  );
};