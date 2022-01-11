import express = require('express');

interface userObj {

    name: string,
    results: [][]

}

interface activityObj {

    activity: string,
    userObjArr: userObj[]

}

interface biasObj {

    bias: number,
    timeAccelerator: number

}

const activityNameArr: string[] = [ 'Outdoor play', 'Indoor play', 'Reduced class time', 'Reduced class size' ];
const nameArr: string[] = [ 'Ben', 'George', 'Harley', 'Toby', 'Amy', 'Katie', 'Lily', 'Harriet' ];

const getRandomIntInclusive = ( min: number, max: number ): number => {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);

}

const returnBiasScore = ( originalScore: number, bias: number): number => {

    let random = 1 - Math.sqrt(1 - Math.random());

    (Math.random()) ? random = random : random = random * 1

    let biasOriginal: number = Math.round((originalScore + random) * bias);

    if (biasOriginal >= 8) {

        return 8;

    } else if (biasOriginal <= 0) {

        return 0;

    } else {

        return biasOriginal;

    }

}

const generateExampleData = ( userCount: number, biasArray: biasObj[] ): activityObj => {

    var tempUserObjArr: userObj[] = [];

    for (let i = 0; i < userCount; i ++) {

        let tempName: string = nameArr[getRandomIntInclusive(0, (nameArr.length - 1))];
        var tempResults = [];

        const originalRandomScoreArr: number[] = Array.apply(null, Array(biasArray.length)).map((x) => getRandomIntInclusive(0, 8));

        const maxMonths: number = getRandomIntInclusive(0, 11);

        for (let j = 0; j < 12; j ++) {

            if ( j >= maxMonths ) {

                if (j === maxMonths) {

                    tempResults.push(

                        [ j, ...biasArray.map((bias, index) => originalRandomScoreArr[index])]

                    )

                } else {

                    tempResults.push(

                        [ j, ...biasArray.map((bias, index) => returnBiasScore( originalRandomScoreArr[index], (bias.bias > 1) ? bias.bias*(1 + (tempResults.length / bias.timeAccelerator)) : (bias.bias === 1) ? bias.bias : bias.bias*(1 - (tempResults.length / bias.timeAccelerator)) )) ]

                    )

                }

            }

        }

        tempUserObjArr.push(

            { name: tempName, results: tempResults }

        )

    }

    const exampleData: activityObj = {

        activity: activityNameArr[getRandomIntInclusive(0, 3)],
        userObjArr: tempUserObjArr

    };
    
    return exampleData;

}

// bias: 1.25 or 0.75
// timeAccelerator: 12 or 18

const app = express();

app.listen(3000, () => {

    console.log("Started on PORT 3000");

})

app.get('/getExampleData', (request: any, response: any) => {

    let userCount = parseInt(request.query.userCount)
    let biasArray = request.query.biasArray.split('-').map(x => JSON.parse(x))

    response.send(generateExampleData(userCount, biasArray));
})

// tsc main.ts && node main.js