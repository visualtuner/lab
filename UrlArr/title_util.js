var TitleUtil = {
		
    title : "티스테이션",
    deptLen: 0,
    resultArr:[],
    detailNm: {},
    init : function(option) {
        this.getPageDept();
    },
    
    getPageDept : function() {
        var titleThisUrl = location.href;
        var baseUrl = _baseUrl;
        
        titleThisUrl = titleThisUrl.replace(baseUrl, "");
        titleThisUrl = "/"+titleThisUrl;
        
        var indexCk = titleThisUrl.indexOf("/");
        
        if( indexCk > -1 ){
            var results = titleThisUrl.match(/\//g);
            this.deptLen = results.length;
        }
        
        var url = /([\w-]+)/gi;
        var result = titleThisUrl.match(url);
        this.resultArr = result;
        
        var title = ""; 

        title = this.getTitleNm();
        
        if( title == "" ){
            title = this.title;
        }
        
        $(document).find("title").text(title);
        
    },

    getTitleNm : function() {

        var titleNm = "";

        if( this.resultArr == null ) {
            titleNm = "티스테이션 | 타이어쇼핑과 차량관리를 한번에!"
        }else{
            if( this.resultArr[0] == "tire" ) {//타이어
                if( this.resultArr[1] == "auto-brands" ) {
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
                    titleNm = this.detailNm.ptrnNm
                }
            }else if( this.resultArr[0] == "auto-service" ) {//경정비
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
                    }else if( this.resultArr[2] == "saveReserveJson" ){
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
                }else if( this.resultArr[1] == "register" ) {
                    if( this.resultArr[2] == "join" ) {
                        titleNm = "회원가입"
                    }else if( this.resultArr[2] == "form" ) {
                        titleNm = "회원가입 정보입력"
                    }
                }else if( this.resultArr[1] == "find" ) {
                    if( this.resultArr[2] == "findid" ) {
                        titleNm = "아이디 찾기"
                    }else if( this.resultArr[2] == "findpwd" ) {
                        titleNm = "비밀번호 찾기"
                    }
                }else if( this.resultArr[1] == "orderinquire" ) {
                    titleNm = "비회원 주문조회"
                }
            }else if( this.resultArr[0] == "customer-service" ) {//고객센터
                if( this.resultArr[1] == "main" ) {
                    titleNm = "고객센터"
                }else if( this.resultArr[1] == "announcement" ) {
                    titleNm = "공지사항"
                }else if( this.resultArr[1] == "qna" ) {
                    titleNm = "1:1 고객상담"
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
                    }
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
                        }else if( this.resultArr[3] == "pickupList" ) {
                            titleNm = "픽업서비스 내역"
                        }
                    }else if( this.resultArr[2] == "custservice" ) {
                        if( this.resultArr[3] == "carservice-hist" ) {
                            titleNm = "매장서비스-정비서비스 이력"
                        }else if( this.resultArr[3] == "keepservice-hist" ) {
                            titleNm = "매장서비스-보관서비스 이력"
                        }
                    }else if( this.resultArr[2] == "restock" ) {
                        titleNm = "재입고 알림"
                    }else if( this.resultArr[2] == "info" ) {
                        if( this.resultArr[3] == "myshopInfo" ) {
                            titleNm = "단골매장"
                        }
                    }else if( this.resultArr[2] == "coupon" ) {
                        if( this.resultArr[3] == "couponList" ) {
                            titleNm = "쿠폰함"
                        }else if( this.resultArr[3] == "couponReg" ) {
                            titleNm = "쿠폰등록"
                        }else if( this.resultArr[3] == "pastCouponlist" ) {
                            titleNm = "지난쿠폰"
                        }
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
                }
            }else if( this.resultArr[0] == "coupon" ) {//쿠폰
                if( this.resultArr[1] == "couponList" ) {
                    titleNm = "쿠폰함"
                }else if( this.resultArr[1] == "couponReg" ) {
                    titleNm = "쿠폰등록"
                }else if( this.resultArr[1] == "pastCouponlist" ) {
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
            }else{//지정된 페이지 X
                titleNm = "티스테이션 | 타이어쇼핑과 차량관리를 한번에!"
            }
        }

        if( titleNm != "" ){
            titleNm = titleNm + " | " + this.title;
        }

        return titleNm;
    },
};