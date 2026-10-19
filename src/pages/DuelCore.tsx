import React, { useState } from 'react';
import { User, Volume2, Shield, Download, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import styles from './DuelCore.module.css';

export const DuelCore: React.FC = () => {
  const [userName, setUserName] = useState('Yugi Muto');
  const [graphicQuality, setGraphicQuality] = useState('ultra');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleExportData = () => {
    const data = {
      user: userName,
      exportedAt: new Date().toISOString(),
      duelStats: { duelsWon: 14, duelsLost: 2, totalDuels: 16 }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duelverse_profile_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <User size={24} color="#d9ad56" />
        <div>
          <h2 className={styles.title}>DUEL CORE — PERFIL & CONFIGURAÇÕES</h2>
          <p className={styles.sub}>Central do Duelista, Gerenciador de Armazenamento Offline e Opções de Gráficos</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarCircle}>
              <img 
                src="https://images.ygoprodeck.com/images/cards_cropped/46986414.jpg" 
                alt="Avatar"
                className={styles.avatarImg} 
              />
            </div>
            <div>
              <div className={styles.profileRank}>Rank: Faraó Supremo</div>
              <input 
                type="text" 
                value={userName} 
                onChange={e => setUserName(e.target.value)}
                className={styles.nameInput}
              />
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statTile}>
              <span className={styles.num}>16</span>
              <span className={styles.desc}>Duelos Realizados</span>
            </div>
            <div className={styles.statTile}>
              <span className={styles.num} style={{ color: '#35ba83' }}>87.5%</span>
              <span className={styles.desc}>Taxa de Vitória</span>
            </div>
            <div className={styles.statTile}>
              <span className={styles.num} style={{ color: '#d9ad56' }}>1.450 DP</span>
              <span className={styles.desc}>Pontos Duel Academy</span>
            </div>
          </div>

          {/* Settings Section */}
          <div className={styles.settingsGroup}>
            <div className={styles.groupTitle}>Configurações de Experiência & Gráficos</div>

            <div className={styles.settingItem}>
              <span>Qualidade Gráfica de Efeitos Foil & Partículas</span>
              <select 
                value={graphicQuality} 
                onChange={e => setGraphicQuality(e.target.value)}
                className={styles.select}
              >
                <option value="ultra">Ultra (60 FPS + Shaders Dinâmicos)</option>
                <option value="high">Alta (Hologramas e Parallax)</option>
                <option value="eco">Econômica (Redução de Movimento)</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <span>Efeitos Sonoros do Duelo Disk</span>
              <button 
                className={`${styles.toggleBtn} ${soundEnabled ? styles.toggleOn : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? 'Ativado (100%)' : 'Mudo (Desativado)'}
              </button>
            </div>

            <div className={styles.settingItem}>
              <span>Backup e Exportação de Coleção</span>
              <button className={styles.exportBtn} onClick={handleExportData}>
                <Download size={14} />
                <span>Exportar Save em JSON</span>
              </button>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSaveSettings}>
            {saveSuccess ? (
              <>
                <CheckCircle2 size={16} />
                <span>Configurações Salvas no Dispositivo!</span>
              </>
            ) : (
              <span>Salvar Preferências</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
