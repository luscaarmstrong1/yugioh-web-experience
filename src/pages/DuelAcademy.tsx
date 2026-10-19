import React, { useState } from 'react';
import { ShieldCheck, Award, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import styles from './DuelAcademy.module.css';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZZES: QuizQuestion[] = [
  {
    question: 'Quantos monstros são necessários como Tributo para Invocar Normalmente um monstro de Nível 7 ou superior?',
    options: ['Nenhum tributo', '1 monstro', '2 monstros', '3 monstros'],
    correctIndex: 2,
    explanation: 'Monstros de Nível 5 e 6 exigem 1 Tributo. Monstros de Nível 7 ou mais exigem 2 Tributos (exceto deuses egípcios ou cartas com textos específicos).'
  },
  {
    question: 'Durante o primeiro turno do duelo (Turno 1), o duelista que começa pode declarar ataque?',
    options: ['Sim, diretamente', 'Sim, apenas se houver monstro oponente', 'Não, a Battle Phase não ocorre no Turno 1', 'Apenas com monstros de Nível 4'],
    correctIndex: 2,
    explanation: 'Pelas regras modernas oficiais, o primeiro jogador do Duelo não tem Battle Phase no seu primeiro turno e não pode comprar carta na Draw Phase 1.'
  },
  {
    question: 'Como se resolve uma Corrente (Chain) em Yu-Gi-Oh! quando múltiplos efeitos são ativados?',
    options: ['Primeiro a ser ativado resolve primeiro (FIFO)', 'Em ordem decrescente: O último ativado resolve primeiro (LIFO)', 'O jogador com maior LP escolhe a ordem', 'Aleatoriamente'],
    correctIndex: 1,
    explanation: 'Correntes sempre resolvem de trás para frente (Last In, First Out). O elo mais recente da corrente é resolvido primeiro.'
  }
];

export const DuelAcademy: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const q = QUIZZES[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showResult) return;
    setSelectedOpt(idx);
    setShowResult(true);
    if (idx === q.correctIndex) {
      setScore(s => s + 100);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowResult(false);
    setCurrentIdx((currentIdx + 1) % QUIZZES.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ShieldCheck size={24} color="#d9ad56" />
        <div>
          <h2 className={styles.title}>DUEL ACADEMY</h2>
          <p className={styles.sub}>Academia de Duelistas — Domínio de Regras Oficiais e Julgamento de Correntes</p>
        </div>
        <div className={styles.scoreBadge}>
          <Award size={16} />
          <span>Pontuação: {score} DP</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.questionCard}>
          <div className={styles.qHeader}>
            <HelpCircle size={18} color="#00d5ff" />
            <span>Questão {currentIdx + 1} de {QUIZZES.length}</span>
          </div>

          <h3 className={styles.questionText}>{q.question}</h3>

          <div className={styles.optionsList}>
            {q.options.map((opt, i) => {
              let btnClass = styles.optBtn;
              if (showResult) {
                if (i === q.correctIndex) btnClass += ` ${styles.correct}`;
                else if (i === selectedOpt) btnClass += ` ${styles.wrong}`;
              }
              return (
                <button
                  key={i}
                  className={btnClass}
                  onClick={() => handleSelectOption(i)}
                  disabled={showResult}
                >
                  <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
                  <span className={styles.optText}>{opt}</span>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={styles.explanationBox}>
              <div className={styles.resStatus}>
                {selectedOpt === q.correctIndex ? (
                  <span className={styles.correctStatus}><CheckCircle2 size={16} /> Resposta Correta! (+100 DP)</span>
                ) : (
                  <span className={styles.wrongStatus}><XCircle size={16} /> Resposta Incorreta</span>
                )}
              </div>
              <p className={styles.expText}>{q.explanation}</p>
              <button className={styles.nextBtn} onClick={handleNext}>
                Próxima Questão
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
