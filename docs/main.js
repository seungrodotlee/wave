/* eslint-env browser, jquery */

var wave = window.wave || {};

wave.data = {
  cursorTextPrev: "",
  introStep: 0,
  letteredNumber: ["first", "second", "third", "fourth", "fifth"],
  elementLength: [5, 5, 1, 30],
  elementDelay: [0, 300, 100, 100],
  guideTransitionDelay: [2000, 2000, 2000, 500],
  height: 0,
  scroll: 0,
  first: true,
  diaryHelpStep: 0,
  diaryEnabled: false,
  trashCanTriggered: false,
  scrollLock: false,
  wise: [
    "걱정은 고민을 자청하는 것이다.<br>by 딘 인게",
    "걱정을 잠자리로 가지고 가는 것은 등에 짐을 지고 자는 것이다.<br>by 토마스 하리발톤",
    "걱정은 출처가 무엇이건 간에 우리를 약화시키는 것이요,<br>용기를 앗아가는 것이요,<br>그리고 인생을 단축시키는 것이다.<br>by 존 란카스터 스팔딩",
    "과거는 잊어버리고 다른 일에 몰두하자. 이것이 고민의 해결이다.<br>by 잭 템프시",
    "내일 일은 내일이 염려할 것이요, 한 날의 괴로움은 그 날로 족하니라<br>마태복음"
  ],
  deepOceanStep: 0
}

$(window).ready(function () {
  wave.element = {
    body: $("body"),
    cursor: $("#cursor"),
    cursorText: $("#default-cursor-text"),
    introText: $("#introduction"),
    seaTop: $("#sea-top"),
    guideHelp: $("#guide-help"),
    guideSkip: $("#skip-guide"),
    seaContainer: $("#sea-container"),
    wave: $(".wave"),
    diary: $("#text"),
    diaryHelp: $("#diary-help"),
    diaryHelpScroller: $("#diary-help-item-wrap"),
    diaryHelpSkip: $("#skip-diary-help"),
    diaryHelpHelp: $("#diary-help-help"),
    trashCan: $("#trash-can"),
    deepOcean: $("#deep-ocean"),
    oceanSlider: $("#current-step-slider")
  }

  $(window).scrollTop(0);
  wave.element.body.css("overflow-y", "hidden");
  wave.data.height = $("body").height();
  wave.element.diaryHelp.hide();
  wave.element.diaryHelpSkip.hide();
  wave.element.diaryHelpHelp.hide();
  wave.element.deepOcean.hide();
  $(".end-title.fourth").html(wave.data.wise[Math.floor((Math.random() * 5))]);
  for (var i = 1; i < 5; i++) {
    $(".end-title." + wave.data.letteredNumber[i]).hide();
  }

  wave.element.seaTop.on("dblclick", function () {
    if (wave.data.introStep == 0) {
      wave.element.guideHelp.text("계속 더블클릭해서 다음으로 넘어가세요!");
    } else if (wave.data.introStep == 2) {
      wave.element.guideHelp.text("Go!");
    } else if (wave.data.introStep == 3) {
      wave.element.seaContainer.addClass("escape-sea");
      wave.element.wave.removeClass("no-display");
      wave.element.body.css("overflow-y", "visible");
      wave.element.cursorText.html("SCROLL");
    }

    if (wave.data.introStep < 3) {
      if (wave.data.introStep == 1) {
        for (var i = 1; i <= wave.data.elementLength[wave.data.introStep]; i++) {
          (function (x, y) {
            setTimeout(function () {
              $(".guide." + wave.data.letteredNumber[y] + " .guide-each:nth-of-type(" + x + ")").removeClass("guide-each").addClass("guide-each-hidden");
            }, x * wave.data.elementDelay[y]);
          })(i, wave.data.introStep);
        }
      } else if (wave.data.introStep == 2) {
        $(".guide.third").addClass("guide-hidden");
      } else {
        $(".guide." + wave.data.letteredNumber[wave.data.introStep] + " .guide-each").removeClass("guide-each").addClass("guide-each-hidden");
      }

      wave.data.introStep++;

      setTimeout(function () {
        $(".guide." + wave.data.letteredNumber[wave.data.introStep]).removeClass("no-display");

        if (wave.data.introStep == 1 || wave.data.introStep == 3) {
          for (var i = 1; i <= wave.data.elementLength[wave.data.introStep]; i++) {
            (function (x, y) {
              setTimeout(function () {
                $(".guide." + wave.data.letteredNumber[y] + " .guide-each:nth-of-type(" + x + ")").removeClass("no-display");
              }, x * wave.data.elementDelay[y]);
            })(i, wave.data.introStep);
          }
        }
      }, wave.data.guideTransitionDelay[wave.data.introStep]);
    }
  });

  wave.element.guideSkip.on("click", function () {
    wave.element.seaContainer.addClass("escape-sea");
    wave.element.wave.removeClass("no-display");
    wave.element.body.css("overflow-y", "visible");
    wave.element.cursorText.html("SCROLL");
  })

  $("#sad").hover(function () {
      wave.data.cursorTextPrev = wave.element.cursorText.html();

      wave.element.cursorText.html("DON'T<br>BE SAD");
      wave.element.cursor.addClass("big-cursor");
    },
    function () {
      wave.element.cursorText.html(wave.data.cursorTextPrev);
      wave.element.cursor.removeClass("big-cursor");
    })


  $("#smile").hover(function () {
    wave.data.cursorTextPrev = wave.element.cursorText.html();

    wave.element.cursorText.html("BE<br>HAPPY");
    wave.element.cursor.addClass("big-cursor");
  }).mouseout(function () {
    wave.element.cursorText.html(wave.data.cursorTextPrev);
    wave.element.cursor.removeClass("big-cursor");
  })

  $(".textContainer").hover(function () {
      wave.element.cursorText.html("WRITE");
    },
    function () {
      wave.element.cursorText.html("SCROLL");
    })

  wave.element.diaryHelp.hover(function () {
      wave.element.cursorText.html("CLICK");
    },
    function () {
      wave.element.cursorText.html("WRITE");
    })

  wave.element.deepOcean.hover(function () {
      wave.element.cursor.removeClass("small-cursor");
      wave.element.cursorText.html("CLICK");
    },
    function () {
      wave.element.cursorText.html("WRITE");
    })

  wave.element.diaryHelp.on("dblclick", function () {
    wave.data.diaryHelpStep++;
    if (wave.data.diaryHelpStep <= 3) {
      wave.element.diaryHelpScroller.css("top", -(500 * wave.data.diaryHelpStep) + "px");
    } else {
      wave.element.diaryHelpScroller.css("top", -(500 * wave.data.diaryHelpStep) + "px");
      wave.element.diaryHelpHelp.fadeOut(500);
      wave.element.diaryHelpSkip.fadeOut(500);
      wave.data.diaryEnabled = true;

      setTimeout(function () {
        wave.element.diaryHelpScroller.hide();
        wave.element.diaryHelp.css("width", "0");
      }, 500);

      setTimeout(function () {
        wave.element.diaryHelp.hide();
      }, 1000);
    }
  });

  wave.element.diaryHelpSkip.on("click", function () {
    wave.element.diaryHelpHelp.fadeOut(500);
    wave.element.diaryHelpSkip.fadeOut(500);
    wave.data.diaryEnabled = true;

    setTimeout(function () {
      wave.element.diaryHelpScroller.hide();
      wave.element.diaryHelp.css("width", "0");
    }, 500);

    setTimeout(function () {
      wave.element.diaryHelp.hide();
    }, 1000);
  });

  wave.element.deepOcean.on("dblclick", function () {
    if (wave.data.deepOceanStep < 4) {
      $(".end-title." + wave.data.letteredNumber[wave.data.deepOceanStep]).fadeOut(1000);

      $(".end-title." + wave.data.letteredNumber[wave.data.deepOceanStep + 1]).delay(1000).fadeIn(1000);

      wave.element.oceanSlider.css("left", ((125 * (wave.data.deepOceanStep + 1)) - 5) + "px");

      if (wave.data.deepOceanStep == 3) {
        wave.element.cursor.addClass("big-cursor");
        wave.element.cursorText.html("BE<br>HAPPY");
      }

      wave.data.deepOceanStep++;
    }
  });

  $(window).resize(function () {
    wave.data.height = $(window).height();
  });

  $(window).scroll(function () {
    wave.data.scroll = $(window).scrollTop();

    if (wave.data.scroll >= wave.data.height * 3.7) {
      if (wave.data.first) {
        $("html").animate({
          scrollTop: wave.data.height * 4
        }, 500);
        wave.data.scroll = wave.data.height * 4;
        wave.element.diaryHelp.show();
        wave.element.diaryHelpSkip.delay(500).fadeIn(500);
        wave.element.diaryHelpHelp.delay(500).fadeIn(500);

        wave.data.first = false;
      }

      wave.element.body.css("background", "white");
    } else if (wave.data.scroll >= wave.data.height * 0.5 && wave.data.scroll < wave.data.height * 1.3) {
      wave.element.body.css("background", "#2b2b3e");
      wave.element.introText.css("color", "rgba(255, 255, 255, 0.8)");
    } else {
      wave.element.body.css("background", "#ffe9ae");
      wave.element.introText.css("color", "rgba(0, 0, 0, 0.2)");
    }
  });

  $(window).on("mousewheel", function (e) {
    if (wave.data.diaryEnabled) {
      if (wave.data.scroll == wave.data.height * 4) {
        if (e.originalEvent.wheelDelta < 0) {
          if (!wave.data.scrollLock) {
            if (wave.data.trashCanTriggered) {
              wave.data.scrollLock = true;

              wave.element.trashCan.html("걱정을 담는 중입니다.");

              var interval = setInterval(function () {
                var value = wave.element.diary.val();
                var newValue = value.substr(0, value.length - 1);

                wave.element.diary.val(newValue);

                if (value == "") {
                  clearInterval(interval);

                  setTimeout(function () {
                    wave.element.diary.css("height", "0");
                    wave.element.diary.css("padding", "0");
                  }, 500);

                  setTimeout(function () {
                    wave.element.trashCan.html("");
                    wave.element.trashCan.css("color", "#5a5a5a");
                    wave.element.trashCan.addClass("trash-ball");
                    wave.element.trashCan.hover(function () {
                        wave.element.cursorText.html("CLICK");
                        wave.element.cursor.removeClass("small-cursor");
                      },
                      function () {
                        wave.element.cursorText.html("");
                        wave.element.cursor.addClass("small-cursor");
                      })
                  }, 1000);

                  setTimeout(function () {
                    wave.element.trashCan.html("나는 걱정덩어리입니다<br>나를 눌러주세요");
                    wave.element.trashCan.css("color", "white");
                    wave.element.trashCan.on("click", function () {
                      wave.element.trashCan.html("");
                      wave.element.trashCan.addClass("trashed");

                      setTimeout(function () {
                        particlesJS.load('particles-js', 'library/particles/particles.json', function () {});

                        wave.element.deepOcean.show();
                        wave.element.trashCan.css("background", "white");
                      }, 1000);

                      setTimeout(function () {
                        wave.element.trashCan.hide();
                      }, 1900);
                    });
                  }, 2000);
                }
              }, 100);
            } else {
              wave.element.trashCan.css("bottom", "0");
              wave.element.trashCan.html("잠시만 기다리세요");
              wave.element.cursorText.html("WRITE");

              wave.data.trashCanTriggered = false;
              wave.data.scrollLock = true;

              setTimeout(function () {
                wave.data.scrollLock = false;
                wave.element.trashCan.html("화면을 한번 더 아래로 당겨주세요!");
                wave.element.cursorText.html("SCROLL");
                wave.data.trashCanTriggered = true;
              }, 2000);
            }
          }
        } else {
          wave.element.trashCan.css("bottom", "-50px");
          wave.element.cursorText.html("WRITE");
          wave.data.trashCanTriggered = false;
        }
      }
    }
  })
});

$(window).mousemove(function (e) {
  $("#cursor").attr("style", "transform: translateX(" + e.clientX + "px) translateY(" + e.clientY + "px);");
});
