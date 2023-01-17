/*   //= _page.empty.js

//  = _app.loaddata.js
*/
var manipWindow = (function(){
    let win = document.getElementById('modal-manip');
    let confirm_win = document.getElementById('confirm-01');
    let currentNum = null;
    confirm_win.addEventListener('animationend',()=>{
        if (confirm_win.classList.contains('animate__fadeOut')){
            confirm_win.classList.add('d-none');
            confirm_win.querySelectorAll('p')[currentNum].classList.add('d-none')
        }
    });
    function show(){
        win.classList.remove('d-none');
        win.classList.add("animate__animated", "animate__fadeIn");
    }
    function showConfirm(num){
        currentNum = num;
        confirm_win.querySelectorAll('p')[num].classList.remove('d-none')
        confirm_win.classList.remove('d-none','animate__fadeOut');
        confirm_win.classList.add('animate__fadeIn');
    };
    function closeConfirm() {
        confirm_win.classList.remove('animate__fadeIn');
        confirm_win.classList.add("animate__animated",'animate__fadeOut')
    }
    return {
        show:show,
        showConfirm: showConfirm,
        closeConfirm: closeConfirm
    }

})();
const TEXTS = {
    BOY_TOP: {
        HELLO: document.getElementById('g-hello-text-boy-top')
    },
    BOY_INVALID:{
        HELLO: document.getElementById('g-hello-text-boy-invalid'),
        REPLIC_2: document.getElementById('invalid-replic-2')
    },
    GIRL_TOP:{
        HELLO: document.getElementById('g-hello-text-girl-top')
    },
    GIRL_BOT:{
        HELLO: document.getElementById('g-hello-text-girl-bottom')
    },
    TEACHER:{
        HELLO: document.getElementById('g-hello-text'),
        REPLIC_2: document.getElementById('teacher-replic-2'),
        REPLIC_3: document.getElementById('teacher-replic-3'),
        ONE_LINE: document.getElementById('teacher-1')
    }
}

const ARROW = document.getElementById('arrow-svg');

const BUBBLES = {
  GIRL_TOP: document.getElementById("girl-top-bubble"),
  GIRL_BOTTOM: document.getElementById("girl-bottom-bubble"),
  BOY_TOP: document.getElementById("boy-top-bubble"),
  BOY_INVALID: document.getElementById("boy-invalid-bubble"),
  TEACHER: document.getElementById("teacher-bubble"),
};

const TEACHER_STATE = {
    NORMAL: document.getElementById('teacher-normal-body'),
    PANIC: document.getElementById('teacher-panic')
}

const INVALID_STATE = {
    NORMAL: document.getElementById('invalid-normal-state'),
    LIE_01: document.getElementById('boy-invalid-state-1'),
    LIE_02: document.getElementById('boy-invalid-state-2')
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tappingText(el,str) {
    for(let i=0;i<str.length;i++){
        await wait(100);
        el.innerHTML+=str[i];
    }
}

let ANIM_INVALID = null;

var bubbleTeacher = document.getElementById("teacher-bubble");

const MODALS = {
  START: document.getElementById("start-modal"),
};

async function startGame() {
    girlTop = document.getElementById("g-hello-text-girl-top");
    girlBot = document.getElementById("g-hello-text-girl-bottom");
    boyTop = document.getElementById("g-hello-text-boy-top");
    boyInvalid = document.getElementById("g-hello-text-boy-invalid");
    MODALS.START.classList.add('d-none');
    await wait(500);
    bubbleTeacher.classList.remove('d-none');
    let groupHello = document.getElementById("g-hello-text");
    console.log(groupHello.childNodes[0])
    await tappingText(groupHello.children[0], "Здравствуйте,");
    await tappingText(groupHello.children[1], "дети!");
    await wait(100);
    BUBBLES.GIRL_TOP.classList.remove('d-none')
    tappingHello(girlTop);
    await wait(150);
    BUBBLES.BOY_INVALID.classList.remove('d-none')
    tappingHello(boyInvalid);
    await wait(100);
    BUBBLES.BOY_TOP.classList.remove('d-none')
    tappingHello(boyTop);
    await wait(120);
    BUBBLES.GIRL_BOTTOM.classList.remove('d-none');
    // await tappingHello(girlBot, startSecondScane);
    await tappingHello(girlBot);
    await wait(800);
    fadeOut(TEXTS.GIRL_BOT.HELLO,TEXTS.GIRL_TOP.HELLO,TEXTS.BOY_INVALID.HELLO,TEXTS.BOY_TOP.HELLO);
    fadeOut(BUBBLES.GIRL_BOTTOM,BUBBLES.GIRL_TOP,BUBBLES.BOY_INVALID,BUBBLES.BOY_TOP);

    TEXTS.TEACHER.HELLO.classList.add('d-none');
    TEXTS.TEACHER.REPLIC_2.classList.remove('d-none');
    await tappingText(TEXTS.TEACHER.REPLIC_2.children[0],'Сегодня мы');
    await tappingText(TEXTS.TEACHER.REPLIC_2.children[1], 'продолжим изучать');
    await tappingText(TEXTS.TEACHER.REPLIC_2.children[2], 'цифры, сложение');
    await tappingText(TEXTS.TEACHER.REPLIC_2.children[3], 'и вычитание');
    await wait(500);
    TEXTS.TEACHER.REPLIC_2.classList.add('d-none');
    fadeOut(BUBBLES.TEACHER);
    // Реплика больного 2
    await wait(500);
    showBubble(BUBBLES.BOY_INVALID);
    TEXTS.BOY_INVALID.REPLIC_2.classList.remove('d-none');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[0], 'Надоело! Не хочу');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[1], 'изучать ваши');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[2],'дурацкие цифры');
    // Ответная реплика учителя
    await wait(800)
    TEXTS.BOY_INVALID.REPLIC_2.classList.add('d-none');
    fadeOut(BUBBLES.BOY_INVALID);
    showBubble(BUBBLES.TEACHER);
    await tappingText(TEXTS.TEACHER.REPLIC_3.children[0],'Дима, что случилось?');
    await tappingText(TEXTS.TEACHER.REPLIC_3.children[1], 'Я тебя не узнаю');
    await tappingText(TEXTS.TEACHER.REPLIC_3.children[2], 'сегодня!');
    //---------
    await wait(800);
    TEXTS.TEACHER.REPLIC_3.classList.add('d-none');
    fadeOut(BUBBLES.TEACHER)
    showBubble(BUBBLES.BOY_INVALID);
    clearReplic(TEXTS.BOY_INVALID.REPLIC_2);
    TEXTS.BOY_INVALID.REPLIC_2.classList.remove('d-none');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[0],'Ненавижу вас всех!');
    TEACHER_STATE.NORMAL.classList.add('d-none');
    TEACHER_STATE.PANIC.classList.remove('d-none');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[1], 'Надеюсь вы все');
    await tappingText(TEXTS.BOY_INVALID.REPLIC_2.children[2], 'умрете! Ааааа');
    // ========
    await wait(800);
    TEXTS.BOY_INVALID.REPLIC_2.classList.add('d-none');
    fadeOut(BUBBLES.BOY_INVALID);
    showBubble(BUBBLES.TEACHER);
    TEXTS.TEACHER.ONE_LINE.classList.remove('d-none');
    await tappingText(TEXTS.TEACHER.ONE_LINE.children[0],'???')
    await wait(800);
    TEXTS.TEACHER.ONE_LINE.classList.add('d-none');
    clearReplic(TEXTS.TEACHER.ONE_LINE);
    fadeOut(BUBBLES.TEACHER);
    INVALID_STATE.NORMAL.classList.add('d-none');
    INVALID_STATE.LIE_01.classList.remove('d-none');
    ANIM_INVALID = setInterval(animInvalid,250);
    TEXTS.TEACHER.ONE_LINE.classList.remove('d-none');
    showBubble(BUBBLES.TEACHER);
    await tappingText(TEXTS.TEACHER.ONE_LINE.children[0],'Судороги!')
    await wait(800);
    ARROW.classList.remove('d-none');
    ARROW.classList.add('animate__animated', 'animate__bounce', 'animate__infinite');
}
function animInvalid(){
    INVALID_STATE.LIE_01.classList.toggle('d-none');
    INVALID_STATE.LIE_02.classList.toggle('d-none');
}
function clearReplic(groupNode){
    for(let i=0;i<groupNode.children.length;i++){
        groupNode.children[i].innerHTML = '';
    }
}
function fadeOut(el){
    for(let i=0;i<arguments.length;i++){
        arguments[i].classList.remove('animate__fadeIn');
        arguments[i].classList.add("animate__animated", "animate__fadeOut")
    }
}
function showBubble(){
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].classList.remove('animate__fadeOut');
        arguments[i].classList.add("animate__animated", "animate__fadeIn")
    }
}

function startSecondScane() {
    BUBBLES.GIRL_TOP.classList.add("animate__animated", "animate__fadeOut");
    document.getElementById("g-hello-text-girl-top").classList.add("d-none");
}

async function tappingHello(group,cb){
    await tappingText(group.children[0], "Здравствуйте,");
    await tappingText(group.children[1], "Елена Сергеевна!");
    if(cb){
        await wait(400);
        cb();
    }
}

function showManip(){
    manipWindow.show();
};

console.log('SCRIPT LOADED')