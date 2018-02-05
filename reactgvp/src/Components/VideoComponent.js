import React, { Component } from 'react';
import * as styles from '../css/videoComponent.css';



class VideoComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
        videoData : [],
        videoSrc: null,
        videoId: "5000676",
        isLoaded: false,
        error: null
      }
  }

  editId = (event) => {
        this.setState({
            videoId: event.target.value
        })
        this.loadMetaData();
  }

  loadMetaData = () => {
      let url = "http://services-finalstage.att.com/search/v1/videoservice?app-id=gvp&q=id:" + this.state.videoId;
      let options = {
        method: 'GET',
        headers: 'gvp',
        mode: 'cors'
      }
      fetch(url)
      .then((response) => {
        return response.text();
        })
      .then((res) =>{
        //handling jsonp object
        let regExp = /\((.*)\)/;
        res = regExp.exec(res);
        res = res[0].slice(1, -1);
        res = JSON.parse(res)
        if(res.response.docs.length == 1){
          this.setState({
              isLoaded: true,
              videoData: res
            });
          }
          this.debug();
      })
  }

  debug = () => {
    console.log(this.state.videoData)
  }

//   textTrack = () => {
//     if(this.video && this.video.textTracks && this.video.textTracks.length > 0)
//     return this.video.textTracks[0];
//   }

//   loadedMetaData = (event) => {
//     event.target.removeEventListener('loadedmetadata', this.loadedMetaData)
//     let htmlVideo = event.target;
//     if (this.videoData[htmlVideo.id].duration == 0 && isFinite(htmlVideo.duration)) {
//         this.videoData[htmlVideo.id] = { duration: htmlVideo.duration };
//     }
//     if (htmlVideo.gvpConfig && htmlVideo.gvpConfig.currentTime) {
//         this.video.currentTime = htmlVideo.gvpConfig.currentTime;
//     }
//     if (htmlVideo.gvpConfig && htmlVideo.gvpConfig.playing) {
//         this.video.play();
//     }
//     htmlVideo.gvpConfig = {};
//   }

//   added = () => {
//     for (let i = 0; i < this.attributes.source.length; i++) {
//         this.videoData[i] = { duration: 0 };
//         let video = jQuery(this.element).find('video').get(i)
//         video.addEventListener('loadedmetadata', this.loadedMetaData);
//         video.ondurationchange = (event) => {
//             let htmlVideo = event.target;
//             if (this.videoData[htmlVideo.id].duration == 0 && isFinite(htmlVideo.duration)) {
//                 this.videoData[htmlVideo.id] = { duration: htmlVideo.duration };
//             }
//         };
//         video.load();
//         if (i == 0) {
//             video.addEventListener('canplay', this.canPlay);
//             if (this.attributes.autoPlay)
//                 video.play();
//         }
//     }
//     let volume = .75;
//     if (typeof (Storage) !== 'undefined') {
//         if (localStorage.gvpVolume) {
//             volume = Number(localStorage.gvpVolume);
//         } else {
//             localStorage.gvpVolume = volume;
//         }
//     }
//     this.volume = volume;
//     this.setTextTracks(this.getAttr('textTracks'));

//     this.element.removeAttribute('textTracks');
//     if (this.video) {
//         var currentLevel = this.video['volume'];
//         var testLevel = currentLevel > 0 ? currentLevel / 2 : .1;
//         this.video['volume'] = testLevel;
//         if (this.video['volume'] == testLevel) {
//             this.canChangeVolume = true;
//             this.video['volume'] = currentLevel;
//         } else {
//             this.canChangeVolume = false;
//         }
//     }
//   }

//   getMpdSource = (source) => {
//     if (_.endsWith(source, '_480')) {
//             source = source.substring(0, source.length - 4);
//         }
//     return source + '.mpd';
//   }

//   getM3U8Source = (source) => {
//       if(_.endsWith(source, '_480')) {
//           return source.substring(0, source.length -4);
//       }
//       return source;
//   }

//   handleProgress = (event) => {
//     this.invalidate();
//   }

//   handlerTimeUpdate = (event) => {
//     // Rounds current time value so that events don't fire more than in once second intervals.
//     if (this.video && Math.round(this.video.currentTime) != this.lastCurrentTimeValue) {
//         if (this.videoData[this.videoIdx].duration == 0 && isFinite(this.video.duration)) {
//             this.videoData[this.videoIdx].duration = this.video.duration;
//         }
//         this.lastCurrentTimeValue = Math.round(this.video.currentTime);
//         this.invalidate();
//     }
//   }

//   playvideoIdx = (config) => {
//     let vid = jQuery(this.element).find('video');
//     let source = this.attributes.source[this.videoIdx];
//     vid.find('source').remove();
//     vid.append('<source type="video/mp4" src="' + source + '.webm"></source>');
//     vid.append('<source type="video/mp4" src="' + source + '.mp4"></source>');
//     vid.append('<source type="video/mp4" src="' + this.getM3U8Source(source) + '.m3u8"></source>');
//     this.video.load();
//     if (typeof config !== 'undefined') {
//         this.video.gvpConfig = config;
//         this.video.addEventListener('loadedmetadata', this.loadedMetaData);
//     }
//     this.invalidate();
//   }

//   removeTextTracks = () => {
//       if (!this.video) return;
//   }

//   setTextTracks = (captions) => {
//     if (!this.video) return;
//     if (this.video.addTextTrack) {
//         let textTrack = this.video.addTextTrack('subtitles', 'English', 'en');

//         jQuery(captions).find('p').each((idx, item) => {
//             let startTime = Utils.timecodeToSeconds(jQuery(item).attr('begin'));
//             let endTime = Utils.timecodeToSeconds(jQuery(item).attr('end'));
//             let cue = null;
//             if (typeof VTTCue !== 'undefined') {
//                 cue = new VTTCue(startTime, endTime, jQuery(item).html().replace(/<br\s*[\/]?>/gi, "\n"));
//             } else if (typeof TextTrackCue !== 'undefined') {
//                 cue = new TextTrackCue(startTime, endTime, jQuery(item).html().replace(/<br\s*[\/]?>/gi, "\n"));
//             }
//             cue.snapToLines = false;
//             if (cue) textTrack.addCue(cue);
//         });
//         this.video.textTracks[0].mode = "hidden";

//     } 
//   }

//   pause = () => {
//     this.playing = false;
//   }

//   isLoading = () => {
//     if (this.video) {
//         if (this.video.readyState == 4) {
//             return false;
//         } else {
//             let seekableTimeRanges = this.video.seekable;
//             for (let i = 0; i < seekableTimeRanges.length; i++) {
//                 if (this.video.currentTime >= seekableTimeRanges.start(i) && this.video.currentTime <= seekableTimeRanges.end(i)) {
//                     return false;
//                 }
//             }
//             return true;
//         }
//     }
//     return true;    
//   }


//   video = () => {
//       if(!this.element) return;
//       return jQuery(this.element).find('video').get(0);
//   }

//   replay = () => {
//     this.videoIdx = 0;
//     this.playVideoIdx({ currentTime: 0, playing: true });
//   }

//   buffered = () => {
//     if (!this.video || !this.video.buffered.length) return 0;
//     return this.video.buffered.end(this.video.buffered.length - 1);
//   }

//   isAtEnd = () => {
//     if (!this.video) return false;
//     return this.attributes.source.length <= this.videoIdx + 1 && this.video.currentTime >= this.video.duration;      
//   }

//   getPlaying = () => {
//     if (!this.video) return false;
//     if (this.isAtEnd) return false;
//     return !this.video.paused;
//   }

//   setPlaying = (input) => {
//     if (!this.video) return;
//     if (!this.video.paused != input) {
//         input ? this.video.play() : this.video.pause();
//     }  
//   }

//   getVolume = () => {
//     if (this.video && !this.video.muted) return this.video.volume;
//     return 0;
//   }

//   setVolume = (input) => {
//     if (input > 1)
//         input = 1;
//     if (input < 0)
//         input = 0;
//     if (this.video && this.video.volume != input) {
//         this.video.volume = input;
//     }
//     if (typeof (Storage) !== 'undefined') {
//         localStorage.gvpVolume = input;
//     }
//     if (input > 0) {
//         this.muted = false;
//     }
//   }

//   getMuted = () => {
//     if (this.video) return this.video.muted;
//     return false;  
//   }

//   setMuted = (input) => {
//     if (this.video && this.video.muted != input) {
//         this.video.muted = input;
//     }    
//   }

//   getLoop = () => {
//     if (this.video) return this.video.loop;
//     return false;  
//   }

//   setLoop = (input) => {
//     if (this.video && this.video.loop != input)
//         this.video.loop = input;      
//   }

//   getTotalTime = () => {
//     let totalTime = 0;
//     for (let i = 0; i < this.attributes.source.length; i++) {
//         if (this.videoData[i] && this.videoData[i].duration) {
//             totalTime += this.videoData[i].duration;
//         } else {
//             //could ask track for duration, but need id?
//         }
//     }
//     return totalTime;
//   }

//   getCurrentTime = () => {
//     let totalTime = 0;
//     if (this.video) {
//         for (let i = 0; i < this.videoIdx; i++) {
//             if (this.videoData[i] && this.videoData[i].duration) {
//                 totalTime += this.videoData[i].duration;
//             } else {
//                 //could ask track for duration, but need id?
//             }
//         }
//         totalTime += this.video.currentTime;
//     }
//     return totalTime;      
//   }

//   setCurrentTime = (input) => {
//     let totalTime = 0;
//     if (this.video) {
//         for (let i = 0; i < this.attributes.source.length; i++) {
//             totalTime += this.videoData[i].duration;
//             if (totalTime > input) {
//                 let prevTime = totalTime - this.videoData[i].duration;
//                 let goto = input - prevTime;
//                 if (this.videoIdx != i) {
//                     this.videoIdx = i;
//                     this.playVideoIdx({ currentTime: goto, playing: this.playing });
//                 } else {
//                     this.video.currentTime = goto;
//                 }
//                 break;
//             }
//         }
//     }    
//   }

  render() {
    return (
      <div className={styles.fillElement}>
          <h1>input video Id:</h1><input onChange={this.editId} value={this.state.videoId}></input>
          <h1>Video Component</h1>
          <video playsInline tabIndex="1" 
            className={styles.videoElement} 
            src='http://gvpcertvideos.att.com/att-videos/2015/gvp_HTC-Desire-626-Sizzle_5000419/gvp_HTC-Desire-626-Sizzle_5000419_480.webm'

            event-playing={() => { this.invalidate(); }}
            event-pause={() => { this.invalidate(); }}
            event-volumechange={() => { this.invalidate(); }}
            event-timeupdate={this.handlerTimeUpdate}
            event-progress={this.handlerProgress}
            event-ended={this.handlerEnded}
            controls
            />
            {this.children}
      </div>
    );
  }
}

export default VideoComponent;