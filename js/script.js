//375px 未満は JS で viewport を固定する　===================
(function () {
  const viewport = document.querySelector('meta[name="viewport"]');

  function switchViewport() {
    const value =
      window.outerWidth > 375
        ? "width=device-width,initial-scale=1"
        : "width=375";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

// ================================================
// header
// ================================================
jQuery(function () {
  // ドロワーメニュー展開 ---
  const drawerIcon = jQuery("#js-drawer-icon");
  const drawerMenu = jQuery("#js-drawer__menu");
  const drawerMenuPc = jQuery("#js-drawer__menu-pc");

  jQuery(drawerIcon).on("click", function (e) {
    e.preventDefault();

    // メニューの表示状態を切り替え
    const isActive = jQuery(drawerMenu).hasClass("active");

    if (isActive) {
      // メニューが開いている場合は閉じる（指定は下記）
      closeMenu();
    } else {
      // メニューが閉じている場合は開く（指定は下記）
      openMenu();
    }
  });

  // メニュー表示内各セクションリンクのクリック時の対応
  jQuery(
    '.drawer__menu a[href^="#"],.drawer__menu-pc a[href^="#"],.fv__menu__nav-pc a[href^="#"]'
  ).on("click", function (e) {
    e.preventDefault();

    // ハンバーガーメニューを閉じる
    closeMenu();

    // クリックされたリンクのhref属性の値を取得
    const target = jQuery(this).attr("href");
    const scrollTarget = jQuery(target);

    // 固定ヘッダーの高さを取得
    const headerHeight = jQuery(".header").outerHeight();

    // スクロール位置を計算
    const offsetTop = scrollTarget.offset().top - headerHeight;

    // スクロールアニメーション
    jQuery("html, body").animate(
      {
        scrollTop: offsetTop,
      },
      1000 // スクロール時間（ms）
    );
  });

  // メニューを開く処理
  function openMenu() {
    jQuery(drawerIcon).addClass("is-checked");
    jQuery(drawerMenu).addClass("is-checked active");
    jQuery(drawerMenuPc).addClass("is-checked active");

    // SPメニュー（drawerMenu）展開時のみ no-scroll を追加
    if (window.innerWidth <= 600) {
      // SPサイズかどうかを確認
      jQuery("body").addClass("no-scroll");
    }
  }

  // メニューを閉じる処理
  function closeMenu() {
    jQuery(drawerIcon).removeClass("is-checked");
    jQuery(drawerMenu).removeClass("is-checked active");
    jQuery(drawerMenuPc).removeClass("is-checked active");

    // メニュー閉じた後のスクロール許可
    jQuery("body").removeClass("no-scroll");
  }
});

// 元のサイトに戻る時の指定。
// header展開後の各セクションをクリックした後、元サイトのページトップに移動後、クリックしたセクションへ移動する。
jQuery(function () {
  const scrollToSection = sessionStorage.getItem("scrollToSection");
  if (scrollToSection) {
    const targetSection = jQuery(`#${scrollToSection}`);
    if (targetSection.length) {
      const headerHeight = jQuery(".header").outerHeight();
      const offsetTop = targetSection.offset().top - headerHeight;

      // スムーズスクロール
      jQuery("html, body").animate(
        {
          scrollTop: offsetTop,
        },
        1000
      );
    }

    // セクションIDの保存をクリア
    sessionStorage.removeItem("scrollToSection");
  }
});

// line Instagram 準備中ポップ
jQuery(document).ready(function () {
  // .sns__link-item内のaタグに対してもクリックイベントを設定
  jQuery("body").on(
    "click",
    '.sns__link-item a[href="#"], .sns__link-pc-item a[href="#"]',
    function (event) {
      event.preventDefault(); // リンクのデフォルトの動作を無効化
      alert("準備中です... 😑"); // アラートメッセージを表示
    }
  );
});

jQuery(function () {
  const pageScroll = jQuery("#js-drawer-icon");

  function toggleScrollBehavior() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      // 600px以下の場合、常に表示
      pageScroll.show(); // 常に表示させる
      jQuery(window).off("scroll"); // スクロールイベントを削除
    } else {
      // 600px以上の場合、スクロールで表示・非表示
      pageScroll.hide(); // 初めは非表示
      jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() > 480) {
          pageScroll.fadeIn(1000);
        } else {
          pageScroll.fadeOut(1000);
        }
      });
    }
  }

  // 初回チェックとリサイズ時の再チェック
  toggleScrollBehavior();
  jQuery(window).on("resize", toggleScrollBehavior);
});

// ================================================
// skill　トグル
// ================================================
jQuery(function () {
  jQuery(".js-skill__accordion-q").on("click", function (e) {
    e.preventDefault();

    const accordion = jQuery(this).closest(".skill__accordion-item");

    if (accordion.hasClass("is-open")) {
      accordion.removeClass("is-open");
      accordion.find(".js-skill__accordion-a").slideUp();
    } else {
      accordion.addClass("is-open");
      accordion.find(".js-skill__accordion-a").slideDown();
    }
  });
});

// ================================================
// work）swiper
// ================================================
const workSwiper = new Swiper(".work__swiper", {
  //swiperの名前
  //切り替えのモーション
  speed: 1000, //表示切り替えのスピード
  effect: "slide", //切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  //最後→最初に戻るループ再生を有効に
  loop: true,

  //自動スライドについて
  autoplay: {
    delay: 3000, //何秒ごとにスライドを動かすか
    stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
    disableOnInteraction: true, //ユーザーの操作時に止める
    reverseDirection: false, //自動再生を逆向きにする
  },

  //表示について
  centeredSlides: true, //中央寄せにする
  slidesPerView: "auto",
  spaceBetween: 20,

  //ページネーション
  pagination: {
    el: ".work__swiper-pagination", //paginationのclass
    clickable: true, //クリックでの切り替えを有効に
    type: "bullets", //paginationのタイプ (※2)
  },
  //ナビゲーション
  navigation: {
    prevEl: ".work__swiper-button-prev", //戻るボタンのclass
    nextEl: ".work__swiper-button-next", //進むボタンのclass
  },
  // その他指定
  keyboard: true, // キーボード操作を有効化
  allowTouchMove: true, // タッチ操作を有効化

  breakpoints: {
    840: {
      slidesPerView: 3,
    },
  },
});

// ================================================
// about me)モーダル
// ================================================
const dialogs = document.querySelectorAll("dialog");

// ダイアログを開く
const open = document.querySelectorAll(".modal__open-btn");
open.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.getAttribute("data-dialog");
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
    dialog.classList.add("js-show");
  });
});

// ダイアログを閉じるボタン1
const close = document.querySelectorAll(".modal__close-btn");
close.forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    dialog.classList.remove("js-show");
    dialog.close();
  });
});

// ダイアログを閉じるボタン2
const close2 = document.querySelectorAll(".modal__text-close-button");
close2.forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    dialog.classList.remove("js-show");
    dialog.close();
  });
});

// オーバーレイクリックでダイアログを閉じる（修正済み）
dialogs.forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.classList.remove("js-show");
      dialog.close();
    }
  });
});

// ================================================
// about me)swiper
// ================================================
const likeSwiper = new Swiper(".like__swiper", {
  //swiperの名前
  //切り替えのモーション
  speed: 1000, //表示切り替えのスピード
  effect: "slide", //切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  //最後→最初に戻るループ再生を有効に
  loop: true,

  //自動スライドについて
  autoplay: {
    delay: 2000, //何秒ごとにスライドを動かすか
    stopOnLastSlide: false, //最後のスライドで自動再生を終了させるか
    disableOnInteraction: true, //ユーザーの操作時に止める
    reverseDirection: false, //自動再生を逆向きにする
  },

  //表示について
  centeredSlides: true, //中央寄せにする
  slidesPerView: "auto",
  spaceBetween: 20,

  // //ページネーション
  // pagination: {
  //   el: ".swiper-pagination", //paginationのclass
  //   clickable: true, //クリックでの切り替えを有効に
  //   type: "bullets", //paginationのタイプ (※2)
  // },

  //ナビゲーション
  navigation: {
    prevEl: ".like__swiper-button-prev", //戻るボタンのclass
    nextEl: ".like__swiper-button-next", //進むボタンのclass
  },
  // その他指定
  keyboard: true, // キーボード操作を有効化
  allowTouchMove: true, // タッチ操作を有効化
});

// ================================================
// work footer ）スクロールトップ
// ================================================
jQuery(function () {
  const pageScroll = jQuery(".js-pagetop-icon");

  // ボタンを押すとページトップに移動する
  pageScroll.click(function () {
    jQuery("body,html").animate({ scrollTop: 0 }, 1000);
    return false;
  });
});

// line Instagram 準備中ポップ
jQuery(document).ready(function () {
  // LINEとInstagramのリンクに対してクリックイベントを設定
  jQuery('.footer__sns-link-item a[href="#"]').on("click", function (event) {
    event.preventDefault(); // リンクのデフォルトの動作を無効化
    alert("準備中です... 😑"); // 絵文字をメッセージの後ろに追加
  });
});

// footer内　各セクションリンクのクリック時の対応
jQuery('.footer__menu-pc a[href^="#"]').on("click", function (e) {
  e.preventDefault();

  // クリックされたリンクのhref属性の値を取得
  const target = jQuery(this).attr("href");
  const scrollTarget = jQuery(target);

  // 固定ヘッダーの高さを取得
  const headerHeight = jQuery(".header").outerHeight();

  // スクロール位置を計算
  const offsetTop = scrollTarget.offset().top - headerHeight;

  // スクロールアニメーション
  jQuery("html, body").animate(
    {
      scrollTop: offsetTop,
    },
    1000 // スクロール時間（ms）
  );
});

// ================================================
// 要素のふわっと表示
// ================================================
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("js-in-view");
    } else {
      // entry.target.classList.remove("js-in-view");
      // 最初の一度のみの指定にする場合は上記を消そう。
    }
  });
});

const inViewItems = document.querySelectorAll(".fade-in-up");
inViewItems.forEach(function (inViewItems) {
  intersectionObserver.observe(inViewItems);
});
