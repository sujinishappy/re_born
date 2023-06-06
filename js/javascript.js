var myHeader = document.getElementById("header");
var isHeaderVisible = true;
var previousScrollY = window.scrollY;

myHeader.onmouseover = function() {
  this.classList.add("over");
};

myHeader.onmouseout = function() {
  this.classList.remove("over");
};

window.addEventListener("scroll", function() {
  var currentScrollY = window.scrollY;

  if (currentScrollY < previousScrollY && !isHeaderVisible) {
    // 스크롤을 위로 조금 내리면 헤더를 다시 나타나도록 설정
    myHeader.style.top = 0 + "px";
    isHeaderVisible = true;
  } else if (currentScrollY > previousScrollY && isHeaderVisible) {
    // 스크롤을 아래로 내리면 헤더를 사라지도록 설정
    myHeader.style.top = -100 + "px";
    isHeaderVisible = false;
  }

  previousScrollY = currentScrollY;
});
//nav
const first = document.querySelectorAll(".first");
const sections = document.querySelectorAll("section");

const firstTop = sections[0].offsetTop;
const secondTop = sections[1].offsetTop;
const thirdTop = sections[2].offsetTop;
const fourthTop = sections[3].offsetTop;

first[0].onclick = function(event) {
  event.preventDefault(); // 기본 이벤트 막기
  window.scroll({ top: firstTop, behavior: "smooth" });
};

first[1].onclick = function(event) {
  event.preventDefault(); // 기본 이벤트 막기
  window.scroll({ top: secondTop, behavior: "smooth" });
};

first[2].onclick = function(event) {
  event.preventDefault(); // 기본 이벤트 막기
  window.scroll({ top: thirdTop, behavior: "smooth" });
};

first[3].onclick = function(event) {
  event.preventDefault(); // 기본 이벤트 막기
  window.scroll({ top: fourthTop, behavior: "smooth" });
};


const imageElements = document.querySelectorAll("#img");

const Observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    const image = entry.target;

    if (entry.isIntersecting) {
    // 이미지가 보여지는 영역에 진입한 경우
    image.style.transform = "translateX(0%)";
    } else {
    // 이미지가 보여지는 영역을 벗어난 경우
    image.style.transform = "translateX(60%)";
    }
});
});

// 각 이미지 요소에 Observer 등록
imageElements.forEach((image) => {
Observer.observe(image);
});

const textElements = document.querySelectorAll("#text");

const observert = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    const text = entry.target;
    const isVisible = entry.intersectionRatio > 0;

    if (isVisible) {
    text.style.opacity = 1;
    } else {
    text.style.opacity = 0;
    }
});
});

// 각 텍스트 요소에 Observer 등록
textElements.forEach((text) => {
observert.observe(text);
});










const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach((el) => {
        el.classList.remove('gallery-item-1');
        el.classList.remove('gallery-item-2');
        el.classList.remove('gallery-item-3');
        el.classList.remove('gallery-item-4');
        el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.className == 'gallery-controls-previous') {
        this.carouselArray.unshift(this.carouselArray.pop());
        } else {
        this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach((control) => {
        galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        document.querySelector(`.gallery-controls-${control}`).innerText = '';
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach((control) => {
        control.addEventListener('click', (e) => {
            e.preventDefault();
            this.setCurrentState(control);
        });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();


//service
const imageContainer = document.querySelector('.image-container');
const images = imageContainer.querySelectorAll('img');
const totalImages = images.length;
const spreadDuration = 2000; // 퍼지는 효과의 지속 시간 (밀리초)
const delayBetweenImages = 600; // 이미지 간 애니메이션 시작 간격 (밀리초)

let animationTimeouts = [];
let isAnimationStarted = false;

// 이미지 위치 초기화
images.forEach((image, index) => {
    const position = index / (totalImages - 1); // 이미지를 균등하게 퍼뜨립니다.
    image.style.left = `${position * 350}%`;
});

// 퍼지는 효과 시작 함수
function startSpreadEffect() {
    images.forEach((image, index) => {
        const delay = index * delayBetweenImages;

        // 지연 후 애니메이션 시작
        const timeout = setTimeout(() => {
            image.style.left = '0%'; // 이미지를 가운데로 이동합니다.

            // 퍼지는 효과 종료 후 이미지를 최종 위치로 이동합니다.
            setTimeout(() => {
                const position = index / (totalImages - 1);
                image.style.left = `${position * 350}%`;
            }, spreadDuration);
        }, delay);

        animationTimeouts.push(timeout);
    });
}

// 이미지 위치 초기화 함수
function resetImagePositions() {
    images.forEach((image, index) => {
        const position = index / (totalImages - 1);
        image.style.left = `${position * 350}%`;
    });
}

// 스크롤 이벤트 핸들러 함수
function handleScroll() {
    const containerRect = imageContainer.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerBottom = containerRect.bottom;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // 이미지 컨테이너가 보이는 영역에 들어오면 퍼지는 효과 시작
    if (!isAnimationStarted && containerTop < windowHeight && containerBottom > 0) {
        isAnimationStarted = true;
        startSpreadEffect();
    }
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll);

// 퍼지는 효과가 끝난 후 이미지 위치 초기화
setTimeout(() => {
    resetImagePositions();
}, (totalImages - 1) * delayBetweenImages + spreadDuration);



let observer = new IntersectionObserver((e)=>{
    e.forEach((box)=>{
        if(box.isIntersecting){
            box.target.style.opacity = 1; 
            box.target.style.transform = "translateY(10%)";
        } else {
            box.target.style.opacity = 0; 
            box.target.style.transform = "translateY(20%)";
        }
        
    })
})

document.querySelectorAll(".content")
observer.observe(content[0])
observer.observe(content[1])



let observer_left = new IntersectionObserver((e)=>{
    e.forEach((box)=>{
        if(box.isIntersecting){
            box.target.style.opacity = 1; 
            box.target.style.transform = "translateY(20%)";
        } else {
            box.target.style.opacity = 0; 
            box.target.style.transform = "translateY(40%)";
        }
        
    })
})

document.querySelectorAll(".content_left")
observer_left.observe(content_left[0])
observer_left.observe(content_left[1])




//고치기
const observer_play = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          const video = entry.target;
          video.play();
      } else {
          const video = entry.target;
          video.pause();
      }
  });
});

const contentPlayElements = document.querySelectorAll(".content_play");
contentPlayElements.forEach((video) => {
  observer_play.observe(video);
});



window.addEventListener('scroll', function() {
    var video = document.getElementById('myVideo');
    var videoPosition = video.getBoundingClientRect().top; // 동영상의 위치 가져오기
  
    // 동영상이 화면에 보일 때 자동 재생
    if (videoPosition < window.innerHeight) {
      video.play();
    }
  });


