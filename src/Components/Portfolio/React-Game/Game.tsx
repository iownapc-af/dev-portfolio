import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import './Game.scss';
import { Movement } from './Systems/Movement';
import { EntityHandler } from './Systems/EntityHandler';
import { MapBuilder } from './Systems/MapBuilder';
import { PlayerRender } from './Entities/Player';

export default class ReactGame extends PureComponent {
  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine
          className="game-render-window"
          systems={[Movement]}
          entities={{
            MapBuilder: { renderer: <MapBuilder /> },
            PlayerRender: { renderer: <PlayerRender x={20} y={20} direction="south" /> },
            // PlayerHandler: { renderer: <PlayerHandler /> },
            EntityHandler: { renderer: <EntityHandler /> },
          }}
        />
      </div>
    );
  }
}
