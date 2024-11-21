const currentDate = document.querySelector(".current-date"),
days = document.querySelector(".days"),
prevNextIcon =document.querySelectorAll(".icons span");

let date = new Date(), //Date 객체 생성
currYear = date.getFullYear(); //현재 년 
currMonth = date.getMonth(); //현재 월

const monthNames = [//현재 월의 반환값을 텍스트 표현하기 위한 배열
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const renderCalendar = () => {
    //currYear : 현재 년, currMonth : 현재 월, 1 : 현재 월의 첫 번째 요일을 의미함
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), //현재 월의 첫 번째 요일 저장

    //currYear : 현재 년, currMonth : 다음 달, 0 : 전 월의 마지막 날을 의미함
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), //전 월의 마지막 날 저장

    //currYear : 현재 년, currMonth : 현재 월, lastDateofMonth : 현재 월의 마지막 요일을 의미함
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), //현재 월의 마지막 요일 저장

    //currYear : 현재 년, currMonth : 현재 월, 0 : 이 전달의 마지막 날짜를 의미함
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //이 전달의 마지막 날짜 저장

    let liTags = ""; //li 변수 초기화

    //2.1.이번 달의 첫 째 주 시작 요일을 구한다.
    for(let i = firstDayofMonth; i > 0; i--) {
        //2.1.1. 저번 달 마지막 주 일부 날짜를 출력한다.
        liTags += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    //2.2. 이번 달의 날짜를 구한다.
    for (let i = 1; i <= lastDateofMonth; i++) {
        //2.2.1. 오늘 날짜라면 active클래스를 추가한다.(css로 오늘날짜를 표기하기위함)
        let isToDay = i === date.getDate() && currMonth === new Date(). getMonth() 
                        && currYear === new Date().getFullYear() ? "active" : "";
        liTags += `<li class="${isToDay}">${i}</li>`;
    }
    //2.3. 다음 달의 첫 주 일부 날짜를 출력한다.
    for(let i = lastDayofMonth; i < 6; i++) {
        liTags += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    //1. 현재 년도와 월을 출력한다.
    currentDate.innerText = `${monthNames[currMonth]} ${currYear}`;
    //2, 날짜를 출력한다.
    days.innerHTML = liTags; //innerHTMl을 사용하여 liTags있는 내용을 HTML태그로 설정
}


renderCalendar();

//아이콘에 click 이벤트가 발생하면 
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () =>{
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth  + 1;
        renderCalendar();
    })

    if(currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth);
        currYear = date.getFullYear();
        currMonth = date.getMonth();
    }
    else {
        date = new Date();
    }

    renderCalendar();
});
