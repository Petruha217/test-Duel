import { Hero } from './Hero'

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  leftHero: Hero
  rightHero: Hero
  leftScore: number
  rightScore: number
  animationId: number

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftHero = new Hero(this.ctx, this.canvas, 'left');
    this.rightHero = new Hero(this.ctx, this.canvas, 'right')
    this.leftScore = 0;
    this.rightScore = 0;
    this.animationId = 0;
  }

  setColorSpells(left: string, right: string) {
    this.leftHero.colorSpell = left
    this.rightHero.colorSpell = right
  }

  setSpeedHeroes(left: number, right: number) {
    this.leftHero.velocity = left
    this.rightHero.velocity = right
  }

  setRateOfFire(left: number, right: number) {
    this.leftHero.rateOfFire = left
    this.rightHero.rateOfFire = right
  }

  setOffsetMouse(offset: { x: number, y: number }) {
    this.leftHero.xMouse = offset.x
    this.leftHero.yMouse = offset.y
    this.rightHero.xMouse = offset.x
    this.rightHero.yMouse = offset.y
  }

  hitToHero() {
    this.rightHero.arrSpell = this.rightHero.arrSpell.filter((spell) => {
      if (this.leftHero.checkGetHitBySpell(spell)) {
        ++this.rightScore
      }
      if (this.leftHero.checkGetHitBySpell(spell) || spell.x < 20) {
        return false
      } else {
        return true
      }
    })

    this.leftHero.arrSpell = this.leftHero.arrSpell.filter((spell) => {
      if (this.rightHero.checkGetHitBySpell(spell)) {
        ++this.leftScore
      }
      if (this.rightHero.checkGetHitBySpell(spell) || spell.x > 580) {
        return false
      } else {
        return true
      }
    })
  }

  update() {
    this.leftHero.move()
    this.rightHero.move()
    this.leftHero.collideWithBorder()
    this.rightHero.collideWithBorder()
    this.leftHero.collideWithCursor()
    this.rightHero.collideWithCursor()
    this.leftHero.createArrSpell()
    this.rightHero.createArrSpell()
    this.leftHero.moveSpell()
    this.rightHero.moveSpell()
    this.hitToHero()

  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.leftHero.createHero()
    this.rightHero.createHero()
    this.leftHero.createSpells()
    this.rightHero.createSpells()

  }

  run() {
    this.animationId = window.requestAnimationFrame(() => {
      this.update()
      this.render()
      this.run()
    });
  }

  start() {
    this.leftHero.start()
    this.rightHero.start()
  }

}