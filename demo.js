var start = document.getElementsByClassName('start')[0],
    main = document.getElementsByClassName('main')[0],
    cover = document.getElementsByClassName('cover')[0],
    score = document.getElementById('score'),
    alert = document.getElementsByClassName('alert')[0],
    close = document.getElementsByClassName('close')[0],
    box = document.getElementsByClassName('box')[0];
var minesnum,minesover,block;
var startBool = true;
var mineMap = [];
bindEvent();
function bindEvent() {
    start.onclick = function() {
        if(startBool) {
            main.style.display = "block";
            box.style.display = "block";
            init();
            startBool = false;
        }
      
    };
    
    main.oncontextmenu = function() {
        return false;
    }
    main.onmousedown = function(e) {
        var event = e.target;
       if(e.which == 1) {
            leftclick(event);
       }else if(e.which == 3) {
            rightclick(event);
       }
    }
    close.onclick = function() {
        cover.style.display = 'none';
        box.style.display = "none";
        main.style.display = "none";
        main.innerHTML = "";
        startBool = true;
    }
}
function init() {
    minesnum = 10;
    minesover = 10;
    score.innerHTML = minesover;
    for(var i = 0;i < 10;i ++){
        for(var j = 0;j < 10; j++){
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id',i + '-' + j);
            main.appendChild(con);
            mineMap.push({mine: 0});
        }
    }
    block = document.getElementsByClassName('block');
    
    while(minesnum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if(mineMap[mineIndex].mine == 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('islei');  
            minesnum -= 1;      
        }
       
    }
    
    console.log(document.getElementsByClassName('islei'));
    
}

function leftclick(dom) {
    if(dom.classList.contains('flag')) {
        return;
    }
    var lei = document.getElementsByClassName('islei');
    if(dom && dom.classList.contains('islei')) {
        for( var i = 0;i < lei.length;i ++) {
            lei[i].classList.add('show');
        }
        setTimeout(function() {
            cover.style.display = "block";
            alert.style.backgroundImage = 'url("images/over.jpg")';
        },800) 
    }else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-'),
            posX = +posArr[0],
            posY = +posArr[1];
            dom.classList.add('num');
            for(var i = posX - 1;i <= posX + 1;i ++) {
                for(var j = posY - 1;j <= posY + 1;j ++){
                   var arroundBox = document.getElementById(i + '-' + j);
                   if(arroundBox && arroundBox.classList.contains('islei')) {
                        n ++;
                   }
                }
            }
            dom.innerHTML = n;
            if(n == 0) {
                for(var i = posX - 1;i <= posX + 1;i ++) {
                    for(var j = posY - 1;j <= posY + 1;j ++){
                        var nearBox = document.getElementById(i + '-' + j);
                        if(nearBox && nearBox.length != 0) {
                            if(!nearBox.classList.contains('check')) {
                                nearBox.classList.add('check');
                                leftclick(nearBox);
                            }
                        }
                       
                    }
                }
            }
    }
}

function rightclick(dom) {
    if(dom.classList.contains('num')){
        return;
    };
    dom.classList.toggle('flag');
    if(dom.classList.contains('islei') && dom.classList.contains('flag')) {
        minesover --;
    }else if(dom.classList.contains('islei') && !dom.classList.contains('flag')) {
        minesover ++;
    }
    score.innerHTML = minesover;
    if(minesover == 0) {
        cover.style.display = 'block';
        alert.style.backgroundImage = 'url("images/success.png")';
    }
}
