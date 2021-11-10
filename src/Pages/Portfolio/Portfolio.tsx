import Porjec2 from '../../Components/Portfolio/Porjec 2/Porjec 2';
import Soteria from '../../Components/Portfolio/Soteria/Soteria';
import { AppState, useAppDispatch, useAppSelector } from '../../Store/AppState';
import { Project } from '../../types/Tab';
import './Portfolio.scss';

const Portfolio = () => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector((state: AppState) => state.selectedProject);

  const projectPageClick = (projectName: Project) => {
    dispatch({ type: 'SET_SELECTED_PROJECT', selectedProject: projectName });
  };

  const displayProject = () => {
    switch (selectedProject) {
      case 'soteria':
        return <Soteria />;
      case 'porjec 2':
        return <Porjec2 />;
    }
  };

  return (
    <>
      {selectedProject ? (
        <>{displayProject()}</>
      ) : (
        <>
          <h1 className="p">Projects :-O</h1>
          <div className="projects-wrapper">
            <div className="project">
              <img src="" alt="" className="project-image" />
              <div className="project-desc">
                <button
                  className="project-name"
                  type="button"
                  onClick={() => {
                    projectPageClick('soteria');
                  }}
                >
                  Soteria
                </button>
                <span>
                  1 This is a project. It is very good. Has lots of good code. No errors. Excellent
                  styles, much skill.In addition to media types, there are also media features.
                  Media features provide more specific details to media queries, by allowing to test
                  for a specific feature of the user agent or display device. For example, you can
                  apply styles to only those screens that are greater, or smaller, than a certain
                  width.
                </span>
              </div>
            </div>
            <div className="project">
              <img src="" alt="" className="project-image" />
              <div className="project-desc">
                <button
                  className="project-name"
                  type="button"
                  onClick={() => {
                    projectPageClick('porjec 2');
                  }}
                >
                  PORJEC 2
                </button>
                <span>
                  2 This is a project. It is very good. Has lots of good code. No errors. Excellent
                  styles, much skill. In addition to media types, there are also media features.
                  Media features provide more specific details to media queries, by allowing to test
                  for a specific feature of the user agent or display device. For example, you can
                  apply styles to only those screens that are greater, or smaller, than a certain
                  width.
                </span>
              </div>
            </div>
            <div className="project">
              <img src="" alt="" className="project-image" />
              <div className="project-desc">
                <button
                  className="project-name"
                  type="button"
                  onClick={() => {
                    projectPageClick('porky-mon');
                  }}
                >
                  porky-mon
                </button>
                <span>
                  3 This is a project. It is very good. Has lots of good code. No errors. Excellent
                  styles, much skill.In addition to media types, there are also media features.
                  Media features provide more specific details to media queries, by allowing to test
                  for a specific feature of the user agent or display device. For example, you can
                  apply styles to only those screens that are greater, or smaller, than a certain
                  width.
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Portfolio;
