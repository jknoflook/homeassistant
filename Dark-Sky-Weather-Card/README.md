# Dark-Sky Lovelace Card
A card developed for Lovelace for weather forecasts with dark-sky

![dark-sky](https://github.com/jknoflook/homeassistant/blob/master/images/dark-sky-card.png)


**Requirements:**

season.sensor
https://www.home-assistant.io/components/season/

sun.sun
https://www.home-assistant.io/components/sun/

dark-sky weather
https://www.home-assistant.io/components/weather.darksky/

season backgrounds installed in:
/www/pictures/

spring.png
summer.png
autumn.png
winter.png



**Options:**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | 'custom:dark-sky-weather-card'
| entity | string | **Required** | 'climate.home' This is your ecobee climate entity

**To Use:**

Add in ui-lovelace.yaml OR in lovelace under configure ui -> raw config:

    resources:
      - url: /local/custom_ui/dark-sky-weather-card.js
        type: js

In lovelace under Configure UI add a card -> select "Manual Card" and Enter:

    type: 'custom:dark-sky-weather-card'
