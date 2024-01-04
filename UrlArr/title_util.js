let TitleUtil = {
		
    title : "티스테이션",
    catchphrase : "티스테이션 | 타이어쇼핑과 차량관리를 한번에!",
    description: "가입만 해도 누리는 all my T 회원혜택! 내차관리부터 타이어쇼핑까지 가능한 한국타이어 공식 온라인몰",
    deptLen : 0,
    resultArr :[],
    detailNm : {},
    init : function(option) {
        this.getPageDept();
    },
    
    getPageDept : function() {
        //let titleThisUrl = location.href;
        let titleThisUrl = "https://m.tstation.com/tire/sizes?carKndNm=e";

        let baseUrl = _baseUrl;
        
        titleThisUrl = titleThisUrl.replace(baseUrl, "");
        titleThisUrl = "/"+titleThisUrl;
        
        let indexCk = titleThisUrl.indexOf("/");
        
        if( indexCk > -1 ) {
            let results = titleThisUrl.match(/\//g);
            this.deptLen = results.length;
        }
        
        let url = /([\w-*%()+]+)/gi;
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
                if( this.resultArr[1] == "sizes" ) {
                    titleNm = "타이어 쇼핑"
                    descriptionStr = "한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 수입 타이어 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 타이어 구매부터 장착까지."
                    if( this.resultArr[2] == "brandCd" ) {
                        if( this.resultArr[3] == "hk" ) {
                            titleNm = "한국타이어 쇼핑"
                            descriptionStr = "한국타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "lf" ) {
                            titleNm = "라우펜타이어 쇼핑"
                            descriptionStr = "라우펜타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "bs" ) {
                            titleNm = "브리지스톤타이어 쇼핑"
                            descriptionStr = "브리지스톤타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "pi" ) {
                            titleNm = "피렐리타이어 쇼핑"
                            descriptionStr = "피렐리타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "mx" ) {
                            titleNm = "맥시스타이어 쇼핑"
                            descriptionStr = "맥시스타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "mc" ) {
                            titleNm = "미쉐린타이어 쇼핑"
                            descriptionStr = "미쉐린타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "ct" ) {
                            titleNm = "콘티넨탈타이어 쇼핑"
                            descriptionStr = "콘티넨탈타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "gy" ) {
                            titleNm = "굿이어타이어 쇼핑"
                            descriptionStr = "굿이어타이어 프리미엄/스탠다드/이코노미 등급별 추천과 가격·성능 비교! 승용차/SUV/전기차 차종별 타이어 구매부터 장착까지."
                        }
                    }else if( this.resultArr[2] == "carKndNm" ) {
                        if( this.resultArr[3] == "p" ) {
                            titleNm = "승용차/세단 타이어 쇼핑"
                            descriptionStr = "승용차 타이어, 대형·준대형·중형·준중형·소형 세단 타이어, 경차 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "RV/SUV/CUV 타이어 쇼핑"
                            descriptionStr = "RV, SUV, CUV, 오프로드 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "lt" ) {
                            titleNm = "VAN/미니밴/소형트럭/경트럭 타이어 쇼핑"
                            descriptionStr = "VAN, 미니밴, 소형트럭, 경트럭 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "e" ) {
                            titleNm = "전기차/EV 타이어 쇼핑"
                            descriptionStr = "전기차 EV 전용 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }
                    }else if( this.resultArr[2] == "seasonNm" ) {
                        if( this.resultArr[3] == "w" ) {
                            titleNm = "겨울용/스노우/윈터 타이어 쇼핑"
                            descriptionStr = "겨울용 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 타이어 보관 서비스. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "여름용 타이어 쇼핑"
                            descriptionStr = "여름용 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "as" ) {
                            titleNm = "사계절용 올시즌 타이어 쇼핑"
                            descriptionStr = "사계절용 올시즌 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "aw" ) {
                            titleNm = "모든 날씨용 올웨더 타이어 쇼핑"
                            descriptionStr = "모든 날씨용 올웨더 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }
                    }else if( this.resultArr[2] == "gradeNm" ) {
                        if( this.resultArr[3] == "p" ) {
                            titleNm = "고성능 프리미엄 타이어 쇼핑"
                            descriptionStr = "한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 프리미엄 등급 타이어 추천과 가격·성능 비교! 승용차/SUV/전기차 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "스탠다드 타이어 쇼핑"
                            descriptionStr = "한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 스탠다드 등급 타이어 추천과 가격·성능 비교! 승용차/SUV/전기차 타이어 구매부터 장착까지."
                        }else if( this.resultArr[3] == "e" ) {
                            titleNm = "가성비 이코노미 타이어 쇼핑"
                            descriptionStr = "한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 이코노미 등급 타이어 추천과 가격·성능 비교! 승용차/SUV/전기차 타이어 구매부터 장착까지."
                        }
                    }else if( this.resultArr[2] == "performanceNm" ) {
                        if( this.resultArr[3] == "c" ) {
                            titleNm = "저소음/승차감/컴포트 타이어 쇼핑"
                            descriptionStr = "편안하고 정숙한 승차감을 제공하는 컴포트 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "s" ) {
                            titleNm = "고속/제동성/스포츠 타이어 쇼핑"
                            descriptionStr = "고속, 제동성 중심의 퍼포먼스 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "rf" ) {
                            titleNm = "런플랫 타이어 쇼핑"
                            descriptionStr = "펑크가 났을 때도 일정 거리, 일정 속도 내에서 주행이 가능한 런플랫 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }else if( this.resultArr[3] == "sa" ) {
                            titleNm = "흡음재/소음저감 타이어 쇼핑"
                            descriptionStr = "흡음재 타이어 추천과 가격·성능 비교, 구매부터 장착까지. 한국타이어, 라우펜, 미쉐린, 콘티넨탈, 브리지스톤, 피렐리, 굿이어, 맥시스 등 원하는 타이어가 다 있는 곳. 티스테이션"
                        }
                    }
                }else if( this.resultArr[1] == "product" ) {
                    if( this.getMetaInfo( this.resultArr[2] ).valid ) {
                        titleNm = this.getMetaInfo( this.resultArr[2] ).title;
                        descriptionStr = this.getMetaInfo( this.resultArr[2] ).description;
                    }else{
                        titleNm = (this.detailNm.ptrnNm != "") ? this.detailNm.ptrnNm : this.detailNm.goodsNm;
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

        return {titleNm, descriptionStr}
    },

    getMetaInfo : function(prodName) {
        let title;
        let description;
        let valid = false;
        let found = this.metaInfo.find(e => e.patternPath === prodName);

        if( found != undefined) {
            valid = true;
            title = found.title;
            description = found.description;
        }else{
            valid = false;
        }

        return {valid, title, description}
    },

    metaInfo: [
        {
            "patternPath": "dynapro_hpx",
            "title": "다이나프로 프리미엄 컴포트(dynapro hpx) | 한국타이어",
            "description": "다이나프로 프리미엄 컴포트 타이어. 최고의 핸들링을 제공하는 SUV 전용 올웨더 전용 타이어로 업그레이드된 승차감과 정숙성을 제공합니다. 쏘렌토, 싼타페, 카니발 타이어 교체"
        },
        {
            "patternPath": "ventus_s2_as",
            "title": "벤투스 프리미엄 컴포트(ventus s2 as) | 한국타이어",
            "description": "벤투스 프리미엄 컴포트 타이어. 고속주행시에도 편안함과 정숙성을 제공하며, 젖은노면 주행시에도 안정성이 강화되었습니다. 그랜저, 제네시스 G80, 벤츠 E클래스 타이어 교체"
        },
        {
            "patternPath": "ventus_v2_as",
            "title": "벤투스 컴포트(ventus v2 as) | 한국타이어",
            "description": "벤투스 컴포트 타이어. 편안한 승차감을 느낄 수 있는 패밀리 승용차 타이어로 정숙성, 저소음 성능이 강화되었습니다. 그랜저, K7, 아반떼 타이어 교체"
        },
        {
            "patternPath": "ion_evo_as",
            "title": "아이온 스포츠 올시즌(ion evo as) | 한국타이어",
            "description": "아이온 스포츠 올시즌 타이어. 전기차 전용 올웨더 승용차 타이어로 전비효율을 통한 주행거리 향상되었고, 안정적인 핸들링과 저소음을 구현하였습니다. 테슬라, 넥소 타이어 교체"
        },
        {
            "patternPath": "ion_evo_as_suv",
            "title": "아이온 스포츠 올시즌(ion evo as suv) | 한국타이어",
            "description": "아이온 스포츠 올시즌 SUV타이어. 전기차 전용 사계절 SUV 타이어로 전비효율을 통한 주행거리 향상되었고, 안정적인 핸들링과 저소음을 구현하였습니다. 아이오닉S, EV6, 테슬라 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_evo_z_as",
            "title": "벤투스 슈퍼 스포츠 올시즌(ventus s1 evo z as) | 한국타이어",
            "description": "벤투스 슈퍼 스포츠 올시즌 타이어. 초고성능 사계절 타이어로 핸들링과 정숙성까지 최적화된 퍼모먼스 타이이 입니다. 제네시스 G80, 벤츠 E클래스, S클래스 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_evo_z_as_x",
            "title": "벤투스 슈퍼 스포츠 올시즌(ventus s1 evo z as x) | 한국타이어",
            "description": "벤투스 슈퍼 스포츠 올시즌 SUV타이어. 초고성능 올웨더 타이어로 핸들링과 정숙성까지 최적화된 올라운더 타이이 입니다. BMW X5, 쏘렌토, 제네시스 GV80 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_noble2",
            "title": "벤투스 컴포트(ventus s1 noble2) | 한국타이어",
            "description": "벤투스 컴포트 타이어, 다양한 노면에서의 안정적인 핸들링과 승차감과 연비 향상 효과를 제공하는 프리미엄 타이어 입니다. 그랜저, 펠리세이드, K7 타이어 교체"
        },
        {
            "patternPath": "ventus_s2_as_x",
            "title": "벤투스 프리미엄 컴포트(ventus s2 as x) | 한국타이어",
            "description": "벤투스 프리미엄 컴포트 SUV타이어. 최고의 승차감과 탁월한 정숙성을 제공하는 프리미엄 SUV 타이어 입니다. 스포티지, 쏘렌토, BMW X3 타이어 교체"
        },
        {
            "patternPath": "ion_evo",
            "title": "아이온 스포츠(ion evo) | 한국타이어",
            "description": "아이온 스포츠 타이어. 전기차 특화 기술로 완성된 전기차 전용 타이어로 뛰어난 접지력과 핸들링을 제공합니다. 아우디 E-트론 GT, 포르쉐 타이칸, 테슬라 모델 S 타이어 교체"
        },
        {
            "patternPath": "ion_evo_suv",
            "title": "아이온 스포츠(ion evo suv) | 한국타이어",
            "description": "아이온 스포츠 SUV 타이어. 전기차 특화 기술로 완성된 전기차 전용 SUV 타이어로 전비효율을 통한 주행거리 향상 및 뛰어난 접지력과 핸들링을 제공합니다. 아우디 A7 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_evo_z",
            "title": "벤투스 슈퍼 스포츠(ventus s1 evo z) | 한국타이어",
            "description": "벤투스 슈퍼 스포츠 타이어. 극대화된 제동력 및 강력한 핸들링을 제공하며 고속주행 시 안정성을 제공합니다. 벤츠 A클래스, 벤츠 EQ5, 아반떼, 포르쉐 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_evo3",
            "title": "벤투스 프리미엄 스포츠(ventus s1 evo3) | 한국타이어",
            "description": "벤투스 프리미엄 스포츠 타이어. 유럽 명차가 선택한 고성능 스포츠 타이어로 최고의 접지력을 통해 뛰어난 컨트롤를 제공합니다. 벤츠 S클래스, 벤츠 Ez클래스, 벤츠 CLS 타이어 교체"
        },
        {
            "patternPath": "ventus_s1_evo3_suv",
            "title": "벤투스 프리미엄 스포츠(ventus s1 evo3 suv) | 한국타이어",
            "description": "벤투스 프리미엄 스포츠 SUV타이어. SUV 전용 고성능 스포츠 타이어로 최고의 접지력을 통해 뛰어난 컨트롤를 제공합니다. 벤츠 GLE, BMW X5, 벤츠 GLC 타이어 교체"
        },
        {
            "patternPath": "ventus_v12_evo2",
            "title": "벤투스 스포츠(ventus v12 evo2) | 한국타이어",
            "description": "벤투스 스포츠 타이어. 레이싱 타이어 프로파일을 적용한 타이어로 마르거나 젖은 노면 상관없이 향상된 제동력을 제공합니다. 벤츠 CLS, 벤츠 E클래스, BMW 3시리즈 타이어 교체"
        },
        {
            "patternPath": "ventus_rs4",
            "title": "벤투스 레이싱(ventus rs4) | 한국타이어",
            "description": "벤투스 레이싱 타이어. 레이싱 매니아를 위한 퍼모먼스 타이어로 코너링 주행 및 조종 응답성이 향상된 그립을 가진 타이어 입니다. BMW M4, 포르쉐 911 타이어 교체"
        },
        {
            "patternPath": "winter_i*cept_ion",
            "title": "아이온 윈터(winter i*cept ion) | 한국타이어",
            "description": "아이온 윈터 타이어. 전기차 특화 기술로 완성된 전기차 전용 윈터 타이어로 겨울철에도 뛰어난 접지력과 핸들링을 제공하며, 타이어 회전저항을 줄여 주행거리는 더 길어졌습니다."
        },
        {
            "patternPath": "winter_i*cept_ion_x",
            "title": "아이온 윈터(winter i*cept ion x) | 한국타이어",
            "description": "아이온 윈터 SUV타이어. 전기차 특화 기술로 완성된 전기차 전용 윈터 SUV 타이어로 겨울철에도 뛰어난 접지력과 핸들링을 제공합니다.  EV6, 테슬라 모델 Y, 폭스바겐 ID4 타이어 교체"
        },
        {
            "patternPath": "winter_i*cept_evo3",
            "title": "윈터아이셉트 프리미엄(winter i*cept evo3) | 한국타이어",
            "description": "윈터아이셉트 프리미엄 윈터 타이어. 유럽에서 인정받은 겨울철 고성능 퍼모먼스 타이어로 최상의 브레이킹 보장으로 안전한 주행이 가능합니다. 그랜저, BMW 3시리즈, 5시리즈 타이어 교체"
        },
        {
            "patternPath": "winter_i*cept_evo3_x",
            "title": "윈터아이셉트 프리미엄(winter i*cept evo3 x) | 한국타이어",
            "description": "윈터아이셉트 프리미엄 윈터 SUV타이어. 겨울철 고성능 퍼모먼스 SUV 타이어로 최상의 브레이킹 보장으로 안전한 주행이 가능합니다. 쏘렌토, 싼타페, 봉고 타이어 교체"
        },
        {
            "patternPath": "winter_i*cept_rs3",
            "title": "Winter I* cept RS3 | 한국타이어",
            "description": "Winter I* cept RS3 타이어. 겨울철 안전을 책임지는 최고의 프리미엄 타이어입니다. 아반떼, 쏘나타, BMW 3시리즈 타이어 교체"
        },
        {
            "patternPath": "kinergy_st_as",
            "title": "키너지 컴포트(kinergy st as) | 한국타이어",
            "description": "키너지 컴포트 타이어. 완벽을 추구하는 올웨더 밸런스 타이어로 사계절 내내 좋은 주행을 책임지는 타이어입니다. 아반떼, 그랜저, 모닝 타이어 교체"
        },
        {
            "patternPath": "ion_st_as_suv",
            "title": "아이온 컴포트 올시즌(ion st as suv) | 한국타이어",
            "description": "아이온 컴포트 올시즌 SUV타이어. 전기차 전용 롱 마일리지 SUV타이어로 배터리 전비 업그레이드, 타이어 소음 최소화, 편안한 승차감을 제공합니다. 아이오닉5, EV6, 카니발 타이어 교체"
        },
        {
            "patternPath": "dynapro_hl3",
            "title": "다이나프로 컴포트(dynapro hl3) | 한국타이어",
            "description": "다이나프로 컴포트 SUV타이어. 조용하고 안정적인 승차감을 제공하는 완벽한 밸런스를 갖춘 SUV 타이어 입니다. 싼타페, 카니발, 스포치지 타이어 교체"
        },
        {
            "patternPath": "kinergy_ex",
            "title": "키너지 컴포트(kinergy ex) | 한국타이어",
            "description": "키너지 컴포트 타이어. 매일매일 운전하는 운전자를 위한 밸런스 타이어로 불필요한 진동 흡수 및 저소음을 실현한 타이어입니다. 아반떼, 모닝, 쏘나타 타이어 교체"
        },
        {
            "patternPath": "kinergy_as_ev",
            "title": "키너지 EV(kinergy as ev) | 한국타이어",
            "description": "키너지 EV 타이어. 밸런스 전기차 타이어로 저소음주행, 고하중 차량의 주행성능 향상, 지지능력을 향상시킨 타이어입니다. 니로, 코나, 쏘나타 타이어 교체"
        },
        {
            "patternPath": "radial_ra08",
            "title": "Radial RA08 | 한국타이어",
            "description": "Radial RA08 타이어. 제동력이 향상된 소형 트럭용 레디얼 타이어로 우수한 내마모성 및 견인력을 제공합니다. 포터, 스타렉스, 봉고, 화물차 타이어 교체"
        },
        {
            "patternPath": "vantra_dt",
            "title": "Vantra DT | 한국타이어",
            "description": "Vantra DT 타이어. 티스테이션에서 만날 수 있는 소형 트럭 타이어로 유명한 가성비 타이어 입니다. 포터, 봉고, 라보, 화물차 타이어 교체, 벤트라 타이어 추천"
        },
        {
            "patternPath": "vantra_lt",
            "title": "Vantra LT | 한국타이어",
            "description": "Vantra LT 타이어. 내구성과 안정성이 향상된 소형트럭용 전륜, 후륜 타이어 입니다. 포터, 스타렉스, 봉고, 화물차 타이어 교체, 벤트라 타이어 추천"
        },
        {
            "patternPath": "dynapro_at2",
            "title": "다이나프로 올 터레인(dynapro at2) | 한국타이어",
            "description": "다이나프로 올 터레인 타이어. 오프로드, 온로드 등 모든 도로에 최적화된 전천후 SUV 타이어로 안정성과 저소음을 제공합니다. 렉스턴스포츠, 모하비, 렉스턴 타이어 교체"
        },
        {
            "patternPath": "dynapro_hp2",
            "title": "다이나프로 컴포트(dynapro hp2) | 한국타이어",
            "description": "다이나프로 컴포트 타이어. SUV용 순정 타이어로 탁월한 정숙감과 최적의 핸들링 성능, 뛰어난 배수성능을 제공합니다. 싼타페, 쏘렌토, 카니발 타이어 교체"
        },
        {
            "patternPath": "kinergy_4s_2",
            "title": "키너지 올 웨더(kinergy 4s 2) | 한국타이어",
            "description": "키너지 올 웨더 타이어. 빗길, 눈길에 안정성을 제공하는 올웨더 타이어로 경차에서 중형 승용차에 추천하는 타이어입니다. 아반떼, 그랜저, 스파크 타이어 교체"
        },
        {
            "patternPath": "kinergy_4s2_x",
            "title": "키너지 올 웨더(kinergy 4s2 x) | 한국타이어",
            "description": "키너지 올 웨더 타이어. 빗길, 눈길에 안정성을 제공하는 올웨더 SUV 타이어로 중형에서 중대형 SUV에 추천하는 타이어입니다. 산타페, 카니발, 쏘렌토 타이어 교체"
        },
        {
            "patternPath": "kinergy_gt",
            "title": "키너지 컴포트 (kinergy gt) | 한국타이어",
            "description": "키너지 컴포트  타이어. 승용 순정 타이어로 최적화된 안정성 및 핸들링 성능과 최고의 마일리지 성늘을 제공합니다. 아반떼, 그랜저, 쏘나타 타이어 교체"
        },
        {
            "patternPath": "optimo_h724",
            "title": "Optimo H724 | 한국타이어",
            "description": "Optimo H724 타이어. 타이어의 스탠다드 옵티모 H724 타이어는 경차 운행 시 더 나은 승차감 및 저소음 성능을 제공합니다. 모닝, 레이, 스파크 타이어 교체"
        },
        {
            "patternPath": "dynapro_hp",
            "title": "다이나프로 컴포트(dynapro hp) | 한국타이어",
            "description": "다이나프로 컴포트 타이어. SUV용 순정 타이어로 탁월한 정숙감과 최적의 핸들링 성능, 뛰어난 배수성능을 제공합니다. 코란도투리스모, 스타렉스, 로디우스 타이어 교체"
        },
        {
            "patternPath": "ventus_prime2",
            "title": "벤투스 프리미엄 컴포트(ventus prime2) | 한국타이어",
            "description": "벤투스 프리미엄 컴포트 타이어. 고급형 밸런스 썸머 타이어로 승차감, 핸들링, 연비 등 균형잡힌 성능을 제공합니다. 미니쿠페, 미니해치, SM3 타이어 교체"
        },
        {
            "patternPath": "radial_au01",
            "title": "Radial AU01 | 한국타이어",
            "description": "Radial AU01 타이어. 견인력이 강화된 소형트럭용 레디얼 타이어로 모든 도로 조건에서 최급의 그립감을 제공합니다. 봉고, 트럭 타이어 교체"
        },
        {
            "patternPath": "nordik_rw05",
            "title": "Nordik RW05 | 한국타이어",
            "description": "Nordik RW05 타이어. 겨울철 눈길 성능을 향상시킨 소형트럭, 승합차용 윈터 타이어로 눈길 운행 시 안정성 및 부드러운 승차감을 제공합니다. 스타렉스, 르노마스터 타이어 교체"
        },
        {
            "patternPath": "winter_i*pike_x",
            "title": "Winter I* pike X | 한국타이어",
            "description": "Winter I* pike X 타이어. 겨울철 눈길, 빙판에서도 안정적인 드라이빙이 가능한 프리미엄 윈터(스노우) 타이어입니다. 한국타이어 추천"
        },
        {
            "patternPath": "optimo_h426(%EC%98%A8%EB%9D%BC%EC%9D%B8_%EC%A0%84%EC%9A%A9%EC%83%81%ED%92%88)",
            "title": "Optimo H426(온라인 전용상품) | 한국타이어",
            "description": "Optimo H426  타이어. 티스테이션 온라인 전용 상품으로 저소음 승차감 타이어로 균형잡힌 성능을 제공합니다. 액센트, BMW 3시리즈, 그랜저 타이어 교체"
        },
        {
            "patternPath": "mileage_plus3",
            "title": "Mileage Plus3 | 한국타이어",
            "description": "Mileage Plus3 타이어. 최고의 마일리지와 승차감을 제공하여 타이어의 교체 주기를 연장한 가성비 타이어로 경제적입니다. 쏘나타, K5, 그랜저 타이어 교체"
        },
        {
            "patternPath": "g_fit_as",
            "title": "G FIT as | 라우펜타이어",
            "description": "G FIT as 타이어. 롱 마일리지를 위한 제동 성능과 마모를 개선한 타이어로 효율적인 배수성을 제공합니다. 아반떼, 모닝, 쏘나타 타이어교체, Laufenn 타이어 추천"
        },
        {
            "patternPath": "s_fit_as",
            "title": "S FIT aS | 라우펜타이어",
            "description": "S FIT aS 타이어. 고속주행을 지원하는 컴포트 타이어로 주행소음을 분산하여 저소음을 실현합니다. 그랜저, 아반떼 쏘나타 타이어교체, Laufenn 타이어 추천"
        },
        {
            "patternPath": "x_fit_ht",
            "title": "X FIT HT | 라우펜타이어",
            "description": "X FIT HT 타이어. 승차감과 조종 안정성을 겸비한 SUV 타이어로 편안한 승참감을 제공합니다. 싼타페, 쏘렌토, 카니발 타이어교체, Laufenn 타이어 추천"
        },
        {
            "patternPath": "bridgestone_el400",
            "title": "Bridgestone EL400 | 브리지스톤타이어",
            "description": "Bridgestone EL400 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 브릿지스톤 타이어입니다. 렉서스 ES, 말리부 타이어 교체"
        },
        {
            "patternPath": "bridgestone_el440",
            "title": "Bridgestone EL440 | 브리지스톤타이어",
            "description": "Bridgestone EL440 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 브릿지스톤 프리미엄 타이어입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_el450",
            "title": "Bridgestone EL450 | 브리지스톤타이어",
            "description": "Bridgestone EL450 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 브릿지스톤 프리미엄 타이어입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_re97a",
            "title": "Bridgestone RE97A | 브리지스톤타이어",
            "description": "Bridgestone RE97A 타이어. 티스테이션에서 만날수 있는 최고의 성능과 함께하는 스포츠 OE타이어 입니다. 제네시스 G70 타이어교체, 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_alenza_001",
            "title": "Bridgestone ALENZA 001 | 브리지스톤타이어",
            "description": "Bridgestone ALENZA 001 타이어. 티스테이션에서 만날수 있는 가장 편안하고 최고 성능을 제공하는 브릿스톤 프리미엄 타이어입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_d400",
            "title": "Bridgestone D400 | 브리지스톤타이어",
            "description": "Bridgestone D400 타이어. 스포티감을 만끽할 수 있는 고성능 프리미엄 SUV 타이어 입니다. BMW X3, 싼타페, 맥스크루즈 타이어 교체,  브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_dhps",
            "title": "Bridgestone DHPS | 브리지스톤타이어",
            "description": "Bridgestone DHPS 타이어. 스포티감을 만끽할 수 있는 고성능 프리미엄 SUV 타이어 입니다. 볼보 V60, 펠리세이드 타이어 교체,  브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_ep422",
            "title": "Bridgestone EP422 | 브리지스톤타이어",
            "description": "Bridgestone EP422 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 프리미엄 타이어 입니다. 프리우스 타이어 교체, 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_ep500",
            "title": "Bridgestone EP500 | 브리지스톤타이어",
            "description": "Bridgestone EP500 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 프리미엄 타이어 입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_fs_f140",
            "title": "Bridgestone FS F140 | 브리지스톤타이어",
            "description": "Bridgestone FS F140 타이어. 티스테이션에서 만날수 있는 가성비가 뛰어난 브리지스톤 OE 타이어 입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_s001(es1z)",
            "title": "Bridgestone S001(ES1Z)| 브리지스톤타이어",
            "description": "Bridgestone S001(ES1Z) 타이어. 티스테이션에서 만날수 있는 최고의 성능과 함께하는 최고급 스포츠브리지스톤 OE 타이어 입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_t001",
            "title": "Bridgestone T001 | 브리지스톤타이어",
            "description": "Bridgestone T001 타이어. 티스테이션에서 만날수 있는 뛰어난 승차감과 정숙성을 가진 고성능 프리미엄 타이어 입니다. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "bridgestone_t005",
            "title": "Bridgestone T005 | 브리지스톤타이어",
            "description": "Bridgestone T005 타이어. 뛰어난 승차감과 정숙성을 가진 고성능 프리미엄 타이어 입니다. 아우디 A6, 벤츠 S클래스, BMW 5시리즈 타이어 교체, 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "ecopia_ep300",
            "title": "ECOPIA EP300 | 브리지스톤타이어",
            "description": "ECOPIA EP300 타이어. 탁월한 연비절감, 젖은 노면에서의 제동성능, 향상된 수명을 제공하는 올웨더 타이어입니다. 쏘나타, E클래스, G80 사계절용 타이어 교체"
        },
        {
            "patternPath": "bridgestone_serenity_plus",
            "title": "Bridgestone Serenity Plus | 브리지스톤타이어",
            "description": "Bridgestone Serenity Plus 타이어. 6만km의 마일리지를 자랑하는 올웨더용 투어링 타이어입니다. 브릿지스톤 가성비 타이어 교체"
        },
        {
            "patternPath": "bridgestone_re004",
            "title": "Bridgestone RE004 | 브리지스톤타이어",
            "description": "Bridgestone RE004 타이어. 최고의 스초프 드라이빙 타이어 브리지스톤 RE400 타이어를 만나보세요. 브릿지스톤 타이어 추천"
        },
        {
            "patternPath": "maxxis_at771_on_off_road",
            "title": "MAXXIS AT771 On\/Off Road | 맥시스타이어",
            "description": "MAXXIS AT771 On\/Off Road 타이어. 조종성능을 자랑하는 프리미엄 타이어로 비포장도로에서도 탁월하며 소음을 최소화했습니다. 맥시스 타이어 추천"
        },
        {
            "patternPath": "maxxis_ht770",
            "title": "MAXXIS HT770 | 맥시스타이어",
            "description": "MAXXIS HT770 타이어. 티스테이션에서 우수한 조종안전성과 마일리지를 제공하는 맥시스 타이어를 만나보세요. 쏘렌토, 코란도 스포츠 타이어 교체"
        },
        {
            "patternPath": "maxxis_m3",
            "title": "MAXXIS M3 | 맥시스타이어",
            "description": "MAXXIS M3 타이어. 오랜 타이어 수명을 자랑하는 사계절용 프리미엄 맥시스 타이어 입니다. 카니발, 싼타페, 셀토스 올웨더 타이어 교체, 맥시스 타이어 추천"
        },
        {
            "patternPath": "michelin_latitude_tour_hp",
            "title": "MICHELIN LATITUDE TOUR HP | 미쉐린타이어",
            "description": "MICHELIN LATITUDE TOUR HP 타이어. 티스테이션에서 향상된 수명과 최적의 승차감을 제공하는 미쉐린 온로드 SUV 타이어를 만나보세요, 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_pilot_sport_a_s_4",
            "title": "MICHELIN PILOT SPORT A\/S 4 | 미쉐린타이어",
            "description": "MICHELIN PILOT SPORT A\/S 4 타이어. 티스테이션에서 미쉐린의 올웨더(사계절) 스포츠 퍼모먼스 타이어을 만나보세요. 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_primacy_a_s",
            "title": "MICHELIN PRIMACY A\/S | 미쉐린타이어",
            "description": "MICHELIN PRIMACY A\/S 타이어. 승차감과 안정성이 뛰어난 프리미엄 미쉐린 타이어입니다. 싼타페, GV70, 카니발 타이어 교체, 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_primacy_mxm4",
            "title": "MICHELIN PRIMACY MXM4 | 미쉐린타이어",
            "description": "MICHELIN PRIMACY MXM4 타이어. 부드러운 승차감과 정숙성을 자랑하는 미쉐린 최고급 세단용 타이어입니다. 그랜저, G80, BMW 5시리즈 타이어 교체"
        },
        {
            "patternPath": "michelin_primacy_tour_a_s",
            "title": "MICHELIN PRIMACY TOUR A\/S | 미쉐린타이어",
            "description": "MICHELIN PRIMACY TOUR A\/S 타이어. 티스테이션에서 력셔리한 투어링을 위한 미쉐린 타이어를 만나보세요, 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_latitude_sport_3",
            "title": "MICHELIN LATITUDE SPORT 3 | 미쉐린타이어",
            "description": "MICHELIN LATITUDE SPORT 3 타이어. 최고의 안정성을 자랑하는 미쉐린의 프리미엄 SUV 전용 타이어입니다. 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_pilot_sport_4",
            "title": "MICHELIN PILOT SPORT 4 | 미쉐린타이어",
            "description": "MICHELIN PILOT SPORT 4 타이어. 민첩한 반응성과 정교한 핸들링의 고성능 스포츠 타이어로 모터스포츠 기술이 적용된 미쉐린 타이어입니다. 벤츠 AMG GT 타이어 교체"
        },
        {
            "patternPath": "michelin_pilot_sport_4_s",
            "title": "MICHELIN PILOT SPORT 4 S | 미쉐린타이어",
            "description": "MICHELIN PILOT SPORT 4 S 타이어. 미쉐린이 자랑하는 정교한 핸들링과 제동력을 자랑하는 초고성능 스포츠 타이어입니다. S클래스, G90, BMW M4 타이어 교체"
        },
        {
            "patternPath": "michelin_pilot_sport_4_suv",
            "title": "MICHELIN PILOT SPORT 4 SUV | 미쉐린타이어",
            "description": "MICHELIN PILOT SPORT 4 SUV 타이어. 정교한 핸들링과 편안한 승참감을 제공하는 프리미엄 스포츠 미쉐린 SUV 타이어입니다. 미쉐린 SUV 타이어 교체"
        },
        {
            "patternPath": "michelin_primacy_4",
            "title": "MICHELIN PRIMACY 4 | 미쉐린타이어",
            "description": "MICHELIN PRIMACY 4 타이어. 마모 시에도 제동력과 배수력이 우수한 고급 세단용 미쉐린 타이어입니다. K7, 아우디 A6 타이어 교체, 승용 타이어 추천"
        },
        {
            "patternPath": "michelin_agilis(+)",
            "title": "MICHELIN AGILIS+ | 미쉐린타이어",
            "description": "MICHELIN AGILIS+ 타이어. 소형 트럭 및 밴을 위한 최적의 타이어로 향상된 수명과 내구성을 보장하는 타이어입니다. 트럭 타이어 교체, 미쉐린 타이어 추천"
        },
        {
            "patternPath": "michelin_pilot_sport_5",
            "title": "MICHELIN PILOT SPORT 5 | 미쉐린타이어",
            "description": "MICHELIN PILOT SPORT 5 타이어. 미쉐린의 5세대 스포츠 여름용 로드 타이어입니다. G70, C클래스 타이어교체, 미쉐린 썸머타이어 추천"
        },
        {
            "patternPath": "conticrosscontact_lx2",
            "title": "ContiCrossContact LX2 | 콘티넨탈타이터",
            "description": "ContiCrossContact LX2 타이어. 티스테이션에서 만날 수 있는 탁월한 제동성능과 최상의 핸들링 성능을 제공하는 콘티넨탈 타이어 입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "contiprocontact",
            "title": "ContiProContact | 콘티넨탈타이터",
            "description": "ContiProContact 타이어. 티스테이션에서 만날 수 있는 고속주행을 위한 올웨더 콘티넨탈 타이어 입니다. G90, 트랙스, 크라이슬러 세브링 사계절용 타이어 추천"
        },
        {
            "patternPath": "crosscontact_lx_sport",
            "title": "CrossContact LX Sport | 콘티넨탈타이터",
            "description": "CrossContact LX Sport 타이어. 티스테이션에서 만날 수 있는 SUV 전용 올웨더 콘티넨탈 타이어로 뛰어난 핸들링 성능을 제공합니다. 투싼 타이어 교체, 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "contisportcontact_3",
            "title": "ContiSportContact 3 | 콘티넨탈타이터",
            "description": "ContiSportContact 3 타이어. 티스테이션에서 만날 수 있는 고속주행에도 안정적인 콘티넨탈 타이어입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "contisportcontact_5",
            "title": "ContiSportContact 5 | 콘티넨탈타이터",
            "description": "ContiSportContact 5 타이어. 티스테이션에서 만날 수 있는 정교한 핸들링을 제공하는 스포츠 퍼포먼스 프리미엄 타이어입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "contisportcontact_5p",
            "title": "ContiSportContact 5P | 콘티넨탈타이터",
            "description": "ContiSportContact 5P 타이어. 티스테이션에서 만날 수 있는 정교한 핸들링을 제공하는 스포츠 퍼포먼스 프리미엄 타이어입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "maxcontact_mc_6",
            "title": "MaxContact MC 6 | 콘티넨탈타이터",
            "description": "MaxContact MC 6 타이어. 티스테이션에서 만날 수 있는 탁월한 제동성능과 우수한 핸들링 성능, 그리고 저소음까지 제공하는 콘티넨탈 타이어 입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "comfortcontact_cc_6",
            "title": "ComfortContact CC 6 | 콘티넨탈타이터",
            "description": "ComfortContact CC 6 타이어. 티스테이션에서 만날 수 있는 정교화된 특수 설계와 정숙한 주행이 가능한 콘티넨탈 타이어 입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "contiecocontact_5",
            "title": "ContiEcoContact 5 | 콘티넨탈타이터",
            "description": "ContiEcoContact 5 타이어. 티스테이션에서 만날 수 있는 안전한 제동력을 자랑하는 콘티넨탈 타이어 입니다. 콘티넨탈 타이어 추천"
        },
        {
            "patternPath": "ultracontact_uc_6_suv",
            "title": "UltraContact UC 6 SUV | 콘티넨탈타이터",
            "description": "UltraContact UC 6 SUV 타이어. 티스테이션에서 우수한 저소음과 뛰어난 내구성을 지닌 완벽한 콘티넨탈 SUV 타이어를 만나보세요. 콘티넨탈 SUV 타이어 추천"
        },
        {
            "patternPath": "ultracontact_uc_6",
            "title": "UltraContact UC 6 | 콘티넨탈타이터",
            "description": "UltraContact UC 6 타이어. 티스테이션에서 SUV용으로 설계된 정밀한 핸들링과 우수한 저소음 성능을 자랑하는 콘티넨탈 타이어를 만나보세요. 콘티넨탈 SUV 타이어 추천"
        },
        {
            "patternPath": "p_zero_all_season",
            "title": "P ZERO ALL SEASON | 피렐리타이어",
            "description": "P ZERO ALL SEASON 타이어. 내부소음 최소화, 젖은 노면에서의 안정성 및 편안함을 제공하는 고성능 사계절용 피렐리 타이어 입니다. 피렐리 타이어 추천"
        },
        {
            "patternPath": "cinturato_p7_all_season",
            "title": "CINTURATO P7 ALL SEASON | 피렐리타이어",
            "description": "CINTURATO P7 ALL SEASON 타이어. 티스테이션에서 고성능과 안정성을 자랑하는 내구성 좋은 피렐리 타이어를 만나보세요, 피렐리 타이어 추천"
        },
        {
            "patternPath": "p_zero",
            "title": "P ZERO | 피렐리타이어",
            "description": "P ZERO 타이어. 프리미엄 프레스티지 차량이 선택한 피렐리 프리미엄 타이어 입니다. BMW 7시리즈,  벤츠 S클래스, 볼보 S90 타이어 교체, 피렐리 타이어 추천"
        },
        {
            "patternPath": "scorpion_verde",
            "title": "SCORPION VERDE| 피렐리타이어",
            "description": "SCORPION VERDE 타이어. SUV에 최적의 퍼포먼스를 제공하는 피렐리 프리미엄 타이어로 편안한 드라이빙을 제공합니다. 피렐리 타이어 추천"
        },
        {
            "patternPath": "assurance_finesse",
            "title": "ASSURANCE FINESSE | 굿이어타이어",
            "description": "ASSURANCE FINESSE 타이어. 티스테이션에서 만날 수 있는 실용적인 사계절용 굿이어 타이어 입니다. 쏘렌토, 산타페, 카니발 타이어 교체, 굿이어 타이어 추천"
        },
        {
            "patternPath": "assurance_fuelmax",
            "title": "ASSURANCE FUELMAX | 굿이어타이어",
            "description": "ASSURANCE FUELMAX 타이어. 최적화 설계를 통해 강한 내구성을 제공하는 굿이어 타이어 입니다. 굿이어 타이어 추천, 가성비 타이어 추천"
        },
        {
            "patternPath": "eagle_touring",
            "title": "EAGLE TOURING | 굿이어타이어",
            "description": "EAGLE TOURING 타이어. 부드럽고 정숙한 주행을 제공하는 굿이어 타이어 입니다. 니로, 셀토스, 쏘나타 타이어 교체, 굿이어 타이어 추천, 가성비 타이어 추천"
        },
        {
            "patternPath": "efficient_grip_suv",
            "title": "EFFICIENT GRIP SUV | 굿이어타이어",
            "description": "EFFICIENT GRIP SUV 타이어. 티스테이션에서 진동 최소화로 정숙한 승차감을 만날 수 있는 굿이어 타이어를 만나보세요. 굿이어 타이어 추천"
        }
    ]
};