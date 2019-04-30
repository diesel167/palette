window.onload=function(){
    //initial state
    let temp ={
        currentTool:'',
        currentColor:'rgb(0, 128, 0)',
        prevColor:'rgb(204, 204, 204)',
    };
    localStorage.setItem("myState",JSON.stringify(temp));
    let state = JSON.parse(localStorage.getItem("myState"));


//SET CURRENT AND PREV COLORS IN HTML
    document.getElementById('currentColorImg').style.backgroundColor=state.currentColor;
    document.getElementById('prevColorImg').style.backgroundColor=state.prevColor;


    /*_________________________________________________*/

//CHOOSE TOOL BUCKET
    ifBucket(document.getElementById('bucket'));
    function ifBucket(elem){
        elem.onclick=function(){
            if (state.currentTool==='bucket'){
                state.currentTool='';
                localStorage.setItem("myState",JSON.stringify(state));
                document.getElementById('bucket').style.backgroundColor = '';
            }
            else{
                //reset colors of others elements
                document.getElementById('transform').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool='bucket';
                localStorage.setItem("myState",JSON.stringify(state));
                document.getElementById('bucket').style.backgroundColor = 'red';
            }
        }
    }

    /*_________________________________________________*/

//CHOOSE TOOL TRANSFORM
    ifTransform(document.getElementById('transform'));
    function ifTransform(elem){
        elem.onclick=function(){
            if (state.currentTool==='transform'){
                state.currentTool='';
                localStorage.setItem("myState",JSON.stringify(state));
                document.getElementById('transform').style.backgroundColor = '';
            }
            else{
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool='transform';
                localStorage.setItem("myState",JSON.stringify(state));
                document.getElementById('transform').style.backgroundColor = 'red';
            }
        }
    }


    /*_________________________________________________*/

//COLOR PICKER CHOOSE TOOL
    ifPicker(document.getElementById('picker'));
    function ifPicker(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'picker') {
                state.currentTool = '';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('picker').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('transform').style.backgroundColor = '';

                state.currentTool = 'picker';
                localStorage.setItem("myState", JSON.stringify(state));
                document.getElementById('picker').style.backgroundColor = 'red';
            }
        }
    }


    /*_________________________________________________*/
//Canvas-item functional
    Array.from(document.getElementsByClassName('canvas_item')).forEach( elem => {
        elem.onclick = function itemClick(){
            //bucket listener
            if(state.currentTool==='bucket'){
                elem.style.backgroundColor=state.currentColor;
            }
            //transform listener
            if(state.currentTool==='transform'){
                if(elem.style.borderRadius===''){
                    elem.style.borderRadius='calc((60vh - 20px) / 3)';
                }
                else{
                    elem.style.borderRadius='';
                }
            }
            //color picker listener
            if(state.currentTool==='picker'){
                let style=getComputedStyle(elem);
                //check for duplicate colors
                if(style.backgroundColor!==state.currentColor){
                    let temp=state.currentColor;
                    state.currentColor = style.backgroundColor;
                    state.prevColor=temp;
                    localStorage.setItem("myState", JSON.stringify(state));
                    //SET CURRENT AND PREV COLORS IN HTML
                    document.getElementById('currentColorImg').style.backgroundColor=state.currentColor;
                    document.getElementById('prevColorImg').style.backgroundColor=state.prevColor;
                }
            }
        }
    });

    /*_________________________________________________*/
//CHOOSE RED AND BLUE COLORS BY PICKER
    chooseColor(document.querySelector('#Blue'));
    chooseColor(document.querySelector('#Red'));
    chooseColor(document.querySelector('#prevColor'));
    function chooseColor(elem) {
        let style=getComputedStyle(elem.childNodes[0]);
        elem.onclick = function () {
            if (state.currentColor !== style.backgroundColor) {
                let temp=state.currentColor;
                state.currentColor = style.backgroundColor;
                state.prevColor=temp;
                localStorage.setItem("myState", JSON.stringify(state));
                //SET CURRENT AND PREV COLORS IN HTML
                document.getElementById('currentColorImg').style.backgroundColor=state.currentColor;
                document.getElementById('prevColorImg').style.backgroundColor=state.prevColor;

            }
        }
    }











    /*

    //move button
        dragElement(document.getElementsByClassName('moveImg')[0]);


    //transform
        transformElement(document.getElementsByClassName('transformImg')[0]);
        function transformElement(elem) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elem.onmousedown = function (e) {
                pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
                elem.style.position = 'relative';
                e = e || window.event;
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmousemove = moveAt;
                document.onmouseup = function () {
                    document.onmousemove = null;
                    elem.style.left = 0;
                    elem.style.top = 0;
                    document.onmouseup = null;
                }
            };

            function moveAt(e) {
                e = e || window.event;
                pos1 += pos3 - e.clientX;
                pos2 += pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                elem.style.top = - pos2 + 'px';
                console.log(elem.style.top);
                elem.style.left =  - pos1 + 'px';
            }
        }

    /*
    //dragElement(document.getElementsByClassName('bucketImg')[0]);
        //DRAG ELEMENT
        function dragElement(elem) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elem.onmousedown = function (e) {
                pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
                elem.style.position = 'relative';
                e = e || window.event;
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmousemove = moveAt;
                document.onmouseup = function () {
                    document.onmousemove = null;
                    elem.style.left = 0;
                    elem.style.top = 0;
                    document.onmouseup = null;
                }
            };
            function moveAt(e) {
                e = e || window.event;
                pos1 += pos3 - e.clientX;
                pos2 += pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elem.style.top = - pos2 + 'px';
                console.log(elem.style.top);
                elem.style.left =  - pos1 + 'px';
            }
        }
        /*
        //CHOOSE TOOL WITH ICON CURSOR (not work well)
        function chooseTool(elem){
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            elem.onclick = function temp(e) {
                if(state.currentTool===''){
                    state.currentTool='bucket';
                    localStorage.setItem("myState",JSON.stringify(state));
                    pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
                    elem.style.position = 'relative';
                    e = e || window.event;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmousemove = moveAt;
                }
                else if(state.currentTool==='bucket'){
                    console.log(e.target);
                    state.currentTool='';
                    document.onmousemove = null;
                    elem.style.left = 0;
                    elem.style.top = 0;
                }
            };

            function moveAt(e) {
                e = e || window.event;
                pos1 += pos3 - e.clientX;
                pos2 += pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elem.style.top = - pos2 + 'px';
                elem.style.left =  - pos1 + 'px';
            }
        }
    */

};
