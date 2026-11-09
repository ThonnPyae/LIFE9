//create mappie
const map = L.map("hazardMap").setView([21.5, 96.0], 5);

//add mappie layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: '&copy; OpenStreetMap contributors'
    })
    .addTo(map);

//regional hazardie data
const regions = [
    {
        name: "Rakhine State",
        coordinates: [20.15, 92.90],
        description: "Its open coastline along the Bay of Bengal and steep coastal mountains are exposed to powerful seasonal storms.",
        disasters: "Cyclones, storm surges and coastal landslides"
    },
    {
        name: "Yangon Region",
        coordinates: [16.84, 96.17],
        description: "Dense urban areas and clogged drainage systems can trap monsoon rainwater and increase structural fire risks.",
        disasters: "Urban flooding, cyclones and accidental fires"
    },
    {
        name: "Ayeyarwady Region",
        coordinates: [16.78, 94.73],
        description: "Its low-lying delta landscape is vulnerable to overflowing rivers and coastal weather systems.",
        disasters: "River flooding and coastal storm surges"
    },
    {
        name: "Bago Region",
        coordinates: [17.33, 96.48],
        description: "Several major river basins cross this relatively flat region, while the Sagaing Fault creates earthquake risk.",
        disasters: "River flooding and earthquakes"
    },
    {
        name: "Sagaing Region",
        coordinates: [21.88, 95.98],
        description: "The active Sagaing Fault creates major seismic risk, while changing weather conditions contribute to floods and droughts.",
        disasters: "Earthquakes, river floods and droughts"
    },
    {
        name: "Mandalay Region",
        coordinates: [21.96, 96.09],
        description: "The dry central plains experience water shortages and high temperatures, alongside significant seismic risk.",
        disasters: "Droughts, heatwaves and earthquakes"
    },
    {
        name: "Magway Region",
        coordinates: [20.15, 94.93],
        description: "Its position in the central dry zone contributes to water scarcity and extreme heat, with earthquake risk also present.",
        disasters: "Droughts, heatwaves and earthquakes"
    },
    {
        name: "Chin State",
        coordinates: [22.65, 93.62],
        description: "Steep mountain slopes and unstable terrain can collapse during periods of heavy monsoon rainfall.",
        disasters: "Landslides, flash floods and earthquakes"
    },
    {
        name: "Kachin State",
        coordinates: [25.38, 97.40],
        description: "Heavy seasonal rainfall and mountainous terrain can overwhelm river basins and destabilise slopes.",
        disasters: "Landslides, mudslides and earthquakes"
    }
];


//add markers to mappie
regions.forEach(function(region){
    let marker = L.marker(region.coordinates).addTo(map);

    //marker pop-uppie
    marker.bindPopup(`
        <div>
            <div class="popup-title">${region.name}</div>

            <p class="popup-text">
                ${region.description}
            </p>

            <p class="popup-text">
                <strong>Natural hazards:</strong> ${region.disasters}
            </p>
        </div>
    `);
    region.marker = marker;
});