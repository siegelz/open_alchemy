import { all, initial, recipes, init_properties } from "./recipes.js";

/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};

  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId])
      /******/ return installedModules[moduleId].exports;

    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ exports: {},
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/
    });

    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    /******/ // Flag the module as loaded
    /******/ module.loaded = true;

    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }

  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;

  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;

  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";

  /******/ // Load entry module and return exports
  /******/ return __webpack_require__(0);
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      const combine = __webpack_require__(1);

      var canvas, stage;

      var mouseTarget;
      var dragStarted;
      var offset;
      var update = true;

      var elements = [];
      var discovered = [];
      var elOffset = 0;
      var yCoord = 520;
      var mute = true;

      createjs.Sound.registerSound("./assets/sounds/great_job.wav", "greatJob");
      createjs.Sound.registerSound("./assets/sounds/laugh.wav", "laugh");
      createjs.Sound.registerSound(
        "./assets/sounds/nuclear_war.mp3",
        "explode"
      );
      createjs.Sound.registerSound("./assets/sounds/win.mp3", "win");

      var winModal = new createjs.Shape();
      winModal.graphics.beginFill("ivory");
      winModal.graphics.setStrokeStyle(2, "round").beginStroke("#357EBD");
      winModal.alpha = 1;
      winModal.graphics.drawRect(240, 100, 500, 300);
      winModal.graphics.endFill();
      winModal.visible = false;

      var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
      winModalLabel.x = 490;
      winModalLabel.y = 190;
      winModalLabel.textAlign = "center";
      winModalLabel.lineWidth = 800;
      winModalLabel.lineHeight = 50;
      winModalLabel.visible = false;

      document.addEventListener("DOMContentLoaded", function () {
        canvas = document.getElementById("bodyCanvas");

        stage = new createjs.Stage(canvas);

        stage.enableMouseOver(10);
        stage.mouseMoveOutside = true;

        const line = new createjs.Shape();

        line.graphics.setStrokeStyle(10);
        line.graphics.beginStroke("black");
        line.graphics.moveTo(0, 500);
        line.graphics.lineTo(1000, 500);
        line.graphics.endStroke();

        stage.addChild(line);

        var disContainer = new createjs.Container();
        stage.addChild(disContainer);

        var mask = new createjs.Shape();
        mask.graphics.f("#f00").dr(0, 505, 1000, 500);
        disContainer.mask = mask;

        var wrapper;
        var canvasHeight;
        var vScrollHeight;
        var canvasWrapperHeight = 300;

        $(".bar").draggable({
          containment: "parent",
        });

        $(".bar").on("drag", function (event, ui) {
          stage.children[1].y = 0 - ui.position.top * 5.8;
          stage.update();
        });

        $(".mute").on("click", (e) => {
          if (e.currentTarget.alt === "false") {
            e.currentTarget.src = "./assets/img/mute.png";
            e.currentTarget.alt = "true";
            mute = true;
          } else {
            e.currentTarget.src = "./assets/img/unmute.png";
            e.currentTarget.alt = "false";
            mute = false;
          }
          update = true;
        });

        var mainContainer = new createjs.Container();
        stage.addChild(mainContainer);
        mainContainer.setBounds(0, 0, 1000, 500);

        stage.addChild(winModal);
        stage.addChild(winModalLabel);

        var aboutModal = new createjs.Shape();
        aboutModal.graphics.beginFill("ivory");
        aboutModal.graphics.setStrokeStyle(2, "round").beginStroke("#357EBD");
        aboutModal.alpha = 1;
        aboutModal.graphics.drawRect(240, 100, 500, 300);
        aboutModal.graphics.endFill();
        stage.addChild(aboutModal);
        aboutModal.visible = false;

        var modalLabel = new createjs.Text(
          "Really Little Alchemy",
          "40px Fantasy",
          "#000"
        );
        modalLabel.x = 490;
        modalLabel.y = 120;
        modalLabel.textAlign = "center";
        modalLabel.lineWidth = 800;
        modalLabel.lineHeight = 50;
        stage.addChild(modalLabel);
        modalLabel.visible = false;

        var modalDescription = new createjs.Text("", "20px Fantasy", "#000");
        modalDescription.text =
          "You're given 4 elements to begin.\
		Try combining these with themselves and each other to discover new elements!\
		Pull the elements into the upper compartment to combine.\
		There are 100 in total. Good luck!";
        modalDescription.textBaseline = "alphabetic";
        modalDescription.x = 480;
        modalDescription.y = 200;
        modalDescription.textAlign = "center";
        modalDescription.lineWidth = 300;
        modalDescription.lineHeight = 20;
        stage.addChild(modalDescription);
        modalDescription.visible = false;

        var buttonok = new createjs.Shape();
        buttonok.graphics.beginFill("black");
        buttonok.graphics.setStrokeStyle(2, "round").beginStroke("#357EBD");
        buttonok.graphics.drawRoundRect(630, 350, 100, 40, 5);
        buttonok.cursor = "pointer";
        stage.addChild(buttonok);
        buttonok.visible = false;

        buttonok.on("click", () => {
          aboutModal.visible = false;
          modalLabel.visible = false;
          modalDescription.visible = false;
          buttonokLabel.visible = false;
          buttonok.visible = false;
          update = true;
        });

        var buttonokLabel = new createjs.Text(
          "Continue",
          "20px Fantasy",
          "white"
        );
        buttonokLabel.x = 640;
        buttonokLabel.y = 360;
        modalDescription.lineWidth = 300;
        modalDescription.lineHeight = 20;
        stage.addChild(buttonokLabel);
        buttonokLabel.visible = false;

        $(".about").on("click", () => {
          aboutModal.visible === true
            ? (aboutModal.visible = false)
            : (aboutModal.visible = true);
          modalLabel.visible === true
            ? (modalLabel.visible = false)
            : (modalLabel.visible = true);
          modalDescription.visible === true
            ? (modalDescription.visible = false)
            : (modalDescription.visible = true);
          buttonok.visible === true
            ? (buttonok.visible = false)
            : (buttonok.visible = true);
          buttonokLabel.visible === true
            ? (buttonokLabel.visible = false)
            : (buttonokLabel.visible = true);
          stage.setChildIndex(aboutModal, stage.getNumChildren() - 1);
          stage.setChildIndex(modalLabel, stage.getNumChildren() - 1);
          stage.setChildIndex(modalDescription, stage.getNumChildren() - 1);
          stage.setChildIndex(buttonok, stage.getNumChildren() - 1);
          stage.setChildIndex(buttonokLabel, stage.getNumChildren() - 1);
          update = true;
        });

        buttonok.on("click", () => {
          aboutModal.visible = false;
          modalLabel.visible = false;
          modalDescription.visible = false;
          buttonokLabel.visible = false;
          buttonok.visible = false;
          update = true;
        });

        $(".cheat").on("click", (e) => {
          elOffset = 0;
          yCoord = 520;
          stage.children[1].removeAllChildren();
          stage.children[2].removeAllChildren();
          winModal.visible = false;
          winModalLabel.visible = false;

          if (stage.children[11] && stage.children[11].children) {
            stage.children[11].removeAllChildren();
          }
          discovered = [];
          update = true;
          if (e.currentTarget.textContent === "Unlock All") {
            e.currentTarget.textContent = "Start Over";
            all.forEach((el) => {
              let image = new Image();
              image.src = `./assets/img/${el}.png`;
              let elObj = { name: el };
              image.onload = handleImageLoad.bind(elObj);
            });
          } else {
            e.currentTarget.textContent = "Unlock All";
            initial.forEach((el) => {
              let image = new Image();
              image.src = `./assets/img/${el}.png`;
              let elObj = { name: el };
              image.onload = handleImageLoad.bind(elObj);
            });
          }
        });

        update = true;

        initial.forEach((el) => {
          let image = new Image();
          image.src = `./assets/img/${el}.png`;
          let elObj = { name: el };
          image.onload = handleImageLoad.bind(elObj);
        });
      });

      function stop() {
        createjs.Ticker.removeEventListener("tick", tick);
      }

      function handleImageLoad(event) {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        var container = new createjs.Container();
      
        // Set bitmap properties
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
        bitmap.cursor = "pointer";
        bitmap.name = this.name;
      
        // Initialize this.property to this.name
        this.property = init_properties[this.name];
      
        // Store this.property in the container
        container.property = this.property;
      
        // Create the text
        var text = new createjs.Text(this.name, "18px Fantasy", "#ff7700");
        text.textAlign = "center";
      
        // Get bitmap's width and height after scaling
        var imageWidth = bitmap.image.width * bitmap.scaleX;
        var imageHeight = bitmap.image.height * bitmap.scaleY;
      
        // Position the text below the image, centered
        text.x = imageWidth / 2;
        text.y = imageHeight + 5;
      
        // *** Add the info image to the container ***
        var infoImage = new Image();
        infoImage.src = "assets/img/info.png";
        var infoBitmap = new createjs.Bitmap(infoImage);
        infoBitmap.visible = false; // Initially hidden
      
        // Make sure infoBitmap is interactive
        infoBitmap.cursor = "pointer";
      
        // Add event listener to infoBitmap
        infoBitmap.on("click", function (evt) {
          evt.stopPropagation();
      
          // Access container.property
          this.parent.property += "*";
          var propertyValue = this.parent.property;
      
          // *** Create modal background to dim the stage ***
          var modalBackground = new createjs.Shape();
          modalBackground.graphics
            .beginFill("rgba(0, 0, 0, 0.5)")
            .drawRect(0, 0, stage.canvas.width, stage.canvas.height);
          modalBackground.name = "modalBackground";
      
          // *** Create modal window ***
          var modalWindow = new createjs.Container();
          var modalShape = new createjs.Shape();
          modalShape.graphics.beginFill("ivory");
          modalShape.graphics.setStrokeStyle(2, "round").beginStroke("#357EBD");
          modalShape.graphics.drawRect(0, 0, 500, 100);
          modalShape.graphics.endFill();
          modalWindow.addChild(modalShape);
          modalWindow.x = (stage.canvas.width - 500) / 2;
          modalWindow.y = (stage.canvas.height - 100) / 2;
          modalWindow.name = "modalWindow";
      
          // *** Add text to modal ***
          var modalText = new createjs.Text(
            propertyValue,
            "24px Arial",
            "#000"
          );
          modalText.x = 250; // Centered horizontally within modal
          modalText.y = 50; // Centered vertically within modal
          modalText.textAlign = "center";
          modalText.textBaseline = "middle";
          modalWindow.addChild(modalText);
      
          // *** Create close button ***
          var closeButton = new createjs.Text("X", "20px Arial", "#000");
          closeButton.x = 480; // Position at top-right corner of modal
          closeButton.y = 10;
          closeButton.cursor = "pointer";
          modalWindow.addChild(closeButton);
      
          // *** Add event listener to close button ***
          closeButton.on("click", function (evt) {
            evt.stopPropagation();
            stage.removeChild(modalBackground);
            stage.removeChild(modalWindow);
            update = true;
          });
      
          // *** Add modal to stage ***
          stage.addChild(modalBackground, modalWindow);
          update = true;
        });
      
        // Add bitmap, infoBitmap, and text to the container
        container.addChild(bitmap, infoBitmap, text);
        container.infoBitmap = infoBitmap; // Store for later use
      
        // When infoImage is loaded, position it
        infoImage.onload = function () {
          // Position the infoBitmap at the top right of the bitmap
          infoBitmap.x = imageWidth - infoBitmap.image.width + 8;
          infoBitmap.y = -5;
          update = true;
        };
      
        // Set container position on the stage
        if (this.discovered) {
          container.x = this.altX;
          container.y = this.altY;
          stage.children[2].addChild(container);
          elements.push(container);
        } else {
          container.x = this.x || 40 + elOffset;
          container.y = this.y || yCoord;
          stage.children[1].addChild(container);
        }
      
        // Adjust elOffset and yCoord for layout
        if (!this.x && !this.discovered) {
          if (elOffset > 700) {
            elOffset = 0;
            yCoord += 100;
          } else {
            elOffset += 140;
          }
        }
      
        // Keep track of discovered elements
        if (discovered.every((el) => el.name !== bitmap.name)) {
          discovered.push(bitmap);
        }
      
        // Update found count display
        stage.children.forEach((child) => {
          if (child.name === "foundCount") {
            stage.removeChild(child);
          }
        });
      
        var foundCount = new createjs.Text(
          `${discovered.length}`,
          "72px Fantasy",
          "#ff7700"
        );
        foundCount.x = 25;
        foundCount.y = 25;
        foundCount.name = "foundCount";
        stage.addChild(foundCount);
      
        update = true;
      
        // Attach event listeners to the container
        container.on("mousedown", function (evt) {
          if (evt.currentTarget.y > 465) {
            stage.children[2].addChild(this);
            let containerDup = this.clone(true);
            var imageDup = new Image();
            imageDup.src = this.children[0].image.src;
            imageDup.onload = handleImageLoad.bind({
              name: this.children[0].name,
              discovered: true,
              altX: this.x,
              altY: this.y,
            });
            this.y = evt.stageY - 20;
            this.offset = { x: this.x - evt.stageX, y: this.y - evt.stageY };
          } else {
            this.offset = { x: this.x - evt.stageX, y: this.y - evt.stageY };
          }
      
          // *** Show the info image when the item is dragged out but only if this.name is in init_properties ***
          console.log(this.children[0].name);
          console.log(init_properties);
          if (this.infoBitmap && init_properties.hasOwnProperty(this.children[0].name)) {
            this.infoBitmap.visible = true;
            update = true;
          }
        });
      
        container.on("pressup", function (evt) {
          if (!elements.includes(this)) elements.push(this);
          if (this.y < 465) {
            let toRemove = [];
            for (var i = 0; i < elements.length; i++) {
              let element = elements[i];
              if (
                this !== element &&
                !(
                  element.x - 15 > this.x + 15 ||
                  element.x + 15 < this.x - 15 ||
                  element.y - 15 > this.y + 15 ||
                  element.y + 15 < this.y - 15
                )
              ) {
                if (
                  [this.children[0].name, element.children[0].name]
                    .sort()
                    .join() === ["atomic bomb", "earth"].join()
                ) {
                  let kimContainer = new createjs.Container();
                  for (var i = 0; i < 250; i++) {
                    let kim = new Image();
                    kim.src = "./assets/img/kim-yong-trump.jpg";
                    let kimbitmap = new createjs.Bitmap(kim);
                    kimContainer.addChild(kimbitmap);
                    kimbitmap.x = Math.random() * 1000;
                    kimbitmap.y = Math.random() * 1000;
                  }
                  if (!mute) createjs.Sound.play("explode");
                  stage.addChild(kimContainer);
                  $(".cheat").text("Start Over");
                  update = true;
                }
                let combined = combine(
                  this.children[0].name,
                  element.children[0].name
                );
                if (combined !== undefined) {
                  combined = combined[0];
                  var discoveredEl = new Image();
                  discoveredEl.src = `./assets/img/${combined}.png`;
                  if (
                    discovered.every((el) => el.image.src !== discoveredEl.src)
                  ) {
                    let elObj = { name: combined };
                    discoveredEl.onload = handleImageLoad.bind(elObj);
                  }
                  let elObj = {
                    name: combined,
                    altX: this.x,
                    altY: this.y,
                    discovered: true,
                  };
                  let imageDup = new Image();
                  imageDup.src = discoveredEl.src;
                  imageDup.onload = handleImageLoad.bind(elObj);
                  if (!mute) createjs.Sound.play("greatJob");
                } else {
                  if (!mute) createjs.Sound.play("laugh");
                }
                stage.children[1].removeChild(this);
                stage.children[1].removeChild(element);
                stage.children[2].removeChild(this);
                stage.children[2].removeChild(element);
                toRemove.push(element);
                toRemove.push(this);
              }
            }
            elements = elements.filter((el) => {
              return !toRemove.includes(el);
            });
          } else {
            stage.children[1].removeChild(this);
            stage.children[2].removeChild(this);
          }
          update = true;
        });
      
        container.on("pressmove", function (evt) {
          if (this.y < 465) {
            if (evt.stageY < 465) {
              this.y = evt.stageY + this.offset.y;
            }
            this.x = evt.stageX + this.offset.x;
          } else {
            this.x = evt.stageX + this.offset.x;
            this.y = evt.stageY + this.offset.y;
          }
          update = true;
        });
      
        container.on("rollover", function (evt) {
          this.children[0].scaleX = this.children[0].scaleY =
            this.children[0].scale * 1.2;
          update = true;
        });
      
        container.on("rollout", function (evt) {
          this.children[0].scaleX = this.children[0].scaleY =
            this.children[0].scale;
          update = true;
        });
      
        if (stage.children[1].children.length >= 100) {
          if (!mute) createjs.Sound.play("win");
          winModal.visible = true;
          winModalLabel.visible = true;
          update = true;
        } else {
          winModal.visible = false;
          winModalLabel.visible = false;
        }
      
        createjs.Ticker.addEventListener("tick", tick);
      }

      function tick(event) {
        if (update) {
          update = false;
          stage.update(event);
        }
      }

      /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
      var allRecipes = __webpack_require__(2);

      function combine(el1, el2) {
        console.log(el1, el2);
        let recipe = [el1, el2].sort().join(",");
        console.log(recipe);
        console.log(allRecipes);
        return allRecipes[recipe];
      }

      module.exports = combine;

      /***/
    },
    /* 2 */
    /***/ function (module, exports) {
      var allRecipes = recipes.reduce((comb, [first, second]) => {
        if (!comb.hasOwnProperty(second)) comb[second] = [];
        comb[second].push(first);
        return comb;
      }, {});

      module.exports = allRecipes;

      /***/
    },
    /******/
  ]
);
