import AbstractView from '../framework/view/abstract-view.js';
import CreatePointPresenter from '../presenter/creating-point.js';
import { presenters } from '../presenter/presenter-page.js';

const createSortTemplate = () => {
  const template = (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>
            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>
            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>
            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>
            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>
  `);
  return template;
};

export default class SortView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createSortTemplate();
  }

  addListeners() {
    this.element.querySelector('#sort-day').addEventListener('click', () => {
      const compare = (a, b) => {
        if (!(a instanceof CreatePointPresenter) && !(b instanceof CreatePointPresenter)) {
          const dateA = new Date(a.getTripPointComponent().getTripPoint().dateFrom);
          const dateB = new Date(b.getTripPointComponent().getTripPoint().dateFrom);
          return dateA - dateB;
        } else {
          return false;
        }
      };
      presenters.sort(compare);
      document.querySelector('.trip-events__list').innerHTML = '';
      if (document.querySelector('#filter-everything').checked) {
        presenters.forEach((i) => {
          i.renderDueFilterUpdate();
        });
      } else {
        const filteredPresenters = [];
        presenters.forEach((j) => {
          if (j instanceof CreatePointPresenter ) {
            filteredPresenters.push(j);
          } else {
            if (new Date(j.getTripPointComponent().getTripPoint().dateTo) > new Date()) {
              filteredPresenters.push(j);
            }
          }
        });
        filteredPresenters.forEach((j) => {
          j.renderDueFilterUpdate();
        });
      }
    });

    this.element.querySelector('#sort-price').addEventListener('click', () => {
      const compare = (a, b) => {
        if (!(a instanceof CreatePointPresenter) && !(b instanceof CreatePointPresenter)) {
          const priceA = new Date(a.getTripPointComponent().getTripPoint().basePrice);
          const priceB = new Date(b.getTripPointComponent().getTripPoint().basePrice);
          return priceA - priceB;
        } else {
          return false;
        }
      };
      presenters.sort(compare);
      document.querySelector('.trip-events__list').innerHTML = '';
      if (document.querySelector('#filter-everything').checked) {
        presenters.forEach((i) => {
          i.renderDueFilterUpdate();
        });
      } else {
        const filteredPresenters = [];
        presenters.forEach((j) => {
          if (j instanceof CreatePointPresenter ) {
            filteredPresenters.push(j);
          } else {
            if (new Date(j.getTripPointComponent().getTripPoint().dateTo) > new Date()) {
              filteredPresenters.push(j);
            }
          }
        });
        filteredPresenters.forEach((j) => {
          j.renderDueFilterUpdate();
        });
      }
    });
  }

  goToDaySort() {
    const compare = (a, b) => {
      if (!(a instanceof CreatePointPresenter) && !(b instanceof CreatePointPresenter)) {
        const dateA = new Date(a.getTripPointComponent().getTripPoint().dateFrom);
        const dateB = new Date(b.getTripPointComponent().getTripPoint().dateFrom);
        return dateA - dateB;
      } else {
        return false;
      }
    };
    presenters.sort(compare);
    document.querySelector('.trip-events__list').innerHTML = '';
    if (document.querySelector('#filter-everything').checked) {
      presenters.forEach((i) => {
        i.renderDueFilterUpdate();
      });
    } else {
      const filteredPresenters = [];
      presenters.forEach((j) => {
        if (j instanceof CreatePointPresenter ) {
          filteredPresenters.push(j);
        } else {
          if (new Date(j.getTripPointComponent().getTripPoint().dateTo) > new Date()) {
            filteredPresenters.push(j);
          }
        }
      });
      filteredPresenters.forEach((j) => {
        j.renderDueFilterUpdate();
      });
    }
    this.element.querySelector('#sort-day').checked = true;
    this.element.querySelector('#sort-price').checked = false;
  }
}
