import ApiService from '../framework/api-service';


export default class TripPointApiService extends ApiService {
  get tripPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async deleteTripPoint(tripPoint) {
    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: 'DELETE',
    });

    return response;
  }

  async addTripPoint(tripPoint) {
    const tripPointToServer = {
      'base_price': tripPoint.basePrice,
      'date_from': tripPoint.dateFrom,
      'date_to': tripPoint.dateTo,
      'destination': tripPoint.destination,
      'id': tripPoint.id.toString(),
      'is_favourite': false,
      'offers': tripPoint.offers,
      'type': tripPoint.type
    };

    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(tripPointToServer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updateTripPoint(tripPoint) {
    const tripPointToServer = {
      'base_price': tripPoint.basePrice,
      'date_from': tripPoint.dateFrom,
      'date_to': tripPoint.dateTo,
      'destination': tripPoint.destination,
      'id': tripPoint.id.toString(),
      'is_favourite': false,
      'offers': tripPoint.offers,
      'type': tripPoint.type
    };

    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: 'PUT',
      body: JSON.stringify(tripPointToServer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
