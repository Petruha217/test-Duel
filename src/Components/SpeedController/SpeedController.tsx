import React, { FC, memo, ReactNode } from 'react';
import style from './SpeedController.module.css'

interface SpeedControllerProps {
  className?: string;
  speed: number;
  setSpeed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  min: number;
  max: number;
  step: number;
}

export const SpeedController: FC<SpeedControllerProps> = memo(({ speed, setSpeed, children, min, max, step }) => {

  return (
    <div className={style.speedController}>
      <label htmlFor="speedcontroller" >
        {children}
        <input
          type="range"
          className={style.input}
          min={min}
          max={max}
          step={step}
          value={speed}
          id="speedcontroller"
          onChange={setSpeed}
        />
      </label>
    </div>
  );
})

