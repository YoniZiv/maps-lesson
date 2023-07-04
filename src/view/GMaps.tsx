import React, { Component } from "react";
// const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);
const log = (...args: any[]) => console.log("GoogleMap -->", ...args);

interface Props {
  lat: number;
  lng: number;
  zoom: number;
}

export class GoogleMap extends Component<Props> {
  mapRef = React.createRef<HTMLDivElement>();
  inputRef = React.createRef<HTMLInputElement>();
  theMap: google.maps.Map | null = null;

  shouldComponentUpdate(nextProps: Props) {
    log("shouldComponentUpdate >>>>");
    // log("this.props:", this.props);
    // log("this.state:", this.state);
    // log("nextState:", nextState);
    // log("nextProps:", nextProps);
    // log("<<<< shouldComponentUpdate");
    (this.theMap as google.maps.Map).setCenter({
      lat: nextProps.lat,
      lng: nextProps.lng,
    });
    (this.theMap as google.maps.Map).setZoom(this.props.zoom);

    return false;
  }

  componentDidMount() {
    // log(this.mapRef);
    this.theMap = new google.maps.Map(this.mapRef.current as HTMLDivElement, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8,
    });
  }

  addMarker = () => {
    const currCenter = this.theMap?.getCenter();
    const title = this.inputRef.current?.value;
    const marker = new google.maps.Marker({
      position: currCenter,
      map: this.theMap,
      title: title,
      clickable: true,
    });

    var infowindow = new google.maps.InfoWindow({
      content: title,
    });

    const theMap = this.theMap as google.maps.Map;

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(theMap, marker);
    });
  };

  render() {
    return (
      <>
        <input type="text" placeholder="Marker title" ref={this.inputRef} />
        <button onClick={this.addMarker}>Add marker</button>
        <div ref={this.mapRef} className="map-box" />
      </>
    );
  }
}
