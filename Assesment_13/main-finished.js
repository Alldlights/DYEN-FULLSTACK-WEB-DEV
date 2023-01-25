

// counter variable to store number of balls left
// para variable to store the p element

const para = document.querySelector("p");
let count = 0;

// setup canvas
// set up reference to <canvas> element
// set up reference to 2d context. call getContext() method on it, passing in '2d', to specify the context we want to draw in.
const canvas = document.querySelector("canvas");

// ctx constant stores the object that directly represents the area of the canvas that we can draw on
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Helper Functions
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Create Shape class with only a constructor
// constructor should define x, y, velX, velY properties in the same way as the Ball() constructor did originally just without the color and size properties
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    // this.color = color;
    // this.size  = size;
  }
}

// Ball class
// initialises a constructor / the properties each ball needs in order to function in program
// each ball gets horizontal and vertical coordinates where the ball moves on screen; horizontal and vertical velocity; color, and size

// <-- The Ball() class -->
// The Ball() class should be made to derive from the Shape() class using extends
// should take the same arguments as before x, y, velX, velY, size, and color
// should call the Shape constructor using super(), passing in the x, y, velX, and velY argument
// initialize its own color and size properties from the parameters it is given.
// define a new property called exists, which we use to track whether the ball exists in the program. This should be a boolean, initialized to true.

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);

    this.color = color;
    this.size = size;
    this.exists = true;
  }

  // Drawing the ball

  draw() {
    // call beginPath() to state that we want to draw a shape on the canvas
    ctx.beginPath();

    // call fillStyle() to specify what colour we want for the shape
    ctx.fillStyle = this.color;

    // call arc() passing the x, y properties; the size property as the radius; 0 as startAngle param, 2 * Math.PI() for endAngle param. This last Math.PI() ensures a circle is drawn.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

    // call .fill() to fill the current/given path with the current fillStyle.
    ctx.fill();
  }
  // the above draws a ball in position

  // the below update function actually executes the movement of the ball object
  // the if statements check whether the ball has reached the edge of canvas. If condition is true, we reverse the polarity of the relevant velocity to make ball go in opposite directions.
  // in each if statement, we include the *size* of the ball in calculation because the x/y co-ords are in center of ball but we want the edge of ball to bounce off the perimiter

  update() {
    // if x co-ord is greater than width of canvas, ball is going off the canvas - reverse
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    // if x co-ord is less than 0, ball is going off the left edge - reverse
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    // if y co-ord is greater than the height of canvas, ball is going off the bottom of the canvas - reverse
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    // if y co-ord is less than 0, ball is going off the top edge - reverse
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // add the x co-ordinates to the velX value
    // add the y co-ordinates to the velY value
    this.x += this.velX;
    this.y += this.velY;
  }

  // for each ball, we check every other ball to see if it has collided with the current ball
  collisionDetection() {
    for (const ball of balls) {
      // we need to apply collision detection only if the ball exists. using ball.exists in the conditional checks if the value of exists property === true. If true, apply collision detection.
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // checks whether any of the two circle's areas overlap - see 2D collision detection / game design tricks.
        // if collision is detected, the code inside the if statement runs
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// <-- The EvilCircle class ->
/*
// Should inherit from shape using extends keyword
// -||- be passed only x, y arguments
// -||- pass the x, y args up to the Shape superclass along with the values for velX and velY hardcoded to 20. super(x, y, 20, 20)
// set color to white and size to 20

*/

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);

    this.color = "white";
    this.size = 10;

    // constructor should set up the code enabling the user to move the evil circle around the screen
    // adds keydown event listener to the window object so that when a key is pressed, the event object's key property is consulting to check which key was pressed
    // If it is one of the four specified keys, the evil circle moves accordingly (l/r/u/d)
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  // Methods for EvilCircle

  // works exactly like the draw() method on the Ball() class
  // instead of a filled-in circle, we create just an outer line (stroke())
  // then make that line slightly thicker using the .lineWidth property of the ctx object.
  draw() {
    ctx.beginPath();

    ctx.lineWidth = 3;

    ctx.strokeStyle = this.color;

    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

    ctx.stroke();
  }

  // Does the same thing as the update() method on the Ball() class, with slight modifications
  // we remove the last two lines from copied update method
  // we change if statements. If the tests return true we want to instead change the value of x/y so the evil circle is bounced back onto the screen slightly. Adding / subtracting the evil circle's size property
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    if (this.y - this.size <= 0) {
      this.y += this.size;
    }

    // get rid -  we don't want this method to update the circle's position on every frame.
    //this.x += this.velX;
    //this.y += this.velY;
  }

  collisionDetection() {
    for (const ball of balls) {
      // we need to apply collision detection only if the ball exists. using ball.exists in the conditional checks if the value of exists property === true. If true, apply collision detection.
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = "Ball count: " + count;
        }
      }
    }
  }
}

// adding balls to canvas and animating them

// create an array to store all the generated balls
const balls = [];

// while balls array length is less than 25, generate balls of random size

while (balls.length < 25) {
  const size = random(10, 20);

  // balls generated with the use of random() and randomRGB() functions
  // ball position always drawn at least one ball width away from the edge of the canvas
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, width - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  // once ball object has been generated, push into balls array. Number of balls will not exceed the number provided in the while loop condition.
  balls.push(ball);
  count++;
  para.textContent = "Ball count: " + count;
}

// Animation loop -  updates the info in the program, renders result of each frame of animation.

const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  // create a new object instance of Evil Circle

  // sets canvas fill color to semi-transparent black
  // semi-transparent fill allows previous few frames to shine through, resulting in balls producing trails as they move.

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

  // draws a rectangle of color using the provided arguments. This serves to cover up the previous frame's drawing before the next one is drawn. Omitting this changes the appearance of objects from balls to worming snakes.
  ctx.fillRect(0, 0, width, height);

  // loops through all the balls in the balls array
  // call each ball's draw and update functions to draw each on on the screen, then do all the necessary updated to position/velocity in time ofr the next frame.
  // **only** calls methods if ball.exists === true;

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetection();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetection();

  //  run the function again through a recursive call to requestAnimationFrame() method. when this method is repeatedly run and passed the same function name, it runs that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it runs over and over again.
  requestAnimationFrame(loop);
}

// call the animation loop function once to start the animation sequence
loop();
