class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        
        // Configuration du jeu
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // État du jeu
        this.snake = [{ x: 10, y: 10 }];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameRunning = false;
        this.gameLoop = null;
        
        this.init();
    }
    
    init() {
        this.updateHighScoreDisplay();
        this.generateFood();
        this.setupEventListeners();
        this.draw();
    }
    
    setupEventListeners() {
        // Contrôles clavier
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    if (this.dy !== 1) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    if (this.dy !== -1) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    if (this.dx !== 1) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    if (this.dx !== -1) { this.dx = 1; this.dy = 0; }
                    break;
            }
        });
        
        // Boutons de contrôle
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameLoop = setInterval(() => this.update(), 150);
        }
    }
    
    pauseGame() {
        this.gameRunning = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    resetGame() {
        this.pauseGame();
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.updateScore();
        this.generateFood();
        this.draw();
    }
    
    update() {
        this.moveSnake();
        
        if (this.checkCollision()) {
            this.gameOver();
            return;
        }
        
        if (this.checkFoodCollision()) {
            this.eatFood();
        }
        
        this.draw();
    }
    
    moveSnake() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        this.snake.unshift(head);
        this.snake.pop();
    }
    
    checkCollision() {
        const head = this.snake[0];
        
        // Collision avec les murs
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        
        // Collision avec le corps
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    checkFoodCollision() {
        const head = this.snake[0];
        return head.x === this.food.x && head.y === this.food.y;
    }
    
    eatFood() {
        this.score += 10;
        this.updateScore();
        
        // Agrandir le serpent
        this.snake.push({ ...this.snake[this.snake.length - 1] });
        
        this.generateFood();
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        
        // Vérifier que la nourriture n'apparaît pas sur le serpent
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.generateFood();
                return;
            }
        }
    }
    
    draw() {
        // Effacer le canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner le serpent
        this.ctx.fillStyle = '#0f0';
        for (let segment of this.snake) {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        // Dessiner la tête différemment
        this.ctx.fillStyle = '#0a0';
        const head = this.snake[0];
        this.ctx.fillRect(head.x * this.gridSize, head.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        
        // Dessiner la nourriture
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateHighScoreDisplay();
        }
    }
    
    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }
    
    gameOver() {
        this.pauseGame();
        alert(`Game Over! Score: ${this.score}`);
    }
}

// Initialiser le jeu quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});

// Système de niveaux de difficulté
class DifficultyManager {
    constructor() {
        this.levels = {
            easy: { speed: 200, name: 'Facile' },
            medium: { speed: 150, name: 'Moyen' },
            hard: { speed: 100, name: 'Difficile' },
            expert: { speed: 50, name: 'Expert' }
        };
        this.currentLevel = 'medium';
    }
    
    setLevel(level) {
        if (this.levels[level]) {
            this.currentLevel = level;
            return this.levels[level].speed;
        }
        return this.levels.medium.speed;
    }
    
    getCurrentSpeed() {
        return this.levels[this.currentLevel].speed;
    }
    
    getCurrentName() {
        return this.levels[this.currentLevel].name;
    }
}
