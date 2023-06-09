import {getPoint} from '../path/point.js';

export default class ModelPoints {
  points = Array.from({length: 3}, getPoint);
  getTasks = () => this.points;
}
