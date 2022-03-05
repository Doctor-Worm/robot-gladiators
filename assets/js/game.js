var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // conditional recursive function call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("Player money is ", playerInfo.money);
            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

// fight function
var fight = function(enemy) {
    console.log(enemy);
// repeat and execute as long as the enemy-robot is alive
while(playerInfo.health > 0 && enemy.health > 0) {
    // repeat and execute as long as the enemy-robot is alive
    if (fightOrSkip()) {
        // if ture, leave fight by breaking loop
        break;
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. ");

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            console.log("Player money is ", playerInfo.money);

            // leave while() loop since enemy is dead
            break;
        } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

    // generate random damage value based on enemy's attack power
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. ");

        // check player's health
      if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
    // run fight function to start game
    for(var i = 0; i < enemyInfo.length; i++) {
     if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        debugger;
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40, 60);
        // console.log("Player health is " + playerInfo.health + ". " + "Player attack is " + playerInfo.attack + ". " + "Enemy health is " + enemyInfo.health + ". "+ "Enemy attack is " + enemyInfo.attack + ". ");
        fight(pickedEnemyObj);

        // if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // if yes, take them to the store() function
            if (storeConfirm) {
            shop();
            }
        }
     }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        break;
        }
    }

    // after loop ends, we are either out of player health or enemies to fight, so run the endGame function
    endGame();
};

// function to end entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
}
else {
    window.alert("You've lost your robot in battle.");
}

// ask player if they'd like to play again
var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    // restart the game
    startGame();
}
else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};

// go to shop between battles function
var shop = function() {
    // ask player what they'd like to do
    var shipOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL, 'UPGRADE', or 'LEAVE' to make a choice.");

    switch (shipOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to set name
var getPlayerName = function() {
    var name = "";

    // Add loop here with prompt and condition //
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Mr. Roboto",
        attack: randomNumber(10,14)
    },
    {
        name: "Android 18",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trouble",
        attack: randomNumber(10,14)
    }
];

// start the game when the page loads
startGame();