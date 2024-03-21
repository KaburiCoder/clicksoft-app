export const paths = {
  // root
  root: "/",
  login: "/login",
  registKey: "/regist-key",
  searchUser: "/search-user",
  progressNote: "/progress-note",
  nursingRecord: "/nursing-record",
  vitalSign: "/vital-sign",
  ioSheet: "/io-sheet",
  ptProgress: "/pt-progress",
  insulin: "/insulin",
  scan: "/scan",
  scanViewer: (id: string) => `/scan/${id}`,
  firstChart: "/first-chart",
  consult: "/consult",
  observationChart: "/observation-chart",
  basicExam: "/basic-exam",
};

export const emitPaths = {
  joinRoom: "joinRoom",
  leaveRoom: "leaveRoom",
  getPatientInfo: "getPatientInfo",
  getProgressNote: "getProgressNote",
  getNursingRecord: "getNursingRecord",
  getVitalSign: "getVitalSign",
  getIOSheet: "getIOSheet",
  getPtProgress: "getPtProgress",
  getInsulin: "getInsulin",
  getScan: "getScan",
  getScanImage: "getScanImage",
  getObservationChart: "getObservationChart",
  getBasicExam: "getBasicExam",

  getFirstChart: "getFirstChart",
  getConsultation: "getConsultation",
};

export const imgPaths = {
  logo: "/images/logo.png",
  baseAvatar: "/images/base_avatar.png",
  progressNote: "/images/progress_note.jpg",
};
