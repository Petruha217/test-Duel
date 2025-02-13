import { memo, useEffect, useRef, FC } from 'react'
import style from './Canvas.module.css'
import clsx from 'clsx'
import { Game } from './game'

interface InitialCanvasProps {
  className?: string
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  handleClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  handleMouseLeave: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
}

let myGame: Game

const InitialCanvas: FC<InitialCanvasProps> = memo(({ className, handleMouseMove, handleClick, handleMouseLeave }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const gameRef = useRef<Game | null>(null)

  useEffect(() => {
    let mycanvas: HTMLCanvasElement | null
    if (canvasRef.current) {
      mycanvas = canvasRef.current
      contextRef.current = mycanvas.getContext('2d')
      if (contextRef.current) {
        gameRef.current = new Game(contextRef.current, mycanvas)
        myGame = gameRef.current
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={clsx(style.mycanvas, className)}
      width='600'
      height='400'
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}>
      Please update your browser to see the website in the correct format.
    </canvas>
  )
})

export { InitialCanvas, myGame }
