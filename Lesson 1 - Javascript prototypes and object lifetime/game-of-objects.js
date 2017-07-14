/**
 * Created by Vladimir on 14.7.2017.
 */
var gameStarted = false;

function CreatureFunctions () {
    this.attack = function (target) {
        console.log(this.name + ' has attacked');
        if (!!this.knights) {
            for (var i = 0; i < this.knights.length; i++) {
                target.takeDamage(this.knights[i].attackStrength);
            }
        } else {
            target.takeDamage(this.attackStrength);
        }
    };
    this.takeDamage = function (damage) {
        if (!!this.knights) {
            this.knights[Math.floor(Math.random() * this.knights.length)].takeDamage(damage);
        } else {
            this.health = this.health - damage;
            console.log(this.name + ' has been damaged');
        }
    }
}

function Knight (health, attackStrength, actions) {
    this.name = 'Knight';
    this.health = health;
    this.attackStrength = attackStrength;
}

function Dragon (health, attackStrength, actions) {
    this.name = 'Drogon';
    this.health = health;
    this.attackStrength = attackStrength;
    this.flamestrike = function (target) {
        if (!!target.wizards) {
            if (target.wizards.length > 0) {
                for (var i = 0; i < target.wizards.length; i++) {
                    target.wizards[i].takeDamage(250);
                }
            }
        }
    };
}

function Wizard (health, actions) {
    this.name = 'Wizard';
    this.health = health;
    this.buff = 5;
}

function Army (actions) {
    this.name = 'The Lannisters';
    this.casualties = 0;
    this.knights = [];
    this.wizards = [];
    this.mournTheDead = function() {
        for (var i = 0; i < this.knights.length; i++) {
            if (this.knights[i].health <= 0) {
                this.knights.splice(i, 1);
                this.casualties++;
            }
        }
    };
    this.initialize = function (number) {
        for (var i = 0; i < number; i++) {
            var knight = new Knight(100, 10, actions);
            this.knights.push(knight);
        }
    };
    this.callReinforcements = function () {
        this.initialize(10);
    };
    this.callWizard = function () {
        var wizard = new Wizard (200, actions);
        this.wizards.push(wizard);
        console.log('A wizard has been called, all knights have increased damage');
        for (var i = 0; i < this.knights.length; i++) {
            this.knights[i].attackStrength += wizard.buff;
        }
    };
    this.initialize(5);
}

function startGame () {
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    var dragon = {};
    var army = {};
    var actions = new CreatureFunctions();
    var turn = 1;
    var casualties = 0;

    Dragon.prototype = actions;
    Army.prototype = actions;
    Knight.prototype = actions;
    Wizard.prototype = actions;

    dragon = new Dragon(2500, 50, actions);
    army = new Army(actions);

    function advanceTurn () {
        if (!gameStarted) {
            return;
        }
        army.mournTheDead();

        if (dragon.health <= 0) {
            console.log('The dragon has been defeated. Casualties: ', army.casualties);
            return;
        }
        if (turn % 3 === 0) {
            army.callWizard();
        }
        if (turn % 5 === 0) {
            dragon.flamestrike(army);
            console.log('The dragon destroyed all wizards');
        }
        if (army.knights.length <= 1) {
            army.callReinforcements();
            console.log('The army numbers have been bolstered');
        }
        army.attack(dragon);
        dragon.attack(army);
        turn++;
        console.log('Turn ' + turn + ' ended');
        console.log('Army status: ', army);
        console.log('Dragon status: ', dragon);
    }
    document.getElementById('advance').addEventListener('click', advanceTurn);
    console.log('Game started');
}

document.getElementById('start').addEventListener('click', startGame);