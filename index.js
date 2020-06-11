/*
  * Copyright 2020 산하, all rights reserved.
  *
  * 이 소스코드에서 수정이 허가된 부분 이외의 수정은 모두 금지됩니다.
  * 수정이 허가되는 부분 : 상수 rooms, entrance, walkout, e_msg, w_msg의 정의 부분
  *
  * 이 소스코드의 모든 재배포는 금지됩니다.
  *
  * 이 소스코드를 사용함으로서 발생하는 모든 불이익과 법적 책임은 당신에게 있으며, 이 소스코드의 저작자는 그것들을 책임지지 않음을 알려드립니다.
  *
  * 이 소스코드를 사용하면 위 내용에 모두 동의하며, 위 내용을 위반하였을 시 당신에게 그에 따른 법적 처벌이 가해질 수 있음에 대해 동의하는 것으로 간주합니다.
*/


importClass(org.jsoup.Jsoup);

/*
  rooms : 봇이 입퇴장을 감지할 방의 목록 배열입니다.
  
  ['방 이름', '방 아이디', 0] 이 한 요소 안에 들어갑니다.
  
  방 이름 : 해당 방의 이름입니다.
  방 아이디 : 카카오톡 오픈채팅방의 링크는 https://open.kakao.com/o/id 의 형식으로 이루어져 있습니다. 여기서 방 아이디는 왼쪽 링크 예시에서 id 부분을 뜻합니다.
*/

const rooms = [
  ['카카오톡 봇 | JS 코딩 & 제작', 'gzSTBYjb', 0]
]; 

// entrance : 입장 감지 후 메시지를 보낼 지, 보내지 않을 지 결정합니다. true일 경우 메시지를 보내고, false일 경우 메시지를 보내지 않습니다.
const entrance = true;

// walkout : 퇴장 감지 후 메시지를 보낼 지, 보내지 않을 지 결정합니다. true일 경우 메시지를 보내고, false일 경우 메시지를 보내지 않습니다.
const walkout = true;

// e_msg : 입장 감지 후 보낼 메시지입니다.
const e_msg = '환영합니다! 공지 읽어주시면 감사하겠습니다.';

// w_msg : 퇴장 감지 후 보낼 메시지입니다.
const w_msg = '안녕히가세요... ㅠㅠ';

// getRoomInfo : 오픈채팅방 정보를 가져오는 함수입니다.
function getRoomInfo (id) {
  return JSON.parse(Jsoup.connect('https://api.develope.kr/search/room?room=https://open.kakao.com/o/' + id).ignoreContentType(true).get().text()).result;
}

// enter : 입퇴장을 감지하고 처리하는 함수입니다.
function enter (e, w) {
  for (let i in rooms) {
    let inf = getRoomInfo(rooms[i][1]);
    if (rooms[i][2] == 0) {
      rooms[i][2] = inf.headcount;
      return;
    }
    if (inf.headcount > rooms[i][2] && e) {
      Api.replyRoom(rooms[i][0], e_msg + '\n\n' + rooms[i][2] + '->' + inf.headcount + '\nPowered by Sanha');
      rooms[i][2] = inf.headcount;
      return;
    }
    if (inf.headcount < rooms[i][2] && w) {
      Api.replyRoom(rooms[i][0], w_msg + '\n\n' + rooms[i][2] + '->' + inf.headcount + '\nPowered by Sanha');
      rooms[i][2] = inf.headcount;
      return;
    }
  }
}

const loop = setInterval(function () {
  try {
    enter(entrance, walkout);
  }
  catch (err) {
    Log.d(err);
  }
}, 750);

function response (room, msg, sender, isGC, replier, imageDB0 {}

fuction onStartCompile () {
  clearInterval(loop);
}
