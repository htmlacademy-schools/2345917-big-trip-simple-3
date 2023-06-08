import { render } from '../render';
import EditForm from '../view/editing-form';
import NewForm from '../view/form-of-creation';
import RoutePointList from '../view/route-point-list';
import RoutePoint from '../view/route-point';
import Sort from '../view/sorting';

export default class BoardPresenter {
  elementPointList = new RoutePointList();
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.elementPointList, this.boardContainer);
    render(new EditForm(), this.elementPointList.getElement());
    render(new NewForm(), this.elementPointList.getElement());
    render(new RoutePoint(), this.elementPointList.getElement());
    render(new Sort(), this.boardContainer);

    for (let i = 0; i < 3; i++) {
      render(new RoutePoint(), this.elementPointList.getElement());
    }
  }
}
