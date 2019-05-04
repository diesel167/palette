window.onload=function() {
    //initial state of tools
    let state = {
        currentTool: '',
        currentColor: 'rgb(0, 128, 0)',
        prevColor: 'rgb(204, 204, 204)',
    };



    //SET CURRENT AND PREV COLORS IN HTML
    document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
    document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;


    /*_________________________________________________*/

    //CHOOSE TOOL BUCKET
    ifBucket(document.getElementById('bucket'));

    function ifBucket(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'bucket') {
                state.currentTool = '';
                document.getElementById('bucket').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('transform').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool = 'bucket';
                document.getElementById('bucket').style.backgroundColor = 'red';
            }
        }
    }

    /*_________________________________________________*/

    //CHOOSE TOOL TRANSFORM
    ifTransform(document.getElementById('transform'));

    function ifTransform(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'transform') {
                state.currentTool = '';
                document.getElementById('transform').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';

                state.currentTool = 'transform';
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
                document.getElementById('picker').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('move').style.backgroundColor = '';
                document.getElementById('transform').style.backgroundColor = '';

                state.currentTool = 'picker';
                document.getElementById('picker').style.backgroundColor = 'red';
            }
        }
    }


    /*_________________________________________________*/

    //CHOOSE RED AND BLUE COLORS BY PICKER
    chooseColor(document.querySelector('#Blue'));
    chooseColor(document.querySelector('#Red'));
    chooseColor(document.querySelector('#prevColor'));

    function chooseColor(elem) {
        const child = elem.getElementsByClassName('colorForPicker')[0];
        let style = getComputedStyle(child);
        elem.onclick = function () {
            if (state.currentColor !== style.backgroundColor && state.currentTool === 'picker') {
                let temp = state.currentColor;
                state.currentColor = style.backgroundColor;
                state.prevColor = temp;
                //SET CURRENT AND PREV COLORS IN HTML
                document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
                document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;
            }
        }
    }


    /*_________________________________________________*/

    //KEYBOARD   m - move; p - picker; t - transform; b - color bucket tool;
    document.addEventListener('keydown', function (event) {
        let doEvent = new Event('click');
        if (event.key === 'p') {
            document.getElementById('picker').dispatchEvent(doEvent);
        }
        if (event.key === 'b') {
            document.getElementById('bucket').dispatchEvent(doEvent);
        }
        if (event.key === 't') {
            document.getElementById('transform').dispatchEvent(doEvent);
        }
        if (event.key === 'm') {
            document.getElementById('move').dispatchEvent(doEvent);
        }
    });

    /*_________________________________________________*/

    //CHOOSE MOVE TOOL
    ifMove(document.getElementById('move'));

    function ifMove(elem) {
        elem.onclick = function () {
            if (state.currentTool === 'move') {
                state.currentTool = '';
                document.getElementById('move').style.backgroundColor = '';
            }
            else {
                //reset colors of others elements
                document.getElementById('bucket').style.backgroundColor = '';
                document.getElementById('picker').style.backgroundColor = '';
                document.getElementById('transform').style.backgroundColor = '';

                state.currentTool = 'move';
                document.getElementById('move').style.backgroundColor = 'red';
            }
        }
    }

    /*_________________________________________________*/

    //CANVAS_ITEM FUNCTIONAL
    let count = false; //indicators for move tool
    let orderTemp; //indicators for move tool
    let elemTemp; //indicators for move tool
    let j;   //indicators for move tool


    let arr=[];  //working arr (duplicate of local storage) for better and more simpler usage

    Array.from(document.getElementsByClassName('canvas_item')).forEach((elem,i) => {
        //check is the element in localStorage already
        if(localStorage.getItem('canvas')){
            if(JSON.parse(localStorage.getItem('canvas'))[i]){
                //set properties from storage
                arr[i]=JSON.parse(localStorage.getItem('canvas'))[i];
                elem.style.borderRadius=arr[i].borderRadius;
                elem.style.backgroundColor=arr[i].backgroundColor;
                elem.style.order=arr[i].order;
            }
            else{
                arr[i]={order:'',borderRadius:'',backgroundColor:''};
            }
        }
        else{
            //if empty storage initially set empty array to localstorage
            localStorage.setItem('canvas',JSON.stringify(arr));
            //add info for 1st element
            arr[i]={order:'',borderRadius:'',backgroundColor:''};
        }

        elem.onclick = function itemClick() {
            let style = getComputedStyle(elem);

            //bucket listener
            if (state.currentTool === 'bucket') {
                elem.style.backgroundColor = state.currentColor;
                arr[i].backgroundColor=state.currentColor;
                //update storage for current session
                localStorage.setItem("canvas", JSON.stringify(arr));
            }

            //transform listener
            if (state.currentTool === 'transform') {
                if (elem.style.borderRadius === '') {
                    elem.style.borderRadius = 'calc((60vh - 20px) / 3)';
                    //update our working arr
                    arr[i].borderRadius='calc((60vh - 20px) / 3)';
                    //update storage for current session
                    localStorage.setItem("canvas", JSON.stringify(arr));
                }
                else {
                    elem.style.borderRadius = '';
                    arr[i].borderRadius='';
                    //update storage for current session
                    localStorage.setItem("canvas", JSON.stringify(arr));
                }
            }

            //color picker listener
            if (state.currentTool === 'picker') {
                //check for duplicate colors
                if (style.backgroundColor !== state.currentColor) {
                    let temp = state.currentColor;
                    state.currentColor = style.backgroundColor;
                    state.prevColor = temp;

                    //SET CURRENT AND PREV COLORS IN HTML
                    document.getElementById('currentColorImg').style.backgroundColor = state.currentColor;
                    document.getElementById('prevColorImg').style.backgroundColor = state.prevColor;
                }
            }
            if (state.currentTool === 'move') {
                if (count === false) {
                    orderTemp = style.order; //set order element to move
                    elemTemp = elem;
                    j=i;
                    count = !count;
                }
                else {
                    //drop props
                    elem.style.order = orderTemp;
                    arr[i].order=orderTemp;

                    elemTemp.style.order = style.order;
                    arr[j].order=style.order;

                    //update storage for current session
                    localStorage.setItem("canvas", JSON.stringify(arr));
                    //reset indicator
                    count = !count;
                }
            }
        }
    });
    /*_________________________________________________*/
};
