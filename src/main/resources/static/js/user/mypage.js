const searchTextElem = document.querySelector('.profile_search #searchText')
const myFavListDivElem = document.querySelector('.profile_myFavList');
const myIuserVal = document.querySelector('.mypage_wrapper').dataset.myIuser;
infinityScrolling.url = `/user/getMyMovie`;
infinityScrolling.plusQuery = `&iuser=${myIuserVal}`;
infinityScrolling.makeItemList = makeMovieList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeMovieList(movieList) {
    console.log(movieList);
    movieList.forEach(movie => {
        /*const iElem1 = document.createElement('i');
        iElem1.className = 'fas fa-heart';
        const divElem1 = document.createElement('div');
        divElem1.className = 'myfav_movie-footer';
        const iElem2 = document.createElement('i');
        iElem2.className = 'fas fa-play-circle';
        const divElem2 = document.createElement('div');
        divElem2.className = 'myfav_movie_hover';
        const spanElem = document.createElement('span');
        spanElem.innerText = movie.title;
        const imgElem = document.createElement('img');
        imgElem.src = movie.image;
        const aElem = document.createElement('a');
        aElem.href = `/movie/detail?keyword=${movie.title}&page=0`
        const divElem3 = document.createElement('div');
        divElem3.className = 'myfav_movie';
        const divElemOuter = document.createElement('div');
        divElemOuter.className = 'myfavMovie_List';
        myFavListDivElem.append(divElemOuter);
        divElemOuter.append(aElem);
        aElem.append(divElem3);
        divElem3.append(imgElem);
        divElem3.append(spanElem);
        divElem3.append(divElem2);
        divElem2.append(iElem2);
        divElem2.append(divElem1);
        divElem1.append(iElem1);*/
        const divElem = document.createElement('div');
        divElem.className = 'myfavMovie_List';
        divElem.innerHTML = `
            <a href="/movie/detail?keyword=${movie.title}&page=0">
                <div class="myfavMovie_List">
                    <div class="myfav_movie">
                        <section class="app" id="app" data-current-media="movie"> 
                            <article class="media-container">
                                <div class="movie-wrapper">
                                    <div class="movie">
                                        <div class="movie__front">                    
                                            <img src="${movie.image}" alt="cover">
                                        </div>
                                        <div class="movie__edge"></div>
                                        <div class="movie__side"></div>
                                    </div>
                                    <div class="movie-shadow"></div>
                                </div>
                            </article>
                        </section> 
                    </div>
                </div>
            </a>
            `
        myFavListDivElem.append(divElem);

        // = movieContainerElem.innerHTML += `<img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'>`;
    })
}
const isEmpty = function(value){
    if( value === "" || value == null || (typeof value == "object" && !Object.keys(value).length) ){
        return true;
    }else{
        return false;
    }
};
if(document.querySelector('.follow_btn_box') != null){
    const followBtnElem = document.querySelector('.follow_btn');
    const unfollowBtnElem = document.querySelector('.unfollow_btn');
    const refollowBtnElem = document.querySelector('.refollow_btn');
    const toIuserVal = document.querySelector('.follow_btn_box').dataset.toIuser;

    const followProc = {
        method: '',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            to_iuser: toIuserVal
        },
        doFollow: function () {
            fetch('/user/follow', {
                method: this.method,
                body: JSON.stringify(this.data),
                headers: this.headers,
            }).then(res => res.json())
                .then(myJson => {
                    if(myJson === 1) {
                        checkFollow();
                    }else {
                        alert('팔로우 실패. 오류 발생.');
                    }
                })
        },
        unDoFollow: function () {
            fetch(`/user/follow/${toIuserVal}`, {
                method: this.method
            }).then(res => res.json())
                .then(myJson => {
                    if(myJson === 1) {
                        checkFollow();
                    }else {
                        alert('언팔로우 실패. 오류 발생.');
                    }
                })
        }

    }


    function checkFollow() {
        fetch(`/user/follow?to_iuser=${toIuserVal}`)
            .then(response => response.json())
            .then(myJson => {
                if(myJson.from_iuser === 1) {
                    followBtnElem.classList.add('hidden');
                    unfollowBtnElem.classList.remove('hidden');
                    refollowBtnElem.classList.add('hidden');
                }else if(myJson.to_iuser === 1 && myJson.from_iuser === 0 ) {
                    followBtnElem.classList.add('hidden');
                    unfollowBtnElem.classList.add('hidden');
                    refollowBtnElem.classList.remove('hidden');
                }else {
                    followBtnElem.classList.remove('hidden');
                    unfollowBtnElem.classList.add('hidden');
                    refollowBtnElem.classList.add('hidden');
                }
            })
    }
    checkFollow();

    followBtnElem.addEventListener('click', (e) => {
        followProc.method = 'POST';
        followProc.doFollow();
    })
    refollowBtnElem.addEventListener('click', (e) => {
        followProc.method = 'POST';
        followProc.doFollow();
    })
    unfollowBtnElem.addEventListener('click', (e) => {
        followProc.method = 'DELETE';
        followProc.unDoFollow();
    })
}