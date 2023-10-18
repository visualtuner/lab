let TitleUtil = {
		
    title : "티스테이션",
    catchphrase : "티스테이션 | 타이어쇼핑과 차량관리를 한번에!",
    description: "가입만 해도 누리는 all my T 회원혜택! 내차관리부터 타이어쇼핑까지 가능한 한국타이어 공식 온라인몰",
    deptLen: 0,
    resultArr:[],
    detailNm: {},
    init : function(option) {
        this.getPageDept();
    },
    
    getPageDept : function() {
        // let titleThisUrl = location.href;
        let titleThisUrl = "https://www.tstation.com/deal";
        let baseUrl = _baseUrl;
        
        titleThisUrl = titleThisUrl.replace(baseUrl, "");
        titleThisUrl = "/"+titleThisUrl;
        
        let indexCk = titleThisUrl.indexOf("/");
        
        if( indexCk > -1 ) {
            let results = titleThisUrl.match(/\//g);
            this.deptLen = results.length;
        }
        
        let url = /([\w-]+)/gi;
        let result = titleThisUrl.match(url);
        this.resultArr = result;
        
        let title = ""; 
        let description = "";

        title = this.getTitleNm().titleNm;
        description = this.getTitleNm().descriptionStr;
        
        if( title == "" ) {
            title = this.title;
        }

        if( description == "" ) {
            description = this.description;
        }
        
        document.title = title;
        document.querySelector('meta[name="description"]').setAttribute("content", description);
        document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        document.querySelector('meta[property="og:description"]').setAttribute("content", description);
        
    },

    getTitleNm : function() {

        let titleNm = "";
        let descriptionStr = "";

        if( this.resultArr == null ) {
            titleNm = this.catchphrase
            descriptionStr = this.description
        }else{
            if( this.resultArr[0] == "tire" ) {//타이어
                titleNm = "타이어 쇼핑"
                if( this.resultArr[1] == "auto-brands" ) {
                    if( this.resultArr[2] == "brandCd" ) {
                        if( this.resultArr[3] == "hk" ) {
                            titleNm = "한국타이어 쇼핑"
                            descriptionStr = "테스트 디스크립션"
                        }else if( this.resultArr[3] == "lf" ) {
                            titleNm = "라우펜타이어 쇼핑"
                        }else if( this.resultArr[3] == "bs" ) {
                            titleNm = "브리지스톤타이어 쇼핑"
                        }else if( this.resultArr[3] == "pi" ) {
                            titleNm = "피렐리타이어 쇼핑"
                        }else if( this.resultArr[3] == "mx" ) {
                            titleNm = "맥시스타이어 쇼핑"
                        }else if( this.resultArr[3] == "mc" ) {
                            titleNm = "미쉐린타이어 쇼핑"
                        }else if( this.resultArr[3] == "ct" ) {
                            titleNm = "콘티넨탈타이어 쇼핑"
                        }else if( this.resultArr[3] == "gy" ) {
                            titleNm = "굿이어타이어 쇼핑"
                        }
                    }
                }else if( this.resultArr[1] == "sizes" ) {
                    titleNm = "타이어 검색결과"
                    if( this.resultArr[2] == "brandCd" ) {
                        if( this.resultArr[3] == "hk" ) {
                            titleNm = "한국타이어 쇼핑"
                        }else if( this.resultArr[3] == "lf" ) {
                            titleNm = "라우펜타이어 쇼핑"
                        }else if( this.resultArr[3] == "bs" ) {
                            titleNm = "브리지스톤타이어 쇼핑"
                        }else if( this.resultArr[3] == "pi" ) {
                            titleNm = "피렐리타이어 쇼핑"
                        }else if( this.resultArr[3] == "mx" ) {
                            titleNm = "맥시스타이어 쇼핑"
                        }else if( this.resultArr[3] == "mc" ) {
                            titleNm = "미쉐린타이어 쇼핑"
                        }else if( this.resultArr[3] == "ct" ) {
                            titleNm = "콘티넨탈타이어 쇼핑"
                        }else if( this.resultArr[3] == "gy" ) {
                            titleNm = "굿이어타이어 쇼핑"
                        }
                    }
                }else if( this.resultArr[1] == "types" ) {
                    if( this.resultArr[2] == "carKndNm" ) {
                        if( this.resultArr[3] == "p" ) {
                            titleNm = "승용차 타이어"
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "SUV 타이어"
                        }else if( this.resultArr[3] == "lt" ) {
                            titleNm = "VAN/소형트럭 타이어"
                        }else if( this.resultArr[3] == "e" ) {
                            titleNm = "전기차 타이어"
                        }
                    }
                }else if( this.resultArr[1] == "product" ) {
                    titleNm = (this.detailNm.ptrnNm != "") ? this.detailNm.ptrnNm : this.detailNm.goodsNm;
                }else if( this.resultArr[1] == "seasons" ) {
                    titleNm = "계절별 타이어 쇼핑"
                    if( this.resultArr[2] == "seasonNm" ) {
                        if( this.resultArr[3] == "w" ) {
                            titleNm = "겨울용 타이어 쇼핑"
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "여름용 타이어 쇼핑"
                        }else if( this.resultArr[3] == "a" ) {
                            titleNm = "사계절용 타이어 쇼핑"
                        }
                    }
                }else if( this.resultArr[1] == "smartPayLink" ) {
                    titleNm = "스마트페이 상품 보기"
                }
            }else if( this.resultArr[0] == "auto-service" ) {//경정비
                titleNm = "경정비 쇼핑"
                if( this.resultArr[1] == "search" ) {
                    titleNm = "경정비 검색결과"
                }else if( this.resultArr[1] == "enegine-oil" ) {
                    titleNm = "엔진오일 쇼핑"
                }else if( this.resultArr[1] == "battery" ) {
                    titleNm = "배터리 쇼핑"
                }else if( this.resultArr[1] == "filter" ) {
                    titleNm = "실내필터 쇼핑"
                }else if( this.resultArr[1] == "wiper" ) {
                    titleNm = "와이퍼 쇼핑"
                }else if( this.resultArr[1] == "product" ) {
                    titleNm = this.detailNm.ptrnNm
                }
            }else if( this.resultArr[0] == "membership" ) {//all my T
                titleNm = "나의 all my T"
                if( this.resultArr[1] == "dashboard" ) {
                    titleNm = "나의 all my T"
                    if( this.resultArr[2] == "benefit" ) {
                        titleNm = "all my T 혜택안내"
                    }else if( this.resultArr[2] == "membership_smartPay" ) {
                        titleNm = "스마트페이"
                    }else if( this.resultArr[2] == "membership_todayService" ) {
                        titleNm = "오늘서비스"
                    }else if( this.resultArr[2] == "membership_smartPickup" ) {
                        titleNm = "픽업서비스"
                    }else if( this.resultArr[2] == "membership_sundayService" ) {
                        titleNm = "휴일지킴 서비스"
                    }
                }else if( this.resultArr[1] == "reminding-alarm" ) {
                    titleNm = "점검/교체 알림"
                }else if( this.resultArr[1] == "smartCareDetail" ) {
                    titleNm = "점검/교체 서비스항목 상세"
                }
            }else if( this.resultArr[0] == "safeservice" ) {//안심서비스
                titleNm = "안심서비스"
                if( this.resultArr[1] == "ts" ) {
                    if( this.resultArr[2] == "lending" ) {
                        titleNm = "안심서비스"
                    }else if( this.resultArr[2] == "list" ) {
                        titleNm = "안심서비스 내역"
                    }else if( this.resultArr[2] == "lendingForm" ) {
                        titleNm = "안심서비스 가입신청"
                    }else if( this.resultArr[2] == "join" ) {
                        titleNm = "안심서비스 가입신청"
                    }
                }
            }else if( this.resultArr[0] == "store" ) {//매장
                titleNm = "매장"
                if( this.resultArr[1] == "locals" ) {
                    titleNm = "매장찾기"
                    if( this.resultArr[2] == "getShopVisitReserve" ) {
                        titleNm = "방문예약"
                        if( this.detailNm.shopNm != "" ) {
                            titleNm = "방문예약-" + this.detailNm.shopNm
                            if( this.detailNm.smartCareShopYn == "Y" ) {
                                titleNm = "방문예약-" + "all my T" + " " + this.detailNm.shopNm
                            }
                        } 
                    }else if( this.resultArr[2] == "saveReserveJson" ) {
                        titleNm = "방문예약 신청완료"
                    }else{
                        if( this.detailNm.shopNm != "" ) {
                            titleNm = this.detailNm.shopNm
                            if( this.detailNm.smartCareShopYn == "Y" ) {
                                titleNm = "all my T" + " " + this.detailNm.shopNm
                            }
                        } 
                    }
                }
            }else if( this.resultArr[0] == "deal" ) {//기획전
                if( this.resultArr[1] == "local" ) {
                    titleNm = "우리동네딜"
                }else{
                    titleNm = "특별기획전"
                    if( this.detailNm.dealNm != "" ) {
                        titleNm = this.detailNm.dealNm
                    }
                }
            }else if( this.resultArr[0] == "promotion" ) {//이벤트
                if( this.resultArr[1] == "event-list" ) {
                    titleNm = "진행 중인 이벤트"
                }else if( this.resultArr[1] == "past-event-list" ) {
                    titleNm = "지난 이벤트"
                }else{
                    titleNm = "이벤트 상세"
                    if( this.detailNm.evtNm != "" ) {
                        titleNm = this.detailNm.evtNm
                    }
                }
            }else if( this.resultArr[0] == "tam" ) {//알쓸타잡
                if( this.resultArr[1] == "tstation-tv" ) {
                    titleNm = "티스테이션TV"
                }else if( this.resultArr[1] == "tstation-tv-detail" ) {
                    titleNm = "티스테이션TV"
                }else if( this.resultArr[1] == "tire-info" ) {
                    titleNm = "타이어 정보"
                }else if( this.resultArr[1] == "tire-info-detail" ) {
                    titleNm = "타이어 정보"
                }else if( this.resultArr[1] == "tire-review" ) {
                    titleNm = "타이어 리뷰"
                }
            }else if( this.resultArr[0] == "cart" ) {//장바구니
                titleNm = "장바구니"
            }else if( this.resultArr[0] == "member" ) {//회원
                if( this.resultArr[1] == "login" ) {
                    titleNm = "로그인"
                }else if( this.resultArr[1] == "snslogin" ) {
                    titleNm = "간편로그인"
                }else if( this.resultArr[1] == "register" ) {
                    titleNm = "회원가입"
                    if( this.resultArr[2] == "join" ) {
                        titleNm = "회원가입"
                    }else if( this.resultArr[2] == "form" ) {
                        titleNm = "회원가입 정보입력"
                    }else if( this.resultArr[2] == "complete" ) {
                        titleNm = "회원가입 완료"
                    }else if( this.resultArr[2] == "aflcomplete" ) {
                        titleNm = "제휴회원가입 완료"
                    }else if( this.resultArr[2] == "unifiedMembers" ) {
                        titleNm = "통합회원 가입"
                        if( this.resultArr[3] == "redirect" ) {
                            titleNm = "통합회원 리다이렉트"
                        }
                    }else if( this.resultArr[2] == "unifiedMembersComplete" ) {
                        titleNm = "통합회원 완료"
                    }else if( this.resultArr[2] == "unifiedMembersProc" ) {
                        titleNm = "통합회원 가입"
                    }else if( this.resultArr[2] == "socialform" ) {
                        titleNm = "간편 회원가입"
                    }
                }else if( this.resultArr[1] == "find" ) {
                    if( this.resultArr[2] == "findid" ) {
                        titleNm = "아이디 찾기"
                    }else if( this.resultArr[2] == "findpwd" ) {
                        titleNm = "비밀번호 찾기"
                    }else if( this.resultArr[2] == "idAuthForm" ) {
                        titleNm = "인증번호 입력"
                    }else if( this.resultArr[2] == "pwdAuthForm" ) {
                        titleNm = "인증번호 입력"
                    }else if( this.resultArr[2] == "findIdList" ) {
                        titleNm = "아이디 찾기"
                    }else if( this.resultArr[2] == "sendAuthForId" ) {
                        titleNm = "본인인증"
                    }else if( this.resultArr[2] == "pwdchange" ) {
                        titleNm = "비밀번호 변경"
                    }else if( this.resultArr[2] == "sendauth" ) {
                        titleNm = "본인인증"
                    }else if( this.resultArr[2] == "pwdchangesuccess" ) {
                        titleNm = "비밀번호 변경 완료"
                    }
                }else if( this.resultArr[1] == "orderinquire" ) {
                    titleNm = "비회원 주문조회"
                }else if( this.resultArr[1] == "auth" ) {
                    titleNm = "본인인증"
                }else if( this.resultArr[1] == "redirectBiz" ) {
                    titleNm = "biz리다이렉트"
                }
            }else if( this.resultArr[0] == "customer-service" ) {//고객센터
                if( this.resultArr[1] == "main" ) {
                    titleNm = "고객센터"
                }else if( this.resultArr[1] == "announcement" ) {
                    titleNm = "공지사항"
                }else if( this.resultArr[1] == "qna" ) {
                    titleNm = "1:1 고객상담"
                }else if( this.resultArr[1] == "faq" ) {
                    titleNm = "FAQ"
                }else if( this.resultArr[1] == "warranty" ) {
                    titleNm = "무상보증서비스"
                }else if( this.resultArr[1] == "line-up" ) {
                    if( this.resultArr[2] == "type" ) {
                        titleNm = "한국타이어 차종별 상품안내"
                    }else if( this.resultArr[2] == "brand" ) {
                        titleNm = "한국타이어 브랜드별 상품안내"
                    }
                }else if( this.resultArr[1] == "tsservice" ) {
                    if( this.resultArr[2] == "servicetire" ) {
                        titleNm = "타이어 서비스 안내"
                    }else if( this.resultArr[2] == "serviceitem" ) {
                        titleNm = "경정비 서비스 안내"
                    }else if( this.resultArr[2] == "knowhowtire" ) {
                        titleNm = "타이어 관리 노하우"
                    }else if( this.resultArr[2] == "knowhowitem" ) {
                        titleNm = "경정비 관리 노하우"
                    }else if( this.resultArr[2] == "wagestime" ) {
                        titleNm = "표준 정비시간"
                    }
                }else if( this.resultArr[1] == "shopping-guide" ) {
                    titleNm = "쇼핑 가이드"
                }else if( this.resultArr[1] == "counsel" ) {
                    if( this.resultArr[2] == "C01" ) {
                        titleNm = "쇼핑 도우미"
                        if( this.resultArr[3] == "search" ) {
                            titleNm = "쇼핑 도우미 검색결과"
                        }
                    }else if( this.resultArr[2] == "C02" ) {
                        titleNm = "교체상담"
                        if( this.resultArr[3] == "search" ) {
                            titleNm = "교체상담 검색결과"
                        }
                    }else if( this.resultArr[2] == "C03" ) {
                        titleNm = "FAQ"
                        if( this.resultArr[3] == "search" ) {
                            titleNm = "FAQ 검색결과"
                        }
                    }else if( this.resultArr[2] == "detail" ) {
                        titleNm = "고객상담 상세"
                        if( this.resultArr[3] == "C01" ) {
                            titleNm = "쇼핑 도우미"
                        }else if( this.resultArr[3] == "C02" ) {
                            titleNm = "교체상담"
                        }else if( this.resultArr[3] == "C03" ) {
                            titleNm = "FAQ"
                        }
                    }
                }else if( this.resultArr[1] == "recruit" ) {
                    titleNm = "매장 근무인력 모집"
                }
            }else if( this.resultArr[0] == "mypage" ) {//마이페이지
                if( this.resultArr[1] == "dashboard" ) {
                    titleNm = "마이페이지"
                }else if( this.resultArr[1] == "tstation" ) {
                    if( this.resultArr[2] == "order-history" ) {
                        titleNm = "주문내역"
                    }else if( this.resultArr[2] == "return" ) {
                        titleNm = "주문취소내역"
                    }else if( this.resultArr[2] == "receipt" ) {
                        titleNm = "전자영수증 내역"
                    }else if( this.resultArr[2] == "reservation" ) {
                        if( this.resultArr[3] == "shopVisitReserveList" ) {
                            titleNm = "방문예약 내역"
                        }else if( this.resultArr[3] == "shopVisitReserveDetail" ) {
                            titleNm = "방문예약 상세"
                        }else if( this.resultArr[3] == "pickupList" ) {
                            titleNm = "픽업서비스 내역"
                        }else if( this.resultArr[3] == "pickupDetail" ) {
                            titleNm = "픽업서비스 상세"
                        }
                    }else if( this.resultArr[2] == "vstRsvCnt" ) {
                        titleNm = "방문예약 내역"
                    }else if( this.resultArr[2] == "custservice" ) {
                        if( this.resultArr[3] == "carservice-hist" ) {
                            titleNm = "매장서비스-정비서비스 이력"
                        }else if( this.resultArr[3] == "keepservice-hist" ) {
                            titleNm = "매장서비스-보관서비스 이력"
                        }else if( this.resultArr[3] == "carservice-hist-dtl" ) {
                            titleNm = "매장서비스내역"
                        }else if( this.resultArr[3] == "safeinsuarance-info" ) {
                            titleNm = "안심서비스내역"
                        }
                    }else if( this.resultArr[2] == "restock" ) {
                        titleNm = "재입고 알림"
                    }else if( this.resultArr[2] == "info" ) {
                        if( this.resultArr[3] == "myshopInfo" ) {
                            titleNm = "단골매장"
                        }
                    }else if( this.resultArr[2] == "coupon" ) {
                        titleNm = "쿠폰함"
                        if( this.resultArr[3] == "couponList" ) {
                            titleNm = "쿠폰함"
                        }else if( this.resultArr[3] == "couponReg" ) {
                            titleNm = "쿠폰등록"
                        }else if( this.resultArr[3] == "pastCouponlist" ) {
                            titleNm = "지난쿠폰"
                        }else if( this.resultArr[3] == "myPastCouponList" ) {
                            titleNm = "지난쿠폰"
                        }else if( this.resultArr[3] == "detail" ) {
                            titleNm = "쿠폰상세"
                        }
                    }else if( this.resultArr[2] == "warranty" ) {
                        titleNm = "나의 워런티"
                    }
                }else if( this.resultArr[1] == "activity" ) {
                    if( this.resultArr[2] == "qna" ) {
                        titleNm = "1:1상담 내역"
                    }else if( this.resultArr[2] == "goods-review" ) {
                        titleNm = "상품평작성"
                    }else if( this.resultArr[2] == "compare-goodshist" ) {
                        titleNm = "상품비교내역"
                    }
                }else if( this.resultArr[1] == "promotion" ) {
                    titleNm = "이벤트 응모내역"
                }else if( this.resultArr[1] == "info" ) {
                    if( this.resultArr[2] == "memberconfirm" ) {
                        titleNm = "개인정보관리"
                    }else if( this.resultArr[2] == "memberdetail" ) {
                        titleNm = "개인정보관리"
                    }else if( this.resultArr[2] == "memberout" ) {
                        titleNm = "회원탈퇴"
                    }
                }else if( this.resultArr[1] == "auto-care" ) {
                    if( this.resultArr[2] == "carmgmt" ) {
                        titleNm = "내 차 관리"
                        if( this.resultArr[3] == "reg" ) {
                            titleNm = "차량 등록하기"
                        }else if( this.resultArr[3] == "car-auth" ) {
                            titleNm = "차량 인증하기"
                        }
                    }
                }else if( this.resultArr[1] == "tireTest" ) {
                    titleNm = "타이어 마모도 측정 서비스"
                    if( this.resultArr[2] == "tireCheckResultList" ) {
                        titleNm = "타이어 마모도 측정 이력"
                    }
                }else if( this.resultArr[1] == "memberoutaction" ) {
                    titleNm = "회원탈퇴"
                }
            }else if( this.resultArr[0] == "coupon" ) {//쿠폰
                if( this.resultArr[1] == "couponList" ) {
                    titleNm = "쿠폰함"
                }else if( this.resultArr[1] == "couponReg" ) {
                    titleNm = "쿠폰등록"
                }else if( this.resultArr[1] == "regCoupon" ) {
                    titleNm = "쿠폰등록"
                }else if( this.resultArr[1] == "pastCouponlist" ) {
                    titleNm = "지난쿠폰"
                }else if( this.resultArr[1] == "myCouponList" ) {
                    titleNm = "내 쿠폰"
                }else if( this.resultArr[1] == "myPastCouponList" ) {
                    titleNm = "지난쿠폰"
                }
            }else if( this.resultArr[0] == "order" ) {//주문
                titleNm = "주문/결제"
                if( this.resultArr[1] == "getOrderFormV2" ) {
                    titleNm = "주문/결제"
                }else if( this.resultArr[1] == "getSvcChocForm" ) {
                    titleNm = "서비스 선택"
                }else if( this.resultArr[1] == "getOrderForm" ) {
                    titleNm = "주문/결제"
                }else if( this.resultArr[1] == "getOrderComplete" ) {
                    titleNm = "주문완료"
                }else if( this.resultArr[1] == "smartToday" ) {
                    titleNm = "오늘서비스로 쇼핑"
                }else if( this.resultArr[1] == "smartPickup" ) {
                    titleNm = "픽업서비스로 쇼핑"
                }
            }else if( this.resultArr[0] == "terms" ) {//이용약관
                titleNm = "이용약관"
            }else if( this.resultArr[0] == "research" ) {//설문조사
                titleNm = "설문조사"
            }else if( this.resultArr[0] == "warranty" ) {//워런티
                titleNm = "워런티 안내"
                if( this.resultArr[1] == "tgtTire" ) {
                    titleNm = "워런티 대상 타이어"
                }
            }else{//지정된 페이지 X
                titleNm = this.catchphrase
                descriptionStr = this.description
            }
        }

        if( titleNm != "" ) {
            if( titleNm != this.catchphrase ) {
                titleNm = titleNm + " | " + this.title;
            }
        }

        // return titleNm;
        return {titleNm, descriptionStr}
    },
};