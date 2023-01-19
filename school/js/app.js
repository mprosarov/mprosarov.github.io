function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var manipWindow = (function(){
    let clbk_end = null;
    const IN_ANIM = 'animate__fadeIn';
    const OUT_ANIM = 'animate__fadeOut';
    let win = document.getElementById('modal-manip');
    let confirm_win = document.getElementById('confirm-01');
    let win_operation_01 = document.getElementById('modal-operation-1');
    let win_operation_02 = document.getElementById('modal-operation-2');
    let win_operation_03 = document.getElementById('modal-operation-3');
    let win_operation_04 = document.getElementById('modal-operation-4');
    let currentNum = null;
    confirm_win.addEventListener('animationend',()=>{
        if (confirm_win.classList.contains(OUT_ANIM)){
            confirm_win.classList.add('d-none');
            confirm_win.querySelectorAll('p')[currentNum].classList.add('d-none')
        }
    });
    win.addEventListener('animationend',()=>{
        if(win.classList.contains(OUT_ANIM)){
            win.classList.add('d-none');
            clbk_end();
        }
    });
    win_operation_01.addEventListener('animationend',()=>{
        if (win_operation_01.classList.contains(OUT_ANIM)){
            win_operation_01.classList.add('d-none');
        }
    });
    win_operation_02.addEventListener('animationend', () => {
        if (win_operation_02.classList.contains(OUT_ANIM)) {
            win_operation_02.classList.add('d-none');
        }
    });
    win_operation_03.addEventListener('animationend', () => {
        if (win_operation_03.classList.contains(OUT_ANIM)) {
            win_operation_03.classList.add('d-none');
        }
    });
    win_operation_04.addEventListener('animationend', () => {
        if (win_operation_04.classList.contains(OUT_ANIM)) {
            win_operation_04.classList.add('d-none');
        }
    });
    function show(){
        win.classList.remove('d-none');
        win.classList.add("animate__animated", IN_ANIM);
    }
    function _close(){
        win.classList.remove(IN_ANIM);
        win.classList.add(OUT_ANIM);
    }
    function showConfirm(num){
        currentNum = num;
        confirm_win.querySelectorAll('p')[num].classList.remove('d-none')
        confirm_win.classList.remove('d-none','animate__fadeOut');
        confirm_win.classList.add(IN_ANIM);
    };
    function closeConfirm() {
        confirm_win.classList.remove(IN_ANIM);
        confirm_win.classList.add("animate__animated",'animate__fadeOut')
    };
    function execOperation(){
        if(currentNum == 0){
            _openOperation(win_operation_01);
            return
        }
        if(currentNum == 1){
            _openOperation(win_operation_02);
            return
        }
        if(currentNum == 2){
            _openOperation(win_operation_03);
            return;
        }
        if(currentNum == 3){
            _openOperation(win_operation_04);
            return
        }
    }
    function _openOperation(modal){
        modal.classList.remove('d-none',OUT_ANIM);
        modal.classList.add('animate__animated',IN_ANIM);
    }
    function _closeOperationModal(modal){
        modal.classList.remove(IN_ANIM);
        modal.classList.add(OUT_ANIM)
    }
    function closeOperation(){
        closeConfirm();
        if(currentNum == 0){
            _closeOperationModal(win_operation_01)
            return;
        }
        if(currentNum == 1){
            _closeOperationModal(win_operation_02);
            return;
        }
        if(currentNum == 2){
            _closeOperationModal(win_operation_03);
            return;
        }
        if(currentNum == 3){
            _closeOperationModal(win_operation_04);
            _close();
        }
    }
    function setClbk(f) {
        clbk_end = f;
    }
    return {
        setClbk: setClbk,
        show:show,
        execOperation: execOperation,
        closeOperation: closeOperation,
        showConfirm: showConfirm,
        closeConfirm: closeConfirm
    }

})();
var doctorWin = (function(){
    let current_win = null;
    let _clbk = null;
    const IN_ANIM = 'animate__fadeIn';
    const OUT_ANIM = 'animate__fadeOut';

    let win_doctor = document.getElementById('modal-doctor');
    let win_error = win_doctor.querySelector('.modal-doctor-error');
    let win_inspect_0 = document.getElementById('modal-inspect-0');
    let win_inspect_1 = document.getElementById('modal-inspect-1');
    let win_inspect_2 = document.getElementById('modal-inspect-2');
    let win_inspect_3 = document.getElementById('modal-inspect-3');

    let complite_0 = false;
    let complite_1 = false;
    let complite_2 = false;
    let complite_3 = false;

    win_inspect_0.addEventListener('animationend',_animEnd)
    win_inspect_1.addEventListener('animationend', _animEnd)
    win_inspect_2.addEventListener('animationend', _animEnd)
    win_inspect_3.addEventListener('animationend', _animEnd)
    function _animEnd(){
        if(this.classList.contains(OUT_ANIM)){
            this.classList.add('d-none');
        }
    }

    win_doctor.addEventListener('animationend',()=>{
        if(win_doctor.classList.contains(OUT_ANIM)){
            win_doctor.classList.add('d-none');
        }
    });
    win_error.addEventListener('animationend',()=>{
        if(win_error.classList.contains(OUT_ANIM))
            win_error.classList.add('d-none');
    });

    function isComplite(){
        return complite_0 && complite_1 && complite_2 && complite_3;
    };
    function _openWin(win){
        win.classList.remove('d-none');
        win.classList.remove(OUT_ANIM);
        win.classList.add('animate__animated', IN_ANIM)
    };
    function _closeWin(win){
        win.classList.remove(IN_ANIM);
        win.classList.add(OUT_ANIM);
    };
    function open(){
        win_doctor.classList.remove('d-none');
        win_doctor.classList.add('animate__animated',IN_ANIM);
    };
    function openInspect(num){
        current_win = num;
        if(num == 0){
            _openWin(win_inspect_0);
            complite_0 = true;
            return;
        }
        if (num == 1) {
            _openWin(win_inspect_1);
            complite_1 = true;
            return;
        }
        if (num == 2) {
            _openWin(win_inspect_2);
            complite_2 = true;
            return;
        }
        if (num == 3) {
            _openWin(win_inspect_3);
            complite_3 = true;
            return;
        }
    }
    function closeInspect(){
        switch(current_win){
            case 0:
                _closeWin(win_inspect_0);
                break;
            case 1:
                _closeWin(win_inspect_1);
                break;
            case 2:
                _closeWin(win_inspect_2);
                break;
            case 3:
                _closeWin(win_inspect_3);
                break;
        }
    };
    function closeErrorWin(){
        win_error.classList.remove(IN_ANIM);
        win_error.classList.add(OUT_ANIM);
    };
    function next(){
        if(!isComplite()){
            win_error.classList.remove('d-none',OUT_ANIM);
            win_error.classList.add('animate__animated',IN_ANIM);
            return;
        }
        win_doctor.classList.add(OUT_ANIM);
        _clbk();
    };
    function onComplite(clbk){
        _clbk = clbk;
    }
    return {
        next:next,
        closeErrorWin: closeErrorWin,
        open:open,
        openInspect:openInspect,
        onComplite:onComplite,
        closeInspect: closeInspect
    }

})();
var diagnozWin = (function(){
    let _clbk = null;
    const IN_ANIM = 'animate__fadeIn';
    const OUT_ANIM = 'animate__fadeOut';
    let win = document.getElementById('modal-diagnoz');
    let win_error = win.querySelector('.modal-error');
    let win_succes = win.querySelector('.succes');

    win.addEventListener('animationend',()=>{
        if(win.classList.contains(OUT_ANIM)){
            win.classList.add('d-none');
            _clbk();
        }
    });
    win_error.addEventListener('animationend',()=>{
        if(win_error.classList.contains(OUT_ANIM)){
            win_error.classList.add('d-none');
        }
    });

    function open(){
        win.classList.remove('d-none');
        win.classList.add('animate__animated', IN_ANIM);
    }
    async function check(flag){
        if(!flag){
            win_error.classList.remove('d-none',OUT_ANIM);
            win_error.classList.add('animate__animated',IN_ANIM);
            await wait(1800);
            win_error.classList.remove(IN_ANIM);
            win_error.classList.add(OUT_ANIM)
            return;
        }
        win_succes.classList.remove('d-none');
        win_succes.classList.add('animate__animated', IN_ANIM);
        await wait(1800);
        win.classList.remove(IN_ANIM);
        win.classList.add(OUT_ANIM);
    }
    function onComplite(clbk){
        _clbk = clbk;
    }

    return {
        open:open,
        check: check,
        onComplite: onComplite
    }

})();
var sweetModal = (function(){
    const IN_ANIM = 'animate__fadeIn';
    const OUT_ANIM = 'animate__fadeOut';
    let win_cola = document.getElementById('modal-sweet-1');
    let win_candy = document.getElementById('modal-sweet-2');
    let win_choco = document.getElementById('modal-sweet-3');

    let err_cola = win_cola.querySelector('.modal-doctor-error');

    win_cola.querySelector('[data-btn="yes"]').onclick = function(){
        _showWin(err_cola);
    }
    win_cola.querySelector('[data-btn="no"]').onclick = function () {
        _closeWin(win_cola);
    }

    win_candy.addEventListener('animationend',_animEnd);

    function _animEnd(){
        if(this.classList.contains(OUT_ANIM)){
            this.classList.add('d-none');
        }
    };
    function _closeWin(win){
        win.classList.remove(IN_ANIM);
        win.classList.add(OUT_ANIM);
    }
    function _showWin(win){
        win.classList.remove('d-none',OUT_ANIM);
        win.classList.add('animate__animated', 'animate__fast',IN_ANIM);
    }

    function cola(){
        _showWin(win_cola);
    }
    function candy(){
        _showWin(win_candy)
    }
    function choco(){
        _showWin(win_choco)
    }
    function finalCola(){
        finalStateBoyTop();
        _closeWin(win_cola)
        f
    }

    return {
        cola:cola,
        candy:candy,
        choco:choco,
        finalCola: finalCola
    }

})();
const TEXTS = {
    BOY_TOP: {
        HELLO: document.getElementById('g-hello-text-boy-top'),
        LINE_1: document.getElementById('text-boy-top-1')
    },
    BOY_INVALID:{
        HELLO: document.getElementById('g-hello-text-boy-invalid'),
        REPLIC_2: document.getElementById('invalid-replic-2'),
        SITDOWN_3L: document.getElementById('invalid-sitdown-3L')
    },
    GIRL_TOP:{
        HELLO: document.getElementById('g-hello-text-girl-top'),
        LINE_1: document.getElementById('text-girl-top-1')
    },
    GIRL_BOT:{
        HELLO: document.getElementById('g-hello-text-girl-bottom'),
        LINE_1: document.getElementById('text-girl-bottom-1')
    },
    TEACHER:{
        HELLO: document.getElementById('g-hello-text'),
        REPLIC_2: document.getElementById('teacher-replic-2'),
        REPLIC_3: document.getElementById('teacher-replic-3'),
        ONE_LINE: document.getElementById('teacher-1')
    },
    DOCTOR:{
        LINE_2: document.getElementById('doctor-line-2'),
        LINE_3: document.getElementById('doctor-line-3'),
    }
}

const ARROW = document.getElementById('arrow-svg');
const ARROW_GIRL_TOP = document.getElementById('arrow-girl-top');
const ARROW_GIRL_BOT = document.getElementById('arrow-girl-bot');
const ARROW_BOY_TOP = document.getElementById('arrow-boy-top');
const CHAIR = document.getElementById('chair-fale'); // упавший стул

const SVG_B = {
    BOY_TOP_NORMAL: document.getElementById('boy-top-normal'),
    BOY_TOP_HAND: document.getElementById('boy-top-hand'),
    GIRL_TOP_NORMAL: document.getElementById('girl-top-normal'),
    GIRL_TOP_HAND: document.getElementById('girl-top-hand'),
    GIRL_BOT_NORMAL: document.getElementById('girl-bot-normal'),
    GIRL_BOT_HAND: document.getElementById('girl-bot-hand'),
}

const BUBBLES = {
  GIRL_TOP: document.getElementById("girl-top-bubble"),
  GIRL_BOTTOM: document.getElementById("girl-bottom-bubble"),
  BOY_TOP: document.getElementById("boy-top-bubble"),
  BOY_TOP_HAND: document.getElementById('bubble-boy-top-2'),
  BOY_INVALID: document.getElementById("boy-invalid-bubble"),
  INVALID_SITDOWN: document.getElementById('bubble-invalid-sitdown'),
  TEACHER: document.getElementById("teacher-bubble"),
  DOCTOR: document.getElementById("bubble-doctor")
};
const DOCTOR = document.getElementById('doctor-body');
DOCTOR.addEventListener('animationend',async ()=>{
    DOCTOR.classList.remove('move');
    continueDoctorScene();
});
const TEACHER_STATE = {
    NORMAL: document.getElementById('teacher-normal-body'),
    PANIC: document.getElementById('teacher-panic')
}

const INVALID_STATE = {
    NORMAL: document.getElementById('invalid-normal-state'),
    LIE_01: document.getElementById('boy-invalid-state-1'),
    LIE_02: document.getElementById('boy-invalid-state-2'),
    SITDOWN: document.getElementById('invalid-sitdown')
}

manipWindow.setClbk(doctorScene);
doctorWin.onComplite(diagnozScene);
diagnozWin.onComplite(finalScene);



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

// ==== Обратный отсчет ======
let coutWin = document.getElementById('coutdown');
let coutText = coutWin.querySelector('span');
coutWin.addEventListener('animationend',()=>{
    if (coutWin.classList.contains('animate__fadeOut')) coutWin.classList.add('d-none');
});
async function coutDown(){
    coutWin.classList.remove('d-none');
    coutWin.classList.add("animate__animated", "animate__fadeIn");
    await wait(100);
    for(let i=9;i>=0;i--){
        await wait(1000);
        coutText.innerHTML = `0:0${i}`;
    }
    coutWin.classList.remove('animate__fadeIn');
    coutWin.classList.add('animate__fadeOut')
}
// ===========================

async function startGame() {
    girlTop = document.getElementById("g-hello-text-girl-top");
    girlBot = document.getElementById("g-hello-text-girl-bottom");
    boyTop = document.getElementById("g-hello-text-boy-top");
    boyInvalid = document.getElementById("g-hello-text-boy-invalid");
    MODALS.START.classList.add('d-none');
    await wait(500);
    bubbleTeacher.classList.remove('d-none');
    let groupHello = document.getElementById("g-hello-text");
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
    // упал со стула
    CHAIR.classList.remove('d-none');
    INVALID_STATE.NORMAL.classList.add('d-none');
    INVALID_STATE.LIE_01.classList.remove('d-none');
    ANIM_INVALID = setInterval(animInvalid,250);
    TEXTS.TEACHER.ONE_LINE.classList.remove('d-none');
    showBubble(BUBBLES.TEACHER);
    await tappingText(TEXTS.TEACHER.ONE_LINE.children[0],'Судороги!')
    await wait(800);
    ARROW.classList.remove('d-none');
    ARROW.classList.add('shake-vertical');
    // ARROW.classList.add('animate__animated', 'animate__bounce', 'animate__infinite');
}
async function doctorScene(){
    clearReplic(TEXTS.TEACHER.ONE_LINE);
    await tappingText(TEXTS.TEACHER.ONE_LINE.children[0],'Медсестра!');
    await coutDown();
    TEXTS.TEACHER.ONE_LINE.classList.add('d-none');
    clearReplic(TEXTS.TEACHER.HELLO);
    TEXTS.TEACHER.HELLO.classList.remove('d-none');
    clearInterval(ANIM_INVALID)
    INVALID_STATE.LIE_01.classList.add('d-none');
    INVALID_STATE.LIE_02.classList.add('d-none');
    INVALID_STATE.SITDOWN.classList.remove('d-none');
    await tappingText(TEXTS.TEACHER.HELLO.children[0],'Кажется, судороги');
    DOCTOR.classList.remove('d-none');
    DOCTOR.classList.add('move');
    await tappingText(TEXTS.TEACHER.HELLO.children[1], 'кончились!');
}
async function continueDoctorScene(){
    BUBBLES.DOCTOR.classList.remove('d-none');
    TEXTS.TEACHER.HELLO.classList.add('d-none');
    fadeOut(BUBBLES.TEACHER);
    showBubble(BUBBLES.DOCTOR);
    TEXTS.DOCTOR.LINE_2.classList.remove('d-none');
    await tappingText(TEXTS.DOCTOR.LINE_2.children[0], 'Дима, как ты себя');
    await tappingText(TEXTS.DOCTOR.LINE_2.children[1], 'чувствуешь?');
    await wait(800);
    BUBBLES.INVALID_SITDOWN.classList.remove('d-none');
    showBubble(BUBBLES.INVALID_SITDOWN);
    clearReplic(TEXTS.BOY_INVALID.SITDOWN_3L);
    TEXTS.BOY_INVALID.SITDOWN_3L.classList.remove('d-none');
    await tappingText(TEXTS.BOY_INVALID.SITDOWN_3L.children[0], 'Нраооа...');
    await tappingText(TEXTS.BOY_INVALID.SITDOWN_3L.children[1],'Почему я на полу?');
    await tappingText(TEXTS.BOY_INVALID.SITDOWN_3L.children[2], '(Нечленораздельно)');
    await wait(600)
    TEXTS.BOY_INVALID.SITDOWN_3L.classList.add('d-none');
    fadeOut(BUBBLES.INVALID_SITDOWN);
    clearReplic(TEXTS.DOCTOR.LINE_2);
    await tappingText(TEXTS.DOCTOR.LINE_2.children[0],'Давай я тебя');
    await tappingText(TEXTS.DOCTOR.LINE_2.children[1], 'осмотрю!');
    await wait(800);
    doctorWin.open();
}
async function diagnozScene(){
    clearReplic(TEXTS.DOCTOR.LINE_2);
    await wait(800);
    await tappingText(TEXTS.DOCTOR.LINE_2.children[0],'Я думаю, что');
    await tappingText(TEXTS.DOCTOR.LINE_2.children[1], 'здесь…');
    await wait(800);
    diagnozWin.open();
}
//Завершающая сцена - сладкое
async function finalScene(){
    BUBBLES.BOY_INVALID.classList.add('d-none'); // убираем т.к мешает нажать
    clearReplic(TEXTS.DOCTOR.LINE_2);
    TEXTS.DOCTOR.LINE_2.classList.add('d-none');
    await wait(800);
    TEXTS.DOCTOR.LINE_3.classList.remove('d-none');
    await tappingText(TEXTS.DOCTOR.LINE_3.children[0], 'Ребята у вас есть');
    await tappingText(TEXTS.DOCTOR.LINE_3.children[1], 'что-нибудь');
    await tappingText(TEXTS.DOCTOR.LINE_3.children[2], 'сладкое с собой?');
    await wait(800);
    showBubble(BUBBLES.BOY_TOP_HAND)
    await wait(100);
    // поднятая рука
    SVG_B.BOY_TOP_NORMAL.classList.add('d-none');
    SVG_B.BOY_TOP_HAND.classList.remove('d-none');
    TEXTS.BOY_TOP.LINE_1.classList.remove('d-none');
    await tappingText(TEXTS.BOY_TOP.LINE_1.children[0],'У меня есть!')
    ARROW_BOY_TOP.classList.remove('d-none');
    await wait(500);
    showBubble(BUBBLES.GIRL_BOTTOM);
    TEXTS.GIRL_BOT.LINE_1.classList.remove('d-none');
    await wait(500);
    // поднятая рука
    SVG_B.GIRL_BOT_NORMAL.classList.add('d-none');
    SVG_B.GIRL_BOT_HAND.classList.remove('d-none');
    await tappingText(TEXTS.GIRL_BOT.LINE_1.children[0],'У меня тоже есть!')
    ARROW_GIRL_BOT.classList.remove('d-none');

    await wait(500);
    showBubble(BUBBLES.GIRL_TOP);
    await wait(500);
    TEXTS.GIRL_TOP.LINE_1.classList.remove('d-none');
    await tappingText(TEXTS.GIRL_TOP.LINE_1.children[0],'И у меня!');
    await wait(300);
    ARROW_GIRL_TOP.classList.remove('d-none');
    // поднятая рука

};
//Анимация судорог
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
        arguments[i].classList.remove('animate__fadeOut','d-none');
        arguments[i].classList.add("animate__animated", "animate__fadeIn")
    }
}

function startSecondScane() {
    BUBBLES.GIRL_TOP.classList.add("animate__animated", "animate__fadeOut");
    document.getElementById("g-hello-text-girl-top").classList.add("d-none");
}

function finalStateBoyTop(){
    ARROW_BOY_TOP.classList.add('d-none');
    SVG_B.BOY_TOP_HAND.classList.add('d-none');
    SVG_B.BOY_TOP_NORMAL.classList.remove('d-none');
    TEXTS.BOY_TOP.LINE_1.classList.add('d-none');
    fadeOut(BUBBLES.BOY_TOP_HAND);
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
    ARROW.classList.add('d-none');
    manipWindow.show();
};

console.log('SCRIPT LOADED')