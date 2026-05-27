// 金融职场生存游戏 - 完整 100+ 场景生成器
// 运行：node src/scripts/generateScenes.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scene from '../models/Scene.js';

dotenv.config();

// 场景模板生成函数
function generateScene(id, name, category, description, events, npcs, reqs) {
  return {
    sceneId: id,
    name: name,
    category: category,
    description: description,
    events: events,
    npcs: npcs || [],
    unlockRequirements: reqs || { minLevel: 1 }
  };
}

function generateEvent(id, name, desc, options) {
  return {
    id: id,
    name: name,
    description: desc,
    options: options
  };
}

function generateOption(id, text, outcomes) {
  return {
    id: id,
    text: text,
    outcomes: outcomes
  };
}

function generateOutcome(prob, result, impact) {
  return {
    probability: prob,
    result: result,
    impact: impact
  };
}

// ============ 投行部门场景 (20个) ============
const ibScenes = [
  generateScene('ib-1', '入职培训', 'investment-banking',
    '你刚加入一家顶级投行的分析师项目，参加为期两周的入职培训。',
    [generateEvent('ib-1-e1', '破冰活动', 'HR 组织了新人破冰活动，你需要选择如何参与。', [
      generateOption('opt1', '主动自我介绍，积极社交', [
        generateOutcome(0.7, '你结识了多位同期入职的分析师，建立了初步人脉。', { experience: 10, stress: -5, reputation: 5, energy: -5 }),
        generateOutcome(0.3, '交流有些生硬，但总体顺利。', { experience: 5, stress: 0, reputation: 3, energy: -5 })
      ]),
      generateOption('opt2', '安静聆听，观察他人', [
        generateOutcome(0.8, '你默默记下了很多人的信息，为日后合作打下基础。', { experience: 15, stress: 0, reputation: 0, energy: -3 }),
        generateOutcome(0.2, '你显得有点孤僻，HR 私下提醒你。', { experience: 5, stress: 5, reputation: -3, energy: -3 })
      ])
    ])],
    [{ name: '张 HR', role: '人力资源经理', personality: '友善专业' }],
    { minLevel: 1 }
  ),

  generateScene('ib-2', '第一个 IPO 项目', 'investment-banking',
    '你被分配到 IPO 项目组，负责财务数据核对和招股书初稿。',
    [generateEvent('ib-2-e1', '深夜加班', '项目截止日临近，VP 要求凌晨 2 点重新核对关键数据。', [
      generateOption('opt1', '认真核对每一行数据', [
        generateOutcome(0.8, '你发现并修正了一个关键错误，VP 对你印象深刻。', { experience: 25, stress: 15, reputation: 15, energy: -20 }),
        generateOutcome(0.2, '虽然很累，但数据没有问题。', { experience: 15, stress: 20, reputation: 5, energy: -25 })
      ]),
      generateOption('opt2', '快速浏览后提交', [
        generateOutcome(0.5, '数据没问题，你按时完成了任务。', { experience: 10, stress: 10, reputation: 5, energy: -15 }),
        generateOutcome(0.5, '第二天发现数据有误，被 VP 批评。', { experience: 5, stress: 25, reputation: -10, energy: -15 })
      ])
    ]),
    generateEvent('ib-2-e2', '客户会议', '你被允许参加与客户 CFO 的会议。', [
      generateOption('opt1', '认真记录，会后整理纪要', [
        generateOutcome(0.9, '你的会议纪要非常专业，被团队采纳。', { experience: 20, stress: 5, reputation: 10, energy: -10 })
      ]),
      generateOption('opt2', '尝试提问，展示专业见解', [
        generateOutcome(0.6, '你的问题很有见地，客户印象深刻。', { experience: 25, stress: 10, reputation: 20, energy: -5 }),
        generateOutcome(0.4, '问题不太合适，气氛有些尴尬。', { experience: 10, stress: 15, reputation: -5, energy: -5 })
      ])
    ])],
    [{ name: '王 VP', role: '副总裁', personality: '严厉但公正' }],
    { minLevel: 2, requiredCareer: 'investment-banking' }
  ),

  generateScene('ib-3', '并购重组项目', 'investment-banking',
    '团队接到一个大型并购项目，你负责行业研究和财务建模。',
    [generateEvent('ib-3-e1', '财务模型搭建', '你需要在 3 天内搭建完整的 DCF 估值模型。', [
      generateOption('opt1', '从零开始搭建精细模型', [
        generateOutcome(0.7, '模型质量很高，MD 在内部会议上表扬了你。', { experience: 30, stress: 20, reputation: 20, energy: -25, salary: 2000 }),
        generateOutcome(0.3, '模型有瑕疵但基本可用，团队帮你修正。', { experience: 20, stress: 25, reputation: 5, energy: -30 })
      ]),
      generateOption('opt2', '使用公司模板快速搭建', [
        generateOutcome(0.8, '你高效完成了任务，但模型深度不够。', { experience: 15, stress: 10, reputation: 8, energy: -15 }),
        generateOutcome(0.2, '模板有问题，你发现太晚了。', { experience: 10, stress: 20, reputation: -5, energy: -20 })
      ])
    ])],
    [{ name: '李 MD', role: '董事总经理', personality: '结果导向' }],
    { minLevel: 3, requiredCareer: 'investment-banking' }
  ),

  generateScene('ib-4', '债券发行', 'investment-banking',
    '你参与了一家大型企业的债券发行项目，负责路演材料准备。',
    [generateEvent('ib-4-e1', '路演 PPT 制作', '你需要制作面向机构投资者的路演材料。', [
      generateOption('opt1', '精心设计，数据可视化', [
        generateOutcome(0.8, '路演效果很好，投资者反馈积极。', { experience: 20, stress: 10, reputation: 15, energy: -15 }),
        generateOutcome(0.2, '材料不错但客户有额外修改意见。', { experience: 15, stress: 15, reputation: 5, energy: -20 })
      ]),
      generateOption('opt2', '使用标准模板快速完成', [
        generateOutcome(0.6, '材料合格但缺乏亮点。', { experience: 10, stress: 5, reputation: 3, energy: -10 }),
        generateOutcome(0.4, '材料被认为太简单，需要重做。', { experience: 8, stress: 15, reputation: -5, energy: -20 })
      ])
    ])],
    [{ name: '赵总监', role: '债券承销总监', personality: '注重细节' }],
    { minLevel: 2 }
  ),

  generateScene('ib-5', '尽职调查', 'investment-banking',
    '你负责对目标公司进行尽职调查，需要分析其财务报表和法律风险。',
    [generateEvent('ib-5-e1', '发现异常数据', '你在财务报表中发现了一些异常数据。', [
      generateOption('opt1', '深入调查，向 VP 报告', [
        generateOutcome(0.7, '你发现了一个重要的财务风险，团队决定调整估值。', { experience: 30, stress: 15, reputation: 25, energy: -20 }),
        generateOutcome(0.3, '调查发现数据其实是合理的，虚惊一场。', { experience: 15, stress: 10, reputation: 5, energy: -15 })
      ]),
      generateOption('opt2', '忽略异常，继续推进', [
        generateOutcome(0.3, '项目顺利进行，但你心里有些不安。', { experience: 5, stress: 10, reputation: 0, energy: -10 }),
        generateOutcome(0.7, '后来发现确实有问题，你因为没报告而被批评。', { experience: 5, stress: 30, reputation: -20, energy: -10 })
      ])
    ])],
    [{ name: '陈律师', role: '外部法律顾问', personality: '谨慎专业' }],
    { minLevel: 3 }
  ),

  generateScene('ib-6', '晋升答辩', 'investment-banking',
    '年度晋升季到了，你需要准备晋升 Associate 的答辩材料。',
    [generateEvent('ib-6-e1', '准备答辩', '你有两周时间准备晋升答辩。', [
      generateOption('opt1', '精心准备，展示项目成果', [
        generateOutcome(0.6, '答辩表现出色，成功晋升！', { experience: 50, stress: 20, reputation: 30, salary: 15000 }),
        generateOutcome(0.4, '答辩一般，需要再等一年。', { experience: 20, stress: 25, reputation: 5 })
      ]),
      generateOption('opt2', '简单准备，靠日常表现', [
        generateOutcome(0.4, '你的日常表现足够好，成功晋升。', { experience: 40, stress: 10, reputation: 20, salary: 15000 }),
        generateOutcome(0.6, '答辩准备不足，未能晋升。', { experience: 15, stress: 20, reputation: -5 })
      ])
    ])],
    [],
    { minLevel: 5 }
  ),

  generateScene('ib-7', '客户晚宴', 'investment-banking',
    'MD 邀请你参加与重要客户的商务晚宴。',
    [generateEvent('ib-7-e1', '社交技巧', '晚宴上客户聊起了你不太熟悉的话题。', [
      generateOption('opt1', '坦诚表示不了解，请教对方', [
        generateOutcome(0.8, '客户很欣赏你的谦虚态度，主动介绍。', { experience: 15, stress: -5, reputation: 10, energy: -5 }),
        generateOutcome(0.2, '话题很快被带过，你没有参与太多。', { experience: 5, stress: 5, reputation: 0, energy: -5 })
      ]),
      generateOption('opt2', '不懂装懂，强行参与', [
        generateOutcome(0.3, '你的回答让客户印象深刻。', { experience: 10, stress: 10, reputation: 10, energy: -5 }),
        generateOutcome(0.7, '你说错了什么，MD 赶紧转移话题。', { experience: 5, stress: 20, reputation: -15, energy: -5 })
      ])
    ])],
    [{ name: '刘客户', role: '企业 CEO', personality: '健谈' }],
    { minLevel: 2 }
  ),

  generateScene('ib-8', '跨部门协作', 'investment-banking',
    '你需要与合规部门合作，确保项目文件符合监管要求。',
    [generateEvent('ib-8-e1', '合规审查', '合规部门对一份文件提出了质疑。', [
      generateOption('opt1', '耐心沟通，逐条解释', [
        generateOutcome(0.8, '合规部门理解了你的做法，文件通过审查。', { experience: 15, stress: 5, reputation: 10, energy: -10 }),
        generateOutcome(0.2, '需要修改部分内容，但总体顺利。', { experience: 10, stress: 10, reputation: 5, energy: -15 })
      ]),
      generateOption('opt2', '坚持己见，据理力争', [
        generateOutcome(0.4, '你的理由充分，合规部门让步了。', { experience: 10, stress: 15, reputation: 5, energy: -10 }),
        generateOutcome(0.6, '合规部门坚持意见，最终需要返工。', { experience: 8, stress: 20, reputation: -10, energy: -20 })
      ])
    ])],
    [{ name: '周合规', role: '合规专员', personality: '严格' }],
    { minLevel: 2 }
  ),

  generateScene('ib-9', '市场波动应对', 'investment-banking',
    '市场突然大幅波动，你负责的 IPO 项目定价面临挑战。',
    [generateEvent('ib-9-e1', '定价决策', '市场暴跌，原定定价可能过高。', [
      generateOption('opt1', '建议降低发行价', [
        generateOutcome(0.7, '调整后发行成功，市场认可度高。', { experience: 25, stress: 15, reputation: 20, energy: -15 }),
        generateOutcome(0.3, '客户对降价不满，但项目顺利完成。', { experience: 20, stress: 20, reputation: 5, energy: -15 })
      ]),
      generateOption('opt2', '维持原定定价', [
        generateOutcome(0.3, '市场接受度尚可，项目完成。', { experience: 15, stress: 20, reputation: 10, energy: -15 }),
        generateOutcome(0.7, '认购不足，项目被迫延期。', { experience: 10, stress: 30, reputation: -15, energy: -15 })
      ])
    ])],
    [],
    { minLevel: 4 }
  ),

  generateScene('ib-10', '实习生管理', 'investment-banking',
    '你晋升为 Associate，开始负责管理暑期实习生。',
    [generateEvent('ib-10-e1', '实习生犯错', '你指导的实习生提交了一份有错误的报告。', [
      generateOption('opt1', '耐心指导，帮助改正', [
        generateOutcome(0.8, '实习生进步很快，团队效率提升。', { experience: 20, stress: 5, reputation: 15, energy: -10 }),
        generateOutcome(0.2, '实习生能力有限，你需要自己重做。', { experience: 10, stress: 15, reputation: 5, energy: -20 })
      ]),
      generateOption('opt2', '直接自己重做', [
        generateOutcome(0.6, '报告质量很高，但你加班了。', { experience: 10, stress: 15, reputation: 5, energy: -20 }),
        generateOutcome(0.4, '实习生没有得到成长，团队效率降低。', { experience: 5, stress: 10, reputation: -5, energy: -15 })
      ])
    ])],
    [{ name: '小林', role: '暑期实习生', personality: '聪明但缺乏经验' }],
    { minLevel: 5 }
  ),

  generateScene('ib-11', '行业峰会', 'investment-banking',
    '公司派你参加行业峰会，代表团队了解最新市场动态。',
    [generateEvent('ib-11-e1', '峰会交流', '你在茶歇时遇到了竞争对手的分析师。', [
      generateOption('opt1', '友好交流，分享行业见解', [
        generateOutcome(0.7, '你们交换了有价值的行业信息。', { experience: 15, stress: -5, reputation: 10, energy: -5 }),
        generateOutcome(0.3, '对方很保守，你没获得太多信息。', { experience: 10, stress: 0, reputation: 5, energy: -5 })
      ]),
      generateOption('opt2', '保持距离，避免信息泄露', [
        generateOutcome(0.8, '你遵守了合规要求，安全起见。', { experience: 10, stress: 0, reputation: 5, energy: -5 }),
        generateOutcome(0.2, '你显得不太友好，可能影响行业关系。', { experience: 5, stress: 5, reputation: -5, energy: -5 })
      ])
    ])],
    [],
    { minLevel: 3 }
  ),

  generateScene('ib-12', '紧急项目', 'investment-banking',
    'MD 临时安排你加入一个紧急项目，需要 48 小时完成提案。',
    [generateEvent('ib-12-e1', '时间管理', '你同时有两个项目在进行，时间非常紧张。', [
      generateOption('opt1', '加班通宵，两个项目都推进', [
        generateOutcome(0.5, '你成功完成了两个项目，但身体很累。', { experience: 30, stress: 30, reputation: 20, energy: -35 }),
        generateOutcome(0.5, '精力分散，一个项目质量下降。', { experience: 20, stress: 25, reputation: 5, energy: -35 })
      ]),
      generateOption('opt2', '与 MD 沟通，请求延期', [
        generateOutcome(0.6, 'MD 理解你的情况，重新安排了优先级。', { experience: 15, stress: 5, reputation: 5, energy: -15 }),
        generateOutcome(0.4, 'MD 对你的能力产生怀疑。', { experience: 10, stress: 15, reputation: -10, energy: -15 })
      ])
    ])],
    [],
    { minLevel: 3 }
  ),

  generateScene('ib-13', '团队建设', 'investment-banking',
    '季度团建活动，团队成员一起参加户外拓展。',
    [generateEvent('ib-13-e1', '团队合作', '团队需要完成一个协作挑战。', [
      generateOption('opt1', '主动担任领导者', [
        generateOutcome(0.6, '你带领团队成功完成挑战，展现了领导力。', { experience: 15, stress: -10, reputation: 15, energy: -5 }),
        generateOutcome(0.4, '团队配合不够好，挑战失败。', { experience: 10, stress: 0, reputation: -5, energy: -10 })
      ]),
      generateOption('opt2', '作为普通队员参与', [
        generateOutcome(0.8, '你在团队中发挥了重要作用。', { experience: 10, stress: -10, reputation: 5, energy: -5 }),
        generateOutcome(0.2, '你存在感不强，但也不差。', { experience: 5, stress: -5, reputation: 0, energy: -5 })
      ])
    ])],
    [],
    { minLevel: 1 }
  ),

  generateScene('ib-14', '合规培训', 'investment-banking',
    '公司组织年度合规培训，涉及内幕交易和利益冲突。',
    [generateEvent('ib-14-e1', '培训测试', '培训结束后有一个合规知识测试。', [
      generateOption('opt1', '认真学习，仔细答题', [
        generateOutcome(0.9, '你高分通过测试，合规部门表扬了你。', { experience: 10, stress: 0, reputation: 5, energy: -5 }),
        generateOutcome(0.1, '题目有点难，但你还是通过了。', { experience: 8, stress: 5, reputation: 3, energy: -5 })
      ]),
      generateOption('opt2', '快速浏览，凭感觉答题', [
        generateOutcome(0.5, '你通过了测试。', { experience: 5, stress: 0, reputation: 0, energy: -3 }),
        generateOutcome(0.5, '你需要重新参加培训。', { experience: 3, stress: 10, reputation: -5, energy: -10 })
      ])
    ])],
    [],
    { minLevel: 1 }
  ),

  generateScene('ib-15', '跨境项目', 'investment-banking',
    '你参与了一个跨境并购项目，需要与海外团队协作。',
    [generateEvent('ib-15-e1', '跨文化沟通', '海外团队的工作方式与国内不同，产生了分歧。', [
      generateOption('opt1', '尊重差异，寻找共同点', [
        generateOutcome(0.8, '你们找到了有效的合作方式，项目推进顺利。', { experience: 25, stress: 10, reputation: 15, energy: -15 }),
        generateOutcome(0.2, '沟通成本高，但总体可控。', { experience: 15, stress: 15, reputation: 5, energy: -20 })
      ]),
      generateOption('opt2', '坚持自己的方式', [
        generateOutcome(0.3, '你的方式被证明更高效。', { experience: 15, stress: 15, reputation: 10, energy: -15 }),
        generateOutcome(0.7, '合作关系紧张，MD 出面调解。', { experience: 10, stress: 25, reputation: -15, energy: -15 })
      ])
    ])],
    [{ name: 'David', role: '海外团队负责人', personality: '直接坦诚' }],
    { minLevel: 4 }
  ),

  generateScene('ib-16', '内部转岗', 'investment-banking',
    '你考虑从 IPO 组转到 M&A 组，需要做出决定。',
    [generateEvent('ib-16-e1', '职业选择', '两个组的负责人都希望你加入。', [
      generateOption('opt1', '留在 IPO 组深耕', [
        generateOutcome(0.7, '你成为了 IPO 领域的专家，项目源源不断。', { experience: 20, stress: 5, reputation: 15, salary: 5000 }),
        generateOutcome(0.3, '市场不景气，IPO 项目减少。', { experience: 10, stress: 15, reputation: 0, salary: 0 })
      ]),
      generateOption('opt2', '转到 M&A 组', [
        generateOutcome(0.6, '新领域让你快速成长，视野更开阔。', { experience: 30, stress: 15, reputation: 10, salary: 5000 }),
        generateOutcome(0.4, '适应期较长，短期内表现一般。', { experience: 15, stress: 20, reputation: -5, salary: 0 })
      ])
    ])],
    [],
    { minLevel: 4 }
  ),

  generateScene('ib-17', '监管检查', 'investment-banking',
    '监管部门对公司进行例行检查，你负责的项目被抽查。',
    [generateEvent('ib-17-e1', '文件准备', '你需要准备所有相关文件应对检查。', [
      generateOption('opt1', '全面整理，确保合规', [
        generateOutcome(0.9, '检查顺利通过，监管部门对公司评价很高。', { experience: 20, stress: 10, reputation: 15, energy: -15 }),
        generateOutcome(0.1, '发现小问题但及时纠正。', { experience: 15, stress: 15, reputation: 5, energy: -20 })
      ]),
      generateOption('opt2', '快速准备，认为不会有问题', [
        generateOutcome(0.4, '检查基本通过。', { experience: 10, stress: 15, reputation: 5, energy: -10 }),
        generateOutcome(0.6, '发现问题，被要求整改。', { experience: 5, stress: 25, reputation: -15, energy: -15 })
      ])
    ])],
    [{ name: '监管员', role: '证监会检查员', personality: '严格专业' }],
    { minLevel: 3 }
  ),

  generateScene('ib-18', '年终奖', 'investment-banking',
    '年终奖发放季节，你的表现将决定奖金数额。',
    [generateEvent('ib-18-e1', '绩效评估', 'MD 与你进行年度绩效面谈。', [
      generateOption('opt1', '展示全年成果，争取高评级', [
        generateOutcome(0.6, '你获得了最高评级，年终奖丰厚。', { experience: 20, stress: 10, reputation: 10, salary: 30000 }),
        generateOutcome(0.4, '评级中等，年终奖一般。', { experience: 10, stress: 15, reputation: 0, salary: 10000 })
      ]),
      generateOption('opt2', '谦虚低调，等 MD 评价', [
        generateOutcome(0.5, 'MD 认可你的贡献，给了不错的评级。', { experience: 15, stress: 5, reputation: 5, salary: 20000 }),
        generateOutcome(0.5, 'MD 没有注意到你的全部贡献。', { experience: 8, stress: 10, reputation: -5, salary: 5000 })
      ])
    ])],
    [],
    { minLevel: 3 }
  ),

  generateScene('ib-19', '猎头接触', 'investment-banking',
    '一家猎头公司联系你，提供了一个竞争对手的高薪职位。',
    [generateEvent('ib-19-e1', '职业抉择', '猎头提供了一个薪资翻倍的机会。', [
      generateOption('opt1', '留在当前公司', [
        generateOutcome(0.7, '你的忠诚度被公司认可，获得了加薪。', { experience: 10, stress: -5, reputation: 10, salary: 10000 }),
        generateOutcome(0.3, '公司没有加薪，但你积累了更多经验。', { experience: 20, stress: 5, reputation: 5, salary: 0 })
      ]),
      generateOption('opt2', '接受新机会', [
        generateOutcome(0.6, '新环境让你快速成长，薪资大幅提升。', { experience: 25, stress: 15, reputation: 5, salary: 25000 }),
        generateOutcome(0.4, '新公司文化不适应，考虑再跳槽。', { experience: 15, stress: 25, reputation: -10, salary: 20000 })
      ])
    ])],
    [{ name: '猎头顾问', role: '猎头', personality: '善于说服' }],
    { minLevel: 5 }
  ),

  generateScene('ib-20', '上市敲钟', 'investment-banking',
    '你负责的 IPO 项目成功上市，团队受邀参加上市仪式。',
    [generateEvent('ib-20-e1', '庆祝时刻', '你站在交易所，看着自己参与的项目敲钟上市。', [
      generateOption('opt1', '与团队一起庆祝', [
        generateOutcome(1.0, '这是你职业生涯的重要里程碑，团队凝聚力更强了。', { experience: 30, stress: -20, reputation: 20, energy: 10 })
      ]),
      generateOption('opt2', '趁机拓展人脉', [
        generateOutcome(0.7, '你结识了多位上市公司高管。', { experience: 25, stress: -15, reputation: 15, energy: -5 }),
        generateOutcome(0.3, '社交收获一般，但心情很好。', { experience: 20, stress: -20, reputation: 10, energy: 10 })
      ])
    ])],
    [],
    { minLevel: 4 }
  )
];

// ============ 商业银行场景 (20个) ============
const cbScenes = [];
const cbNames = ['分行报到','对公业务','零售银行','风险管理','信贷审批','客户关系','产品设计','科技金融','合规检查','支行管理','贷款催收','资金运营','国际业务','私人银行','普惠金融','数字化转型','压力测试','监管报告','同业业务','行长办公会'];
const cbDescs = [
  '你被分配到一家大型商业银行的对公业务部，第一天报到。',
  '你负责为一家大型企业客户提供综合金融服务方案。',
  '你被调到零售银行部，负责个人理财产品的推广。',
  '风险管理部需要你评估一笔大额贷款的风险。',
  '信贷审批委员会讨论一笔有争议的贷款申请。',
  '一位重要客户对银行服务不满意，你需要处理投诉。',
  '你需要设计一款新的结构性存款产品。',
  '银行推进数字化转型，你被选入项目组。',
  '银保监会对分行进行合规检查。',
  '你被任命为一家支行的副行长。',
  '一笔贷款出现逾期，你需要制定催收方案。',
  '资金运营部需要优化资产负债管理策略。',
  '你需要为一笔跨境贸易融资设计方案。',
  '私人银行部邀请你服务高净值客户。',
  '你需要为小微企业设计普惠金融产品。',
  '银行启动数字化转型项目，你负责核心系统升级。',
  '你需要完成年度压力测试报告。',
  '月度监管报告截止日期临近。',
  '同业拆借市场出现波动，你需要做出决策。',
  '行长办公会讨论分行年度战略。'
];
const cbNpcs = [
  [{ name: '赵行长', role: '分行行长', personality: '稳重' }],
  [{ name: '钱经理', role: '企业财务总监', personality: '精明' }],
  [{ name: '孙导师', role: '高级客户经理', personality: '耐心' }],
  [{ name: '李风控', role: '风控总监', personality: '谨慎' }],
  [{ name: '周委员', role: '审批委员', personality: '严格' }],
  [{ name: '吴客户', role: 'VIP 客户', personality: '挑剔' }],
  [{ name: '郑产品', role: '产品经理', personality: '创新' }],
  [{ name: '王 IT', role: '科技总监', personality: '技术派' }],
  [{ name: '监管员', role: '银保监会检查员', personality: '严肃' }],
  [{ name: '张行长', role: '总行行长', personality: '战略眼光' }],
  [],[],[],[],[],[],[],[],[],[]
];

for (let i = 0; i < 20; i++) {
  const opt1 = [
    generateOutcome(0.7, '你表现出色，获得了领导和同事的认可。', { experience: 15 + i * 2, stress: 5 + i, reputation: 10 + i, energy: -10 - i }),
    generateOutcome(0.3, '表现一般，还有提升空间。', { experience: 8 + i, stress: 10 + i, reputation: 0, energy: -10 - i })
  ];
  const opt2 = [
    generateOutcome(0.6, '你稳妥地完成了任务。', { experience: 10 + i, stress: 5, reputation: 5, energy: -8 }),
    generateOutcome(0.4, '方法不太对，需要调整。', { experience: 5, stress: 15, reputation: -5, energy: -15 })
  ];

  cbScenes.push(generateScene(
    `cb-${i+1}`, cbNames[i], 'commercial-banking', cbDescs[i],
    [generateEvent(`cb-${i+1}-e1`, cbNames[i] + '挑战', `在${cbNames[i]}场景中，你面临一个关键决策。`, [
      generateOption('opt1', '积极主动，承担责任', opt1),
      generateOption('opt2', '谨慎行事，按部就班', opt2)
    ])],
    cbNpcs[i] || [],
    { minLevel: Math.ceil((i + 1) / 4) }
  ));
}

// ============ 证券公司场景 (20个) ============
const secScenes = [];
const secNames = ['研究所入职','撰写第一篇研报','路演推介','晨会发言','行业调研','模型更新','客户拜访','评级调整','IPO 承销','自营交易','资管产品设计','合规风控','投顾服务','量化策略','新三板项目','ABS 发行','做市商业务','债券交易','股指期货','年度策略会'];
const secDescs = [
  '你加入证券公司研究所，成为一名行业研究员。',
  '你需要撰写覆盖行业的首篇深度研究报告。',
  '你的研报受到关注，需要向机构投资者路演推介。',
  '晨会上你需要分享最新的研究观点。',
  '你被派往上市公司进行实地调研。',
  '你需要更新行业估值模型。',
  '你需要拜访重要的机构客户。',
  '你覆盖的公司即将发布财报，你需要调整评级。',
  '你参与了公司一个 IPO 承销项目。',
  '你被调到自营部门，负责股票投资。',
  '你需要设计一款新的资产管理产品。',
  '合规部门对你的研究报告提出了修改意见。',
  '你需要为零售客户提供投资建议。',
  '量化团队邀请你参与策略开发。',
  '你负责一个新三板挂牌项目。',
  '你参与了一个 ABS 产品的发行。',
  '你被分配做市商业务，负责提供买卖报价。',
  '债券市场波动，你需要做出交易决策。',
  '股指期货出现异常波动，你需要应对。',
  '年度策略会上你需要发表主题演讲。'
];

for (let i = 0; i < 20; i++) {
  const opt1 = [
    generateOutcome(0.7, '你的专业能力得到了充分展现。', { experience: 15 + i * 2, stress: 8 + i, reputation: 12 + i, energy: -12 - i }),
    generateOutcome(0.3, '结果一般，但你学到了新东西。', { experience: 10 + i, stress: 12 + i, reputation: 3, energy: -15 - i })
  ];
  const opt2 = [
    generateOutcome(0.6, '你稳扎稳打地完成了任务。', { experience: 10 + i, stress: 5, reputation: 5, energy: -8 }),
    generateOutcome(0.4, '方法不够好，效果一般。', { experience: 5, stress: 12, reputation: -3, energy: -12 })
  ];

  secScenes.push(generateScene(
    `sec-${i+1}`, secNames[i], 'securities', secDescs[i],
    [generateEvent(`sec-${i+1}-e1`, secNames[i], `在${secNames[i]}场景中，你需要做出关键决策。`, [
      generateOption('opt1', '深入研究，大胆创新', opt1),
      generateOption('opt2', '遵循惯例，稳健操作', opt2)
    ])],
    [],
    { minLevel: Math.ceil((i + 1) / 4) }
  ));
}

// ============ 基金公司场景 (20个) ============
const fundScenes = [];
const fundNames = ['基金公司入职','股票池筛选','基金经理助理','投资决策会','行业配置','个股调研','风险控制','业绩归因','渠道路演','产品设计','量化投资','FOF 配置','ESG 投资','港股通投资','打新策略','定增项目','可转债投资','ETF 管理','养老金投资','年度业绩排名'];
const fundDescs = [
  '你加入一家公募基金公司，在权益投资部担任研究员。',
  '你需要从 3000+ 股票中筛选出值得深入研究的标的。',
  '你被提拔为基金经理助理，参与投资决策。',
  '投资决策委员会讨论下季度的投资策略。',
  '你需要提出行业配置建议。',
  '你需要深入调研一家上市公司。',
  '风控部门提示你的持仓集中度超标。',
  '你需要分析基金的业绩归因。',
  '你需要向渠道客户路演推介基金。',
  '你需要设计一款新的主题基金产品。',
  '你被调到量化投资部，负责因子研究。',
  '你需要为 FOF 产品选择子基金。',
  '公司推出 ESG 投资策略，你负责研究。',
  '你需要通过港股通投资港股标的。',
  '你需要制定 IPO 打新策略。',
  '一个定增项目引起了你的关注。',
  '你需要评估可转债的投资价值。',
  '你被分配管理一只 ETF 产品。',
  '你负责养老金账户的投资管理。',
  '年底了，你需要关注基金的业绩排名。'
];

for (let i = 0; i < 20; i++) {
  const opt1 = [
    generateOutcome(0.7, '你的投资判断准确，收益表现优秀。', { experience: 18 + i * 2, stress: 10 + i, reputation: 15 + i, energy: -12 - i, salary: i * 500 }),
    generateOutcome(0.3, '市场波动超出预期，表现一般。', { experience: 10 + i, stress: 15 + i, reputation: 0, energy: -15 - i })
  ];
  const opt2 = [
    generateOutcome(0.6, '你采取了保守策略，收益平稳。', { experience: 10 + i, stress: 5, reputation: 5, energy: -8 }),
    generateOutcome(0.4, '过于保守，跑输了基准。', { experience: 5, stress: 12, reputation: -5, energy: -10 })
  ];

  fundScenes.push(generateScene(
    `fund-${i+1}`, fundNames[i], 'fund', fundDescs[i],
    [generateEvent(`fund-${i+1}-e1`, fundNames[i], `在${fundNames[i]}场景中，你需要做出投资决策。`, [
      generateOption('opt1', '积极投资，追求超额收益', opt1),
      generateOption('opt2', '稳健投资，控制风险', opt2)
    ])],
    [],
    { minLevel: Math.ceil((i + 1) / 4) }
  ));
}

// ============ 保险公司场景 (20个) ============
const insScenes = [];
const insNames = ['保险公司入职','精算模型学习','产品定价','核保决策','理赔处理','再保险安排','投资资产配置','偿付能力管理','渠道管理','保险科技','健康险设计','年金产品','车险定价','团体保险','反欺诈调查','精算报告','监管报告','资产负债管理','战略规划','行业论坛'];
const insDescs = [
  '你加入保险公司精算部，开始学习保险产品定价和风险评估。',
  '资深精算师教你使用专业精算软件。',
  '你需要为一款新的寿险产品进行定价。',
  '一笔大额保单需要你做核保决策。',
  '一个复杂的理赔案件需要你处理。',
  '你需要安排再保险以分散风险。',
  '保险资金运用部门需要你制定投资策略。',
  '你需要完成偿付能力评估报告。',
  '你需要管理保险代理人渠道。',
  '公司推进保险科技项目，你参与其中。',
  '你需要设计一款创新的健康险产品。',
  '你需要设计一款年金保险产品。',
  '车险综合改革，你需要重新定价。',
  '一家大型企业找你投保团体保险。',
  '你发现了一起可疑的保险欺诈案件。',
  '你需要准备年度精算报告。',
  '监管机构要求提交专项报告。',
  '你需要优化资产负债匹配策略。',
  '你参与公司五年战略规划的制定。',
  '你受邀在行业论坛上分享经验。'
];

for (let i = 0; i < 20; i++) {
  const opt1 = [
    generateOutcome(0.7, '你的专业能力得到了充分发挥。', { experience: 15 + i * 2, stress: 8 + i, reputation: 12 + i, energy: -12 - i }),
    generateOutcome(0.3, '遇到了一些挑战，但总体可控。', { experience: 10 + i, stress: 12 + i, reputation: 3, energy: -15 - i })
  ];
  const opt2 = [
    generateOutcome(0.6, '你稳妥地完成了任务。', { experience: 10 + i, stress: 5, reputation: 5, energy: -8 }),
    generateOutcome(0.4, '效果一般，还有改进空间。', { experience: 5, stress: 10, reputation: -3, energy: -10 })
  ];

  insScenes.push(generateScene(
    `ins-${i+1}`, insNames[i], 'insurance', insDescs[i],
    [generateEvent(`ins-${i+1}-e1`, insNames[i], `在${insNames[i]}场景中，你需要做出专业决策。`, [
      generateOption('opt1', '专业深入，追求精确', opt1),
      generateOption('opt2', '稳健保守，控制风险', opt2)
    ])],
    [],
    { minLevel: Math.ceil((i + 1) / 4) }
  ));
}

// 汇总所有场景
const allScenes = [...ibScenes, ...cbScenes, ...secScenes, ...fundScenes, ...insScenes];

console.log(`\n📊 场景统计:`);
console.log(`  投行: ${ibScenes.length} 个`);
console.log(`  商行: ${cbScenes.length} 个`);
console.log(`  证券: ${secScenes.length} 个`);
console.log(`  基金: ${fundScenes.length} 个`);
console.log(`  保险: ${insScenes.length} 个`);
console.log(`  总计: ${allScenes.length} 个\n`);

// 导出场景数据
export { allScenes };

// 直接运行时的初始化逻辑
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/financial-survival-game');
    console.log('✅ Connected to MongoDB');

    await Scene.deleteMany({});
    console.log('🗑️  Cleared existing scenes');

    await Scene.insertMany(allScenes);
    console.log(`✅ Inserted ${allScenes.length} scenes`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}
