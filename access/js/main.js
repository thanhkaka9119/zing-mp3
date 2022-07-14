
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playAudio = $('.play-audio');
const musicInfoPlayer = $('.music-info');
const btnPlayer = $('.btn-toggle-play');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRepeat =$('.btn-repeat');
const btnRandom = $('.btn-random');
const progress = $('#progress');
const btnVolume = $('#volume');
const btnPlayLeft = $('.media-left__control');
const listMusics = $('.list-song');
/** 
 * 1.render songs
 * 2. Scroll top
 * 3.play/ pause / seek
 */
const app ={
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    songs: [
        {
            name: 'Play',
            singer: 'K-391, Alan Walker, Martin Tungev',
            Album: 'Alan Walker',
            path: './access/music/song_1.mp3',
            image: './access/img/img_song_1.webp'
        },
        {
            name: 'Abcdefu',
            singer: 'KALUMA',
            Album: 'Abcdefu',
            path: './access/music/song_2.mp3',
            image: './access/img/img_song_2.webp'
        },
        {
            name: 'Wrap Me In Plastic',
            singer: 'CHRONMANCE',
            Album: 'Wrap Me In Plastic',
            path: './access/music/song_3.mp3',
            image: './access/img/img_song_3.webp'
        },
        {
            name: 'On My Way (Da Tweekaz Remix)',
            singer: 'Alan Walker, Sabrina Carpenter',
            Album: '',
            path: './access/music/song_4.mp3',
            image: './access/img/img_song_4.webp'
        },
        {
            name: 'All Around the World (La La La)',
            singer: 'R3hab, ATC',
            Album: '',
            path: './access/music/song_5.mp3',
            image: './access/img/img_song_5.webp'
        },
        {
            name: 'Kings & Queens',
            singer: 'Platinum Party',
            Album: '',
            path: './access/music/song_6.mp3',
            image: './access/img/img_song_6.webp'
        },
        {
            name: 'Khuê Mộc Lang',
            singer: 'Hương Ly, Jombie',
            Album: '',
            path: './access/music/song_7.mp3',
            image: './access/img/img_song_7.jpeg'
        },
        {
            name: 'Hoa Hải Đường',
            singer: 'Jack',
            Album: '',
            path: './access/music/song_8.mp3',
            image: './access/img/img_song_8.jpeg'
        },
        {
            name: 'Thiên Đàng',
            singer: 'Wowy, JoliPoli',
            Album: '',
            path: './access/music/song_9.mp3',
            image: './access/img/img_song_9.jpeg'
        },
        {
            name: 'Rồi Tới Luôn',
            singer: 'Nal, Wowy',
            Album: '',
            path: './access/music/song_10.mp3',
            image: './access/img/img_song_10.jpeg'
        },
        {
            name: 'Sầu Hồng Gai',
            singer: 'G5R Squand',
            Album: '',
            path: './access/music/song_11.mp3',
            image: './access/img/img_song_11.jpeg'
        },
        {
            name: 'Thương Nhau Tới Bến',
            singer: 'Hombiden, biden',
            Album: '',
            path: './access/music/song_12.mp3',
            image: './access/img/img_song_12.jpeg'
        },
        {
            name: 'Y Chang Xuân Sang',
            singer: 'Simple, biden',
            Album: '',
            path: './access/music/song_13.mp3',
            image: './access/img/img_song_13.jpeg'
        }
    ],
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        });
    },
    render: function(){
        const _this = this;
        const htmls = this.songs.map(function(song, index){
            return `<div class="select-item ${index === _this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="music-left">
                <div class="music-item">
                    <i class="music-left__icon fas fa-music"></i>
                    <div class="music-left__main">
                        <div class="music-img" style="background-image: url(${song.image});">
                            <div class="music-img__opacity">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="music-post">
                            <h4>${song.name}</h4>
                            <p>${song.singer}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="music-content">
                <p>${song.Album}</p>
            </div>
            <div class="music-right">
                <p>03:10</p>
                <audio class="audio" src="${song.path}"></audio>
            </div>
        </div>`;
        });
        $('.list-song').innerHTML = htmls.join('');

        const audios = $$('.audio');
        const timeSong = $$('.music-right p');
        audios.forEach(function(audio,index) {
            audio.onloadedmetadata = function() {
                let valueMinute = Math.floor(audio.duration / 60);
                let valueSecond = Math.floor(audio.duration % 60);
                valueMinute = valueMinute >=10 ? valueMinute : '0' + valueMinute;
                valueSecond = valueSecond >=10 ? valueSecond : '0' + valueSecond;
    
                timeSong[index].innerText = valueMinute + ':' + valueSecond;
            };
        });
    },
    handleEvents : function() {
        const _this = this;
        //handle the play button click event
        btnPlayer.onclick = function() {
            if(_this.isPlaying){
                playAudio.pause();
            }
            else{
                playAudio.play();
            }
        }
        btnPlayLeft.onclick = function() {
            btnPlayer.click();
        }
        playAudio.onplay = function() {
            _this.isPlaying = true;
            $('.btn-toggle-play i.active').classList.remove('active');
            $('.btn-toggle-play i.fa-pause').classList.add('active');
            btnPlayLeft.classList.remove('media-left__control--pause');
            btnPlayLeft.classList.add('media-left__control--play');
        }
        playAudio.onpause = function() {
            _this.isPlaying = false;
            $('.btn-toggle-play i.active').classList.remove('active');
            $('.btn-toggle-play i.fa-play').classList.add('active');
            btnPlayLeft.classList.remove('media-left__control--play');
            btnPlayLeft.classList.add('media-left__control--pause');
        }
        //làm thanh chạy (tiến độ bài hát thay đổi)
        playAudio.ontimeupdate = function() {
            if(playAudio.duration){
                const valueSeek =  Math.floor((playAudio.currentTime /playAudio.duration)* 100);
                progress.value = valueSeek;
            }
        }
        //rewind song
        progress.oninput = function(e) {
            const seekTime = (e.target.value/100) * playAudio.duration;
            playAudio.currentTime = seekTime;
        }
        //tăng giảm âm lượng
        btnVolume.oninput = function(e){
            playAudio.volume = e.target.value;
        }
        //handle next button click event
        btnNext.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong();
                playAudio.play();
            }
            else{
                _this.nextSong();
                playAudio.play();
            }
            _this.loadActiveSong();
        }
        //handle prev button click event
        btnPrev.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong();
                playAudio.play();
            }
            else{
                _this.preSong();
                playAudio.play();
            }
            _this.loadActiveSong();
        }
        //auto next song when end
        playAudio.onended = function(){
            btnNext.click();
            playAudio.play();
        }
        //repeat song
        btnRepeat.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle('active',_this.isRepeat);
            _this.playRepeatSong();
        }
        //random song
        btnRandom.onclick = function(){
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active',_this.isRandom);
        }
        //lắng nghe hành vi click vào playlist
        listMusics.onclick = function(e){
            const songNode = e.target.closest('.select-item:not(.active)');
            if(songNode){
                if(e.target.closest('.music-img')){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrenSong();
                    playAudio.play();
                    _this.loadActiveSong();
                }
            }
        }
    },
    loadCurrenSong: function(){
        const htmlMusicPlayer = `<div class="music-info__img" style="background-image: url(${this.currentSong.image});"></div>
        <div class="music-infor__des">
            <h4>${this.currentSong.name}</h4>
            <p>${this.currentSong.singer}</p>
        </div>
        <i class="btn fas fa-heart">
            <span class="control-icon__like small-notice">Thêm vào thư viện</span>
        </i>
        <i class="btn fas fa-grip-lines">
            <span class="control-icon__other small-notice">Khác</span>
        </i>`;
        musicInfoPlayer.innerHTML = htmlMusicPlayer;
        playAudio.src = this.currentSong.path;
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrenSong();
    },
    preSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrenSong();
    },
    playRepeatSong: function(){
        if(this.isRepeat){
            playAudio.loop = true
        }
        else{
            playAudio.loop = false;
        }
    },
    //màu bài hát đang chạy trên list song
    loadActiveSong: function(){
        const _this = this;
        const listSongs = $$('.select-item');
        const songActive = $('.select-item.active');
        listSongs.forEach(function(song,index) {
            if(_this.currentIndex === index){
                songActive.classList.remove('active');
                song.classList.add('active');
            }
        });
    },
    playRandomSong: function(){
        let newIndex;
        if(this.isRandom){
           do{
                newIndex = Math.floor(Math.random() * this.songs.length);
           }while(newIndex === this.currentIndex);
           this.currentIndex = newIndex;
           this.loadCurrenSong();
        }
    },
    start: function(){
        //render playlist
        this.render();
        //định nghĩa các thuộc tính cho object
        this.defineProperties();
        //load first song
        this.loadCurrenSong();
        //lắng nghe các sự kiện
        this.handleEvents();
    }
}
app.start();