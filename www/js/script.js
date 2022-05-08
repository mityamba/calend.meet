const widthBox = 60;
const heightBox = 40;

// блок с календарем
const monthName = ['', 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

const monthClass = ['', 'january', 'february', 'mart', 'april', 'may', 'june', 'jule', 'august', 'september', 'octember', 'november', 'december'];

const dayWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const level = [
    ['Ш', 'Школьный'],
    ['П', 'Поселенческий'],
    ['М', 'Муниципальный'],
    ['Р', 'Региональный'],
    ['Ф', 'Федеральный'],
    ['М', 'Международный']
];

const type = [
    ['технический', '#78BBE2'],
    ['гуманитарный', '#DB2ECA'],
    ['экологический', '#68BB54']
];

const status = [
    ['в планах', '#DBDBDB'],
    ['готовится', '#f2d63b'],
    ['отмена', '#CE5454'],
    ['готов', '#68BB54'],
    ['прошел', '#9ba3d6']
];

const format = ['заочный', 'очно-заочный', 'очный'];

let z = 1;

let nowDate = new Date();
let month = [];
month[0] = nowDate.getMonth() + 1;
month[1] = month[0] + 1;

let year = nowDate.getFullYear();

let blockMain = document.querySelector('.date__block');

for (let n = 0; n < month.length; n++) {
    let valueMonth = month[n];
    let newMonth = document.createElement('div');
    newMonth.className = 'month__block ' + monthClass[valueMonth];
    let newDay = document.createElement('div');
    newDay.className = 'days';
    let newMonthName = document.createElement('div');
    newMonthName.className = 'month' + ' m_' + valueMonth;
    newMonthName.innerHTML = '<div>' + monthName[valueMonth] + '</div>';
    newMonth.append(newMonthName);
    newMonth.append(newDay);
    blockMain.append(newMonth);
    let monthDays = new Date(year, month[n] + 1, 0).getDate();
    let blockDays = document.querySelector('.month__block' + '.' + monthClass[valueMonth] + ' .days');

    for (let i = 1; i <= monthDays; i++) {
        let blockEventInner = document.querySelector('.event__block_inner');
        let newDayGroupEvent = document.createElement('div');
        newDayGroupEvent.className = 'day__group_event m_' + valueMonth + ' ' + 'd_' + i + ' ' + 'z_' + z;

        let date = new Date(year + '-' + month[n] + '-' + i);
        let newDayGroup = document.createElement('div');
        newDayGroup.className = 'day__group';
        let newDayWeek = document.createElement('div');
        newDayWeek.className = 'day__week';
        newDayWeek.innerHTML = dayWeek[date.getDay()];
        let newDay = document.createElement('div');
        newDay.className = 'day m_' + valueMonth + ' ' + 'd_' + i + ' ' + 'z_' + z;
        if ((date.getDay() == 0) || (date.getDay() == 6)) {
            newDay.className += ' weekend';
        }
        let monthNowValue = nowDate.getMonth() + 1;
        if ((nowDate.getDate() == i) && (monthNowValue == month[n])) {
            console.log(i);
            newDay.className += ' today';
            newDayGroupEvent.className += ' todayEvent';
        }
        newDay.innerHTML = i;
        z++;
        newDayGroup.append(newDayWeek);
        newDayGroup.append(newDay);
        blockDays.append(newDayGroup);
        blockEventInner.append(newDayGroupEvent);
    }
}
// конец блока с календарем

function createObj(id, m, d, dur, l, title, t, img, h, s) {
    // id       - идентификатор
    // m        - месяц
    // d        - день
    // dur      - продолжительность, в днях
    // l        - уровень мероприятия
    // title    - название конкурса
    // t        - направленность
    // img      - лого мероприятия
    // h        - вертикальное положение
    // s        - статус мероприятия

    let blockEvent = document.querySelector('.event__block');

    let eventNew = document.createElement('div');
    eventNew.className = 'event m_' + m + ' d_' + d + ' dur_' + dur;
    eventNew.innerHTML = '<div class="level">' + level[l][0] + '</div>';
    eventNew.innerHTML += '<div class="status" title="' + status[s][0] + '"><div style="background:' + status[s][1] + ';"></div></div>';
    if (img != '') {
        eventNew.innerHTML += '<div class="img"><img src="img/logo/' + img + '" /></div>';
    }
    eventNew.innerHTML += '<div class="text margin">' + title + '</div>';
    if ((s == 0) || (s == 4)) {
        eventNew.style.opacity = 0.4;
    }
    eventNew.style.top = heightBox * (h + 0.5 + (h * 0.5)) + 'px';
    eventNew.style.left = widthBox * (d - 1) + 'px';
    eventNew.style.height = heightBox + 'px';
    eventNew.style.width = widthBox * dur + 'px';
    eventNew.style.background = type[t][1];
    eventNew.style.color = 'white';

    eventNew.addEventListener('mouseover', function() {
        let titleWidth = title.length * 10 + 30 + 30 + 24;
        if (img != '') {
            titleWidth = titleWidth + 40;
        }
        if (eventNew.clientWidth < titleWidth) {
            eventNew.style.width = titleWidth + 'px';
        }
        eventNew.style.background = '#e27878';
        eventNew.style.zIndex = 999;
        let classes = eventNew.className;
        let classesArr = classes.split(' ');
        let objDur = classesArr[3].split('_');
        let objDay = classesArr[2].split('_');
        let zDay = document.querySelector('.day.m_' + m + '.d_' + d);
        let zClasses = zDay.className;
        let zClassesArr = zClasses.split(' ');
        let zStart = zClassesArr[3].split('_');
        let zEnd = Number(zStart[1]) + Number(objDur[1]) - 1;
        let objTD = document.querySelectorAll('.day');
        for (let g = Number(zStart[1]); g <= zEnd; g++) {
            objTD.forEach(function(item) {
                let objTDofClasses = document.querySelectorAll('.day.z_' + g);
                let groupTDofClasses = document.querySelectorAll('.day__group_event.z_' + g);
                for (let i = 0; i < objTDofClasses.length; i++) {
                    objTDofClasses[i].style.borderWidth = '8px';
                    groupTDofClasses[i].style.backgroundColor = 'rgba(226, 120, 120, 0.25)';
                }
            });
        }
    });

    eventNew.addEventListener('mouseout', function() {
        eventNew.style.width = widthBox * dur + 'px';
        eventNew.style.background = type[t][1];
        eventNew.style.zIndex = 998;
        let classes = eventNew.className;
        let classesArr = classes.split(' ');
        let objDur = classesArr[3].split('_');
        let objDay = classesArr[2].split('_');
        let zDay = document.querySelector('.day.m_' + m + '.d_' + d);
        let zClasses = zDay.className;
        let zClassesArr = zClasses.split(' ');
        let zStart = zClassesArr[3].split('_');
        let zEnd = Number(zStart[1]) + Number(objDur[1]) - 1;
        let objTD = document.querySelectorAll('.day');
        for (let g = Number(zStart[1]); g <= zEnd; g++) {
            objTD.forEach(function(item) {
                let objTDofClasses = document.querySelectorAll('.day.z_' + g);
                let groupTDofClasses = document.querySelectorAll('.day__group_event.z_' + g);
                for (let i = 0; i < objTDofClasses.length; i++) {
                    objTDofClasses[i].style.borderWidth = '0px';
                    groupTDofClasses[i].style.backgroundColor = '';
                }
            });
        }
    });
    blockEvent.append(eventNew);

    eventNew.addEventListener('click', function() {
        let backBlock = document.querySelector('.back');
        backBlock.style.display = 'block';
        openWindow(id);
    });
}

document.querySelector('.back__close').addEventListener('click', function() {
    let backBlock = document.querySelector('.back');
    backBlock.style.display = 'none';
    let cardBlock = document.querySelector('.card');
    cardBlock.remove();
});

let requestURL = './data/list.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    let eventList = request.response;

    let blockEventHeight = document.querySelector('.event__block').clientHeight;
    let countEventMax = blockEventHeight / (heightBox * 1.5) - 1;
    countEventMax = Math.floor(countEventMax);

    let verticalPosition = 0;

    for (let i = 0; i < eventList.length; i++) {

        let eventAll = document.querySelectorAll('.event');
        eventAll.forEach(function(item) {

            let eventCreateTop = heightBox * (verticalPosition + 0.5 + (verticalPosition * 0.5));
            let eventCreateLeft = widthBox * (eventList[i]['day_start'] - 1);

            let eventExistTop = item.style.top;
            eventExistTop = eventExistTop.substring(0, eventExistTop.length - 2);
            eventExistTop = Number(eventExistTop);

            let eventExistLeft = item.style.left;
            eventExistLeft = eventExistLeft.substring(0, eventExistLeft.length - 2);
            eventExistLeft = Number(eventExistLeft);

            let eventExistWidth = item.clientWidth + eventExistLeft;
            if (eventExistTop == eventCreateTop) {
                if ((eventCreateLeft >= eventExistLeft) && (eventCreateLeft <= eventExistWidth)) {
                    verticalPosition++;
                }
            }
        });

        createObj(eventList[i]['id'], eventList[i]['month_start'], eventList[i]['day_start'], eventList[i]['dur'], eventList[i]['level'], eventList[i]['title'], eventList[i]['type'], eventList[i]['logo'], verticalPosition, eventList[i]['status']);

        if (verticalPosition < countEventMax) {
            verticalPosition++;
        } else {
            verticalPosition = 0;
        }
    }
}

//

function openWindow(id) {
    let requestURL = './data/list.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let eventList = request.response;

        let i = 0;
        for (let item of eventList) {
            if (item['id'] == id) break;
            i++;
        }

        let backInner = document.querySelector('.back__inner');

        let newCard = document.createElement('div');
        newCard.className = 'card';
        backInner.append(newCard);

        let newCardTitle = document.createElement('div');
        newCardTitle.className = 'card__title';
        newCard.append(newCardTitle);

        let newCardTitleValue = document.createElement('div');
        newCardTitleValue.innerHTML = eventList[i]['title'];
        newCardTitle.append(newCardTitleValue);

        if (eventList[i]['logo'] != '') {
            let newCardLogo = document.createElement('img');
            newCardLogo.src = 'img/logo/' + eventList[i]['logo'];
            newCardTitle.append(newCardLogo);
        }

        let newCardTitleFull = document.createElement('div');
        newCardTitleFull.className = 'card__title_full';
        newCardTitleFull.innerHTML = eventList[i]['level_title'] + ' "' + eventList[i]['title_full'] + '"';
        newCard.append(newCardTitleFull);

        let newCardDate = document.createElement('div');
        newCardDate.className = 'card__date';
        newCard.append(newCardDate);

        let newCardStatus = document.createElement('div');
        newCardStatus.className = 'card__status';
        let newStatus = eventList[i]['status'];
        newCardStatus.style.borderColor = status[newStatus][1];
        newCardStatus.style.color = status[newStatus][1];
        newCardStatus.innerHTML = status[newStatus][0];
        newCardDate.append(newCardStatus);

        let newCardDateValue = document.createElement('div');
        newCardDateValue.innerHTML = eventList[i]['date_start'].substring(0, 5) + ' <img src="img/icon/arrow-right.svg"> ' + eventList[i]['date_end'].substring(0, 5);
        newCardDate.append(newCardDateValue);

        if (eventList[i]['tags']) {
            let newCardTag = document.createElement('div');
            newCardTag.className = 'card__tag';
            newCard.append(newCardTag);
            let tagArr = eventList[i]['tags'].split(',');
            tagArr.forEach(function(item) {
                let newCardTagValue = document.createElement('div');
                newCardTagValue.innerHTML = item;
                newCardTag.append(newCardTagValue);
            });
        }

        let newCardAction = document.createElement('div');
        newCardAction.className = 'card__action';
        newCard.append(newCardAction);
        let newCardActionValue = document.createElement('div');
        newCardActionValue.innerHTML = 'БУДУ УЧАСТВОВАТЬ';
        newCardAction.append(newCardActionValue);

        let newCardDesc = document.createElement('div');
        newCardDesc.className = 'card__desc';
        newCardDesc.innerHTML = eventList[i]['desc'];
        newCard.append(newCardDesc);

        let newCardContact = document.createElement('div');
        newCardContact.className = 'card__contact';
        newCard.append(newCardContact);
        let newCardContactFirst = document.createElement('div');
        newCardContactFirst.innerHTML = 'Контакты:';
        newCardContact.append(newCardContactFirst);
        let newCardContactSecond = document.createElement('div');
        let c = 0;
        let contactArr = eventList[i]['contact'].split(',');
        let contactArrLink = eventList[i]['contact_link'].split(',');
        contactArr.forEach(function(item) {
            let newCardContactValue = document.createElement('a');
            newCardContactValue.href = contactArrLink[c];
            newCardContactValue.innerHTML = item + '<br/>';
            newCardContactSecond.append(newCardContactValue);
            c++;
        });
        newCardContact.append(newCardContactSecond);

        let newCardFormat = document.createElement('div');
        newCardFormat.className = 'card__format';
        newCard.append(newCardFormat);
        let newCardFormatFirst = document.createElement('div');
        newCardFormatFirst.innerHTML = 'Формат:';
        newCardFormat.append(newCardFormatFirst);
        let formatArr = eventList[i]['format'];
        let newCardFormatValue = document.createElement('div');
        newCardFormatValue.innerHTML = format[formatArr];
        newCardFormat.append(newCardFormatValue);

        let newCardParticipant = document.createElement('div');
        newCardParticipant.className = 'card__age';
        newCard.append(newCardParticipant);
        let newCardParticipantFirst = document.createElement('div');
        newCardParticipantFirst.innerHTML = 'Аудитория:';
        newCardParticipant.append(newCardParticipantFirst);
        let participant = eventList[i]['participant'];
        let participantArr = participant.split(',');
        let newCardParticipantValue = document.createElement('div');
        for (let part of participantArr) {
            newCardParticipantValue.innerHTML += part + '<br/>';
        }
        newCardParticipant.append(newCardParticipantValue);

        let newCardDoc = document.createElement('div');
        newCardDoc.className = 'card__doc';
        newCard.append(newCardDoc);
        let newCardDocFirst = document.createElement('div');
        newCardDocFirst.innerHTML = 'Документы:';
        newCardDoc.append(newCardDocFirst);
        let newCardDocSecond = document.createElement('div');
        let d = 0;
        let docArr = eventList[i]['doc_title'].split(',');
        let docArrLink = eventList[i]['doc_link'].split(',');
        docArr.forEach(function(item) {
            let newCardDocValue = document.createElement('a');
            newCardDocValue.href = docArrLink[d];
            newCardDocValue.innerHTML = item + '<br/>';
            newCardDocSecond.append(newCardDocValue);
            d++;
        });
        newCardDoc.append(newCardDocSecond);

        let newCardOrg = document.createElement('div');
        newCardOrg.className = 'card__org';
        newCard.append(newCardOrg);
        let newCardOrgFirst = document.createElement('div');
        newCardOrgFirst.innerHTML = 'Организаторы:';
        newCardOrg.append(newCardOrgFirst);
        let newCardOrgSecond = document.createElement('div');
        let o = 0;
        let orgArr = eventList[i]['org_logo'].split(',');
        let orgArrName = eventList[i]['org_name'].split(',');
        orgArr.forEach(function(item) {
            let newCardOrgValue = document.createElement('img');
            newCardOrgValue.title = orgArrName[o];
            newCardOrgValue.src = 'img/logo/' + item;
            newCardOrgSecond.append(newCardOrgValue);
            o++;
        });
        newCardOrg.append(newCardOrgSecond);

    }
}
