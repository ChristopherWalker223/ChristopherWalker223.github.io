/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 */

function VolumeSampleForest() {
  loadSounds(this, {
//Update Test
    buffer: 'forest.wav'
  });
  function onLoaded() {
    var button = document.querySelector('button');
    button.removeAttribute('disabled');
    button.innerHTML = 'Play';
  };
  this.isPlaying = false;
};

VolumeSampleForest.prototype.play = function() {
  this.gainNode = context.createGain();
  this.source = context.createBufferSource();
  this.source.buffer = this.buffer;

  // Connect source to a gain node
  this.source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  // Start playback in a loop
  this.source.loop = true;
  this.source[this.source.start ? 'start' : 'noteOn'](0);
};

VolumeSampleForest.prototype.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;
};

VolumeSampleForest.prototype.stop = function() {
  this.source[this.source.stop ? 'stop' : 'noteOff'](0);
};

VolumeSampleForest.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
};