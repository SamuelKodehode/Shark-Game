import { Food, Poison, Shark } from './types.js'

let topScoreCounter = 0

const main = () => {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
	const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
	const heartDiv = document.getElementById('lives') as HTMLDivElement
	const fishRightImg = document.getElementById('fish-right') as HTMLImageElement
	const fishLeftImg = document.getElementById('fish-left') as HTMLImageElement
	const sharkLeftImg1 = document.getElementById('shark-left1') as HTMLImageElement
	const sharkLeftImg2 = document.getElementById('shark-left2') as HTMLImageElement
	const sharkRightImg1 = document.getElementById('shark-right1') as HTMLImageElement
	const sharkRightImg2 = document.getElementById('shark-right2') as HTMLImageElement
	const poisonLeftImg = document.getElementById('poison-left') as HTMLImageElement
	const poisonRightImg = document.getElementById('poison-right') as HTMLImageElement
	const score = document.getElementById('score') as HTMLHeadingElement
	const topScore = document.getElementById('top-score') as HTMLHeadingElement
	const playBtn = document.getElementById('play-btn') as HTMLButtonElement

	playBtn.style.visibility = 'visible'

	let scoreCounter = 0
	let foodArray: Food[] = []
	let poisonArray: Poison[] = []
	let swimRightCounter = 1
	let swimLeftCounter = 1
	let lastKeyPress = 'left'
	let gameTime = 0
	let lastFrameTime: number = 0
	const fpsInterval: number = 1000 / 24

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	const setupGame = () => {
		scoreCounter = 0
		swimRightCounter = 1
		swimLeftCounter = 1
		lastKeyPress = 'left'
		gameTime = 0

		poisonArray = []
		foodArray = []

		shark = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
			size: 10,
			lives: 3,
			keyPressed: {
				ArrowUp: false,
				ArrowLeft: false,
				ArrowRight: false,
				ArrowDown: false
			}
		}

		playBtn.style.visibility = 'hidden'
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		drawLives()
		getPoison(1)
		getFood(100)
	}

	let shark: Shark = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
		size: 10,
		lives: 3,
		keyPressed: {
			ArrowUp: false,
			ArrowLeft: false,
			ArrowRight: false,
			ArrowDown: false
		}
	}

	const drawLives = () => {
		for (let i = 0; i < shark.lives; i++) {
			const heart = document.createElement('img') as HTMLImageElement
			heart.src = 'img/heart.png'
			heart.id = 'heart'
			heartDiv.append(heart)
		}
	}

	const getRandomNumberInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

	function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
		return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
	}
	//food
	function getFood(num: number) {
		for (let i = 0; i < num; i++) {
			const x = getRandomNumberInRange(20, window.innerWidth - 20)
			const y = getRandomNumberInRange(20, window.innerHeight - 20)
			const velocityX = getRandomNumberInRange(-5, 5)
			const velocityY = getRandomNumberInRange(-5, 5)
			const foodObject: Food = { x, y, velocityX, velocityY }
			foodArray.push(foodObject)
		}
	}
	// poison
	function getPoison(num: number) {
		for (let i = 0; i < num; i++) {
			const x = getRandomNumberInRange(20, window.innerWidth - 20)
			const y = getRandomNumberInRange(20, window.innerHeight - 20)
			const velocityX = getRandomNumberInRange(-5, 5)
			const velocityY = getRandomNumberInRange(-5, 5)
			const poisonObject: Poison = { x, y, velocityX, velocityY }
			poisonArray.push(poisonObject)
		}
	}

	playBtn.addEventListener('click', () => {
		setupGame()
		requestAnimationFrame(gameLoop)
	})

	const gameLoop = (timestamp: number) => {
		gameTime++

		if (!lastFrameTime) {
			lastFrameTime = timestamp
		}
		const elapsed = timestamp - lastFrameTime

		if (elapsed > fpsInterval) {
			lastFrameTime = timestamp - (elapsed % fpsInterval)
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			const speed = 5

			if (shark.keyPressed.ArrowDown) shark.y += speed
			if (shark.keyPressed.ArrowUp) shark.y -= speed
			if (shark.keyPressed.ArrowLeft) shark.x -= speed
			if (shark.keyPressed.ArrowRight) shark.x += speed

			if (shark.keyPressed.ArrowRight) {
				lastKeyPress = 'right'
				swimRightCounter += 6
				if (swimRightCounter <= 30) {
					ctx.drawImage(
						sharkRightImg1,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
				} else {
					ctx.drawImage(
						sharkRightImg2,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
					if (swimRightCounter > 60) swimRightCounter = 1
				}
			} else if (shark.keyPressed.ArrowLeft) {
				lastKeyPress = 'left'
				swimLeftCounter += 6
				if (swimLeftCounter <= 30) {
					ctx.drawImage(
						sharkLeftImg1,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
				} else {
					ctx.drawImage(
						sharkLeftImg2,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
					if (swimLeftCounter > 60) swimLeftCounter = 1
				}
			} else {
				if (lastKeyPress === 'left') {
					ctx.drawImage(
						sharkLeftImg2,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
				} else {
					ctx.drawImage(
						sharkRightImg2,
						shark.x - (shark.size * 3.2 + 40) / 2,
						shark.y - (shark.size + 40) / 2,
						shark.size * 3.2 + 40,
						shark.size + 40
					)
				}
			}

			poisonArray.forEach((poisonObj: Poison, index: number): void => {
				const distance = calculateDistance(shark.x, shark.y, poisonObj.x, poisonObj.y)

				if (distance < shark.size / 2 + 10) {
					heartDiv.innerHTML = ''
					poisonArray.splice(index, 1)
					shark.size -= 2
					scoreCounter += -20
					shark.lives -= 1
					drawLives()
					score.textContent = `Score: ${scoreCounter}`
					if (scoreCounter > topScoreCounter) {
						topScoreCounter = scoreCounter
						topScore.textContent = `top score: ${topScoreCounter}`
					}
				}

				if (poisonObj.y <= 30) {
					poisonObj.velocityY = 5
				} else if (poisonObj.y >= window.innerHeight - 30) {
					poisonObj.velocityY = -5
				}

				if (poisonObj.x <= 30) {
					poisonObj.velocityX = 5
				} else if (poisonObj.x >= window.innerWidth - 30) {
					poisonObj.velocityX = -5
				}

				if (distance < 400) {
					poisonObj.velocityX += poisonObj.x > shark.x ? -1 : 1
				}

				if (distance < 400) {
					poisonObj.velocityY += poisonObj.y > shark.y ? -1 : 1
				}

				if (poisonObj.velocityX > 1.5) {
					poisonObj.velocityX = 1.5
				} else if (poisonObj.velocityX < -1.5) {
					poisonObj.velocityX = -1.5
				}

				if (poisonObj.velocityY > 1.5) {
					poisonObj.velocityY = 1.5
				} else if (poisonObj.velocityY < -1.5) {
					poisonObj.velocityY = -1.5
				}

				poisonObj.velocityX += getRandomNumberInRange(-0.4, 0.4)
				poisonObj.velocityY += getRandomNumberInRange(-0.4, 0.4)

				poisonObj.x += poisonObj.velocityX
				poisonObj.y += poisonObj.velocityY

				if (poisonObj.velocityX <= 0) {
					ctx.drawImage(poisonLeftImg, poisonObj.x, poisonObj.y, 50, 50)
				} else {
					ctx.drawImage(poisonRightImg, poisonObj.x, poisonObj.y, 50, 50)
				}
			})

			foodArray.forEach((foodObj: Food, index: number) => {
				const distance = calculateDistance(shark.x, shark.y, foodObj.x, foodObj.y)

				if (distance < shark.size / 2 + 40) {
					foodArray.splice(index, 1)
					shark.size += 0.1
					scoreCounter += 1
					score.textContent = `Score: ${scoreCounter}`
				}

				foodObj.velocityX += getRandomNumberInRange(-0.2, 0.2)
				foodObj.velocityY += getRandomNumberInRange(-0.1, 0.1)

				if (distance < 100) {
					foodObj.velocityX = foodObj.x > shark.x ? 5 : -5
				}

				if (distance < 100) {
					foodObj.velocityY = foodObj.y > shark.y ? 5 : -5
				}

				if (foodObj.x <= 200) {
					foodObj.velocityX += 0.9
				} else if (foodObj.x >= window.innerWidth - 200) {
					foodObj.velocityX -= 0.9
				}

				if (foodObj.x <= 30) {
					foodObj.velocityX = 5
				} else if (foodObj.x >= window.innerWidth - 30) {
					foodObj.velocityX = -5
				}

				if (foodObj.y <= 200) {
					foodObj.velocityY += 0.9
				} else if (foodObj.y >= window.innerHeight - 200) {
					foodObj.velocityY -= 0.9
				}

				if (foodObj.y <= 30) {
					foodObj.velocityY = 5
				} else if (foodObj.y >= window.innerHeight - 30) {
					foodObj.velocityY = -5
				}

				foodArray.forEach((obj) => {
					const foodDistance = calculateDistance(foodObj.x, foodObj.y, obj.x, obj.y)

					if (foodDistance <= 20) {
						foodObj.y += foodObj.y < obj.y ? -0.8 : 0.8
					}
					if (foodDistance <= 20) {
						foodObj.x += foodObj.x > obj.x ? 0.8 : -0.8
					}

					if (foodDistance < 50) {
						foodObj.velocityY += obj.velocityY * 0.03
						foodObj.velocityX += obj.velocityX * 0.03
					}
				})

				if (foodObj.velocityX > 4) {
					foodObj.velocityX = 4
				} else if (foodObj.velocityX < -4) {
					foodObj.velocityX = -4
				}

				if (foodObj.velocityY > 2) {
					foodObj.velocityY = 2
				} else if (foodObj.velocityY < -2) {
					foodObj.velocityY = -2
				}

				foodObj.x += foodObj.velocityX
				foodObj.y += foodObj.velocityY

				// Example usage
				if (foodObj.velocityX <= 0) {
					ctx.drawImage(fishLeftImg, foodObj.x, foodObj.y, 30, 30)
				} else {
					ctx.drawImage(fishRightImg, foodObj.x, foodObj.y, 30, 30)
				}

				if (gameTime > (1000 / 30) * 10) {
					gameTime = 0
					getPoison(1)
				}
				if (foodArray.length <= 0) {
					getFood(100)
				}
				/*	drawRect(foodObj.x, foodObj.y, 7, 7, 'rgb(0,255,224)', ctx)*/
			})
		}
		if (shark.lives <= 0) {
			setupGame()
			playBtn.style.visibility = 'visible'
			return
		}

		requestAnimationFrame(gameLoop)
	}

	window.addEventListener('keydown', (e: KeyboardEvent): void => {
		arrowKeys.forEach((button: string): void => {
			if (button === e.key) {
				// @ts-ignore
				shark.keyPressed[button] = true
			}
		})
	})

	window.addEventListener('keyup', (e: KeyboardEvent): void => {
		arrowKeys.forEach((button: string): void => {
			if (button === e.key) {
				// @ts-ignore
				shark.keyPressed[button] = false
			}
		})
	})
}

main()
