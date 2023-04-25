let zoomWin = (function(){
    let win = document.getElementById('modalZoom').parentNode;
    let textModal = document.getElementById('modal-zoom_name');
    let scrollRow = document.getElementById('scrollRow');
    let zoom_conteiner = document.getElementById('modal-zoom_conteiner');


    let open = function(num_svg){
        win.classList.add('open');
        textModal.innerHTML = DESCR[num_svg].name;
        zoom_conteiner.innerHTML='';
        img = scrollRow.querySelector(`[src="img/${num_svg}.svg"]`).cloneNode()
        zoom_conteiner.append(img);
    }
    let close = function(num_svg){
        win.classList.remove('open');
        zoom_conteiner.innerHTML='';
    }

    return {
        open:open,
        close: close
    }
})();

function infoModal(parent){
    let win = parent;
    let header = win.querySelector('.modal-header');
    let content = win.querySelector('.modal-content');
    let _clb;
    let open = function(headerText,contentText,clb){
        win.classList.add('open');
        header.innerHTML = headerText?headerText:'Внимание'
        content.innerHTML = contentText?contentText:'+';
        if(typeof clb==='function') _clb=clb;
        else  _clb = function(){return false}
    }
    let _close= function(headerText,contentText,clb){
        win.classList.remove('open');
        _clb();
    }    

    win.querySelector('.close').onclick = _close;
    win.querySelector('.modal-footer_btn').onclick = _close;
    return {
        open:open
    }
}
let modalGood = new infoModal(document.getElementById('modalGood'));
let modalBad= new infoModal(document.getElementById('modalBad'));
let modalInfo= new infoModal(document.getElementById('modalInfo'));