let playerSub = {
    health: 100,
    score: 0,
    angle: 90, // Angle in degrees, 0 is right, 90 is up, 180 is left, 270 is down
    x: 0,
    y: 0,
    name: "Player",

    updateHealth(amount) {
        this.health += amount;
        if (this.health <= 0) {
            this.health = 0;
            endGame();
        }
    },

    updateScore(points) {
        this.score += points;
    },

    updatePosition(x, y) {
    this.x = x;
    this.y = y;

    const playerElement = document.getElementById("player");
    }
};

let enemySub = {
    health: 100,
    x: 200,
    y: 0,
    turnSpeed: 5,
    torpedointerval: 10, // Interval in seconds for enemy torpedo firing
    angle: 270, // Angle in degrees, 0 is right, 90 is up, 180 is left, 270 is down

    updateHealth(amount) {
        this.health += amount;
        if (this.health <= 0) {
            this.health = 0;
            playerSub.updateScore(100); // Reward for destroying enemy
        }
    },
    enemyLoadTorpedo() {
        if (this.torpedointerval > 0) {
            this.torpedointerval -= 1; // Decrease interval each second
        }
    },
    enemyFireTorpedo() {
        if (this.health > 0) {
            if (this.torpedointerval <= 0) {
                // Calculate the position of the torpedo based on enemy submarine's position and angle
                const angleInRadians = this.angle * (Math.PI / 180);
                const torpedoX = this.x + Math.cos(angleInRadians) * 100; // Adjust distance as needed
                const torpedoY = this.y + Math.sin(angleInRadians) * 100; // Adjust distance as needed

                // Simulate the torpedo hitting the player submarine
                if (Math.abs(torpedoX - playerSub.x) < 10 && Math.abs(torpedoY - playerSub.y) < 10) {
                    playerSub.updateHealth(-20); // Damage to player submarine
                } 
                else {
                }

                this.torpedointerval = 10; // Reset interval after firing
            }

        } 
        else {
        }
    },

    move(speed) {
        // Turn the sub by turnSpeed degrees
        this.angle = (this.angle + this.turnSpeed + 360) % 360;

        // Calculate movement based on angle
        const angleInRadians = this.angle * (Math.PI / 180);
        const dx = Math.cos(angleInRadians) * speed;
        const dy = Math.sin(angleInRadians) * speed;

        // Update position
        this.x += dx;
        this.y += dy;

        // Check boundaries and reverse turnSpeed if hitting an edge
        if (this.x <= 0) {
            this.x = 0;
            this.turnSpeed = -this.turnSpeed;
        }
        else if (this.x >= 200) {
            this.x = 200;
            this.turnSpeed = -this.turnSpeed;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.turnSpeed = -this.turnSpeed;
        }
        else if (this.y >= 200) {
            this.y = 200;
            this.turnSpeed = -this.turnSpeed;
        }
    },
    rotate(clockwise = true) {
        if (clockwise) {
            this.angle = (this.angle + this.turnSpeed) % 360;
        } else {
            this.angle = (this.angle - this.turnSpeed + 360) % 360;
        }

    }
}

const storedPlayer = JSON.parse(localStorage.getItem('player'));
if (storedPlayer && storedPlayer.name) {
    playerSub.name = storedPlayer.name;
}


let crewLocations = {
        torepedoRoomManned: false,
        sonarRoom: false,
        engineRoom: false,
        cloakingRoom: false,
        navigationRoom: false,

       updateRooms(){
            this.torepedoRoomManned = false;
            this.sonarRoom = false;
            this.engineRoom = false;
            this.cloakingRoom = false;
            this.navigationRoom = false;

            const CM1Location = document.getElementById("crewMember1");
            const CM1Pos = CM1Location.value;
            const CM2Location = document.getElementById("crewMember2");
            const CM2Pos = CM2Location.value;
            const CM3Location = document.getElementById("crewMember3");
            const CM3Pos = CM3Location.value;

            // Map room names to object properties
            const roomMap = {
                torpedo: "torepedoRoomManned",
                sonar: "sonarRoom",
                engine: "engineRoom",
                cloaking: "cloakingRoom",
                navigation: "navigationRoom"
            };

            if (roomMap[CM1Pos]) {
                this[roomMap[CM1Pos]] = true;
                this[roomMap[CM2Pos]] = true;
                this[roomMap[CM3Pos]] = true;
            }
       } 
};







//code for the reloading and firing of torepedos
var speed = 0;
var i = 0;
var loadIntervalId;  // store interval ID globally

function load() {
    if (crewLocations.torepedoRoomManned == true){
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = parseFloat(elem.style.width) || 1;  // use current width or start at 1

            loadIntervalId = setInterval(frame, 10);

            function frame() {
                if (width >= 100) {
                    clearInterval(loadIntervalId);  // stop interval
                    i = 0;
                } else {
                    if (crewLocations.torepedoRoomManned == true){
                        width = width + 0.05;
                        elem.style.width = width + "%";
                    }
                }
            }
        }
    }
}

function fire() {
    if (crewLocations.torepedoRoomManned == true) {
        var elem = document.getElementById("myBar");
        var currentWidth = parseFloat(elem.style.width);

        if (currentWidth >= 100) {
            elem.style.width = "0%"; // Reset the progress bar visually
            clearInterval(loadIntervalId);  // stop the loading interval if any still running
            i = 0;  // allow loading again
            console.log("Firing torpedo!");
            console.log("Firing torpedo!");
            const angleInRadians = playerSub.angle * (Math.PI / 180);
            const torpedoX = playerSub.x + Math.cos(angleInRadians) * 100; // Adjust distance as needed
            const torpedoY = playerSub.y + Math.sin(angleInRadians) * 100; // Adjust distance as needed

                // Simulate the torpedo hitting the player submarine
                if (Math.abs(torpedoX - enemySub.x) < 10 && Math.abs(torpedoY - enemySub.y) < 10) {
                    
                    enemySub.updateHealth(-20); // Damage to player submarine
                } 
                else {
                   
                }


        }
        else {
            
        }
    }
    else {
       
    }
}



function move() {
    if (crewLocations.engineRoom == true){
        var gears = document.getElementById("speed-slider");
        var inGear = parseInt(gears.value);
        if (inGear > 1) {
            speed = inGear * 10; // 
        } else if (inGear === 0) {
            speed = -10; // reverse
        } else {
            speed = 0; // neutral or invalid
        }
        // Move based on angle using trigonometry
        
        const angleDeg = playerSub.angle;
        const angleInRadians = playerSub.angle * (Math.PI / 180);


        const dx = Math.cos(angleInRadians) * speed;
        const dy = Math.sin(angleInRadians) * speed;

        playerSub.x += dx;
        playerSub.y += dy;

        playerSub.updatePosition(playerSub.x, playerSub.y);
        
        
    }
    else {

    }
}

function rotate() {
    if (crewLocations.navigationRoom === true) {
        const rotationSlider = document.getElementById("rotation-slider");
        const inRotation = parseInt(rotationSlider.value);

        if (inRotation > 0) {
            turnSpeed = Math.abs(inRotation) * 10;
            playerSub.angle = (playerSub.angle - turnSpeed + 360) % 360;
        }
        else if (inRotation < 0) {
            turnSpeed = inRotation * 10;
            playerSub.angle = (playerSub.angle + turnSpeed + 360) % 360;
        }

    }
}

function sonar() {
    if (crewLocations.sonarRoom === true) {
        console.log("EnemySub x:", enemySub.x, "y:", enemySub.y);
        const enemyLocationElement = document.getElementById('enemyLocation');

        if (enemyLocationElement) {
            enemyLocationElement.textContent = `Enemy Location: (${enemySub.x}, ${enemySub.y})`;
        }

    }
    else {
    }
}


function degToRad(deg) {
  return deg * (Math.PI / 180);
}


//function endGame(){
//    localStorage.setItem('player', JSON.stringify({
//        name: playerSub.name,
//        score: playerSub.score
//    }));
//    window.location.href = 'leaderboard.html';
//}

setInterval(() => {
    load();    // Handle reloading of torpedoes
    crewLocations.updateRooms(); // Keep crew room states up to date
    rotate();  // Handle turning
    move();    // Handle movement
    enemySub.enemyLoadTorpedo(); // Handle enemy torpedo firing
    if (crewLocations.cloakingRoom === false) {
            enemySub.enemyFireTorpedo();
    }
    sonar();
    enemySub.move(5);
    enemySub.rotate(true); // Rotate enemy submarine
}, 1000); // update every 1000ms (1 times per second)