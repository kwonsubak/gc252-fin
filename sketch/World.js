class World {
  constructor() {
    this.current = [0, 0, 0];
    this.initial = [0, 0, 0];
    this.initial[0] = hour();
    this.initial[1] = minute();
    this.initial[2] = second();
    this.angle = 0;
    this.skyColour = null;
    this.GroundColour = null;
    this.center = [width / 2, height / 2];
    this.change = 0;

    this.morningColour = color("#b6e1f6");
    this.nightColour = color("#5d5da0");
    this.eveningColour = color("#f5b97d");
    this.dawnColour = color("#dfa1d4");

    this.GroundColour = color("#a4dda4");
    this.GroundColour2 = color("#87c983");
    this.GroundColour3 = color("#558e72");
  }

  ground() {
    //땅3
    push();
    fill(this.GroundColour3);
    noStroke();
    circle(width / 2, height / 2 + 550, width * 1.8);
    pop();

    //땅2
    push();
    fill(this.GroundColour2);
    noStroke();
    circle(width / 2, height / 2 + 670, width * 1.8);
    pop();

    //땅1
    push();
    fill(this.GroundColour);
    noStroke();
    circle(width / 2, height / 2 + 800, width * 1.8);
    pop();
  }

  update() {
    this.current[2] = (this.initial[2] + millis() / 1000) % 60;
    this.current[1] = (this.initial[1] + millis() / (1000 * 60)) % 60;
    this.current[0] = Math.floor(
      (this.initial[0] + millis() / (1000 * 60 * 60)) % 24
    );

    console.log(this.current[0], this.current[1], this.current[2]);
    // this.second = second();
    // this.minute = minute();
    // this.hour = hour();

    // this.currentSecond = ((this.second * millis()) / 1000) % 60;
    // this.currentMinute = ((this.second * millis()) / 6000) % 60;
    // this.currentHour = ((this.hour * millis()) / 3600000) % 24;

    // // 시간->각도 변환
    // this.secondAngle = map(this.second, 0, 60, 60, 360);
    // this.minuteAngle = map(this.currentMinute, 0, 60, 0, 360);
    // this.hourAngle = map(this.currentHour, 0, 24, 0, 360);

    // if (this.hour >= 0 && this.hour <= 24) {
    //   for (let i = 0; i < 12; i++) {
    //     let correction = i * 30;
    //     this.hourAngle = this.hourAngle + correction;
    //   }
    // }

    //   if (this.currentHour >= 0 && this.currentHour < 24) {
    //     this.change = map(this.currentHour, 0, 24, 0, 1);
    //   } else {
    //     this.change = map(this.currentHour + 24, 0, 24, 0, 1);
    //   }

    this.drawWatch2(
      this.center[0],
      this.center[1] + 1000,
      -this.sAngle(this.current[2] * 5),
      680
    );
    this.drawWatch2(
      this.center[0],
      this.center[1] + 1000,
      -this.mAngle(this.current[1]),
      810
    );
    this.drawWatch(
      this.center[0],
      this.center[1] + 1000,
      -this.hAngle(this.current[0] + this.current[1] / 60),
      940
    );
    // console.log(`${this.current[0]}:${this.current[1]}:${this.current[2]}`);
  }

  hAngle(time) {
    return map(time % 12, 0, 12, 0, 360);
  }

  mAngle(time) {
    return map(time, 0, 60, 0, 360);
  }

  sAngle(time) {
    return map(time, 0, 60, 0, 360);
  }

  drawWatch(x, y, angle, rad) {
    fill("#F8F4EC");
    textAlign(CENTER, CENTER);
    push();
    translate(x, y);
    rotate(radians(angle));
    textSize(rad * 0.03);
    for (let n = 0; n < 12; n++) {
      push();
      const angle = (n * 360) / 12;
      rotate(radians(angle));
      const timeText = n == 0 ? 12 : n;
      text(timeText, 0, -rad);
      pop();
    }
    pop();
  }
  drawWatch2(x, y, angle, rad) {
    fill("#F8F4EC");
    textAlign(CENTER, CENTER);
    push();
    translate(x, y);
    rotate(radians(angle));
    textSize(rad * 0.03);
    for (let n = 0; n < 60; n++) {
      push();
      const angle = (n * 360) / 60;
      rotate(radians(angle));
      if (n % 5 === 0) {
        text("I", 0, -rad);
      } else {
        text(".", 0, -rad);
      }
      pop();
    }
    pop();
  }

  // drawTicks(x, y, angle, rad) {
  //   push();
  //   translate(x, y);
  //   rotate(radians(angle));
  //   stroke("#F8F4EC");
  //   for (let n = 0; n < 60; n++) {
  //     push();
  //     let tickAngle = n * 6;
  //     rotate(radians(tickAngle));

  //     if (n % 5 === 0) {
  //       strokeWeight(6);
  //       line(0, -rad, 0, -rad - 20);
  //     } else {
  //       strokeWeight(3);
  //       line(0, -rad, 0, -rad - 10);
  //     }
  //     pop();
  //   }
  //   pop();
  // }

  // secondArea() {
  //   push();
  //   translate(width / 2, height / 2 + 800);
  //   rotate(radians(-this.second));

  //   let groundR = (width * 1.8) / 2;
  //   let lineR = groundR - 50;

  //   for (let i = 0; i <= 60; i++) {
  //     push();
  //     let rotationAngle = i * 6;
  //     rotate(radians(rotationAngle));
  //     translate(0, -lineR);
  //     stroke("#F8F4EC");
  //     strokeWeight(4);
  //     line(0, 0, 0, -10);
  //     pop();
  //   }
  //   pop();
  // }

  // minuteArea() {
  //   push();
  //   translate(width / 2, height / 2 + 680);
  //   rotate(radians(this.minuteAngle));

  //   let groundR = (width * 1.9) / 2;
  //   let lineR = groundR - 50;

  //   fill("#F8F4EC");
  //   textAlign(CENTER, CENTER);
  //   textSize(50);
  //   for (let i = 0; i <= 60; i++) {
  //     push();
  //     let rotationAngle = i * 6;
  //     rotate(radians(rotationAngle));
  //     translate(0, -lineR);
  //     stroke("#F8F4EC");
  //     strokeWeight(10);
  //     line(0, 0, 0, -10);
  //     pop();
  //   }
  //   pop();
  // }

  // hourArea() {
  //   push();
  //   translate(width / 2, height / 2 + 550);
  //   rotate(radians(this.hourAngle + 30));

  //   let groundR = (width * 1.8) / 2;
  //   let textR = groundR - 50;

  //   fill("#F8F4EC");
  //   textAlign(CENTER, CENTER);
  //   textSize(50);
  //   for (let i = 1; i <= 12; i++) {
  //     push();
  //     let rotationAngle = i * 30;
  //     rotate(radians(rotationAngle));
  //     translate(0, -textR);
  //     text(i, 0, 0);
  //     pop();

  //     push();
  //     rotate(radians(rotationAngle));
  //     translate(0, -textR);
  //     stroke("#F8F4EC");
  //     strokeWeight(10);
  //     line(120, 0, 120, 0);
  //     pop();
  //   }
  //   pop();
  // }

  dawn() {
    push();
    this.change = map(this.current[0], 4, 7, 0, 1);
    this.skyColour = lerpColor(
      this.dawnColour,
      this.morningColour,
      this.change
    );
    fill(this.skyColour);
    rect(0, 0, width, height);
    pop();
  }

  morning() {
    //하늘
    push();
    this.change = map(this.current[0], 7, 17, 0, 1);
    this.skyColour = lerpColor(
      this.morningColour,
      this.nightColour,
      this.change
    );
    fill(this.skyColour);
    rect(0, 0, width, height);
    pop();
  }

  evening() {
    push();
    this.change = map(this.current[0], 17, 19, 0, 1);
    this.skyColour = lerpColor(
      this.eveningColour,
      this.nightColour,
      this.change
    );
    fill(this.skyColour);
    rect(0, 0, width, height);
    pop();
  }

  night() {
    //하늘
    push();
    if (this.current[0] >= 19) {
      this.skyColour = lerpColor(
        this.morningColour,
        this.nightColour,
        this.change
      );
      this.change = map(this.current[0], 19, 24, 0, 1);
    } else {
      this.skyColour = lerpColor(
        this.nightColour,
        this.morningColour,
        this.change
      );
      this.change = map(this.current[0], 0, 4, 0, 1);
    }
    fill(this.skyColour);
    rect(0, 0, width, height);
    pop();
  }

  render() {
    if (this.current[0] >= 4 && this.current[0] < 7) {
      this.dawn();
    } else if (this.current[0] >= 7 && this.current[0] < 17) {
      this.morning();
    } else if (this.current[0] >= 17 && this.current[0] < 19) {
      this.evening();
    } else {
      this.night();
    }

    this.ground();
    this.update();
  }
}
