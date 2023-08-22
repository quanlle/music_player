const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'QL-PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: 'Making My Way',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song15.mp3',
            image: './asset/image/song15.jpg',
        },
        {
            name: 'Cơn Mưa Xa Dần',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song14.mp3',
            image: './asset/image/song14.jpg',
        },
        {
            name: 'Nơi Này Có Anh',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song10.mp3',
            image: './asset/image/song10.jpg',
        },
        {
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song4.mp3',
            image: './asset/image/song4.jpg',
        },
        {
            name: 'Buông Đôi Tay Nhau Ra',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song5.mp3',
            image: './asset/image/song5.jpg',
        },
        {
            name: 'Chúng Ta Không Thuộc Về Nhau',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song6.mp3',
            image: './asset/image/song6.jpg',
        },
        {
            name: 'Chạy Ngay Đi (Onionn Remix)',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song8.mp3',
            image: './asset/image/song8.jpg',
        },
        {
            name: 'Lạc Trôi (Masew Trap Mix)',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song2.mp3',
            image: './asset/image/song2.jpg',
        },
        {
            name: 'Có Chắc Yêu Là Đây',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song11.mp3',
            image: './asset/image/song11.jpg',
        },
        {
            name: 'Anh Sai Rồi',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song3.mp3',
            image: './asset/image/song3.jpg',
        },
        {
            singer: 'Sơn Tùng M-TP',
            name: 'Em Của Ngày Hôm Qua (Slim V Remix)',
            image: './asset/image/song1.png',
            path: './asset/music/song1.mp3',
        },
        {
            name: 'Không Phải Dạng Vừa Đâu',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song7.mp3',
            image: './asset/image/song7.jpg',
        },
        {
            name: 'Remember Me (SlimV 2017 Mix)',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song9.mp3',
            image: './asset/image/song9.jpg',
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song12.mp3',
            image: './asset/image/song12.png',
        },
        {
            name: 'There\'s Is No One At All',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song13.mp3',
            image: './asset/image/song13.jpg',
        },
        {
            name: 'Nắng Ấm Ngang Qua',
            singer: 'Sơn Tùng M-TP',
            path: './asset/music/song16.mp3',
            image: './asset/image/song16.jpg',
        },
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
              `
        })
        playlist.innerHTML = htmls.join('')
            
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        //xu li xoay cd va dung cd
        const cdThumbAni = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAni.pause()

        //xu li phong to thu nho khi cuon
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            var newCdWidth = cdWidth - scrollTop
            if(newCdWidth <= 0) {
                newCdWidth = 0
            }
            cd.style.width = newCdWidth + 'px'
            cd.style.opacity = newCdWidth/cdWidth
        }

        //xu li khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
            audio.pause()
            cdThumbAni.pause()
            } else {
            audio.play()
            cdThumbAni.play()
            }
        }
        //Khi bai hat duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }
        //Thanh tien do bai hat
        audio.ontimeupdate = function() {
            if (audio.duration){
            const ProgressPercent = Math.floor(audio.currentTime/audio.duration * 100)
            progress.value = ProgressPercent
            }
        }
        //xu li khi tua bai hat
        progress.onchange = function(e) {
            const seekTime = e.target.value/100 * audio.duration
            audio.currentTime = seekTime
        }
        //khi nhan nut next/prev bai
        nextBtn.onmousedown = function() {
            nextBtn.classList.add('active')
        }
        prevBtn.onmousedown = function() {
            prevBtn.classList.add('active')
        }
        nextBtn.onmouseup = function() {
            nextBtn.classList.remove('active')
        }
        prevBtn.onmouseup = function() {
            prevBtn.classList.remove('active')
        }
        //khi next bai hat
        nextBtn.onclick = function() {
            if(_this.isRandom){
            _this.playRandomSong()
            } else {
            _this.nextSong()
            }
            audio.play()
            cdThumbAni.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //khi prev bai
        prevBtn.onclick = function() {
            if(_this.isRandom){
            _this.playRandomSong()
            } else {
            _this.prevSong()
            }
            audio.play()
            cdThumbAni.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //bat tat che do phat lai bai hat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)

            if(_this.isRandom) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
            }
        }
        //bat tat che do random
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)

            if(_this.isRepeat) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
            }
        }
        //xu ly next song khi audio end
        audio.onended = function() {
            if(_this.isRepeat) {
            audio.play()
            } else {
            nextBtn.click()
            }
        }
        //lang nghe hanh vi click vao playlist
        playlist.onclick = function(e) {
            //xu li khi click vao bai hat
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                if(songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
                cdThumbAni.play()
                }
            }
        }
    },
    //scroll active song into view
    scrollToActiveSong: function() {
        setTimeout(() => {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        })
        },300)
    },
    loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
    },
    loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
    },
    nextSong: function() {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
    }
    this.loadCurrentSong()
    },
    prevSong: function() {
    this.currentIndex--
    if(this.currentIndex < 0) {
        this.currentIndex = this.songs.length-1
    }
    this.loadCurrentSong()
    },
    playRandomSong: function() {
    var newIndex
    do {
        newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
    },
    start: function() {
    this.loadConfig()
    this.defineProperties()
    this.handleEvents()
    this.loadCurrentSong()
    this.render()
    repeatBtn.classList.toggle('active', this.isRepeat)
    randomBtn.classList.toggle('active', this.isRandom)
    }
}
app.start()