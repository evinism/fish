import React from 'react';
import Fish from './Fish';

const initialSource =
`
function weighted(a, b, weight){
  return a * weight + b * (1 - weight);
}

avgx = fishArray.map((inst) => inst.prevVelocityx || 0).reduce((a, b) => a + b, 0) / fishArray.length;
avgy = fishArray.map((inst) => inst.prevVelocityy || 0).reduce((a, b) => a + b, 0) / fishArray.length;

const strength = 0;
const speedMultiplier = 10;
const inertia = 0.90;
const groupInertia = 0.2;

// should be in 0 - 1 range
const biasx = strength * ((fish.x/100) - 0.5) + 0.5;
const biasy = strength * ((fish.y/100) - 0.5) + 0.5;
const newVelocityx = Math.random() - biasx;
const newVelocityy = Math.random() - biasy;
const velocityx = weighted(
  avgx,
  weighted(fish.prevVelocityx || 0, newVelocityx, inertia),
  groupInertia
);

const velocityy = weighted(
  avgy,
  weighted(fish.prevVelocityy || 0, newVelocityy, inertia),
  groupInertia
);


const x = fish.x + velocityx * speedMultiplier;
const y = fish.y + velocityy * speedMultiplier;

return {
  prevVelocityx: Math.min(Math.max(velocityx, -10), 10),
  prevVelocityy: Math.min(Math.max(velocityy, -10), 10),
  x: Math.min(Math.max(x, 0), 100),
  y: Math.min(Math.max(y, 0), 100)
};
`

/*
const strength = 50;

const biasx = strength * (fish.x - 50) / 100;
const biasy = strength * (fish.y - 50) / 100;
const velocityx = Math.random() - biasx;
const velocityy = Math.random() - biasy;

const x = fish.x + velocityx;
const y = fish.y + velocityy;

return { x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) }

`;
*/

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      value: initialSource,
    };
  }

  componentWillMount = () => {
    this.props.propagateNewSource(initialSource);
  }

  handleTextChange = (e) => {
    let res = this.props.propagateNewSource(e.target.value);
    this.setState({
      value: e.target.value,
      error: res.error,
    });
  }

  render() {
    const { error } = this.props;
    const renderedFish = this.props.fish.map(
      fish => <Fish x={fish.x} y={fish.y} />
    );
    return (
      <article>
        <h1>Application</h1>
        <div className='appContainer'>
          <div className='viewer'>
            <div className="viewport">
              {renderedFish}
            </div>
          </div>
          <div className='editor'>
            function updateFish(fish, fishArray, timeDelta){'{'}
            <textarea
              className={error && 'error'}
              onChange={this.handleTextChange}
              value={this.state.value}
            />
            {'};'}
            <div className='errorContainer'>
              {error}
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default App;
