function OpeningCeremony(callbackFnc) {
    console.log("Let the games begin");
    const score = {red:0, blue:0, green:0, yellow:0};
    setTimeout(() => {
      Race100M(score, callbackFnc);
    }, 1000);
  }
  
  function Race100M(score, callbackFnc) {
    console.log("Race 100M starts");
    const times = {
      red: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
    };
    console.log(`Times:`, times);
    const sortedTimes = Object.keys(times).sort((a, b) => times[a] - times[b]);
    score[sortedTimes[0]] += 50;
    score[sortedTimes[1]] += 25;
    console.log(`Score:`, score);
    setTimeout(() => {
      callbackFnc(score, LongJump);
    }, 1000);
  }
  
  function LongJump(score, callbackFnc) {
    console.log("Long Jump starts");
    const winningColor = ["red", "yellow", "green", "blue"][Math.floor(Math.random() * 4)];
    console.log(`Winner: ${winningColor}`);
    score[winningColor] += 150;
    console.log(`Score:`, score);
    setTimeout(() => {
      callbackFnc(score, HighJump);
    }, 2000);
  }
  
  function HighJump(score, callbackFnc) {
    console.log("High Jump starts");
    const color = prompt("What colour secured the highest jump?");
    if (color === "red" || color === "yellow" || color === "green" || color === "blue") {
      score[color] += 100;
      console.log(`Score:`, score);
      callbackFnc(score, AwardCeremony);
    } else if (color === null || color === "") {
      console.log("Event was cancelled");
      callbackFnc(score, AwardCeremony);
    } else {
      console.log("Invalid color");
      HighJump(score, callbackFnc);
    }
  }
  
  function AwardCeremony(score) {
    console.log("Award Ceremony starts");
    const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
    console.log(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
    console.log(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
  }
  
  OpeningCeremony((score, nextFn) => {
    console.log("Callback called");
    console.log(`Score:`, score);
    nextFn(score, (score, nextFn) => {
      console.log("Callback called");
      console.log(`Score:`, score);
      nextFn(score, (score, nextFn) => {
        console.log("Callback called");
        console.log(`Score:`, score);
        nextFn(score, (score, nextFn) => {
          console.log("Callback called");
          console.log(`Score:`, score);
          nextFn(score);
        });
      });
    });
  });
  