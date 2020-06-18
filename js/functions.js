//localStorage.clear();

var seconds = 0;
var minutes = 0;
var hours = 0;
var timer;
var treeGrowingPace = 2;// 1800;
printTime();
var numberOfTrees = localStorage.getItem("numberOfTrees");
printNumberOfTrees();

function startTheClock() {
    if (timer == null)
        timer = setInterval(clock, 1000);
    playTree();
}

function stopTheClock() {
    clearInterval(timer);
    pauseTree();
}

function resetTheClock() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    printTime();
    endTree();
}

function clock() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }

    if (hours >= 24) {
        hours = 0;
    }

    if (minutes % 30 == 0 && seconds == 0) {
        numberOfTrees++;
        localStorage.setItem("numberOfTrees", numberOfTrees);
        printNumberOfTrees();
        endTree();
        playTree();
    }

    printTime();
}

function printTime() {
    var text = (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes) + " : " + (seconds < 10 ? "0" + seconds : seconds);
    document.getElementById("clock").innerHTML = text;
}

function printNumberOfTrees() {
    if (numberOfTrees == null) {
        document.getElementById("trees").innerHTML = "Grown trees: (0)";
    }
    else {
        var text2 = "Grown trees: (" + numberOfTrees + ")";
        document.getElementById("trees").innerHTML = text2;
    }
}

/*The below copyright notice applies only to the css and javascript of the tree*/
/*Copyright (c) 2020 by Daybrush (https://codepen.io/daybrush/pen/EQPPBg)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var sceneTree;
function drawATree() {
    sceneTree = new Scene({
        ".tree": {
            0: { transform: "scale(0)" },
            1.5: { transform: "scale(1)" }
        },

    }, {
        selector: true
    });


    var branchs = document.querySelectorAll(".tree .branch, .tree .leaf, .tree .flower1");
    var depths = [0, 0, 0];

    for (var i = 0; i < branchs.length; i++) {
        var sceneItem = sceneTree.newItem("item" + i);
        var className = branchs[i].className;

        if (~className.indexOf("branch-inner")) {
            ++depths[1];
            depths[2] = 0;
        }
        else if (~className.indexOf("branch")) {
            ++depths[0];
            depths[1] = 0;
            depths[2] = 0;
        } else if (~className.indexOf("leaf") || ~className.indexOf("flower1")) {
            ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);

        var time = 1 + depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0);
        sceneItem.set(time + 1, "transform", "scale", 1);
    }

    sceneTree.setDuration(treeGrowingPace);
    //sceneTree.setDuration(20); 
    playTree();
    pauseTree();

}

function playTree() {
    sceneTree.play();
}

function pauseTree() {
    sceneTree.pause();
}

function endTree() {
    sceneTree.finish();
}

drawATree();
