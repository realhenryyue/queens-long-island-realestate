import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Home, CreditCard, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const EducationalContent = () => {
  const { t } = useLanguage();

  const educationalContent = [
    {
      id: "overseas-buying-guide",
      title: t("海外买房完整指南"),
      titleEn: "Complete Guide to Overseas Property Buying",
      icon: <Globe className="w-6 h-6" />,
      summary: t("为海外投资者提供纽约购房的完整攻略和专业建议"),
      summaryEn: "Comprehensive guide and professional advice for overseas investors buying property in New York",
      content: t(`海外买房是一项重大投资决策，需要充分了解当地法律、税务和市场环境。本指南将为您提供完整的纽约购房攻略。

**购房资格要求**

1. **身份要求**
   • 外国人可以在美国购买房产
   • 无需绿卡或公民身份
   • 需要有效护照和签证

2. **资金要求**
   • 首付比例：30-50%（外国买家）
   • 现金购买更有优势
   • 需证明资金来源合法性

**购房流程详解**

**第一步：市场研究**
   • 确定目标区域和预算
   • 了解当地市场价格
   • 选择专业房地产经纪人

**第二步：贷款预批**
   • 选择合适的贷款机构
   • 准备财务文件
   • 获得预批准信

**第三步：看房选房**
   • 实地考察房产
   • 进行房屋检查
   • 评估投资价值

**第四步：出价谈判**
   • 分析市场价值
   • 制定合理出价策略
   • 谈判成交条件

**第五步：过户交割**
   • 签署购房合同
   • 办理产权保险
   • 完成资金交割

**重要注意事项**

1. **税务考量**
   • 房产税：年度缴纳
   • 转让税：购买时缴纳
   • 所得税：出售时涉及

2. **法律保护**
   • 聘请专业律师
   • 购买产权保险
   • 了解当地法规

3. **投资策略**
   • 自住vs投资租赁
   • 短期vs长期持有
   • 风险管理和多元化

**成功案例分享**

王先生来自中国，2023年在法拉盛购买了一套三房公寓，总价95万美元。通过专业团队协助，整个购房过程仅用了45天，目前房产已增值8%，年租金收入4.2万美元。

**专业建议**

海外购房成功的关键在于：
1. 选择有经验的专业团队
2. 充分了解当地市场和法规
3. 制定清晰的投资目标
4. 做好风险管理准备

我们的专业团队为您提供从市场分析到交割过户的全程服务，确保您的投资决策明智而安全。`),
      contentEn: "Overseas property buying is a major investment decision that requires thorough understanding of local laws, taxes, and market conditions. This guide provides a complete New York property buying strategy.",
      searchKeywords: ["海外买房", "投资指南", "纽约房产", "外国买家", "overseas", "property", "investment", "guide", "foreign", "buyer"]
    },
    {
      id: "nyc-buying-process",
      title: t("纽约购房流程详解"),
      titleEn: "Detailed NYC Home Buying Process",
      icon: <Home className="w-6 h-6" />,
      summary: t("一步一步详解纽约购房的完整流程和关键节点"),
      summaryEn: "Step-by-step detailed explanation of the complete NYC home buying process and key milestones",
      content: t(`纽约房地产市场竞争激烈，了解完整的购房流程是成功购房的关键。以下是专业的购房流程指南。

**准备阶段（1-2周）**

1. **财务准备**
   • 评估购房预算
   • 整理信用记录
   • 准备首付资金
   • 预留交易费用（2-3%）

2. **团队组建**
   • 选择房地产经纪人
   • 联系贷款专家
   • 聘请房产律师
   • 确定房屋检查师

**寻房阶段（2-8周）**

1. **确定需求**
   • 房型和面积要求
   • 地理位置偏好
   • 学区和配套设施
   • 投资或自住用途

2. **市场搜索**
   • MLS系统搜索
   • 实地看房
   • 社区考察
   • 价格比较分析

**出价阶段（1-2周）**

1. **市场分析**
   • 可比房屋分析（CMA）
   • 房屋状况评估
   • 市场竞争情况
   • 卖家动机分析

2. **出价策略**
   • 初始出价确定
   • 谈判条件设置
   • 交割时间安排
   • 意外情况处理

**合同阶段（2-4周）**

1. **合同谈判**
   • 价格协商
   • 检查条款
   • 融资条件
   • 交割安排

2. **尽职调查**
   • 房屋检查
   • 白蚁检查
   • 产权调查
   • 贷款申请

**交割阶段（4-6周）**

1. **贷款审批**
   • 文件提交
   • 房屋评估
   • 贷款承保
   • 最终批准

2. **交割准备**
   • 最终验房
   • 资金准备
   • 保险安排
   • 过户文件

**关键时间节点**

• 合同签署后7天：完成房屋检查
• 合同签署后14天：完成贷款申请
• 合同签署后30天：获得贷款批准
• 合同签署后45天：完成交割

**常见问题处理**

1. **竞价战略**
   • 快速决策能力
   • 灵活付款条件
   • 减少或放弃检查
   • 增加定金金额

2. **贷款难题**
   • 多渠道申请
   • 文件完整性
   • 及时响应要求
   • 备用资金准备

**成功购房的关键因素**

1. 充分的市场准备
2. 专业团队支持
3. 灵活的谈判策略
4. 及时的执行能力

选择经验丰富的房地产经纪人是成功购房的重要保障。`),
      contentEn: "The New York real estate market is highly competitive, and understanding the complete home buying process is key to successful property purchase.",
      searchKeywords: ["纽约购房", "流程", "买房指南", "房地产", "nyc", "home buying", "process", "real estate", "guide"]
    },
    {
      id: "mortgage-application-guide",
      title: t("房屋贷款申请攻略"),
      titleEn: "Mortgage Application Strategy Guide",
      icon: <CreditCard className="w-6 h-6" />,
      summary: t("详解房屋贷款申请技巧，提高批准率并获得最佳利率"),
      summaryEn: "Detailed mortgage application techniques to improve approval rates and secure the best interest rates",
      content: t(`房屋贷款是购房过程中的重要环节，合适的贷款产品和申请策略能够为您节省数万美元。

**贷款类型选择**

1. **常规贷款（Conventional Loan）**
   • 首付要求：3-20%
   • 信用分数：620+
   • 利率水平：最优
   • 适合人群：信用良好的买家

2. **FHA贷款**
   • 首付要求：3.5%
   • 信用分数：580+
   • 贷款保险：必需
   • 适合人群：首次购房者

3. **VA贷款**
   • 首付要求：0%
   • 信用分数：无最低要求
   • 资格限制：退伍军人
   • 适合人群：符合条件的退伍军人

4. **巨额贷款（Jumbo Loan）**
   • 贷款额度：超过$766,550
   • 信用分数：740+
   • 首付要求：20%+
   • 适合人群：高端房产买家

**申请准备清单**

**财务文件**
• 最近2年税务申报表
• 最近2个月银行对账单
• 收入证明（工资单、雇佣信）
• 资产证明（投资账户、退休金）
• 债务信息（信用卡、其他贷款）

**个人信息**
• 身份证明文件
• 社会安全号码
• 居住历史（2年）
• 工作历史（2年）

**提高批准率的策略**

1. **信用分数优化**
   • 及时还款提高信用分数
   • 减少信用卡使用率
   • 避免新开信用账户
   • 检查信用报告错误

2. **收入稳定性**
   • 避免换工作
   • 保持收入来源稳定
   • 准备收入增长证明
   • 考虑共同借款人

3. **债务收入比（DTI）**
   • 理想比例：<36%
   • 最高接受：43%
   • 减少现有债务
   • 增加收入来源

**获得最佳利率技巧**

1. **货比三家**
   • 比较多家贷款机构
   • 关注总借款成本
   • 考虑点数（Points）选择
   • 谈判费用减免

2. **时机选择**
   • 关注市场利率走势
   • 考虑锁定利率时机
   • 选择合适的贷款期限
   • 评估再融资机会

**常见错误避免**

1. **申请前错误**
   • 大额消费影响DTI
   • 频繁查询信用报告
   • 随意更换工作
   • 资金来源混乱

2. **申请中错误**
   • 提供不完整文件
   • 延迟响应贷款机构
   • 隐瞒债务信息
   • 继续产生新债务

**外国买家特殊考虑**

• 更高的首付要求（30-50%）
• 需要美国银行账户
• 收入来源证明要求
• 可能需要更多文件

**专业建议**

成功获得房屋贷款的关键：
1. 提前规划财务状况
2. 选择合适的贷款产品
3. 保持良好沟通
4. 准备充分的文件

我们与多家贷款机构保持良好合作关系，能为您提供最优的贷款方案和专业指导。`),
      contentEn: "Mortgage is an important part of the home buying process. The right loan product and application strategy can save you tens of thousands of dollars.",
      searchKeywords: ["房屋贷款", "贷款申请", "按揭", "利率", "mortgage", "loan", "application", "interest rate", "financing"]
    },
    {
      id: "tax-optimization",
      title: t("税务优化建议"),
      titleEn: "Tax Optimization Strategies",
      icon: <Calculator className="w-6 h-6" />,
      summary: t("房产投资的税务优化策略，合法减税增加投资回报"),
      summaryEn: "Tax optimization strategies for property investment to legally reduce taxes and increase investment returns",
      content: t(`房产投资涉及多种税务考量，合理的税务规划能够显著提高投资回报率。以下是专业的税务优化建议。

**房产持有期间税务**

1. **房产税优化**
   • 及时申请免税额度
   • 对评估值提出合理异议
   • 利用老年人/退伍军人减免
   • 关注税率变化影响

2. **租金收入税务**
   • 正确申报租金收入
   • 充分利用费用抵扣
   • 折旧费用合理计算
   • 维修vs改善费用区分

**可抵扣费用详解**

**直接费用**
• 物业管理费
• 维修和保养费用
• 房产税
• 房屋保险费
• 公用事业费（房东承担部分）

**间接费用**
• 专业服务费（律师、会计师）
• 广告租赁费用
• 交通费用（管理房产）
• 办公费用（相关部分）

**折旧策略**

1. **住宅房产折旧**
   • 折旧期限：27.5年
   • 只能对建筑物折旧
   • 土地部分不可折旧
   • 需要合理分配价值

2. **改善vs维修**
   • 维修费用：当年全额抵扣
   • 改善费用：需要折旧
   • 关键在于性质判断
   • 保留详细记录

**售房税务优化**

1. **资本利得税**
   • 短期持有（<1年）：按普通收入税率
   • 长期持有（>1年）：优惠税率0%/15%/20%
   • 成本基础正确计算
   • 改善费用可增加成本基础

2. **1031交换**
   • 同类房产交换
   • 延期缴纳资本利得税
   • 严格时间要求
   • 需要合格中介机构

**外国投资者特殊税务**

1. **FIRPTA扣缴**
   • 售房时预扣15%
   • 可申请减免
   • 需要税务代表
   • 年度申报要求

2. **税务协定优惠**
   • 检查原籍国税务协定
   • 可能享受优惠税率
   • 需要正确申请程序
   • 避免双重征税

**税务规划策略**

1. **持有结构优化**
   • 个人持有vs公司持有
   • LLC结构考虑
   • 信托结构运用
   • 家庭税务规划

2. **时机优化**
   • 收入确认时机
   • 费用支出时机
   • 房产买卖时机
   • 税率变化应对

**常见税务错误**

1. **记录不完整**
   • 缺少费用凭证
   • 折旧计算错误
   • 收入申报遗漏
   • 个人vs投资混淆

2. **专业服务不足**
   • 没有聘请专业税务师
   • 忽视税法变化
   • 没有前瞻性规划
   • 忽视州税差异

**专业建议**

成功的房产税务优化需要：
1. 专业税务师指导
2. 完整记录保存
3. 前瞻性税务规划
4. 及时了解法规变化

建议在投资决策前咨询专业税务师，制定个性化的税务优化方案。`),
      contentEn: "Property investment involves various tax considerations. Proper tax planning can significantly improve investment returns.",
      searchKeywords: ["税务优化", "房产税", "投资税务", "节税", "tax optimization", "property tax", "investment tax", "tax saving"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t("教育型内容")}</h1>
        <p className="text-xl text-muted-foreground">
          {t("专业的购房教育内容，助您做出明智投资决策")}
        </p>
        <Badge variant="default" className="text-lg px-4 py-2">
          {t("月搜索量：50,000+")} | {t("极高ROI")}
        </Badge>
      </div>

      <div className="grid gap-8">
        {educationalContent.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
              <div className="flex items-center gap-4">
                {item.icon}
                <div className="flex-1">
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{item.summary}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {item.content}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {item.searchKeywords.slice(0, 6).map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};