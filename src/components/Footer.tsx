import { useLanguage } from "@/hooks/useLanguage";

export const Footer = () => {
  const { currentLanguage } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {currentLanguage === 'zh' ? '岳泓宇' : 'Henry Yue'}
            </h3>
            <p className="mb-4">
              {currentLanguage === 'zh' ? '持牌房地产经纪人' : 'Licensed Real Estate Agent'}
            </p>
            <div className="space-y-2">
              <p>📞 (718) 717-5210</p>
              <p>✉️ forangh@gmail.com</p>
              <p>📍 {currentLanguage === 'zh' ? '皇后区 • 长岛 • 纽约' : 'Queens • Long Island • New York'}</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {currentLanguage === 'zh' ? '服务项目' : 'Services'}
            </h3>
            <ul className="space-y-2">
              <li>{currentLanguage === 'zh' ? '住宅销售' : 'Residential Sales'}</li>
              <li>{currentLanguage === 'zh' ? '首次购房' : 'First-Time Buyers'}</li>
              <li>{currentLanguage === 'zh' ? '投资分析' : 'Investment Analysis'}</li>
              <li>{currentLanguage === 'zh' ? '投资房产' : 'Investment Properties'}</li>
              <li>{currentLanguage === 'zh' ? '双语服务' : 'Bilingual Service'}</li>
            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {currentLanguage === 'zh' ? '办公地点' : 'Office Locations'}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Team Real Estate</h4>
                <p className="text-sm text-primary-foreground/80">
                  {currentLanguage === 'zh' ? '法拉盛办公室' : 'Flushing Office'}
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  {currentLanguage === 'zh' ? '大颈办公室' : 'Great Neck Office'}
                </h4>
                <p className="text-sm text-primary-foreground/80">Nassau County</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            {currentLanguage === 'zh' 
              ? '© 2024 岳泓宇房地产。保留所有权利。' 
              : '© 2024 Henry Yue Real Estate. All rights reserved.'
            }
          </p>
          <p className="text-sm text-primary-foreground/80 mt-2">
            {currentLanguage === 'zh' ? '平等住房机会' : 'Equal Housing Opportunity'}
          </p>
        </div>
      </div>
    </footer>
  );
};