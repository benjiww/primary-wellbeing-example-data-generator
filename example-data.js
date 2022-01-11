"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express = require("express");
var activityNameArr = ['Outdoor play', 'Indoor play', 'Reduced class time', 'Reduced class size'];
var nameArr = ['Ben', 'George', 'Harley', 'Toby', 'Amy', 'Katie', 'Lily', 'Harriet'];
var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var returnBiasScore = function (originalScore, bias) {
    var random = 1 - Math.sqrt(1 - Math.random());
    (Math.random()) ? random = random : random = random * 1;
    var biasOriginal = Math.round((originalScore + random) * bias);
    if (biasOriginal >= 8) {
        return 8;
    }
    else if (biasOriginal <= 0) {
        return 0;
    }
    else {
        return biasOriginal;
    }
};
var generateExampleData = function (userCount, biasArray) {
    var tempUserObjArr = [];
    var _loop_1 = function (i) {
        var tempName = nameArr[getRandomIntInclusive(0, (nameArr.length - 1))];
        tempResults = [];
        var originalRandomScoreArr = Array.apply(null, Array(biasArray.length)).map(function (x) { return getRandomIntInclusive(0, 8); });
        var maxMonths = getRandomIntInclusive(0, 11);
        for (var j = 0; j < 12; j++) {
            if (j >= maxMonths) {
                if (j === maxMonths) {
                    tempResults.push(__spreadArray([j], biasArray.map(function (bias, index) { return originalRandomScoreArr[index]; }), true));
                }
                else {
                    tempResults.push(__spreadArray([j], biasArray.map(function (bias, index) { return returnBiasScore(originalRandomScoreArr[index], (bias.bias > 1) ? bias.bias * (1 + (tempResults.length / bias.timeAccelerator)) : (bias.bias === 1) ? bias.bias : bias.bias * (1 - (tempResults.length / bias.timeAccelerator))); }), true));
                }
            }
        }
        tempUserObjArr.push({ name: tempName, results: tempResults });
    };
    var tempResults;
    for (var i = 0; i < userCount; i++) {
        _loop_1(i);
    }
    var exampleData = {
        activity: activityNameArr[getRandomIntInclusive(0, 3)],
        userObjArr: tempUserObjArr
    };
    return exampleData;
};
// bias: 1.25 or 0.75
// timeAccelerator: 12 or 18
var app = express();
app.listen(3000, function () {
    console.log("Started on PORT 3000");
});
app.get('/getExampleData', function (request, response) {
    var userCount = parseInt(request.query.userCount);
    var biasArray = request.query.biasArray.split('-').map(function (x) { return JSON.parse(x); });
    response.send(generateExampleData(userCount, biasArray));
});
