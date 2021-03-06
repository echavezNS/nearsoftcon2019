import logger from './error_report';
import viewer from '../viewer';

let TouchApi = ((self) => {

  return {
    init: function(channel) {
      var obj = document.getElementById('circle-viewer');
      obj.addEventListener('touchstart', (event) => {
        if (event && window.slide == 26) {
          let fingers = event.targetTouches.length;
          channel.push('touch:api', { fingers });
          logger.logError('Fingers: ' + fingers);
          switch (fingers) {
            case 0:
              viewer.changeColorGray();
              break;
            case 1:
              viewer.changeColorBlue();
              break;
            case 2:
              viewer.changeColorRed();
              break;
            case 3:
              viewer.changeColorPurple();
              break;
            case 21:
              viewer.changeColorYellow();
              break;
            default:
              viewer.changeColorGreen();
          }
        }
      }, false);
      obj.addEventListener('touchmove', () => {
        if (event && window.slide == 26) {
          channel.push('touch:api', { fingers: 21 });
          viewer.changeColorYellow();
        }
      });
      obj.addEventListener('touchend', (event) => {
        if (event && window.slide == 26) {
          channel.push('touch:api', { fingers: 0 });
          viewer.changeColorGray();
        }
      })
    }
  }

})(TouchApi || {});


export default TouchApi;
