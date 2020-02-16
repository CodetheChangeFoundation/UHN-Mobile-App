// Haversine Formula to compute distance in meters
export const computeDistance = (locationOne, locationTwo) => {
    const { lat:lat1, lng:lng1 } = locationOne
    const { lat:lat2, lng:lng2 } = locationTwo
    const lat1InRad = toRad(lat1);
    const lng1InRad = toRad(lng1);
    const lat2InRad = toRad(lat2);
    const lng2InRad = toRad(lng2);
  
    return (
      // In meters
      6377830.272 *
      Math.acos(
        Math.sin(lat1InRad) * Math.sin(lat2InRad) +
          Math.cos(lat1InRad) * Math.cos(lat2InRad) * Math.cos(lng2InRad - lng1InRad),
      )
    );
}
  
function toRad(angle) {
    return (angle * Math.PI) / 180;
}