import { CandidateStatus } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';

export const CANDIDATES = [
  CandidateFactory.create({
    id: '1',
    firstName: 'Esperanza',
    lastName: 'Cabrera',
    age: 20,
    score: 10,
    status: CandidateStatus.UNLOCKED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: 'esperanza.cabrera@gmail.com',
      phone: '0638592058',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=1',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=1',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=1',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '2',
    firstName: 'Zachery',
    lastName: 'Graves',
    age: 24,
    score: 9,
    status: CandidateStatus.UNLOCKED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: 'zachery.graves@gmail.com',
      phone: '0636472950',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=2',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=2',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=2',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '3',
    firstName: 'Rosemary',
    lastName: 'Barrera',
    age: 23,
    score: 9,
    status: CandidateStatus.FAVORITE,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: 'rosemary.barrera@gmail.com',
      phone: '0627582940',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=3',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=3',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=3',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '4',
    firstName: 'Keyon',
    lastName: 'Gamble',
    age: 26,
    score: 9,
    status: CandidateStatus.FAVORITE,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: 'keyon.gamble@gmail.com',
      phone: '0654620493',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=4',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=4',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=4',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '5',
    firstName: 'Elisha',
    lastName: 'Maynard',
    age: 20,
    score: 9,
    status: CandidateStatus.PRESELECTED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: 'elisha.meynard@gmail.com',
      phone: '0604829526',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=5',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=5',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=5',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '6',
    firstName: 'Grace',
    lastName: 'Chaney',
    age: 19,
    score: 8,
    status: CandidateStatus.PRESELECTED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=6',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=6',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=6',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '7',
    firstName: 'Dominique',
    lastName: 'Sandoval',
    age: 17,
    score: 8,
    status: CandidateStatus.PRESELECTED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=7',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=7',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=7',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '8',
    firstName: 'Luciano',
    lastName: 'Pineda',
    age: 21,
    score: 7,
    status: CandidateStatus.PRESELECTED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=8',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=8',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=8',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '9',
    firstName: 'Carissa',
    lastName: 'Noble',
    age: 22,
    score: 8,
    status: CandidateStatus.PRESELECTED,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=9',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4??id=9',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4??id=9',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '10',
    firstName: 'Melissa',
    lastName: 'Arellano',
    age: 25,
    score: 6,
    status: CandidateStatus.OTHER,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=10',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?id=10',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?id=10',
      }),
    ],
  }),
  CandidateFactory.create({
    id: '11',
    firstName: 'Jesse',
    lastName: 'Hogan',
    age: 23,
    score: 5,
    status: CandidateStatus.OTHER,
    isFavorite: false,
    appliedAt: 1617642254000,
    contactInformation: CandidateFactory.createContactInformation({
      email: '',
      phone: '',
    }),
    videoCv: CandidateFactory.createVideoCv({
      imgUrl:
        'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }),
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: '1',
        imgUrl:
          'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
        question: "Qu'est ce qui fait de toi le/la Doer idéal(e) ?",
        videoUrl: 'https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=11',
      }),
      CandidateFactory.createVideoCv({
        id: '2',
        imgUrl:
          'https://images.generated.photos/bx8ZmO4QOhsEfLjMiHR7GEJ2BeUoVCIEhre8Rmp8LT0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTA4NTcuanBn.jpg',
        question: 'Selon toi, quels sont tes trois plus gros défauts ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?id=11',
      }),
      CandidateFactory.createVideoCv({
        id: '3',
        imgUrl:
          'https://images.generated.photos/6oq1KFWfKTn779SufobbPPWyN0WdwbIzNxMBuPcAGEQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxOTYyNTYuanBn.jpg',
        question: 'Un dernier message à faire passer ?',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?id=11',
      }),
    ],
  }),
];
