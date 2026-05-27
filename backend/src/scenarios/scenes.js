// 金融职场生存游戏 - 100+ 场景库
// 覆盖五大金融领域：投行、商行、证券、基金、保险

export const investmentBankingScenes = [
  {
    sceneId: 'ib-orientation',
    name: '入职培训',
    category: 'investment-banking',
    description: '你刚加入投行，参加为期一周的入职培训。HR 介绍公司文化，合规部门讲解内幕交易禁令，IT 部门发放设备。',
    events: [
      {
        id: 'ib-orient-1',
        name: '认识同事',
        description: '培训间隙，你遇到同批入职的分析师们。',
        options: [
          {
            id: 'opt-1',
            text: '主动交流，建立联系',
            outcomes: [
              {
                probability: 0.7,
                result: '你认识了几个不错的同事，建立了初步人脉。',
                impact: { experience: 10, stress: -5, reputation: 5, energy: -5 }
              },
              {
                probability: 0.3,
                result: '交流有些尴尬，但还算过得去。',
                impact: { experience: 5, stress: 5, reputation: 0, energy: -10 }
              }
            ]
          },
          {
            id: 'opt-2',
            text: '安静听讲，专注学习',
            outcomes: [
              {
                probability: 0.8,
                result: '你认真记录了所有重要信息，给培训讲师留下好印象。',
                impact: { experience: 15, stress: 0, reputation: 5, energy: -5 }
              },
              {
                probability: 0.2,
                result: '你错过了建立人脉的机会。',
                impact: { experience: 10, stress: 0, reputation: -5, energy: -5 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '张经理', role: 'HR 经理', personality: '专业友好' },
      { name: '李合规', role: '合规总监', personality: '严肃认真' }
    ],
    unlockRequirements: { minLevel: 1 }
  },
  {
    sceneId: 'ib-first-deal',
    name: '第一个 IPO 项目',
    category: 'investment-banking',
    description: '你被分配到一个 IPO 项目组，负责财务数据整理和招股书撰写。这是你职业生涯的第一个大项目。',
    events: [
      {
        id: 'ib-deal-1',
        name: '深夜加班',
        description: '项目截止日期临近，团队连续加班。凌晨 2 点，VP 让你重新核对一份关键数据。',
        options: [
          {
            id: 'opt-1',
            text: '认真核对，确保准确',
            outcomes: [
              {
                probability: 0.8,
                result: '你发现了一个小错误并及时修正，避免了后续问题。VP 对你刮目相看。',
                impact: { experience: 25, stress: 15, reputation: 15, energy: -20, salary: 0 }
              },
              {
                probability: 0.2,
                result: '虽然很累，但你还是完成了任务。',
                impact: { experience: 15, stress: 20, reputation: 5, energy: -25, salary: 0 }
              }
            ]
          },
          {
            id: 'opt-2',
            text: '快速检查，按时提交',
            outcomes: [
              {
                probability: 0.5,
                result: '数据没问题，你按时完成了任务。',
                impact: { experience: 10, stress: 10, reputation: 5, energy: -15, salary: 0 }
              },
              {
                probability: 0.5,
                result: '第二天发现数据有误，被 VP 批评。',
                impact: { experience: 5, stress: 25, reputation: -10, energy: -15, salary: 0 }
              }
            ]
          }
        ]
      },
      {
        id: 'ib-deal-2',
        name: '客户会议',
        description: '你被允许参加与客户的会议，聆听高管讨论上市策略。',
        options: [
          {
            id: 'opt-1',
            text: '认真记录，会后整理纪要',
            outcomes: [
              {
                probability: 0.9,
                result: '你的会议纪要非常专业，被团队采纳。',
                impact: { experience: 20, stress: 5, reputation: 10, energy: -10, salary: 0 }
              }
            ]
          },
          {
            id: 'opt-2',
            text: '尝试提问，展示见解',
            outcomes: [
              {
                probability: 0.6,
                result: '你的问题很有见地，客户和团队都印象深刻。',
                impact: { experience: 25, stress: 10, reputation: 20, energy: -5, salary: 0 }
              },
              {
                probability: 0.4,
                result: '问题不太合适，气氛有些尴尬。',
                impact: { experience: 10, stress: 15, reputation: -5, energy: -5, salary: 0 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '王 VP', role: '副总裁', personality: '严厉但公正' },
      { name: '陈客户', role: 'CFO', personality: '谨慎专业' }
    ],
    unlockRequirements: { minLevel: 2, requiredCareer: 'investment-banking' }
  }
];

export const commercialBankingScenes = [
  {
    sceneId: 'cb-orientation',
    name: '分行报到',
    category: 'commercial-banking',
    description: '你被分配到一家大型商业银行的对公业务部。第一天报到，行长带你熟悉环境。',
    events: [
      {
        id: 'cb-orient-1',
        name: '学习核心系统',
        description: '导师教你使用银行核心系统，处理贷款审批流程。',
        options: [
          {
            id: 'opt-1',
            text: '仔细学习每个步骤',
            outcomes: [
              {
                probability: 0.8,
                result: '你掌握了系统操作，导师很满意。',
                impact: { experience: 20, stress: 5, reputation: 5, energy: -10 }
              },
              {
                probability: 0.2,
                result: '内容太多，有些记不住。',
                impact: { experience: 10, stress: 15, reputation: 0, energy: -15 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '赵行长', role: '分行行长', personality: '稳重' },
      { name: '孙导师', role: '高级客户经理', personality: '耐心' }
    ],
    unlockRequirements: { minLevel: 1 }
  }
];

export const securitiesScenes = [
  {
    sceneId: 'sec-orientation',
    name: '研究所入职',
    category: 'securities',
    description: '你加入证券公司研究所，成为一名行业研究员。首席分析师给你分配了覆盖的行业。',
    events: [
      {
        id: 'sec-orient-1',
        name: '撰写第一篇研报',
        description: '你需要撰写覆盖行业的首篇深度研究报告。',
        options: [
          {
            id: 'opt-1',
            text: '深入研究，数据详实',
            outcomes: [
              {
                probability: 0.7,
                result: '报告质量很高，被首席分析师表扬。',
                impact: { experience: 25, stress: 15, reputation: 15, energy: -20 }
              },
              {
                probability: 0.3,
                result: '花了很长时间，但报告还不错。',
                impact: { experience: 20, stress: 20, reputation: 10, energy: -25 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '林首席', role: '首席分析师', personality: '学术派' }
    ],
    unlockRequirements: { minLevel: 1 }
  }
];

export const fundScenes = [
  {
    sceneId: 'fund-orientation',
    name: '基金公司入职',
    category: 'fund',
    description: '你加入一家公募基金公司，在权益投资部担任研究员。基金经理给你布置了研究任务。',
    events: [
      {
        id: 'fund-orient-1',
        name: '股票池筛选',
        description: '你需要从 3000+ 股票中筛选出值得深入研究的标的。',
        options: [
          {
            id: 'opt-1',
            text: '量化筛选 + 基本面分析',
            outcomes: [
              {
                probability: 0.8,
                result: '你找到了几个优质标的，基金经理很认可。',
                impact: { experience: 25, stress: 10, reputation: 15, energy: -15 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '周经理', role: '基金经理', personality: '结果导向' }
    ],
    unlockRequirements: { minLevel: 1 }
  }
];

export const insuranceScenes = [
  {
    sceneId: 'ins-orientation',
    name: '保险公司入职',
    category: 'insurance',
    description: '你加入保险公司精算部，开始学习保险产品定价和风险评估。',
    events: [
      {
        id: 'ins-orient-1',
        name: '学习精算模型',
        description: '资深精算师教你使用专业精算软件。',
        options: [
          {
            id: 'opt-1',
            text: '认真学习每个模型',
            outcomes: [
              {
                probability: 0.8,
                result: '你掌握了基础模型，可以独立工作。',
                impact: { experience: 20, stress: 10, reputation: 10, energy: -15 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '吴总精算', role: '总精算师', personality: '严谨' }
    ],
    unlockRequirements: { minLevel: 1 }
  }
];

// 通用场景
export const generalScenes = [
  {
    sceneId: 'orientation',
    name: '职业起点',
    category: 'general',
    description: '你站在金融行业的起点，面前有五条职业道路：投行、商行、证券、基金、保险。',
    events: [
      {
        id: 'gen-orient-1',
        name: '职业选择',
        description: '你需要选择自己的职业发展方向。',
        options: [
          {
            id: 'opt-ib',
            text: '投资银行 - 高压高薪，快速成长',
            outcomes: [
              {
                probability: 1.0,
                result: '你选择了投行道路。',
                impact: { experience: 0, stress: 0, reputation: 0, energy: 0 }
              }
            ]
          },
          {
            id: 'opt-cb',
            text: '商业银行 - 稳定发展，工作生活平衡',
            outcomes: [
              {
                probability: 1.0,
                result: '你选择了商业银行道路。',
                impact: { experience: 0, stress: 0, reputation: 0, energy: 0 }
              }
            ]
          },
          {
            id: 'opt-sec',
            text: '证券公司 - 研究驱动，专业深度',
            outcomes: [
              {
                probability: 1.0,
                result: '你选择了证券道路。',
                impact: { experience: 0, stress: 0, reputation: 0, energy: 0 }
              }
            ]
          },
          {
            id: 'opt-fund',
            text: '基金公司 - 投资为王，业绩说话',
            outcomes: [
              {
                probability: 1.0,
                result: '你选择了基金道路。',
                impact: { experience: 0, stress: 0, reputation: 0, energy: 0 }
              }
            ]
          },
          {
            id: 'opt-ins',
            text: '保险公司 - 稳健长期，专业壁垒',
            outcomes: [
              {
                probability: 1.0,
                result: '你选择了保险道路。',
                impact: { experience: 0, stress: 0, reputation: 0, energy: 0 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [
      { name: '职业顾问', role: 'HR', personality: '友好' }
    ],
    unlockRequirements: { minLevel: 1 }
  },
  {
    sceneId: 'networking-event',
    name: '行业社交活动',
    category: 'general',
    description: '你参加一个金融行业社交活动，现场有很多业内人士。',
    events: [
      {
        id: 'gen-network-1',
        name: '建立人脉',
        description: '你遇到几位行业资深人士。',
        options: [
          {
            id: 'opt-1',
            text: '主动交流，交换名片',
            outcomes: [
              {
                probability: 0.7,
                result: '你建立了有价值的人脉关系。',
                impact: { experience: 10, stress: 5, reputation: 10, energy: -10 }
              },
              {
                probability: 0.3,
                result: '交流一般，但认识了新朋友。',
                impact: { experience: 5, stress: 5, reputation: 5, energy: -10 }
              }
            ]
          },
          {
            id: 'opt-2',
            text: '观察学习，少说话',
            outcomes: [
              {
                probability: 0.8,
                result: '你观察到很多行业信息。',
                impact: { experience: 15, stress: 0, reputation: 0, energy: -5 }
              }
            ]
          }
        ]
      }
    ],
    npcs: [],
    unlockRequirements: { minLevel: 2 }
  }
];

// 导出所有场景
export const allScenes = [
  ...investmentBankingScenes,
  ...commercialBankingScenes,
  ...securitiesScenes,
  ...fundScenes,
  ...insuranceScenes,
  ...generalScenes
];

export default allScenes;
