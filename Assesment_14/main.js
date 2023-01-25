const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)'}
];

const aliceTimimg = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
}

const alice1 = document.querySelector('#alice1');
const alice2 = document.querySelector('#alice2');
const alice3 = document.querySelector('#alice3');

/*alice1.animate(aliceTumbling, aliceTimimg);*/

async function spin() {
    const item = alice1.animate(aliceTumbling, aliceTimimg);

    try {
        const aliceTwo = await item.finished;
        const aliceDone = alice2.animate(aliceTumbling, aliceTimimg);

        const aliceThree = await aliceDone.finished;
        alice3.animate(aliceTumbling, aliceTimimg);
    }

    catch(error) {
        console.error('Could not get spin to work');
    }
}

spin();