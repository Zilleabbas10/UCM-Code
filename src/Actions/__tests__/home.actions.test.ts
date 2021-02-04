import { getCityWeatherReport } from '../home.actions'
import {mockStore} from '../../__mocks__/mockStore'
import mockAxios from '../../__mocks__/mockAxios'

import ACTIONS from '../action.types';
import { APP_ENDPOINTS } from '../../Services';


const responseToTest = {
    "data": {
      "cod": "200",
      "message": 0,
      "cnt": 40,
      "list": [
        {
          "dt": 1612040400,
          "main": {
            "temp": 271.49,
            "feels_like": 268.23,
            "temp_min": 270.5,
            "temp_max": 271.49,
            "pressure": 1005,
            "sea_level": 1005,
            "grnd_level": 1000,
            "humidity": 88,
            "temp_kf": 0.99
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "overcast clouds",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 86
          },
          "wind": {
            "speed": 1.18,
            "deg": 8
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2021-01-30 21:00:00"
        }
      ],
      "city": {
        "id": 2950159,
        "name": "Berlin",
        "coord": {
          "lat": 52.5244,
          "lon": 13.4105
        },
        "country": "DE",
        "population": 1000000,
        "timezone": 3600,
        "sunrise": 1611989470,
        "sunset": 1612021680
      }
    },
    "status": 200,
    "statusText": "OK",
    "request": {}
}

describe('HOME ACTIONS', () => {
    beforeAll(() =>{
        const mockItems = {};
        jest.mock('../../../node_modules/react-native/Libraries/Storage/AsyncStorage', () => ({
            setItem: jest.fn((item, value) => {
                return new Promise((resolve, reject) => {
                    mockItems[item] = value;
                    resolve(value);
                });
            }),
            getItem: jest.fn((item) => {
                return new Promise((resolve, reject) => {
                    resolve(mockItems[item]);
                });
            }),
        }));
    })

    it('should getCityWeatherReport dispatch action without API', async () => {
        // Initialize mockstore with empty state
        const initialState = {}
        const store = mockStore(initialState)
           
        // Dispatch the action
        await store.dispatch(getCityWeatherReport('berlin'))

        // Test if your store dispatched the expected actions
        const actions = store.getActions()
        const expectedAction = actions.find((action) => action.type === ACTIONS.HOME_ACTIONS.SET_CITY_ERROR_MESSAGE)
        expect(expectedAction).toBeDefined();
    })

    it('should getCityWeatherReport dispatch action with API', async () => {
        const mockApi = mockAxios()
        // Initialize mockstore with empty state
        const initialState = {}
        const store = mockStore(initialState)

        mockApi.onGet(APP_ENDPOINTS.GET_CITY_WEATHER).reply(200, responseToTest);
           
        // Dispatch the action
        await store.dispatch(getCityWeatherReport('berlin'))

        // Test if your store dispatched the expected actions
        const actions = store.getActions()
        const expectedAction = actions.find((action) => action.type === ACTIONS.HOME_ACTIONS.SET_CITY_WEATHER)
        expect(expectedAction).toBeDefined();
    })
})