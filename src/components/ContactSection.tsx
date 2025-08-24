import { useLanguage } from "@/hooks/useLanguage";

export const ContactSection = () => {
  const { t, currentLanguage } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {currentLanguage === 'zh' ? '准备开始您的房地产之旅？今天就联系我们。' : 'Ready to start your real estate journey? Get in touch today.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {currentLanguage === 'zh' ? '联系方式' : 'Get in Touch'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {currentLanguage === 'zh' ? '电话或短信' : 'Call or Text'}
                    </div>
                    <a href="tel:+17187175210" className="text-muted-foreground hover:text-primary">
                      (718) 717-5210
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">✉️</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {currentLanguage === 'zh' ? '邮箱' : 'Email'}
                    </div>
                    <a href="mailto:forangh@gmail.com" className="text-muted-foreground hover:text-primary">
                      forangh@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {currentLanguage === 'zh' ? '服务区域' : 'Service Areas'}
                    </div>
                    <div className="text-muted-foreground">
                      {currentLanguage === 'zh' ? '皇后区 • 长岛 • 纽约五大区' : 'Queens • Long Island • NYC 5 Boroughs'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              {currentLanguage === 'zh' ? '发送消息' : 'Send a Message'}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentLanguage === 'zh' ? '姓名' : 'Full Name'} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentLanguage === 'zh' ? '电话号码' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentLanguage === 'zh' ? '邮箱地址' : 'Email Address'} <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentLanguage === 'zh' ? '我能为您做些什么？' : 'How can I help you?'} <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={currentLanguage === 'zh' ? '告诉我您的房地产需求...' : 'Tell me about your real estate needs...'}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors font-semibold"
              >
                {currentLanguage === 'zh' ? '发送消息' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};