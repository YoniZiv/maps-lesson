import { ChangeEvent, Component } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";
// const log = (...args) => console.log.apply(null, ["App -->", ...args]);
const log = (...args: any[]) => console.log("App -->", ...args);

interface State {
  lat: number;
  lng: number;
  zoom: number;
}

export class App extends Component<object, State> {
  state = {
    lat: -34.397,
    lng: 150.644,
    zoom: 8,
  };

  reposition(city: string) {
    switch (city) {
      case "tel aviv":
        this.setState({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "London":
        this.setState({ lat: 51.5287393, lng: -0.2667477 });
        break;
      case "Paris":
        this.setState({ lat: 48.8589383, lng: 2.264463 });
        break;
      case "Me":
        const pos = navigator.geolocation.getCurrentPosition((val) => {
          this.setState({
            lat: val.coords.latitude,
            lng: val.coords.longitude,
          });
        });
        break;
      default:
        alert("wrong city");
    }
  }

  zoom = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ zoom: parseInt(event.target.value) });
  };

  render() {
    log(this.state);
    return (
      <div className="app">
        <TopBar>
          <h1>Google Maps Example in React</h1>
        </TopBar>
        <div className="hbox mb20">
          <button onClick={() => this.reposition("tel aviv")}>Tel Aviv</button>
          <button onClick={() => this.reposition("London")}>London</button>
          <button onClick={() => this.reposition("Paris")}>Paris</button>
          <button onClick={() => this.reposition("Me")}>Locate me</button>

          <input
            type="number"
            min="8"
            max="16"
            placeholder="8"
            onChange={this.zoom}
          />
        </div>
        <GoogleMap {...this.state} />
      </div>
    );
  }
}
