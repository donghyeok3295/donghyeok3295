import readlineSyncModule from 'readline-sync';

/* 반복문 1번 퀘스트
const a = parseInt(readlineSyncModule.question("숫자 입력:"),10);

if(a <2){
    console.log(`2 이상의 숫자를 입력하세요`)
    
;}


else{
for (let i=a; i<=a; i++){
    for(let j=1; j<=9; j++){
       
        console.log(`${i} * ${j} = ${i*j}`);
    }
}
}
*/

let line=``;
for(let i=0; i<5; i++){
    let line=``;
    for(let j=4; j>i; j--){
        line +=` `;
    }
    for(let j=0; j<2*i+1; j++){
        line +=`*`;
    }

    console.log(line);

    
}
