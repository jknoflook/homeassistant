if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

class EcobeeCard extends HTMLElement {
    _fire(type, detail, options) {
      options = options || {};
      detail = (detail === null || detail === undefined) ? {} : detail;
      const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
      });
      event.detail = detail;
      this.dispatchEvent(event);
      return event;
    }

    set hass(hass) {
      if (!this.content) {
        const card = document.createElement('ha-card');
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '/local/custom_ui/ecobee-card.css';
        card.appendChild(link);

        card.addEventListener('click', event => {
          this._fire('hass-more-info', { entityId: this.config.entity });
        })

        this.content = document.createElement('div');
        this.content.className = 'card';
        card.appendChild(this.content);
        this.appendChild(card);
      }

      const stateObj = hass.states[this.config.entity];

      const icon_heat = `<svg style="width:35px;height:35px" viewBox="0 0 24 24">
              <path class={0} d="M11.71,19C9.93,19 8.5,17.59 8.5,15.86C8.5,
              14.24 9.53,13.1 11.3,12.74C13.07,12.38 14.9,11.53 15.92,
              10.16C16.31,11.45 16.5,12.81 16.5,14.2C16.5,16.84 14.36,19 11.71,
              19M13.5,0.67C13.5,0.67 14.24,3.32 14.24,5.47C14.24,7.53 12.89,9.2
              10.83,9.2C8.76,9.2 7.2,7.53 7.2,5.47L7.23,5.1C5.21,7.5 4,10.61 4,
              14A8,8 0 0,0 12,22A8,8 0 0,0 20,14C20,8.6 17.41,3.8 13.5,0.67Z" />
              </svg>`;
      const icon_cool = `<svg style="width:35px;height:35px" viewBox="0 0 25 25">
              <path class={0} d="M20.79,13.95L18.46,14.57L16.46,
              13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,
              5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,
              3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,
              7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,
              10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,
              18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,
              20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,
              15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,
              13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,
              13.44V10.56Z" />
              </svg>`
      const icon_auto = `<svg style="width:35px;height:35px" viewBox="0 0 28 21">
              <path class={0} d="M 12.362716,11.130565 11.181872,10.460939 12.363291,
              9.7738589 11.448966,7.9980295 c 0,0 -0.420003,0.274814 -1.166157,
              0.6879083 0.01637,-1.6886264 0.01719,-3.3772617 0.01719,
              -5.0659388 l 1.71,-1.71 -1.42,-1.40999998 -1.2899995,
              1.28999998 -1.29,-1.28999998 -1.42,1.40999998 1.71,1.71 c -0.00231,
              1.6897047 0.00264,3.3793985 0.00662,5.0690968 C 6.7920286,
              7.8782125 5.295628,7.0350292 3.8,6.189999 l -0.58,-2.33 -1.9199999,
              0.52 0.47,1.77 L 0,6.6199986 0.52,8.5500009 2.85,
              7.9300005 C 4.3691442,8.7922788 5.8936868,9.6449549 7.4174712,
              10.498988 5.8950818,11.359504 4.3725464,12.219762 2.85,
              13.080001 l -2.33,-0.62 -0.52,1.93 1.7700001,0.47 -0.47,
              1.76 1.9299999,0.52 0.62,-2.33 c 1.4973046,-0.837186 2.9826805,
              -1.695245 4.4696523,-2.550561 -0.018519,1.706828 -0.019652,
              3.413667 -0.019652,5.120561 l -1.71,1.71 1.42,1.41 1.29,
              -1.29 1.2899997,1.29 1.41,-1.41 -1.7,-1.71 v -5.086562 l 1.172683,
              0.624806"/>
              <path class={1} d="m 20.030791,17.805647 c -1.696549,0 -3.059507,
              -1.343896 -3.059507,-2.99279 0,-1.54405 0.981711,-2.630604 2.668729,
              -2.973727 1.687019,-0.343122 3.431224,-1.153272 4.403404,
              -2.4590433 0.371716,1.2295223 0.552808,2.5257623 0.552808,
              3.8505953 0,2.516231 -2.039672,4.574965 -4.565434,
              4.574965 M 21.736872,0.335 c 0,0 0.705308,2.5257618 0.705308,
              4.5749648 0,1.9634224 -1.286709,3.5551289 -3.250131,
              3.5551289 -1.972954,0 -3.459817,-1.5917065 -3.459817,
              -3.5551289 l 0.02859,-0.3526535 c -1.925294,2.2874824 -3.078567,
              5.2516784 -3.078567,8.4827477 a 7.6249414,7.6249414 0 0 0 7.624941,
              7.624941 7.6249414,7.6249414 0 0 0 7.624941,-7.624941 c 0,
              -5.1468363 -2.468575,-9.7218007 -6.195265,-12.705059 z"/>
              </svg>`

      const transform_operation_mode = {
          "heat_heat": icon_heat.format("operation_heat_color"),
          "heat_idle": icon_heat.format("operation_neutral_color"),
          "cool_cool": icon_cool.format("operation_cool_color"),
          "cool_idle": icon_cool.format("operation_neutral_color"),
          "auto_cool": icon_auto.format("operation_cool_color", "operation_neutral_color"),
          "auto_heat": icon_auto.format("operation_neutral_color", "operation_heat_color"),
          "auto_idle": icon_auto.format("operation_neutral_color", "operation_neutral_color"),
          "off": "OFF",
          "off_idle": "OFF",
      }
      const transform_botdot = {
        "heat": "dot_heat_color",
        "cool": "dot_neutral_color",
        "auto": "dot_heat_color",
        "off": "#000000",
      }
      const transform_midbotdot = {
        "heat": "dot_heat_color",
        "cool": "dot_neutral_color",
        "auto": "dot_neutral_color",
        "off": "#000000",
      }
      const transform_midtopdot = {
        "heat": "dot_neutral_color",
        "cool": "dot_cool_color",
        "auto": "dot_neutral_color",
        "off": "#000000",
      }
      const transform_topdot = {
        "heat": "dot_neutral_color",
        "cool": "dot_cool_color",
        "auto": "dot_cool_color",
        "off": "#000000",
      }

      const transform_climate_mode_icon  = {
        "Sleep": `<ha-icon icon="mdi:power-sleep"></ha-icon> Sleep`,
        "Home":  `<ha-icon icon="mdi:home"></ha-icon> Home`,
        "Away": `<ha-icon icon="mdi:key-variant"></ha-icon> Away`,
      }

      const operation_mode = stateObj.state == "heat_cool" ? "auto" : stateObj.state;

      const midbotdot = transform_midbotdot[operation_mode];
      const midtopdot = transform_midtopdot[operation_mode];
      const topdot = transform_topdot[operation_mode];
      const transform_spt_operation_mode = {
        "heat": `<span class="dot dot6 ${midtopdot}"></span>
                 <div class="setpoint setpoint_heatcool operation_heat_color">
                  <p style="margin-top: 16px">
                   ${stateObj.attributes.temperature}
                  </p>
                 </div>
                 <span class="dot dot6 ${midbotdot}"></span>`,
        "cool": `<span class="dot dot6 ${midtopdot}"></span>
                 <span class="setpoint setpoint_heatcool operation_cool_color">
                  <p style="margin-top: 16px">
                   ${stateObj.attributes.temperature}
                  </p>
                 </span>
                 <span class="dot dot6 ${midbotdot}"></span>`,
        "auto": `<span class="setpoint setpoint_auto operation_cool_color">
                  <p style="margin-top: 12px">
                   ${stateObj.attributes.target_temp_high}
                  </p>
                 </span>
                 <span class="dot dot6 ${midbotdot}"></span>
                 <span class="setpoint setpoint_auto operation_heat_color">
                   <p style="margin-top: 12px">
                     ${stateObj.attributes.target_temp_low}
                   </p>
                </span>`,
        "off": ``,
      }
      // const climate_mode = transform_climate_mode_icon[stateObj.attributes.climate_mode];
      const climate_mode = (stateObj.attributes.preset_mode in transform_climate_mode_icon) ?
                             transform_climate_mode_icon[stateObj.attributes.preset_mode]:
                             stateObj.attributes.preset_mode;
      const operation_mode_suffix = stateObj.attributes.hvac_action == "cooling" ?
                                    "_cool" :
                                    stateObj.attributes.hvac_action == "heating" ?
                                    "_heat" :
                                    "_idle"
      const operation_mode_string =  operation_mode + operation_mode_suffix;
      const icon_operation_mode = transform_operation_mode[operation_mode_string];
      const spt_operation_mode = transform_spt_operation_mode[operation_mode];
      const botdot = transform_botdot[operation_mode];

      this.content.innerHTML = `
        <div class="ecobee_card">
          <div class="grid-container">
            <div class="grid-item"></div>
            <div class="ecobee1 ecobee_mode">
              ${icon_operation_mode}
            </div>
            <div class="grid_circles">
              <span class="dot dot1 ${topdot}"></span>
              <span class="dot dot2 ${topdot}"></span>
              <span class="dot dot3 ${topdot}"></span>
              <span class="dot dot4 ${topdot}"></span>
              ${spt_operation_mode}
              <span class="dot dot4 ${botdot}"></span>
              <span class="dot dot3 ${botdot}"></span>
              <span class="dot dot2 ${botdot}"></span>
              <span class="dot dot1 ${botdot}"></span>
            </div>
            <div class="grid-item"></div>
            <div class="ecobee1 ecobee_humidity">
              <ha-icon icon="mdi:water-percent"></ha-icon>${stateObj.attributes.current_humidity} %
            </div>
            <div class="grid-item"></div>
            <div class="ecobee1 ecobee_temperature">
              ${stateObj.attributes.current_temperature}&deg
            </div>
            <div class="grid-item"></div>
            <div class="ecobee1 ecobee_div">
              ${climate_mode}
            </div>
          </div>
        </div>
       `;
    }

    setConfig(config) {
      if (!config.entity || config.entity.split(".")[0] !== "climate") {
        throw new Error("Specify an entity from within the climate domain.");
      }

      this.config = config;
    }
}

customElements.define('ecobee-card', EcobeeCard);
