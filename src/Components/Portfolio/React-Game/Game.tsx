import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import './Game.scss';
import { Movement } from './Systems/Movement';
import { Player } from './Entities/Player';
import { EntityHandler } from './Systems/EntityHandler';
import { MapBuilder } from './Systems/MapBuilder';

export default class ReactGame extends PureComponent {
  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine
          className="game-render-window"
          systems={[Movement]}
          entities={{
            MapBuilder: { renderer: <MapBuilder /> },
            Player: { renderer: <Player x={20} y={20} direction="south" /> },
            EntityHandler: { renderer: <EntityHandler /> },
          }}
        />
      </div>
    );
  }
}
