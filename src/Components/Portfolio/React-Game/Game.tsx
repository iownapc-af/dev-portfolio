/* eslint-disable react/no-unused-state */
import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import './Game.scss';
import './Tiles.scss';
import { Movement } from './Systems/Movement';
import { EntityHandler } from './Systems/EntityHandler';
import { PlayerRender } from './Entities/PlayerRender';
import { MapRenderer } from './Entities/MapRenderer';

export default class ReactGame extends PureComponent {
  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine
          className="game-render-window"
          systems={[Movement]}
          entities={{
            MapRenderer: { renderer: <MapRenderer /> },
            PlayerRender: {
              renderer: <PlayerRender x={null} y={null} direction="south" />,
            },
            EntityHandler: { renderer: <EntityHandler /> },
          }}
        />
      </div>
    );
  }
}
