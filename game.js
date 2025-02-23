const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 500,
  backgroundColor: "#fff",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 300 }, debug: false },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player,
  cursors,
  score = 0,
  scoreText;
let obstacles,
  gameOver = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image("player", "https://via.placeholder.com/30"); // Kotak
  this.load.image("obstacle", "https://via.placeholder.com/30/ff0000"); // Rintangan segitiga (sebagai placeholder kotak merah)
}

function create() {
  player = this.physics.add.sprite(50, 400, "player");
  player.setCollideWorldBounds(true);

  obstacles = this.physics.add.group();

  this.time.addEvent({
    delay: 2000,
    loop: true,
    callback: () => {
      if (!gameOver) {
        let obs = obstacles.create(400, 450, "obstacle");
        obs.setVelocityX(-200);
      }
    },
  });

  this.physics.add.collider(player, obstacles, () => {
    gameOver = true;
    alert("Game Over! Your Score: " + score);
    location.reload();
  });

  scoreText = document.getElementById("score");

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (gameOver) return;

  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-250);
  }

  obstacles.children.iterate((obstacle) => {
    if (obstacle.x < 0) {
      obstacle.destroy();
      score += 10;
      scoreText.innerText = "Score: " + score;
    }
  });
}
