// ==========================
// Library Dummy Data
// ==========================
export const libraryDummyData = [
    {
        title: '빨간 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '노란 모자',
        author: '그림 형제',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 210,
        isBookmarked: false,
    },
    {
        title: '파란 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '보라 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '파란 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: false,
    },
];

// ==========================
// Book Dummy Data
// ==========================
export const bookDummyData = {
    title: '빨간 모자',
    titleOrg: 'Little Red Riding Hood',
    author: '그림 형제',
    authorOrg: 'Grimm Brothers',
    translator: '김미혜',
    publisher: '열린 책들',
    publishDate: new Date('2014-10-31'),
    bookmarkNum: 19820,
    isBookmarked: true,
    summary:
        '루이자 메이 올컷이 〈소녀들을 위한 소설〉을 써달라는 출판사의 의뢰를 받고 집필한 작품으로, 개성 넘치고 사랑스러운 마치 집안의 네 자매 메그, 조, 베스, 에이미의 좌충우돌 성장기를 다룬 소설이다. 가난하지만 서로가 있어 풍요롭고 행복했던 유년기를 지나, 삶이 주는 풍파와 지혜를 깨닫는 어른이 되기까지, 그들이 겪는 고민과 시행착오, 깨달음과 희망을 공감 가는 필치로 생동감 있게 그려 낸다. 루이자 메이 올컷의 가족 이야기를 바탕으로 한 자전적인 작품으로, 실제로 네 자매 중 둘째 딸로 태어나 자란 올컷의 성장기가 생생하게 녹아들어 있다.소녀들의 삶과 성장을 그린 이야기가 희박하던 시대, 여성 성장 서사를 다룬 대표 문학으로서 기념비적인 한 획을 그은 이 작품은 이후 전 세계 50개 이상의 언어로 번역되며 세계적인 고전으로 자리 잡았다. 출간된 지 150여 년이 지난 지금까지도 다양한 영화와 드라마, 뮤지컬, 애니메이션 등으로 끊임없이 제작되며 영감을 주고 있다.',
    length: 408,
    isbn: 9788932912783,
    toc: [
        '순례자 놀이',
        '메리 크리스마스',
        '로린스 소년',
        '짐',
        '이웃과 친해지기',
        '베스, 아름다움의 궁전을 발견하다',
        '에이미, 굴욕의 굴짜기에 가다',
        '조, 아폴리온을 만나다',
        '메그, 허영의 시장에 가다',
        '필윅 클럽과 우체국',
        '실험',
        '로런스 캠프',
        '허공의 성채',
        '비밀',
        '전보',
        '편지',
        '충실한 베스',
        '암울한 나날',
        '에이미의 유언장',
        '비밀 상담',
        '로리가 장난읠 치고 조가 화해를 주선하다',
        '아름다운 초원',
        '마지 대고모가 문제를 정리하다',
    ],
    bestReviews: [
        {
            nickname: 'user1',
            content: '제가 제일 좋아하는 책이에요',
            likeNum: 21,
            isLiked: true,
        },
        {
            nickname: 'user2',
            content: '제가 어렸을때 봤던 책이에요.',
            likeNum: 19,
            isLiked: false,
        },
    ],
};

// ==========================
// review Dummy Data
// ==========================
export const reviewDummyData = [
    {
        nickname: 'user1',
        likeNum: 21,
        created_at: '2025-07-24T12:18:54.000Z',
        content: '얘가 뭔 책이었지?',
        isLiked: false,
    },
    {
        nickname: 'user2',
        likeNum: 19,
        created_at: '2025-07-24T12:18:54.000Z',
        content: '제가 제일 좋아하는 책이에요',
        isLiked: null,
    },
    {
        nickname: 'user3',
        likeNum: 5,
        created_at: '2025-07-24T12:18:54.000Z',
        content: '읽어도 읽어도 다시 읽고 싶은 고전 명작',
        isLiked: true,
    },
    {
        nickname: 'user4',
        likeNum: 1,
        created_at: '2025-07-24T12:18:54.000Z',
        content: 'scifi의 대가이군',
        isLiked: false,
    },
];

// ==========================
// user Dummy Data
// ==========================
export const userDummyData = {
    nickname: 'tester15',
    numOfReview: 5,
    numOfReadBooks: 3,
};

// ==========================
// myReadBooks Dummy Data
// ==========================
export const myReadBooksDummyData = [
    {
        title: '소년이 온다',
        author: '한강',
        lastReadDate: new Date('2025-08-05T06:12:00'),
        isBookmarked: true,
    },
    {
        title: '아기가 온다',
        author: '금강',
        lastReadDate: new Date('2025-08-01T00:24:00'),
        isBookmarked: false,
    },
    {
        title: '청년이 온다',
        author: '나일강',
        lastReadDate: new Date('2025-07-24T21:24:00'),
        isBookmarked: true,
    },
    {
        title: '어른이 온다',
        author: '미시시피강',
        lastReadDate: new Date('2025-06-01T03:24:00'),
        isBookmarked: true,
    },
    {
        title: '노인이 온다',
        author: '신천',
        lastReadDate: new Date('2024-11-20T03:24:00'),
        isBookmarked: false,
    },
];

// ==========================
// myReviews Dummy Data
// ==========================
export const myReviewsDummyData = [
    {
        title: '소년이 온다',
        author: '한강',
        content: '역시 고전 명작',
        isBookmarked: true,
    },
    {
        title: '아기가 온다',
        author: '금강',
        content:
            '빨간 모자를 신선하게 재해석한 소설이었습니다. 매우 흥미로웠고 다시 읽을 의사가',
        isBookmarked: false,
    },
    {
        title: '청년이 온다',
        author: '나일강',
        content: '아 좀 뻔해지는 기분이 듭니다.',
        isBookmarked: true,
    },
    {
        title: '어른이 온다',
        author: '미시시피강',
        content: '어른이 오면 어른이 오고 어른이 오면 어른이 온거죠',
        isBookmarked: true,
    },
    {
        title: '노인이 온다',
        author: '신천',
        content: '올수 있을까요',
        isBookmarked: false,
    },
];

// ==========================
// RecentlyReadBooksDummy Data > libraryDummyData 사용
// ==========================

// ==========================
// RecommendedBooks Dummy Data > libraryDummyData 사용
// ==========================

// ==========================
// bestseller Dummy Data > libraryDummyData 사용
// ==========================

// ==========================
// newBooks Dummy Data >libraryDummyData 사용
// ==========================

// ==========================
// genreBooks Dummy Data
// ==========================
export const genreBooksDummyData = {
  문학: [
    {
      id: '101',
      title: '어린 왕자',
      author: '앙투안 드 생텍쥐페리',
      date: '2018.03.01',
      bookmark: 1200,
      iconColor: '#6E44FF',
    },
    {
      id: '102',
      title: '데미안',
      author: '헤르만 헤세',
      date: '2019.05.12',
      bookmark: 850,
      iconColor: '#B0B0B0',
    },
  ],
  판타지: [
    {
      id: '201',
      title: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      date: '2005.12.10',
      bookmark: 5320,
      iconColor: '#6E44FF',
    },
    {
      id: '202',
      title: '나니아 연대기',
      author: 'C.S. 루이스',
      date: '2006.07.20',
      bookmark: 2100,
      iconColor: '#B0B0B0',
    },
  ],
  역사: [
    {
      id: '301',
      title: '사피엔스',
      author: '유발 하라리',
      date: '2017.02.14',
      bookmark: 4320,
      iconColor: '#6E44FF',
    },
    {
      id: '302',
      title: '총, 균, 쇠',
      author: '재레드 다이아몬드',
      date: '2016.11.03',
      bookmark: 2900,
      iconColor: '#B0B0B0',
    },
  ],
};
