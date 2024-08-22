import React, { useCallback, useState, FC } from 'react';
import { Button, Canvas, ColorsSpell, Scoreboard, SpeedController } from '../../Components';
import style from './MainPage.module.css'


const MainPage: FC = () => {
  const [isRuning, setIsRuning] = useState<boolean>(false)
  const [colorSpell, setColorSpell] = useState<{ left: string, right: string }>({ left: "red", right: 'yellow' })
  const [isVisibilityMenu, setIsVisibilityMenu] = useState<{ left: boolean, right: boolean }>({ left: false, right: false })
  const [speedHero, setSpeedHero] = useState<{ left: number, right: number }>({ left: 1, right: 1 })
  const [rateOfFire, setRateOfFire] = useState<{ left: number, right: number }>({ left: 20, right: 20 })

  const changeIsRuning = () => {
    setIsRuning(true)
  }

  const setSpeedLeftHero = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedHero(prevState => ({ ...prevState, left: +e.target.value }))
  }, [])

  const setRateOfFireLeft = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRateOfFire(prevState => ({ ...prevState, left: +e.target.value }))
  }, [])

  const setSpeedRightHero = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedHero(prevState => ({ ...prevState, right: +e.target.value }))
  }, [])

  const setRateOfFireRight = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRateOfFire(prevState => ({ ...prevState, right: +e.target.value }))
  }, [])

  const chengeColorSpell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'left') {
      setColorSpell(prevState => ({ ...prevState, left: e.target.id }))
    } else {
      setColorSpell(prevState => ({ ...prevState, right: e.target.id }))
    }
  }, [])

  const closeMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.id === 'myCanvasleft') {
      setIsVisibilityMenu(prevState => ({ ...prevState, left: false }))
    } else {
      setIsVisibilityMenu(prevState => ({ ...prevState, right: false }))
    }
  }, [])

  return (
    <div className={style.mainPage}>
      <Scoreboard className={style.scoreboard_wrapper} />
      <Canvas
        isRuning={isRuning}
        colorSpell={colorSpell}
        speedHero={speedHero}
        rateOfFire={rateOfFire}
        setIsVisibilityMenu={setIsVisibilityMenu}
        className={style.canvas_wrapper}
      ></Canvas>
      <div className={style.speedControllerLeft_wrapper} >
        <SpeedController speed={speedHero.left} setSpeed={setSpeedLeftHero} min={1} max={5} step={1}>
          Скорость героя
        </SpeedController>
        <SpeedController speed={rateOfFire.left} setSpeed={setRateOfFireLeft} min={20} max={60} step={10}>
          Скорострельность
        </SpeedController>
      </div>
      <div className={style.speedControllerRight_wrapper} >
        <SpeedController speed={speedHero.right} setSpeed={setSpeedRightHero} min={1} max={5} step={1}>
          Скорость героя
        </SpeedController>
        <SpeedController speed={rateOfFire.right} setSpeed={setRateOfFireRight} min={20} max={60} step={10}>
          Скорострельность
        </SpeedController>
      </div>
      <Button handleClick={changeIsRuning} className={style.button_wrapper}>
        Начать игру
      </Button>
      <ColorsSpell className={style.colorsSpellLeft_wrapper}
        name='left'
        chengeChecked={chengeColorSpell}
        colorSpell={colorSpell.left}
        visibility={isVisibilityMenu.left}
        closeMenu={closeMenu} />
      <ColorsSpell className={style.colorsSpellRight_wrapper}
        name='right'
        chengeChecked={chengeColorSpell}
        colorSpell={colorSpell.right}
        visibility={isVisibilityMenu.right}
        closeMenu={closeMenu} />
    </div>
  );
};

export default MainPage;