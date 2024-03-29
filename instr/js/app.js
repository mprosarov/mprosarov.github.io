var scrollRow = (function(){
    var container = document.getElementById('scrollRow');
    let widthElement = container.querySelector('.image_box').getBoundingClientRect().width;
    let gap = getComputedStyle(container).getPropertyValue('gap').replace('px','');
    gap = parseInt(gap);
    function scrollLeft() {
        let currentScrol = container.scrollLeft;
        container.scrollBy({ left: -widthElement - gap, behavior: 'smooth' });
    }
    function scrollRight() {
        let currentScrol = container.scrollLeft;
        let count = parseInt((currentScrol/widthElement).toFixed(0));
        //if (imageBox) imageBox.scrollIntoView({ behavior:'smooth', block:'start'});
        container.scrollBy({ left: widthElement + gap, behavior: 'smooth' });
    }
    return {
        scrollLeft: scrollLeft,
        scrollRight: scrollRight
    }

})();
//Добавленные в лоток инструменты ['001','003',...,'008'];
let ADDED = [];
let MODE_ENUM = { LEARN:'learn',TEST:'test' };
let MODE = MODE_ENUM.LEARN;
let CURRENT_LEVEL = '';
let CURRENT_LEARN_STEP = 0;

function addRemoveInstrument(){
    let tray = document.getElementById('tray');
    event.stopPropagation();
    let img_num = event.target.closest('.image_box').dataset.img;
    if(MODE == MODE_ENUM.LEARN){
        if(img_num == RESULTS[CURRENT_LEVEL][CURRENT_LEARN_STEP]){
            tray.insertAdjacentHTML('beforeend',`<div class="tray-item" data-num="${img_num}"><img src="img/${img_num}.svg" height="100%" width="100%" alt=""></div>`);
            CURRENT_LEARN_STEP+=1;
            if(CURRENT_LEARN_STEP != RESULTS[CURRENT_LEVEL].length){
                notifyLearn.showNoty(getNotyTextByStep());
            } else {
                modalGood.open("Поздравляем!", getFinalStringForLevel(), startWindow.open);
            }
            // Иначе окно с поздравлением
        } else {
            modalBad.open("Внимание", "Инструмент выбран неверно");
        }
        return
    }
    let index = ADDED.indexOf(img_num)
    if(index>=0){
        let tray_item = tray.querySelector(`[data-num="${img_num}"]`);
        if(tray_item) tray_item.parentNode.removeChild(tray_item);
        ADDED.splice(index,1);
        event.target.classList.remove('remove');
        event.target.innerHTML = 'Добавить в набор';
    } else {
        tray.insertAdjacentHTML('beforeend',`<div class="tray-item" data-num="${img_num}"><img src="img/${img_num}.svg" height="100%" width="100%" alt=""></div>`);
        event.target.innerHTML = 'Убрать из набора';
        event.target.classList.add('remove');
        ADDED.push(img_num);
    }


}

function clearLevel(){
    CURRENT_LEARN_STEP = 0;
    ADDED = [];
    notifyLearn.clear();
    document.getElementById('tray').innerHTML = '';
    document.getElementById('scrollRow').querySelectorAll('.btn.remove').forEach(btn=>{btn.classList.remove('remove');btn.innerHTML = 'Добавить в набор'})
}

document.getElementById('scrollRow').querySelectorAll('.btn').forEach(btn=>btn.addEventListener('click',addRemoveInstrument))

function getNotyTextByStep() {
    let instNum = RESULTS[CURRENT_LEVEL][CURRENT_LEARN_STEP];
    return `Добавьте: ${DESCR[instNum].name}`;
}

tooltipy = (function (){
    var tooltip = document.getElementById('tooltip');
    var timeoutShow = null;
    let w,h;
    let tooltipIsOff = true;
    let toggleTooltipBtn = document.getElementById('toggleTooltipBtn');
    let tooltipForBtn = document.getElementById("tooltipForBtn");
    function mouseInTooltip() {
        let num_img = event.target.closest('.image_box').dataset.img
        tooltip.innerHTML = DESCR[num_img].name;
        //tooltip.style.display = 'block';
        h = tooltip.getBoundingClientRect().height;
        w = tooltip.getBoundingClientRect().width;
        let top = event.target.getBoundingClientRect().top;
        let left = event.target.getBoundingClientRect().left;
        let tw = event.target.getBoundingClientRect().width/2;
        tooltipTop = top - h;
        if(tooltipTop<0) tooltipTop = 1
        tooltip.style.top = tooltipTop + 'px';
        tooltip.style.left = left - w/2 + tw  + 'px';
        timeoutShow = setTimeout(function () { tooltip.classList.add('show')},100);
        // tooltip.classList.add('show')
        //event.target.addEventListener('mousemove', mouseMoveTooltip)
    }
    function mouseOutTooltip() {
        //event.target.removeEventListener('mousemove', mouseMoveTooltip);
        if(timeoutShow){
            clearTimeout(timeoutShow)
            timeoutShow = null;
        }
        tooltip.classList.remove('show')
        tooltip.style.top = 0 + 'px';
        tooltip.style.left = 0 + 'px';
        //tooltip.style.display = 'none';
    }
    function mouseMoveTooltip(event) {
       // console.log(event.clientX, event.clientY)
        tooltip.style.left = event.clientX - w/2 + 'px';
        tooltip.style.top = (event.clientY - h-4) + 'px';
    };

    function toogleTooltip(){
        if(tooltipIsOff){
            tooltipForBtn.innerText = 'При наведении на инструмент – отобразится название';
            tooltipForBtn.style.top = (toggleTooltipBtn.getBoundingClientRect().top - 50) + 'px';
            tooltipForBtn.style.right = "0px";
            tooltipForBtn.classList.add('show');
            setTimeout(() => {
                tooltipForBtn.classList.remove("show");
                tooltipForBtn.style.top = "-100px";
            }, 1800);
            document.querySelectorAll('.img-wrap').forEach(function (item) {
                item.addEventListener('mouseenter', mouseInTooltip);
                item.addEventListener('mouseleave', mouseOutTooltip);
            });
            tooltipIsOff = false;
            toggleTooltipBtn.classList.add('btn-info')
            return
        }
        document.querySelectorAll('.img-wrap').forEach(function (item) {
            item.removeEventListener('mouseenter', mouseInTooltip);
            item.removeEventListener('mouseleave', mouseOutTooltip);
        });
        toggleTooltipBtn.classList.remove('btn-info')
        tooltipIsOff = true;
    }
    return {
        toogleTooltip: toogleTooltip
    }


})()
//============================
//       Выбор режима
//============================
let modeTabs = (function(){
    let learnBtn = document.getElementById('btnLearn');
    let testBtn = document.getElementById("btnTest");
    const ACTIVE_CLASS = "btn-success";
    learnBtn.onclick = function(){
        testBtn.classList.remove(ACTIVE_CLASS);
        learnBtn.classList.add(ACTIVE_CLASS);
        document.getElementById("finalBtn").classList.add("btn-disable");
        document.getElementById("finalBtn").classList.remove("btn-success");
        MODE = MODE_ENUM.LEARN;
    }
    testBtn.onclick = function(){
        learnBtn.classList.remove(ACTIVE_CLASS);
        testBtn.classList.add(ACTIVE_CLASS);
        document.getElementById("finalBtn").classList.remove("btn-disable");
        document.getElementById("finalBtn").classList.add("btn-success");
        MODE = MODE_ENUM.TEST;
    }
})();
//============================
//       Подсказки в режиме обучения
//============================
let notifyLearn = (function(){
    let notify = document.createElement('div');
    notify.classList.add('notify-learn');
    notify.style.display = 'none';
    document.body.append(notify);
    let text = '';
    notify.onanimationend = function(e){
        if (e.animationName == 'slideIn'){
            document.body.style.overflow='';
        }
        if (e.animationName == 'slideOut'){
            notify.innerHTML = text;
            notify.classList.remove('slideOut');
            notify.classList.add('slideIn');
        }
    }
    function showNoty(txt){
        notify.style.display = "";
        document.body.style.overflow='hidden';
        text = txt;
        if(notify.classList.contains('slideIn')){
            notify.classList.remove('slideIn');
            notify.classList.add('slideOut');
        }
        else{
            notify.classList.remove('slideOut');
            notify.classList.add('slideIn');
            notify.innerHTML = text;
        }
    };
    function clear(){
       if(notify) notify.style.display = 'none';
    }
    return {
      showNoty: showNoty,
      clear: clear
    };
})();

//============================
//       Стартовое окно
//============================
let startWindow = (function(){
    let win = document.getElementById('startWindow');
    let levelCaption = document.getElementById('level-caption');

    function _close(){
        win.style.display = 'none';
    }
    function open(){
        win.style.display = '';
        notifyLearn.clear();
    };
    function setLevel(lvl){
        CURRENT_LEVEL = lvl
        levelCaption.innerHTML = LEVEL_CAPTION[CURRENT_LEVEL] || '';
        clearLevel();
        _close();
        if(MODE == MODE_ENUM.LEARN){
            modalInfo.open('Информация','Следуйте указаниям внизу, чтобы собрать набор',function(){
                notifyLearn.showNoty(getNotyTextByStep());
            });
        }
    }
    return {
        open: open,
        setLevel:setLevel
    }

})();

//============================
//       Завершить
//============================
function finalLevel(){
    let correct_array = RESULTS[CURRENT_LEVEL];
    if(typeof correct_array === 'undefined'){
        modalBad.open('Внимание!', 'Набор не описан');
        return;
    }
    if(ADDED.length>correct_array.length){
        modalBad.open('Внимание!','Добавлены лишние инструменты');
        return;
    }
    if(ADDED.length<correct_array.length){
        modalBad.open('Внимание!', 'Нужные инструменты не добавлены');
        return;
    }
    for(let i=0;i<ADDED.length;i++){
        if(!correct_array.includes(ADDED[i])){
            modalBad.open('Внимание!', 'Добавлены лишние инструменты');
            return;
        }
    }
    modalGood.open("Поздравляем!", getFinalStringForLevel(), startWindow.open);
}

function getFinalStringForLevel() {
    let result = ''
    if(CURRENT_LEVEL == LEVELS.LEVEL_1){
        result = "Набор для трахеостомии собран верно<br>";
    }
    if(CURRENT_LEVEL == LEVELS.LEVEL_2){
        result = "Набор для аппендэктомии собран верно<br>";
    }
    for(let i=0;i<RESULTS[CURRENT_LEVEL].length;i++){
        result+= '<br>' + DESCR[RESULTS[CURRENT_LEVEL][i]].name;
    }
    return result;
}