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
        this.jump_power = -8
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
        let interval = 180
        let min_h = 50
        let max_random_h = canvas.height - min_h - min_h - interval
        
        let speed = -3
        let width = 50
        this.fly = false

        this.top_pipe = {
            start_x: x,
            x: x,
            y: 0,
            width: width,
            height: min_h + Math.round(Math.random() * max_random_h),
            speed: speed,
        }

        this.down_pipe = {
            start_: x,
            x: x,
            y: this.top_pipe.height + interval, 
            width: width,
            height: canvas.height - this.top_pipe.height - interval,
            speed: speed,
        }

    }

    draw() {
        ctx.fillStyle = "#333";
        ctx.fillRect(
            this.top_pipe.x,
            this.top_pipe.y,
            this.top_pipe.width,
            this.top_pipe.height,
        );

        ctx.fillRect(
            this.down_pipe.x,
            this.down_pipe.y,
            this.down_pipe.width,
            this.down_pipe.height,
        )
    }

    move() {
        this.top_pipe.x += this.top_pipe.speed
        this.down_pipe.x += this.down_pipe.speed

        if (this.top_pipe.x < -this.top_pipe.width) {
            this.top_pipe.x = canvas.width
            this.down_pipe.x = canvas.width

            let interval = 200
            let min_h = 50
            let max_random_h = canvas.height - min_h - min_h - interval
            
            this.top_pipe.height = min_h + Math.round(Math.random() * max_random_h)
            this.down_pipe.y = this.top_pipe.height + interval
            this.down_pipe.height = canvas.height - this.top_pipe.height - interval
            this.fly = false
        }
    }
}
//Функции

//Создание объектов
const bird = new Bird()

let first_x = canvas.width / 2
let pipe_one = new Pipe(first_x)
let pipe_two = new Pipe(first_x + (canvas.width + pipe_one.top_pipe.width) / 2)
//Игровой цикл
function loop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    bird.draw()
    bird.gravity()
    bird.jump()

    pipe_one.draw()
    pipe_two.draw()
    pipe_one.move()
    pipe_two.move()
    requestAnimationFrame(loop);
}

loop()