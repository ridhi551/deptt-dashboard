function TCMap(teacherId) {
  this.teacherId = teacherId;
  this.flag = -1;
}

TCMap.prototype.updateFlag = function (flag) {
  this.flag = flag;
};

function TimeTable() {
  this.fourthSem = [];
  this.sixthSem = [];

  for (let i = 0; i < 5; i++) {
    this.fourthSem.push(Array(4).fill(0));
    this.sixthSem.push(Array(4).fill(0));
  }
}

TimeTable.prototype.copyDay = function (day, dayLabel) {
  for (let i = 0; i < 4; i++) {
    this.fourthSem[dayLabel][i] = day[0][i];
    // this.fourthSemMapped[dayLabel][i] = teacherMap.get(teacherId);
  }
  for (let i = 0; i < 4; i++) {
    this.sixthSem[dayLabel][i] = day[1][i];
    // this.sixthSemMapped[dayLabel][i] = teacherMap.get(teacherId);
  }
};

TimeTable.prototype.create = function (s4, s6, teacherMap) {
  let dayLabel, x;
  const days = [0, 1, 2, 3, 4]; // Array to shuffle

  // Shuffle the array of days
  for (let i = days.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [days[i], days[j]] = [days[j], days[i]];
  }

  for (x = 0, dayLabel = 0; x < days.length; x++, dayLabel++) {
    const randomNumber = days[x];
    this.copyDay(permutations(randomNumber, randomNumber, s4, s6), dayLabel);
  }

  // Return the generated timetable
  return {
    fourthSem: this.fourthSem,
    fourthSemMapped: this.fourthSemMapped,
    sixthSem: this.sixthSem,
    sixthSemMapped: this.sixthSemMapped,
  };
};

function search(list, element) {
  for (let i = 0; i < list.length; i++) {
    if (element === list[i].teacherId) {
      return list[i].flag;
    }
  }
  return -999;
}

function permutations(i, j, s4, s6) {
  const day = [[], []];
  const classes = 4;
  let ptr = 0;

  for (let period of day) {
    period.push(...Array(4).fill(0));
  }

  for (; ptr < classes; i = (i + 1) % s4.length, ptr++) {
    day[0][ptr] = s4[i].teacherId;
    s4[i].flag = ptr;
  }
  ptr = 0;

  for (; ptr < classes; j = (j + 1) % s6.length, ptr++) {
    day[1][ptr] = s6[j].teacherId;
    s6[j].flag = ptr;
    if (search(s4, s6[j].teacherId) === s6[j].flag) {
      s6[j].flag = -1;
      --ptr;
    }
    if (ptr === 3) {
      break;
    }
  }
  return day;
}

export { TCMap, TimeTable };
