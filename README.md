# homeassistant
public homeassistant

to change background image:
place image in /www/pictures/
in lovelace-ui declare entity_background
entity_background: filename

example:
entity_background: summer_day.jpg
'''
     - type: custom:dark-sky-weather-card
        entity_sun: sun.sun
        entity_background: summer_day.jpg
        entity_daily_summary: sensor.dark_sky_daily_summary
        entity_current_conditions: sensor.dark_sky_icon  
        entity_humidity: sensor.dark_sky_humidity
        entity_pressure: sensor.dark_sky_pressure
        entity_temperature: sensor.dark_sky_temperature
        entity_visibility: sensor.dark_sky_visibility
        entity_wind_bearing: sensor.dark_sky_wind_bearing
        entity_wind_speed: sensor.dark_sky_wind_speed
        entity_forecast_high_temp_1: sensor.dark_sky_daytime_high_temperature_1
        entity_forecast_high_temp_2: sensor.dark_sky_daytime_high_temperature_2
        entity_forecast_high_temp_3: sensor.dark_sky_daytime_high_temperature_3
        entity_forecast_high_temp_4: sensor.dark_sky_daytime_high_temperature_4
        entity_forecast_high_temp_5: sensor.dark_sky_daytime_high_temperature_5
        entity_forecast_low_temp_1: sensor.dark_sky_overnight_low_temperature
        entity_forecast_low_temp_2: sensor.dark_sky_overnight_low_temperature_1
        entity_forecast_low_temp_3: sensor.dark_sky_overnight_low_temperature_2
        entity_forecast_low_temp_4: sensor.dark_sky_overnight_low_temperature_3
        entity_forecast_low_temp_5: sensor.dark_sky_overnight_low_temperature_4
        entity_forecast_icon_1: sensor.dark_sky_icon_1
        entity_forecast_icon_2: sensor.dark_sky_icon_2
        entity_forecast_icon_3: sensor.dark_sky_icon_3
        entity_forecast_icon_4: sensor.dark_sky_icon_4
        entity_forecast_icon_5: sensor.dark_sky_icon_5
        '''
