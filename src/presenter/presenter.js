import EditFormElement from '../view/editing.js';
import Sort from '../view/sorting.js';
import PointElement from '../view/route-points.js';
import TripPointsList from '../view/route-point-list.js';
import { render } from '../render.js';


export default class Presenter {
  tripPointsListElement = new TripPointsList();

  constructor({container}) {
    this.container = container;
  }

  init() {
    const changeEditForm = (elementToHide, elementToShow) => {
      this.tripPointsListElement.element.replaceChild(elementToShow, elementToHide);
    };

    render(new Sort(), this.container);
    render(this.tripPointsListElement, this.container);

    for (let i = 0; i < this.points.length; i++) {
      const pointElement = new PointElement(this.points[i]);
      const editElement = new EditFormElement(this.points[i]);
      pointElement.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        if (this.tripPointsListElement.element.querySelectorAll('.event--edit').length === 0) {
          changeEditForm(pointElement.getElement(), editElement.getElement());
        }
      });
      editElement.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
        changeEditForm(editElement.getElement(), pointElement.getElement());
      });

      editElement.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
        evt.preventDefault();
        changeEditForm(editElement.getElement(), pointElement.getElement());
      });

      editElement.getElement().querySelector('.event--edit').addEventListener('reset', (evt) => {
        evt.preventDefault();
        this.tripPointsListElement.element.removeChild(editElement.getElement());
        editElement.removeElement();
        pointElement.removeElement();
      });

      render(pointElement, this.tripPointsListElement.getElement());
    }
  }
}
