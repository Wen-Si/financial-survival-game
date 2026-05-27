import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Dashboard({ user, onLogout }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await api.get('/character/list');
      setCharacters(response.data.characters);
    } catch (error) {
      console.error('Failed to load characters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              金融职场生存者
            </h1>
            <p className="text-white opacity-80">
              欢迎，{user?.username}！
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            退出登录
          </button>
        </div>

        {/* Characters Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">我的角色</h2>
            <Link
              to="/create-character"
              className="btn-primary"
            >
              + 创建新角色
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">加载中...</div>
          ) : characters.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="mb-4">还没有角色</p>
              <p>创建你的第一个数字人角色，开始金融职场之旅！</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((char) => (
                <div
                  key={char._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{char.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {char.careerDirection === 'undecided' 
                      ? '职业方向：未定' 
                      : `职业方向：${char.careerDirection}`}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>等级</span>
                      <span className="font-bold">Lv.{char.status.level}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill bg-purple-500"
                        style={{ width: `${(char.status.experience / (char.status.level * 100)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">职位:</span>
                      <span className="ml-2">{char.status.currentJob}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">声誉:</span>
                      <span className="ml-2">{char.status.reputation}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">精力:</span>
                      <span className="ml-2">{char.status.energy}/100</span>
                    </div>
                    <div>
                      <span className="text-gray-600">压力:</span>
                      <span className="ml-2">{char.status.stress}/100</span>
                    </div>
                  </div>
                  <Link
                    to={`/game/${char._id}`}
                    className="btn-primary w-full block text-center"
                  >
                    {char.isActive ? '继续游戏' : '查看角色'}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-4">游戏说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">🎯 如何开始</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>点击"创建新角色"</li>
                <li>用自然语言描述你的角色（性格、技能、职业方向等）</li>
                <li>AI 将解析并创建你的数字人</li>
                <li>开始游戏，AI 将自动操控角色发展</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold mb-2">🎮 游戏特色</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>AI 驱动的智能决策</li>
                <li>100+ 金融职场场景</li>
                <li>五大职业道路选择</li>
                <li>多用户多实例支持</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
