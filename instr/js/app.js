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

let CURRENT_LEVEL = '';

function addRemoveInstrument(){
    let tray = document.getElementById('tray');
    event.stopPropagation();
    let img_num = event.target.closest('.image_box').dataset.img;
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
    ADDED = [];
    document.getElementById('tray').innerHTML = '';
    document.getElementById('scrollRow').querySelectorAll('.btn.remove').forEach(btn=>{btn.classList.remove('remove');btn.innerHTML = 'Добавить в набор'})
}

document.getElementById('scrollRow').querySelectorAll('.btn').forEach(btn=>btn.addEventListener('click',addRemoveInstrument))

tooltipy = (function (){
    var tooltip = document.getElementById('tooltip');
    var timeoutShow = null;
    let w,h;
    let tooltipIsOff = true;
    let toggleTooltipBtn = document.getElementById('toggleTooltipBtn');
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
    };
    function setLevel(lvl){
        CURRENT_LEVEL = lvl
        levelCaption.innerHTML = LEVEL_CAPTION[CURRENT_LEVEL] || '';
        clearLevel();
        _close();
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
    modalGood.open('Поздравляем!', 'Набор для трахеостомии собран верно', startWindow.open);
}
