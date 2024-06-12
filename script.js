//Подтягивание элементов из HTML
const endGame = document.querySelector(".end_game")
const score = document.querySelector(".score")
const restart = document.querySelector(".restart")
const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d");
//Классы
class Bird {
    constructor() {
        this.start_x = 50
        this.start_y = 50
        this.x = this.start_x
        this.y = this.start_y
        this.width = 50
        this.height = 50
        this.speed = 0
        this.acceleration = 0.4
        this.image = new Image()
        this.image.src = "bird.png"
        this.jump_power = -9
        this.point = 0
    }
    draw() {
        ctx.drawImage(this.image, this.x, 
            this.y, this.width, this.height)
    }
    gravity() {
        this.speed += this.acceleration
        this.y += this.speed
    }
    jump() {
        document.addEventListener("keydown", (event) => {
            if (event.code == "Space") {
                this.speed = this.jump_power
            }
        })
    }
}

class Pipe{
    constructor(x) {
        let interval = 200
        let min_h = 50
        let max_random_h = canvas.height - min_h - interval
        
        let speed = -1.5
        let width = 50
        this.fly = false

        this.top_pipe = {
            start_x: x,
            x: x,
            y: 0,
            width: width,
            height:min_h + Math.round(Math.random()),
            speed: speed,
        }
    }
}
//Функции

//Создание объектов
const bird = new Bird()
//Игровой цикл
function loop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    bird.draw()
    bird.gravity()
    bird.jump()
    requestAnimationFrame(loop);
}

loop()