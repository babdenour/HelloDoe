import { find, findAll, getDefaultMocks, Mocks } from '@/utils/test';
import CandidateList, { CandidateListProps, EmittedEvents } from '@client/components/candidate-list/candidate-list';
import { Candidate, CandidateStatus } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { shallowMount, Wrapper, WrapperArray } from '@vue/test-utils';

const CANDIDATE_LIST_ITEM_SELECTOR: string = 'candidate-list-item';
const TITLE_UNLOCKED_SELECTOR: string = 'title-unlocked';
const TITLE_FAVORITE_SELECTOR: string = 'title-favorite';
const TITLE_SUGGESTED_SELECTOR: string = 'title-suggested';
const TITLE_OTHER_SELECTOR: string = 'title-other';
const ACTION_LIST_ITEM_REDIRECT_TO_CHECKOUT_SELECTOR: string = 'action-list-item-redirect-to-checkout';
const ACTION_LIST_ITEM_BOOST_AD_SELECTOR: string = 'action-list-item-boost-my-ad';
const ACTION_LIST_ITEM_SPONSOR_AD_SELECTOR: string = 'action-list-item-sponsor-my-ad';

let wrapper: Wrapper<CandidateList>;

let mocks: Mocks;

let mockedCandidates: Candidate[];
const selectedCandidateId: string = '1';

const createWrapper = () => {
  const propsData: CandidateListProps = {
    candidates: mockedCandidates,
    hasMoreCandidates: true,
    selectedCandidateId: selectedCandidateId,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(CandidateList, {
    mocks,
    propsData,
  });
};

describe('CandidateList', () => {
  beforeEach(() => {
    mockedCandidates = mockCandidates();
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate title unlocked', () => {
      const title: Wrapper<Vue> = find(wrapper, TITLE_UNLOCKED_SELECTOR);

      expect(title.text()).toContain('pages.client.candidates-page.UNLOCKED');
    });

    it('should translate title favorite', () => {
      const title: Wrapper<Vue> = find(wrapper, TITLE_FAVORITE_SELECTOR);

      expect(title.text()).toContain('pages.client.candidates-page.FAVORITE');
    });

    it('should translate title suggested', () => {
      const title: Wrapper<Vue> = find(wrapper, TITLE_SUGGESTED_SELECTOR);

      expect(title.text()).toContain('pages.client.candidates-page.SUGGESTED');
    });

    it('should translate title other', () => {
      const title: Wrapper<Vue> = find(wrapper, TITLE_OTHER_SELECTOR);

      expect(title.text()).toContain('pages.client.candidates-page.OTHER');
    });

    it('should translate paiement card title', () => {
      const paiementCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_REDIRECT_TO_CHECKOUT_SELECTOR);

      expect(paiementCard.props().title).toBe('pages.client.candidates-page.button-card.paiement.PAIEMENT_CARD_TITLE');
    });

    it('should translate paiement card subTitle', () => {
      const paiementCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_REDIRECT_TO_CHECKOUT_SELECTOR);

      expect(paiementCard.props().subTitle).toBe('pages.client.candidates-page.button-card.paiement.PAIEMENT_CARD_SUBTITLE');
    });
    it('should translate boost card title', () => {
      const boostCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_BOOST_AD_SELECTOR);

      expect(boostCard.props().title).toBe('pages.client.candidates-page.button-card.boost-ad.title');
    });

    it('should translate boost card subTitle', () => {
      const boostCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_BOOST_AD_SELECTOR);

      expect(boostCard.props().subTitle).toBe('pages.client.candidates-page.button-card.boost-ad.subtitle');
    });
    it('should translate sponsor card title', () => {
      const sponsorCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_SPONSOR_AD_SELECTOR);

      expect(sponsorCard.props().title).toBe('pages.client.candidates-page.button-card.sponsor-ad.title');
    });

    it('should translate sponsor card subTitle', () => {
      const sponsorCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_SPONSOR_AD_SELECTOR);

      expect(sponsorCard.props().subTitle).toBe('pages.client.candidates-page.button-card.sponsor-ad.subtitle');
    });
  });

  describe('when filter unlocked candidates', () => {
    it('should return right count', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesUnlocked;

      expect(candidates.length).toBe(2);
    });

    it('should filter right state', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesUnlocked;

      candidates.forEach((candidate: Candidate) => {
        expect(candidate.status).toBe(CandidateStatus.UNLOCKED);
      });
    });
  });

  describe('when filter favorite candidates', () => {
    it('should return right count', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesFavorite;

      expect(candidates.length).toBe(2);
    });

    it('should filter right state', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesFavorite;

      candidates.forEach((candidate: Candidate) => {
        expect(candidate.status).toBe(CandidateStatus.FAVORITE);
      });
    });
  });

  describe('when filter preselected candidates', () => {
    it('should return right count', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesPreselected;

      expect(candidates.length).toBe(5);
    });

    it('should filter right state', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesPreselected;

      candidates.forEach((candidate: Candidate) => {
        expect(candidate.status).toBe(CandidateStatus.PRESELECTED);
      });
    });
  });

  describe('when filter other candidates', () => {
    it('should return right count', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesOthers;

      expect(candidates.length).toBe(2);
    });

    it('should filter right state', () => {
      const candidates: Candidate[] = wrapper.vm.candidatesOthers;

      candidates.forEach((candidate: Candidate) => {
        expect(candidate.status).toBe(CandidateStatus.OTHER);
      });
    });
  });

  describe('when id is not selectedID', () => {
    it('should return false', () => {
      const idNotSelected: string = 'not selected';

      const isCandidateSelected: boolean = wrapper.vm.isCandidateSelected(idNotSelected);

      expect(isCandidateSelected).toBe(false);
    });
  });

  describe('when id is selectedID', () => {
    it('should return true', () => {
      const isCandidateSelected: boolean = wrapper.vm.isCandidateSelected(selectedCandidateId);

      expect(isCandidateSelected).toBe(true);
    });
  });

  describe('given events of the component candidate list item', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.CANDIDATE_SELECTED} event`, () => {
        const candidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_ITEM_SELECTOR);

        candidate.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.CANDIDATE_SELECTED]).toBeTruthy();
      });

      it(`should pass on id of candidate clicked`, () => {
        const candidates: WrapperArray<Vue> = findAll(wrapper, CANDIDATE_LIST_ITEM_SELECTOR);

        const candidateIdx: number = 1;
        const mockedCandidate: Candidate = mockedCandidates[candidateIdx];
        const candidateClicked: Wrapper<Vue> = candidates.at(candidateIdx);

        candidateClicked.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.CANDIDATE_SELECTED][0][0]).toEqual(mockedCandidate.id);
      });
    });

    describe('when emit set-candidate-favorite ', () => {
      it(`should emit ${EmittedEvents.SET_CANDIDATE_FAVORITE}`, () => {
        const candidateItems: WrapperArray<Vue> = findAll(wrapper, CANDIDATE_LIST_ITEM_SELECTOR);
        const candidateId: string = '6';
        candidateItems.at(5).vm.$emit('set-candidate-favorite');

        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][0]).toBe(candidateId);
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][1]).toBe(true);
      });
    });
  });

  describe('given events of the credit card payment', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.REDIRECT_TO_CHECKOUT} event`, () => {
        const checkoutCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_REDIRECT_TO_CHECKOUT_SELECTOR);

        checkoutCard.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.REDIRECT_TO_CHECKOUT]).toBeTruthy();
      });
    });
  });

  describe('given events of the boost card', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.BOOST_MY_AD} event`, () => {
        const boostCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_BOOST_AD_SELECTOR);

        boostCard.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.BOOST_MY_AD]).toBeTruthy();
      });
    });
  });

  describe('given events of the sponsor card', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.SPONSOR_MY_AD} event`, () => {
        const sponsorCard: Wrapper<Vue> = find(wrapper, ACTION_LIST_ITEM_SPONSOR_AD_SELECTOR);

        sponsorCard.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SPONSOR_MY_AD]).toBeTruthy();
      });
    });
  });

  const mockCandidates = (): Candidate[] => {
    return [
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            imgUrl:
              'https://images.generated.photos/neNMVhfPhncF1xAmaKdMmen9A-qkSsia0zCMPuGp7Ug/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA5OTcwNDMuanBn.jpg',
            question: 'Selon toi, quels sont tes trois plus gros défauts ?',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }),
        ],
      }),
    ];
  };
});
