import * as d3 from '../vendor/d3.v3';
import color from './lib/color';
import ctype from './circle_type';

const w = window.innerWidth
const h = window.innerHeight

const svg = d3.select('.dots')
  .append('svg')
    .attr('width', w)
    .attr('height', h)

let circle = svg.selectAll('circle');

const force = d3.layout.force()
  .size([w,h])
  .on('tick', () =>
    circle
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
  )

const render = (members) => {
  circle = circle.data(members, d => d.id)

  circle
    .enter()
      .append('circle')
      .attr('id', d => d.id)
      .attr('fill', d => d.color)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', d => d.strokeWidth)
      .attr('r', d => 12)

  circle
    .exit()
      .transition()
      .attr('r', 0)
      .remove()

  force
    .nodes(members)
    .start()
}

const updateAll = (members) => {
  let svg = d3.select('svg');
  svg.selectAll('circle')
    .data(members)
    .attr('id', d => d.id)
    .attr('fill', d => d.color)
    .attr('stroke', d => d.stroke)
    .attr('stroke-width', d => d.strokeWidth)
    .attr('r', d => 12)
}

let members = []

// helpers for adding and removing members
function add({ id, color, r}) {
  let obj = { id, color, r};
  members.push(obj);
  render(members)
}

function remove (member) {
  members = members.filter(m => m.id != member.id)
  render(members)
}

function update (user_id, {color, r}) {
  members = members.map(m => {
    if(m.id == member.id) {
      m = member;
      m.color = color;
      m.r = r;
    }
    return m;
  })
  render(members);
}

function setDefault() {
  members.map(m => {
    m.color = color.gray;
    m.r = 12;
    m.strokeWidth = 0;
  });
  updateAll(members);
}

function updateCircleBattery(user_id, battery) {
  let i;
  members = members.map(m => {
    if(user_id == m.id) {
      i = m;
      if (battery) {
        const bigR = 15;
        let level = battery.level;
        let strokeWidth = (1 - level) * bigR;
        let r = level * bigR;
        m.color = color.green;
        m.stroke = color.greenAlpha;
        m.strokeWidth = strokeWidth;
        if (battery.charging) {
          m.color = color.red;
          m.stroke = color.redAlpha;
        }
        m.r = r;
      }
    }
    return m
  });
  updateAll(members)
}

function updateCircleLocation(user_id, position) {
  members = members.map(m => {
    if(user_id == m.id) {
      if(position) {
        m.color = color.green;
      }
    }
    return m;
  })
  updateAll(members);
}

function updateCircleOrientation(user_id, orientation) {
  members = members.map(m => {
      if(user_id == m.id) {
        switch (orientation.type) {
          case 'portrait-primary':
            m.color = color.green;
            break;
          case 'portrait-secondary':
            m.color = color.blue;
            break;
          case 'landscape-primary':
            m.color = color.yellow;
            break;
          case 'landscape-secondary':
            m.color = color.purple;
            break;
          default:
            m.color = color.gray;
      }
    }
    m.r = 12;
    return m;
  });
  updateAll(members);
}

function updateCircleAudioVideo(user_id, isAudioVideoSupported) {
  members = members.map(m => {
    if (user_id == m.id) {
      if (isAudioVideoSupported) {
        m.color = color.green;
      }
    }
    return m;
  });
  updateAll(members);
}

function updateCircleSupported(user_id, isAmbientSupported) {
  members = members.map(m => {
    if (user_id == m.id) {
      if (isAmbientSupported) {
        m.color = color.green;
      }
    }
    return m;
  });
  updateAll(members);
}

function updateCircleTouch(user_id, fingers) {
  members = members.map(m => {
    if(user_id == m.id) {
      switch (fingers) {
        case 0:
          m.color = color.gray;
          break;
        case 1:
          m.color = color.blue;
          break;
        case 2:
          m.color = color.red;
          break;
        case 3:
          m.color = color.purple;
          break;
        case 21:
          m.color = color.yellow;
          break;
        default:
          m.color = color.green;
      }
    }
    return m;
  });
  updateAll(members)
}

window.addEventListener('resize', () => {
  const w = window.innerWidth
  const h = window.innerHeight

  svg
    .attr('width', w)
    .attr('height', h)

  force
    .size([w,h])
    .start()

}, false)

export default {
  add,
  update,
  remove,
  setDefault,
  updateCircleBattery,
  updateCircleLocation,
  updateCircleOrientation,
  updateCircleAudioVideo,
  updateCircleSupported,
  updateCircleTouch
};
