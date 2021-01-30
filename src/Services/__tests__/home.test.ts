import moment from 'moment';
import HomeHelpers from "../Home";
import { formatWeatherDate } from '../../Utils';

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
  
const emptyResponseToTest = {
    "data": {
      "cod": "200",
      "message": 0,
      "cnt": 40,
      "list": [],
      "city": {}
    },
    "status": 200,
    "statusText": "OK",
    "request": {}
  }

describe('getFormattedCityWeatherList function use-cases', () => {
    test('return formatted weather list if response data list is not empty', () => {
          const expectedResult = [{
            dtTxt: "2021-01-30 21:00:00",
            feelsLike: 268.23,
            description: "overcast clouds",
            temp: 271.49,
            time: moment("2021-01-30 21:00:00").format('LT'),
            date: formatWeatherDate("2021-01-30 21:00:00")
          }]
        expect(HomeHelpers.getFormattedCityWeatherList(responseToTest)).toEqual(expectedResult);
    });
    test('return formatted weather list empty if response data list is empty', () => {
        expect(HomeHelpers.getFormattedCityWeatherList(emptyResponseToTest)).toEqual([]);
    });
})
