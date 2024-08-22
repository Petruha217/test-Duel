import React, { useEffect, useState, FC, memo } from 'react';
import style from "./Scoreboard.module.css"
import clsx from 'clsx'
import { myGame } from '../Canvas/InitialCanvas';

interface ScoreboardProps {
  className?: string
}
export const Scoreboard: FC<ScoreboardProps> = memo(({ className }) => {
  const [score, setScore] = useState<{ left: number, right: number }>({ left: 0, right: 0 })
  useEffect(() => {
    let id = setInterval(() => {
      setScore({
        left: myGame.leftScore,
        right: myGame.rightScore
      })
    }, 300)
    return () => {
      clearInterval(id)
    }
  }, [setScore])
  return (
    <div className={clsx(style.wrapper, className)}>
      <p className={style.title}>Общий счёт</p>
      <div className={style.scoreboard}>
        <div className={style.cell}>{score.left}</div>
        <div className={style.cell}>{score.right}</div>
      </div>
    </div>
  );
})

