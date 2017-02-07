import React from 'react';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: window.screen.height, // eslint-disable-line
      canvasWidth: window.screen.width, // eslint-disable-line
      enableMenu: false,
    };
    // this.handleCanvasMousedown = this.handleCanvasMousedown.bind(this);
    // this.handleCanvasMousemove = this.handleCanvasMousemove.bind(this);
  }
  componentWillMount() {
    this.drawTimer = null;
    this.clearTimer = null;
    this.pointsArray = [];
    this.maxPointNum = 10;
    this.isMoving = false;
    this.isRemoving = false;
    this.countCurvesWorker = undefined;
    this.currentBrushColor = null;
    this.brushList = {
      blue: [{
        stop: 0,
        color: '#14E5FE',
      }, {
        stop: 1,
        color: '#1858F0',
      }],
      red: [{
        stop: 0,
        color: '#FF59D8',
      }, {
        stop: 1,
        color: '#FF0000',
      }],
      green: [{
        stop: 0,
        color: '#53FA00',
      }, {
        stop: 1,
        color: '#00762A',
      }],
      yellow: [{
        stop: 0,
        color: '#FFFF00',
      }, {
        stop: 1,
        color: '#F7B40B',
      }],
    };
    this.maxBrushWidth = 20;
    this.styles = {
      canvas: {
        background: 'transparent',
        position: 'absolute',
        cursor: '',
        left: '0',
        top: '0',
      },
      menuLocation: {
        left: '0',
        top: '0',
        position: 'absolute',
      },
      animate: {
        '.canvasMenu-enter': {
          opacity: 0.01,
          transition: 'opacity .1s ease-in',
        },
        '.canvasMenu-enter.canvasMenu-enter-active': {
          opacity: 1,
        },
        '.canvasMenu-leave': {
          opacity: 1,
          transition: 'opacity .1s ease-in',
        },
        '.canvasMenu-leave.canvasMenu-leave-active': {
          opacity: 0.01,
        },
      },
    };
    this.animateCSS = this.attrToString(this.styles.animate);
    this.context = null;
    window.addEventListener('resize', this.windowResizeHandler); // eslint-disable-line
  }
  componentDidMount() {
    this.initBrush();
    this.startWorker();
    this.drawTimer = setInterval(() => this.drawTick(), 80);
    this.clearTimer = setInterval(() => this.clearTick(), 100);
    this.refs.canvas.addEventListener('contextmenu', (e) => { // eslint-disable-line
      e.preventDefault();
    }, false);
  }
  componentWillUnmount() {
    clearInterval(this.drawTimer);
    clearInterval(this.clearTimer);
    window.removeEventListener('resize', this.windowResizeHandler); // eslint-disable-line
    this.stopWorker();
  }
  setBrush = (color) => {
    this.currentBrushColor = color;
    this.isMoving = true;
    this.isRemoving = false;
    localStorage && localStorage.setItem('currentBrushColor', color); // eslint-disable-line
  }
  windowResizeHandler() {
    this.setState({
      canvasHeight: window.screen.height, // eslint-disable-line
      canvasWidth: window.screen.width, // eslint-disable-line
    });
  }
  // isFirefox() {
  //   const userAgent = navigator.userAgent.toLowerCase(); // eslint-disable-line
  //   console.log(userAgent);
  //   if (userAgent.indexOf('chrome') > -1 || userAgent.indexOf('edge') > -1 || userAgent.indexOf('msie') > -1 || userAgent.indexOf('opera') > -1 || userAgent.indexOf('safari') > -1) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  initBrush() {
    let color = 'yellow';
    let bufColor;
    this.context = this.refs.canvas.getContext('2d'); // eslint-disable-line
    if (localStorage) { // eslint-disable-line
      bufColor = localStorage.getItem('currentBrushColor'); // eslint-disable-line
      if (bufColor) {
        color = bufColor;
      }
    }
    this.setBrush(color);
  }
  drawTick() {
    if (this.isMoving) {
      this.countCurvesWorker.postMessage([this.pointsArray, 'draw']);
    }
  }
  clearTick() {
    if (!this.isMoving && this.pointsArray.length >= 1) {
      if (this.isRemoving) {
        this.removeCurves();
      }
    }
  }
  startWorker() {
    if (typeof (Worker) !== 'undefined') {
      if (typeof (this.countCurvesWorker) === 'undefined') {
        this.countCurvesWorker = new Worker('./client/components/curvesCount.js'); // eslint-disable-line
      }
      this.countCurvesWorker.addEventListener('message', (event) => {
        this.clearCanvas();
        this.paintCurve(event.data[0]);
        // if (this.isFirefox()) {
        //   console.log('it/s isFirefox');
        //   this.paintCurveFirefox(event.data[0]);
        // } else {
        //   console.log('it/s not isFirefox');
        //   this.paintCurve(event.data[0]);
        // }
        if (event.data[1] === 'draw') {
          this.isMoving = false;
          this.isRemoving = true;
        }
      }, false);
    }
  }
  stopWorker() {
    this.countCurvesWorker.terminate();
    this.countCurvesWorker = undefined;
  }
  clearCanvas() {
    this.refs.canvas.width = this.refs.canvas.width; // eslint-disable-line
  }
  // paintCursorFirefox(points) {
  //   const ctx = this.context;
  //   const grd = ctx.createRadialGradient(points[0], points[1], 5, points[0], points[1], 10);
  //   const brushColorGradient = this.brushList[this.currentBrushColor];
  //   ctx.save();
  //   for (let i = brushColorGradient.length - 1; i >= 0; i -= 1) {
  //     grd.addColorStop(brushColorGradient[i].stop, brushColorGradient[i].color);
  //   }
  //   ctx.beginPath();
  //   ctx.moveTo(points[0], points[1]);
  //   ctx.fillStyle = grd;
  //   ctx.lineCap = 'round';
  //   ctx.lineJoin = 'round';
  //   ctx.arc(points[0], points[1], 10, 0, 2 * Math.PI, false);
  //   ctx.fill();
  //   ctx.restore();
  // }
  // paintCurveFirefox(points) {
  //   const ctx = this.context;
  //   const grd = ctx.createLinearGradient(
  //                   points[0][0],
  //                   points[0][1],
  //                   points[points.length - 1][0] - points[0][0],
  //                   points[points.length - 1][1] - points[0][1]);
  //   const brushColorGradient = this.brushList[this.currentBrushColor];
  //   ctx.save();
  //   ctx.beginPath();
  //   for (let j = brushColorGradient.length - 1; j >= 0; j -= 1) {
  //     grd.addColorStop(brushColorGradient[j].stop, brushColorGradient[j].color);
  //   }
  //   ctx.strokeStyle = grd;
  //   ctx.lineCap = 'round';
  //   ctx.lineJoin = 'round';
  //   ctx.lineWidth = 15;
  //   for (let i = 1; i < points.length; i += 1) {
  //     ctx.moveTo(points[i - 1][0], points[i - 1][1]);
  //     ctx.lineTo(points[i][0], points[i][1]);
  //   }
  //   ctx.stroke();
  //   ctx.restore();
  //   this.paintCursorFirefox(points[points.length - 1], points[0]);
  // }
  paintCursor(points) {
    const ctx = this.context;
    const x = points[0];
    const y = points[1];
    const grd = ctx.createRadialGradient(x, y, 1, x, y, 5);
    const brushColorGradient = this.brushList[this.currentBrushColor];
    ctx.save();
    for (let i = brushColorGradient.length - 1; i >= 0; i -= 1) {
      grd.addColorStop(brushColorGradient[i].stop, brushColorGradient[i].color);
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = grd;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }
  paintCurve(points) {
    const ctx = this.context;
    let width = 1;
    const widthRate = this.maxBrushWidth / (points.length / 2);
    const alphaRate = points.length / 10;
    let grd;
    const brushColorGradient = this.brushList[this.currentBrushColor];
    ctx.save();
    for (let i = 2; i < points.length; i += 2) {
      ctx.beginPath();
      if (i === 1) {
        ctx.moveTo(points[0][0], points[0][1]);
      } else {
        ctx.moveTo(points[i - 2][0], points[i - 2][1]);
      }
      grd = ctx.createRadialGradient(points[i][0], points[i][1], 1, points[i][0], points[i][1], 5);
      for (let j = brushColorGradient.length - 1; j >= 0; j -= 1) {
        grd.addColorStop(brushColorGradient[j].stop, brushColorGradient[j].color);
      }
      if (i > alphaRate * 10) {
        ctx.globalAlpha = 1;
      } else if (i > alphaRate * 7) {
        ctx.globalAlpha = 0.5;
      } else if (i <= alphaRate * 6) {
        ctx.globalAlpha = 0.4;
      } else if (i > alphaRate * 4) {
        ctx.globalAlpha = 0.3;
      } else if (i > alphaRate * 3) {
        ctx.globalAlpha = 0.2;
      } else {
        ctx.globalAlpha = 0.1;
      }
      ctx.fillStyle = grd;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.arc(points[i][0], points[i][1], width / 2, 0, 2 * Math.PI, false);
      ctx.fill();
      if (width <= this.maxBrushWidth) {
        width += widthRate;
      }
    }
    ctx.restore();
    this.paintCursor(points[points.length - 1]);
  }
  removeCurves() {
    if (this.pointsArray.length === 1) {
      this.isRemoving = false;
      return;
    }
    this.pointsArray.splice(0, 1);
    this.countCurvesWorker.postMessage([this.pointsArray, 'remove']);
  }
  handleCanvasMousedown = (e) => {
    if (e.button === 2) {
      // Actions.showCanvasMenu();
      this.styles.menuLocation = {
        left: pageXOffset + e.clientX + 'px', // eslint-disable-line
        top: pageYOffset + e.clientY + 'px', // eslint-disable-line
        position: 'absolute',
      };
      this.setState({
        enableMenu: true,
      });
    } else {
      // Actions.hideCanvasMenu();
    }
    // this.props.handleContentFocus();
  }
  handleCanvasMousemove = (e) => {
    this.isMoving = true;
    this.isRemoving = false;
    const currentPoint = [e.clientX, e.clientY];
    const len = this.pointsArray.length;
    this.pointsArray.push(currentPoint);
    if (len > this.maxPointNum) {
      this.pointsArray.splice(0, len - this.maxPointNum);
    }
  }
  attrToString() {
    const object = arguments[0];
    const output = [];
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (typeof object[prop] === 'object') {
          output.push(prop, '{');
          const innerObject = object[prop];
          for (let innerObjProp in innerObject) {
            if (innerObject.hasOwnProperty(innerObjProp)) {
              output.push(innerObjProp, ':', innerObject[innerObjProp], ';');
            }
          }
          output.push('}');
        } else {
          output.push(prop, ':', object[prop], ';');
        }
      }
    }
    return output.join('');
  }
  render() {
    let canvasMenu;
    if (this.state.enableMenu) {
      canvasMenu = <button style={this.styles.menuLocation} onClick={this.setBrush('red')}>setColor</button>;
    }
    return (
      <div>
        <div className="canvas" style={this.styles.canvas}>
          <canvas
            id="canvas"
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
            ref="canvas"
            onMouseMove={this.handleCanvasMousemove}
            onMouseDown={this.handleCanvasMousedown}
            onWheel={this.props.handleCanvasScroll} />
          <style>
            {
              this.animateCSS
            }
          </style>
          {canvasMenu}
        </div>
      </div>
    );
  }
}
export default Canvas;
