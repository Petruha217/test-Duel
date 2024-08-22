import { useCallback, useEffect, useState, FC, memo } from 'react'
import { InitialCanvas, myGame } from './InitialCanvas'

interface CanvasProps {
  className?: string;
  isRuning: boolean;
  colorSpell: { left: string, right: string };
  speedHero: { left: number, right: number };
  setIsVisibilityMenu: React.Dispatch<React.SetStateAction<{
    left: boolean;
    right: boolean;
  }>>;
  rateOfFire: { left: number, right: number };
}

export const Canvas: FC<CanvasProps> = memo(({ isRuning, colorSpell, className, speedHero, setIsVisibilityMenu, rateOfFire }) => {
  const [offset, setOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: -1, y: -1 })
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    let left = myGame.leftHero.checkCursorIntoHero()
    let right = myGame.rightHero.checkCursorIntoHero()
    setIsVisibilityMenu(prev => {
      if (left) {
        return { ...prev, left: left }
      }
      if (right) {
        return { ...prev, right: right }
      }
      return prev
    })
  }, [setIsVisibilityMenu])

  useEffect(() => {
    myGame.run()
    myGame.setSpeedHeroes(speedHero.left, speedHero.right)
    myGame.setColorSpells(colorSpell.left, colorSpell.right)
    myGame.setRateOfFire(rateOfFire.left, rateOfFire.right)
    if (isRuning) {
      myGame.start()
    }
    return () => {
      window.cancelAnimationFrame(myGame.animationId)
    }
  }, [isRuning, colorSpell, speedHero, rateOfFire])

  useEffect(() => {
    myGame.setOffsetMouse(offset)
  }, [offset])

  return (
    <InitialCanvas
      className={className}
      handleMouseMove={handleMouseMove}
      handleMouseLeave={handleMouseLeave}
      handleClick={handleClick} />
  )
})
