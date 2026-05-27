import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function CharacterCreate({ user }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/character/create', {
        description
      });
      
      // Auto-start game for the new character
      await api.post(`/game/start/${response.data.character._id}`);
      
      navigate(`/game/${response.data.character._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create character');
    } finally {
      setLoading(false);
    }
  };

  const exampleDescriptions = [
    "李明，25 岁，性格外向开朗，善于沟通。本科毕业于复旦大学金融专业，持有 CFA 一级证书。专业技能包括财务分析、估值建模、行业研究。希望在投资银行领域发展，目标是成为投行董事总经理。工作风格结果导向，能承受高压。",
    "王芳，23 岁，性格谨慎细致，逻辑思维强。硕士毕业于北京大学经济学专业。擅长数据分析、风险管理、量化分析。希望在商业银行风险管理部发展。为人正直，注重合规，团队合作意识强。",
    "张伟，26 岁，性格沉稳内敛，研究能力强。博士毕业于清华大学金融工程专业。精通 Python、量化投资、衍生品定价。希望在基金公司量化投资部发展。追求长期价值，独立思考，不随波逐流。"
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="text-white mb-4 inline-block">
          ← 返回仪表板
        </Link>

        <div className="card">
          <h1 className="text-3xl font-bold mb-2">创建你的数字人角色</h1>
          <p className="text-gray-600 mb-6">
            用自然语言描述你想扮演的角色，AI 将解析并创建角色
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                角色描述 *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="8"
                placeholder="请描述你的角色，包括：
- 姓名、年龄
- 性格特点（如：外向/内向、谨慎/冒险等）
- 品格特质（如：正直、坚韧、圆滑等）
- 教育背景和专业技能
- 职业发展方向（投行/商行/证券/基金/保险）
- 工作风格和价值观

示例：
李明，25 岁，性格外向开朗，善于沟通。本科毕业于复旦大学金融专业，持有 CFA 一级证书。专业技能包括财务分析、估值建模、行业研究。希望在投资银行领域发展..."
                required
              />
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">示例描述：</h3>
              <div className="space-y-2">
                {exampleDescriptions.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setDescription(example)}
                    className="text-left text-sm text-purple-600 hover:underline w-full"
                  >
                    示例 {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">💡 提示</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 描述越详细，AI 解析越准确</li>
                <li>• 可以包含教育背景、证书、技能等</li>
                <li>• 明确职业发展方向有助于 AI 做出更合适的决策</li>
                <li>• 性格和品格会影响 AI 的决策风格</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || description.length < 20}
              className="btn-primary w-full"
            >
              {loading ? '创建中...' : '创建角色'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreate;
