let self = window;

(function (self, time) {
  var canvas,
    context,
    box,
    particles = [],
    dirtyRegions = [],
    mouse = { x: -99999, y: -99999 },
    forceFactor = false,
    minForce = 0,
    maxForce = 500,
    colors = ["rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(0, 255, 0)"],
    lastWord = time,
    FPS = 60;

  var music = false;

  var Settings = function () {
    this.music = false;

    this.enableMusic = function (value) {
      var audio = document.querySelector("audio");

      if (!music) {
        music = value;

        audio.src =
          "http://www.danosongs.com/music/danosongs.com-the-living-physicist.mp3";
        audio.src =
          "http://francescotrillini.it/assets/danosongs.commusicdanosongs.com-the-living-physicist.ogg";

        audio.play();
      } else {
        music = value;

        audio.src = "";
      }
    };
  };

  function init() {
    var settings = new Settings();

    var body, audio;

    body = document.querySelector("body");

    canvas = document.createElement("canvas");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.bottom = 0;
    canvas.style.left = 0;
    canvas.style.right = 0;
    canvas.style.zIndex = -1;

    canvas.style.background =
      "-webkit-radial-gradient(rgb(0, 230, 0), rgb(0, 100, 0))";
    canvas.style.background =
      "-moz-radial-gradient(rgb(0, 230, 0), rgb(0, 100, 0))";
    canvas.style.background =
      "-ms-radial-gradient(rgb(0, 230, 0), rgb(0, 100, 0))";
    canvas.style.background =
      "-o-radial-gradient(rgb(0, 230, 0), rgb(0, 100, 0))";
    canvas.style.background = "radial-gradient(rgb(0, 230, 0), rgb(0, 100, 0))";

    box = document.createElement("div");

    box.style.background = "rgba(0, 0, 0, 0.2)";

    box.style.width = innerWidth + "px";
    box.style.height = "70px";

    box.style.position = "absolute";
    box.style.top = "50%";
    box.style.left = "50%";

    box.style.margin = "-35px 0 0 -" + innerWidth / 2 + "px";

    audio = document.createElement("audio");

    // Background audio
    audio.removeAttribute("controls");

    audio.loop = true;

    audio.volume = 0.7;

    body.appendChild(canvas);
    body.appendChild(box);
    body.appendChild(audio);

    // Browser supports canvas?
    if (!!capable) {
      context = canvas.getContext("2d");

      // Events
      if ("ontouchstart" in window) {
        document.addEventListener("touchstart", self.onTouchStart, false);
        document.addEventListener("touchend", self.onTouchEnd, false);
        document.addEventListener("touchmove", self.onTouchMove, false);
      } else {
        document.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mouseup", onMouseUp, false);
        document.addEventListener("mousemove", onMouseMove, false);
      }

      window.onresize = onResize;

      createParticles();
    } else {
      console.error("Please, update your browser for seeing this animation.");
    }
  }

  function capable() {
    return canvas.getContext && canvas.getContext("2d");
  }

  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function onMouseDown(event) {
    event.preventDefault();

    forceFactor = true;
  }

  function onMouseUp(event) {
    event.preventDefault();

    forceFactor = false;
  }

  function onMouseMove(event) {
    event.preventDefault();

    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
  }

  function onTouchStart(event) {
    event.preventDefault();

    forceFactor = true;
  }

  function onTouchEnd(event) {
    event.preventDefault();

    forceFactor = false;
  }

  function onTouchMove(event) {
    event.preventDefault();

    mouse.x = event.touches[0].pageX - canvas.offsetLeft;
    mouse.y = event.touches[0].pageY - canvas.offsetTop;
  }

  function createParticles() {
    for (var quantity = 0, len = 100; quantity < len; quantity++) {
      var x, y, radius;

      x = 10 + ((innerWidth || canvas.width) / len) * quantity;
      y = (innerHeight || canvas.height) / 2;

      radius = ~~(Math.random() * 15);

      particles.push({
        x: x,
        y: y,
        goalX: x,
        goalY: y,
        top: 4 + Math.random() * -8,
        bottom: -15 + Math.random() * -20,
        left: -15 + Math.random() * -20,
        right: -5 + Math.random() * -10,
        radius: radius,
        color: colors[~~(Math.random() * colors.length)],
      });

      dirtyRegions.push({
        x: x,
        y: y,
        radius: radius,
      });
    }

    pulse();
  }

  function pulse() {
    var word = "No distance could ever lessen the love I feel for you. Sometimes,";

    if (
      +new Date().getTime() - lastWord > 7000 &&
      +new Date().getTime() - lastWord < 14000
    )
      var word = "it feels like time slows down and the days stretch on forever,";

    if (
      +new Date().getTime() - lastWord > 14000 &&
      +new Date().getTime() - lastWord < 21000
    )
      var word = "but even when we’re apart, you are always in my heart, always on my mind.";

    if (
      +new Date().getTime() - lastWord > 21000 &&
      +new Date().getTime() - lastWord < 28000
    )
      var word = "You are the one I want to share my life with, the one I can’t live without.";

    if (
      +new Date().getTime() - lastWord > 28000 &&
      +new Date().getTime() - lastWord < 35000
    )
      var word = "Losing you isn’t an option I’ll do whatever it takes to make sure we never have to say goodbye.";

    if (
      +new Date().getTime() - lastWord > 35000 &&
      +new Date().getTime() - lastWord < 42000
    )
      var word = "I love you more than words can express,";
      
      if (
        +new Date().getTime() - lastWord > 42000 &&
        +new Date().getTime() - lastWord < 49000
      )
      var word = "and I’ll keep loving you through every mile and every second that separates us.";
    
    if (
      +new Date().getTime() - lastWord > 49000 &&
      +new Date().getTime() - lastWord < 56000
    )
      var word = "I'm Nimu, and I'll always be here for you, ready to listen whenever you need me.";

    if (+new Date().getTime() - lastWord > 56000)
      var word = "Happy First Monthsary, my dream girl! Thank you for making my life amazing.";

    box.innerHTML =
      '<p style = "color: #FFFFFF; font-family: Comic Sans; font-size: 2em; text-align: center; margin-top: 18px;">' +
      word +
      "</p>";

    clear();
    update();
    render();

    requestAnimFrame(pulse);
  }

  function checkBounds() {
    [].forEach.call(particles, function (particle, index) {
      // Bounds right
      if (particle.x > canvas.width + particle.radius * 2) {
        particle.goalX = -particle.radius;
        particle.x = -particle.radius;
      }

      // Bounds bottom
      if (particle.y > canvas.height + particle.radius * 2) {
        particle.goalY = -particle.radius;
        particle.y = -particle.radius;
      }

      // Bounds left
      if (particle.x < -particle.radius * 2) {
        particle.radius *= 4;

        particle.goalX = canvas.width + particle.radius;
        particle.x = canvas.width + particle.radius;
      }

      // Bounds top
      if (particle.y < -particle.radius * 2) {
        particle.radius *= 4;

        particle.goalY = canvas.height + particle.radius;
        particle.y = canvas.height + particle.radius;
      }
    });
  }

  function clear() {
    [].forEach.call(dirtyRegions, function (dirty, index) {
      var x, y, width, height;

      width = 2 * dirty.radius + 4;
      height = width;

      x = dirty.x - width / 2;
      y = dirty.y - height / 2;

      context.clearRect(
        Math.floor(x),
        Math.floor(y),
        Math.ceil(width),
        Math.ceil(height)
      );
    });
  }

  function update() {
    particles.forEach(function (particle, index) {
      var angle,
        steps,
        center = {};

      angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
      steps = (Math.PI * 2 * index) / particles.length;

      center.x = (innerWidth || canvas.width) * 0.5;
      center.y = (innerHeight || canvas.height) * 0.5;

      // Inverse polar system
      particle.x +=
        Math.cos(angle) * distanceTo(particle, mouse) +
        (particle.goalX - particle.x) * 0.08;
      particle.y +=
        Math.sin(angle) * distanceTo(particle, mouse) +
        (particle.goalY - particle.y) * 0.08;

      if (!!forceFactor) minForce = Math.min(minForce + 5, 2000);
      else minForce = Math.max(minForce - 5, 0);

      // Pulsar radius, with friction
      particle.radius *= 0.96;

      if (particle.radius <= 2) particle.radius = ~~(Math.random() * 15);

      if (
        +new Date().getTime() - time > 3000 &&
        +new Date().getTime() - time < 6000
      ) {
        particle.goalX = center.x + 180 * Math.pow(Math.sin(index), 3);
        particle.goalY =
          center.y +
          10 *
            -(
              15 * Math.cos(index) - 
              5 * Math.cos(2 * index) - 
              2 * Math.cos(3 * index) - 
              Math.cos(4 * index)
            );
      }

      // Random
      if (
        +new Date().getTime() - time > 6000 &&
        +new Date().getTime() - time < 15000
      ) {
        maxForce = 3000;

        // Increase speed
        particle.goalX += particle.top;
        particle.goalY += particle.bottom;

        checkBounds();
      }

      // Circle
      if (
        +new Date().getTime() - time > 15000 &&
        +new Date().getTime() - time < 18000
      ) {
        maxForce = 500;

        var radius = 200;

        particle.goalX = center.x + radius * Math.cos(steps);
        particle.goalY = center.y + radius * Math.sin(steps);
      }

      // Spiral
      if (
        +new Date().getTime() - time > 18000 &&
        +new Date().getTime() - time < 21000
      ) {
        var angle, radius;

        angle = index * 0.2;
        radius = 15;

        particle.goalX = center.x + angle * radius * Math.cos(angle);
        particle.goalY = center.y + angle * radius * Math.sin(angle);
      }

      // Random
      if (
        +new Date().getTime() - time > 21000 &&
        +new Date().getTime() - time < 30000
      ) {
        maxForce = 3000;

        particle.goalX += particle.left;
        particle.goalY += particle.right;

        checkBounds();
      }

      // Hip
      if (
        +new Date().getTime() - time > 30000 &&
        +new Date().getTime() - time < 33000
      ) {
        maxForce = 500;

        var radius = 200;

        particle.goalX = center.x + radius * Math.cos(steps);
        particle.goalY = center.y + radius * Math.tan(steps);
      }

      // Vertical
      if (
        +new Date().getTime() - time > 33000 &&
        +new Date().getTime() - time < 36000
      ) {
        particle.goalX = 10 + (canvas.width / 100) * index;
        particle.goalY = canvas.height / 2;
      }

      // Reset 'em all
      if (+new Date().getTime() - time > 36000) time = +new Date().getTime();
    });
  }

  function render() {
    [].forEach.call(particles, function (particle, index) {
      context.save();
      context.globalCompositeOperation = "lighter";
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.restore();

      // Dirty regions
      dirtyRegions[index].x = particle.x;
      dirtyRegions[index].y = particle.y;
      dirtyRegions[index].radius = particle.radius;
    });
  }

  function distanceTo(pointA, pointB) {
    var dx = Math.abs(pointA.x - pointB.x);
    var dy = Math.abs(pointA.y - pointB.y);

    return (minForce + maxForce) / Math.sqrt(dx * dx + dy * dy);
  }

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / FPS);
      }
    );
  })();

  window.addEventListener
    ? window.addEventListener("load", init, false)
    : (window.onload = init);
})(self, +new Date().getTime());
