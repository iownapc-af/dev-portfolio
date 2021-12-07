import { PureComponent } from 'react';
import { GameEngine } from './Engine';
import './Game.scss';
import './Tiles.scss';
import { Movement } from './Systems/Movement';
import { EntityHandler } from './Systems/EntityHandler';
import { MapBuilder } from './Systems/MapBuilder';
import { PlayerRender } from './Entities/PlayerRender';
import { getPlayer } from './clients/playerClient';
import { PlayerType } from '../../../types/gametypes';

export default class ReactGame extends PureComponent {
  player: PlayerType = {
    id: '',
    name: '',
    direction: '',
    xcoordinate: 0,
    ycoordinate: 0,
  };

  compo() {
    getPlayer('w').then((res) => {
      this.player = res;
    });
  }

  render() {
    return (
      <div className="game-render-wrapper">
        <GameEngine
          className="game-render-window"
          systems={[Movement]}
          entities={{
            MapBuilder: { renderer: <MapBuilder /> },
            PlayerRender: {
              renderer: (
                <PlayerRender
                  x={this.player.xcoordinate}
                  y={this.player.ycoordinate}
                  direction="south"
                />
              ),
            },
            // PlayerRender: { renderer: <PlayerRender x={20} y={20} direction="south" /> },
            // PlayerHandler: { renderer: <PlayerHandler /> },
            EntityHandler: { renderer: <EntityHandler /> },
          }}
        />
      </div>
    );
  }
}
