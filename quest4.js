
//입력과 출력 1
/*import readlineSyncModule from 'readline-sync';

const userInput = readlineSyncModule.question(`입력:`);

console.log(`나: ${userInput}\n 앵무새 : ${userInput}`);

import readlineSyncModule from 'readline-sync';
let isCorrect = false;
*/
/*
let a = `열심히 배워서 최고의 개발자가 되어보자!`;

//입력과 출력 2
const userInput = readlineSyncModule.question(`문장 입력:`);

if(isCorrect = false){
    console.log(`오답입니다.`);
}
else{
    console.log('정답입니다.');
}
    */

import readlineSyncModule from 'readline-sync';


const menu = readlineSyncModule.question(`메뉴 선택:`);

const memoTitle = readlineSyncModule.question(`메모의 제목:`);

const memoContent = readlineSyncModule.question(`내용 :`);

console.log(`메뉴 : ${menu} \n 메모 제목: ${memoTitle} \n 내용: ${memoContent}` );
