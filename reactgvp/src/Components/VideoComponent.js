import * as jQuery from 'jquery';
import * as _ from 'lodash';
import React, { Component } from 'react';
import * as styles from '../css/videoComponent.css';



class VideoComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
        videoData : []
      }
  }

  _textTrack = () => {
    if(this.video && this.video.textTracks && this.video.textTracks.length > 0)
    return this.video.textTracks[0];
  }

  _loadedMetaData = (event) => {
    event.target.removeEventListener('loadedmetadata', this.loadedMetaData)
    let htmlVideo = event.target;
    if (this.videoData[htmlVideo.id].duration == 0 && isFinite(htmlVideo.duration)) {
        this.videoData[htmlVideo.id] = { duration: htmlVideo.duration };
    }
    if (htmlVideo.gvpConfig && htmlVideo.gvpConfig.currentTime) {
        this.video.currentTime = htmlVideo.gvpConfig.currentTime;
    }
    if (htmlVideo.gvpConfig && htmlVideo.gvpConfig.playing) {
        this.video.play();
    }
    htmlVideo.gvpConfig = {};
  }

  _added = () => {
    for (let i = 0; i < this.attributes.source.length; i++) {
        this.videoData[i] = { duration: 0 };
        let video = jQuery(this.element).find('video').get(i)
        video.addEventListener('loadedmetadata', this.loadedMetaData);
        video.ondurationchange = (event) => {
            let htmlVideo = event.target;
            if (this.videoData[htmlVideo.id].duration == 0 && isFinite(htmlVideo.duration)) {
                this.videoData[htmlVideo.id] = { duration: htmlVideo.duration };
            }
        };
        video.load();
        if (i == 0) {
            video.addEventListener('canplay', this.canPlay);
            if (this.attributes.autoPlay)
                video.play();
        }
    }
    let volume = .75;
    if (typeof (Storage) !== 'undefined') {
        if (localStorage.gvpVolume) {
            volume = Number(localStorage.gvpVolume);
        } else {
            localStorage.gvpVolume = volume;
        }
    }
    this.volume = volume;
    this.setTextTracks(this.getAttr('textTracks'));

    this.element.removeAttribute('textTracks');
    if (this.video) {
        var currentLevel = this.video['volume'];
        var testLevel = currentLevel > 0 ? currentLevel / 2 : .1;
        this.video['volume'] = testLevel;
        if (this.video['volume'] == testLevel) {
            this.canChangeVolume = true;
            this.video['volume'] = currentLevel;
        } else {
            this.canChangeVolume = false;
        }
    }
  }

  _getMpdSource = (source) => {
    if (_.endsWith(source, '_480')) {
            source = source.substring(0, source.length - 4);
        }
    return source + '.mpd';
  }

  _getM3U8Source = (source) => {
      if(_.endsWith(source, '_480')) {
          return source.substring(0, source.length -4);
      }
      return source;
  }

  render() {
    return (
      <div class={styles.fillElement}>
          <h1>Video Component</h1>
          <video playsinline tabindex="1" 
            class={styles.videoElement} 
            src='http://gvpcertvideos.att.com/att-videos/2015/gvp_HTC-Desire-626-Sizzle_5000419/gvp_HTC-Desire-626-Sizzle_5000419_480.webm'
            style={{display: 'block'}} 
            controls
            />
      </div>
    );
  }
}

export default VideoComponent;