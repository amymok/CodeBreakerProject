let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    if (answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    let input = document.getElementById('user-guess');
    // add functionality to guess function here
    if (! validateInput(input.value)) {
        return false;
    } else {
        attempt.value = parseInt(attempt.value) + 1;
    }
    console.log(attempt.value);
    result = getResults(input.value);
    if (result) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (parseInt(attempt.value) >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {

    answer_no_zeros = Math.floor(Math.random() * 9999).toString();
    prefix = "";
    for (var i = 0; i < 4 - answer_no_zeros.length; i++) {
        prefix += "0";
    }
    answer.value = prefix + answer_no_zeros;
    attempt.value = 0;
}

function setMessage(msg) {
    let message = document.getElementById("message");
    message.innerHTML = msg;
}

function validateInput(param) {
    if (param.length == 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.")
        return false;
    }
}

function getResults(input) {
    bguess = true;
    new_html ="<div class=\"row\"><span class=\"col-md-6\">'" + 
        input + 
        "'</span><div class=\"col-md-6\">";
    for (var i = 0; i < answer.value.length; i++) {
        if (input.charAt(i) == answer.value.charAt(i)) {
            new_html +="<span class=\"glyphicon glyphicon-ok\"></span>";
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            new_html +="<span class=\"glyphicon glyphicon-transfer\"></span>";
            bguess = false;
        } else {
            new_html +="<span class=\"glyphicon glyphicon-remove\"></span>";
            bguess = false;
        }
    }
    new_html += "</div>";
    document.getElementById("results").innerHTML += new_html;
    return bguess;
}

function showAnswer(won) {
    code = document.getElementById("code");
    code.innerHTML = answer.value;
    if (won) {
        code.className += " success";
    } else {
        code.className += " failure";
    }

}

function showReplay() {
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}
