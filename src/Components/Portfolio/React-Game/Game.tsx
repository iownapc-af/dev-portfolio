import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import './Game.scss';
import { Movement } from './Systems/Movement';
import { Player } from './Entities/Player';

export default class ReactGame extends PureComponent {
  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine
          className="game-render-window"
          systems={[Movement]}
          entities={{ Player: { x: 0, y: 0, direction: 'south', renderer: <Player /> } }}
        />
      </div>
    );
  }
}

// export default ReactGame;
