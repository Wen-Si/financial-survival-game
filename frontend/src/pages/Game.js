import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function Game({ user }) {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCharacter();
  }, [characterId]);

  const loadCharacter = async () => {
    try {
      const response = await api.get(`/character/${characterId}`);
      setCharacter(response.data.character);
      
      const logResponse = await api.get(`/game/log/${characterId}`);
      setGameLog(logResponse.data.gameLog || []);
    } catch (error) {
      console.error('Failed to load character:', error);
      setMessage('Failed to load character');
    } finally {
      setLoading(false);
    }
  };

  const executeTurn = async () => {
    if (playing) return;
    
    setPlaying(true);
    setMessage('');
    
    try {
      const response = await api.post(`/game/turn/${characterId}`);
      setCharacter(response.data.character);
      
      // Add new log entry
      const newLog = {
        timestamp: new Date(),
        scene: response.data.turn.scene,
        event: response.data.turn.event,
        outcome: response.data.turn.outcome.description,
        impact: response.data.turn.outcome.impact
      };
      setGameLog(prev => [newLog, ...prev]);
      
      setMessage('回合完成！');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to execute turn');
    } finally {
      setPlaying(false);
    }
  };

  const executeAutoPlay = async () => {
    if (autoPlay) {
      setAutoPlay(false);
      return;
    }
    
    setAutoPlay(true);
    setMessage('自动播放中...');
    
    try {
      const response = await api.post(`/game/auto/${characterId}`, { turns: 5 });
      setCharacter(response.data.character);
      setMessage(`完成 ${response.data.results.length} 个回合`);
      
      // Reload to get updated log
      await loadCharacter();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Auto play failed');
    } finally {
      setAutoPlay(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card">
          <h2 className="text-xl mb-4">Character not found</h2>
          <Link to="/dashboard" className="btn-primary">
            返回仪表板
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/dashboard" className="text-white">
            ← 返回
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {character.name} 的职场之旅
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Stats */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">角色状态</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">等级</span>
                    <span className="font-bold">Lv.{character.status.level}</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill bg-purple-500"
                      style={{ width: `${Math.min(100, (character.status.experience / (character.status.level * 100)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    EXP: {character.status.experience} / {character.status.level * 100}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">精力</span>
                    <span className="font-bold">{character.status.energy}/100</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill bg-green-500"
                      style={{ width: `${character.status.energy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">压力</span>
                    <span className="font-bold">{character.status.stress}/100</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className={`stat-fill ${character.status.stress > 70 ? 'bg-red-500' : 'bg-yellow-500'}`}
                      style={{ width: `${character.status.stress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">声誉</span>
                    <span className="font-bold">{character.status.reputation}/100</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill bg-blue-500"
                      style={{ width: `${character.status.reputation}%` }}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">职位:</span>
                      <p className="font-bold">{character.status.currentJob}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">公司:</span>
                      <p className="font-bold">{character.status.currentCompany}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">场景:</span>
                      <p className="font-bold text-xs">{character.status.currentScene}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">薪资:</span>
                      <p className="font-bold">¥{character.status.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-bold mb-2">技能</h3>
                  {character.skills && character.skills.length > 0 ? (
                    <div className="space-y-2">
                      {character.skills.map((skill, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span>{skill.name}</span>
                            <span className="font-bold">Lv.{skill.level}</span>
                          </div>
                          <div className="stat-bar">
                            <div
                              className="stat-fill bg-indigo-500"
                              style={{ width: `${(skill.level / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">暂无技能</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card mt-6">
              <h2 className="text-xl font-bold mb-4">操作</h2>
              
              {message && (
                <div className={`mb-4 p-3 rounded ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={executeTurn}
                  disabled={playing || character.status.energy < 10}
                  className="btn-primary w-full"
                >
                  {playing ? '执行中...' : '执行一个回合'}
                </button>

                <button
                  onClick={executeAutoPlay}
                  disabled={autoPlay || character.status.energy < 10}
                  className="btn-secondary w-full"
                >
                  {autoPlay ? '停止自动' : '自动播放 (5 回合)'}
                </button>

                {character.status.energy < 10 && (
                  <p className="text-sm text-red-600 text-center">
                    精力不足，需要休息
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Game Log */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">游戏日志</h2>
              
              {gameLog.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p>还没有游戏记录</p>
                  <p className="text-sm">点击"执行一个回合"开始游戏</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {gameLog.map((log, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{log.event}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{log.outcome}</p>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        {log.impact?.experience !== 0 && (
                          <div className={log.impact?.experience > 0 ? 'text-green-600' : 'text-red-600'}>
                            EXP: {log.impact?.experience > 0 ? '+' : ''}{log.impact?.experience}
                          </div>
                        )}
                        {log.impact?.stress !== 0 && (
                          <div className={log.impact?.stress < 0 ? 'text-green-600' : 'text-red-600'}>
                            压力：{log.impact?.stress > 0 ? '+' : ''}{log.impact?.stress}
                          </div>
                        )}
                        {log.impact?.reputation !== 0 && (
                          <div className={log.impact?.reputation > 0 ? 'text-green-600' : 'text-red-600'}>
                            声誉：{log.impact?.reputation > 0 ? '+' : ''}{log.impact?.reputation}
                          </div>
                        )}
                        {log.impact?.salary !== 0 && (
                          <div className="text-blue-600">
                            薪资：{log.impact?.salary > 0 ? '+' : ''}¥{log.impact?.salary}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
