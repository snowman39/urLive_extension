console.log (100);
window.addEventListener('load', (event) => {
    if (document.visibilityState === `visible`) { 
        // 사이드바가 열렸을 때
        const background = document.querySelector('.background');
        setTimeout(() => {
            background.style.display = 'none'
        }, 1500)
    } else {
        background.style.display = 'none'
        // 사이드바가 닫혔을 때
    }
});

whale.storage.sync.get('uid', result => {
    const uid = result.uid
    fetch(`https://still-anchorage-85470.herokuapp.com/list/${uid}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => {
            return res.json()
        }).then(resJSON => {
            console.log(resJSON)

            const { room_name_arr, room_url_arr, room_part_arr } = resJSON
            const roomName = room_name_arr.split('/')
            const roomUrl = room_url_arr.split('/')
            const roomParti = room_part_arr.split('/')
            console.log(roomParti)
            document.getElementById('roomCnt').innerText = roomName.length-1;
            console.log(roomName);
            console.log(roomUrl);
            if (roomName) {
                for ( let i=0; i<roomName.length-1; i++) {
                    const Room = document.createElement('div')
                    Room.classList.add('room1')
                    const Content = document.createElement('div')
                    Content.classList.add('room_content')
                    const div1 = document.createElement('div')
                    div1.classList.add('p2');
                    div1.innerText = roomName[i]
                    const div2 = document.createElement('div')
                    div2.classList.add('p3')
                    const pNum = document.createElement('p')
                    //pNum.classList.add('')
                    const participant = roomParti[i].split('=')
                    pNum.innerText = participant.length-1
                    console.log(participant)
                    for (let j=0; j<participant.length-1; j++){
                        if (j === participant.length-2) div2.innerText += participant[j]
                        else div2.innerText += participant[j] + ', '
                    }
                    div1.appendChild(pNum)
                    Content.appendChild(div1)
                    Content.appendChild(div2)
                    Room.appendChild(Content)

                    const delete_button = document.createElement("button");
                    delete_button.innerText = 'delete';
                    delete_button.style = "position:fixed; left: 10px;"
                    Room.appendChild(delete_button)

                    document.getElementById('roomlist').appendChild(Room)
                    
                    Content.addEventListener('click', () => {
                        localStorage.setItem("encrypt", roomUrl[i])
                        fetch(`https://still-anchorage-85470.herokuapp.com/${roomUrl[i]}/`, {
                            method: 'GET',
                            headers:{
                                'Content-Type': 'application/json'
                            }}).then(res => {
                                return res.json()
                            }).then(resJSON => {
                                console.log(resJSON)
                                window.location.href='room.html'
                                
                            })

                    })
                    delete_button.addEventListener('click', () =>{
                        fetch(`https://still-anchorage-85470.herokuapp.com/delete/${uid}/${roomUrl[i]}/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }}).then(res => {
                                return res.json()
                            }).then(resJSON => {
                                console.log(resJSON)
                                
                                window.location.href='sidebar.html'
                                window.reload(true)
                            })

                    })
                }
            }
                    
        })   
});