import axios from 'axios';

class GLMService {
  constructor() {
    this.apiKey = process.env.GLM_API_KEY;
    this.apiUrl = process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    this.model = 'glm-4-flash';
  }

  /**
   * 解析自然语言角色描述
   */
  async parseCharacterDescription(description) {
    const prompt = `
你是一个专业的角色分析师。请分析以下玩家对数字人角色的自然语言描述，并提取结构化信息。

玩家描述：
${description}

请以 JSON 格式返回以下信息：
{
  "name": "角色名称",
  "traits": {
    "personality": "性格特点 (如：外向、内向、谨慎、冒险等)",
    "character": "品格特质 (如：正直、圆滑、坚韧等)",
    "workStyle": "工作风格 (如：结果导向、过程导向、团队合作等)"
  },
  "skills": [
    {"name": "技能名称", "level": 1-10, "category": "technical|soft|management"}
  ],
  "careerDirection": "investment-banking|commercial-banking|securities|fund|insurance|undecided",
  "background": "角色背景故事 (100 字以内)"
}

只返回 JSON，不要其他内容。
`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            { role: 'system', content: '你是一个专业的角色分析助手，擅长从自然语言描述中提取结构化信息。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      // 提取 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('GLM parse character error:', error);
      throw error;
    }
  }

  /**
   * AI 决策引擎 - 为角色在当前场景做出决策
   */
  async makeDecision(character, scene, events) {
    const prompt = `
你是一个金融职场生存游戏的 AI 决策引擎。请根据以下信息为角色做出最佳决策。

角色信息：
- 名称：${character.name}
- 性格：${character.traits.personality}
- 品格：${character.traits.character}
- 工作风格：${character.traits.workStyle}
- 当前职位：${character.status.currentJob}
- 当前公司：${character.status.currentCompany}
- 等级：${character.status.level}
- 经验值：${character.status.experience}
- 精力：${character.status.energy}
- 压力：${character.status.stress}
- 声誉：${character.status.reputation}
- 技能：${character.skills.map(s => `${s.name}(Lv${s.level})`).join(', ')}

当前场景：
- 场景名称：${scene.name}
- 场景描述：${scene.description}
- 可用事件：${events.map(e => e.name).join(', ')}

请分析当前情况，并做出决策。返回 JSON 格式：
{
  "chosenEvent": "选择的事件 ID",
  "chosenOption": "选择的选项 ID",
  "reasoning": "决策理由 (100 字以内)",
  "actionDescription": "行动描述 (200 字以内)"
}

决策要考虑：
1. 角色的性格和品格
2. 当前状态 (精力、压力等)
3. 长期职业发展
4. 风险与收益的平衡

只返回 JSON，不要其他内容。
`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            { role: 'system', content: '你是金融职场生存游戏的 AI 决策引擎，为角色做出符合其特质的最优决策。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI decision');
    } catch (error) {
      console.error('GLM decision error:', error);
      throw error;
    }
  }

  /**
   * 生成场景事件结果描述
   */
  async generateOutcomeDescription(event, outcome, character) {
    const prompt = `
请为以下游戏事件生成生动的结果描述 (200-300 字)：

事件名称：${event.name}
事件描述：${event.description}
结果：${outcome.result}
角色：${character.name} (${character.status.currentJob})

要求：
1. 描写具体场景和对话
2. 体现角色的性格特点
3. 说明对职业发展的影响
4. 语言生动有趣
`;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            { role: 'system', content: '你是游戏叙事助手，擅长生成生动的职场故事。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.9,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('GLM outcome description error:', error);
      return outcome.result;
    }
  }
}

export default new GLMService();
