// Create a map
const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false,
    doubleClickZoom: true,
    dragging: true,
    minZoom: 4,
    maxZoom: 8
});

map.setView([21, 95.8], 5);

// Regional disaster info
const regionDetails = {
    "Ayeyarwady": {
        risks: ["River Floods", "Cyclones", "Storm Surges", "Coastal Flooding"],
        description: "Ayeyarwady's low-lying delta landscape and extensive river network make it highly vulnerable to flooding. Coastal communities also face cyclones and storm surges, which can damage homes, farmland and fishing areas."
    },
    "Bago": {
        risks: ["River Floods", "Flash Floods", "Landslides", "Extreme Heat"],
        description: "Bago Region experiences river and flash flooding during the monsoon season. Hilly areas in eastern Bago can also face landslides after heavy rainfall, while hotter conditions may affect communities during dry periods."
    },
    "Chin": {
        risks: ["Landslides", "Flash Floods", "Earthquakes", "Extreme Weather"],
        description: "Chin State's steep mountainous terrain makes it vulnerable to landslides and flash floods during heavy rainfall. Its location in an earthquake-prone part of Myanmar also creates additional risks for local communities."
    },
    "Kachin": {
        risks: ["Landslides", "River Floods", "Flash Floods", "Earthquakes"],
        description: "Kachin State has mountainous terrain and major rivers, including the Ayeyarwady River. Heavy monsoon rainfall can cause landslides and flooding, particularly in areas near rivers and unstable slopes."
    },
    "Kayah": {
        risks: ["Earthquakes", "Landslides", "Flash Floods", "Drought"],
        description: "Kayah State's mountainous landscape can increase the risk of landslides and flash floods during heavy rainfall. Earthquake hazards and dry-season water shortages can also affect communities."
    },
    "Kayin": {
        risks: ["Floods", "Landslides", "Flash Floods", "Drought"],
        description: "Kayin State's mountains, valleys and river systems create different disaster risks. Heavy rainfall can trigger flooding and landslides, while some communities may experience water shortages during dry periods."
    },
    "Magway": {
        risks: ["Drought", "Extreme Heat", "Flash Floods", "River Floods"],
        description: "Magway lies within Myanmar's Dry Zone, where high temperatures and limited rainfall can contribute to drought and water shortages. Intense rainfall can still cause flash floods, especially in low-lying areas."
    },
    "Mandalay": {
        risks: ["Earthquakes", "Extreme Heat", "Drought", "River Floods"],
        description: "Mandalay faces earthquake hazards due to its proximity to the Sagaing Fault. Its location in the Dry Zone also exposes communities to extreme heat, drought and water shortages, while river areas may experience flooding."
    },
    "Mon": {
        risks: ["Cyclones", "Coastal Flooding", "Storm Surges", "Landslides"],
        description: "Mon State's coastal location makes it vulnerable to cyclones, storm surges and coastal flooding. Heavy monsoon rainfall can also cause flooding and landslides in hilly areas."
    },
    "Naypyidaw": {
        risks: ["Extreme Heat", "Drought", "Flash Floods", "Earthquakes"],
        description: "Naypyidaw is located in Myanmar's central Dry Zone, where extreme heat and dry conditions can contribute to water shortages. Heavy seasonal rainfall can also cause localised flooding, and earthquake hazards remain important."
    },
    "Rakhine": {
        risks: ["Cyclones", "Storm Surges", "Coastal Flooding", "Landslides"],
        description: "Rakhine State's long coastline exposes communities to cyclones, strong winds and storm surges. Heavy rainfall can also cause flooding and landslides, especially in mountainous and coastal areas."
    },
    "Sagaing": {
        risks: ["Earthquakes", "River Floods", "Flash Floods", "Drought"],
        description: "Sagaing Region is crossed by the Sagaing Fault, making earthquakes a major hazard. Communities near the Chindwin and Ayeyarwady rivers may experience flooding, while drier areas can face drought and water shortages."
    },
    "Shan": {
        risks: ["Landslides", "Earthquakes", "Flash Floods", "Drought"],
        description: "Shan State's extensive highlands and mountainous terrain create risks of landslides and flash floods during heavy rainfall. Earthquakes and seasonal water shortages can also affect different parts of the state."
    },
    "Tanintharyi": {
        risks: ["Cyclones", "Coastal Flooding", "Storm Surges", "Landslides"],
        description: "Tanintharyi Region has a long coastline and many coastal communities that may be affected by cyclones, storm surges and flooding. Heavy monsoon rainfall can also trigger landslides in hilly areas."
    },
    "Yangon": {
        risks: ["Urban Flooding", "Cyclones", "Extreme Heat", "Storm Surges"],
        description: "Yangon Region is vulnerable to urban flooding because of heavy rainfall, low-lying areas and drainage limitations. Coastal and riverside communities may also be affected by cyclones and storm surges, while extreme heat creates additional health risks."
    }
};


// Colors for the map regions
const regionColors = [
    "#a8c5d8",
    "#c5d8bd",
    "#e8c9b5",
    "#b8b4d9",
    "#e8d49d",
    "#a9d2c5",
    "#d7b8c9",
    "#b8c9e3",
    "#d9c5a3",
    "#a7c6bb",
    "#e2b9ad",
    "#c5c2df",
    "#b8d5d9",
    "#e4d0a8",
    "#c4d8b2"
];

// MIMU administrative boundary data
const boundaryURL =
    "https://geosmarthosting.undp.org/arcgis/rest/services/Hosted/MMR_admin_levels_mimu/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=geojson";

// Keep track of the map layer
let myanmarLayer;

// Get the English name of each region
function getRegionName(feature) {
    return (
        feature.properties.adm1_en ||
        feature.properties.ADM1_EN ||
        feature.properties.adm1 ||
        "Unknown Region"
    );
}

// Match names such as "Chin State" to "Chin"
function normaliseRegionName(name) {
    return name
        .replace(/\s+(State|Region)$/i, "")
        .trim();
}

// Style each region
function getRegionStyle(feature, index) {
    return {
        fillColor: regionColors[index % regionColors.length],
        fillOpacity: 0.95,
        color: "#ffffff",
        weight: 1.5,
        opacity: 1
    };
}

// Highlight the selected area
function highlightRegion(event) {
    const layer = event.target;

    layer.setStyle({
        weight: 3,
        color: "#174d83",
        fillOpacity: 1
    });

    layer.bringToFront();
}

// Restore the original area style
function resetRegion(event) {
    myanmarLayer.resetStyle(event.target);
}

// Display the selected region
function showRegion(regionName) {
    const regionKey = normaliseRegionName(regionName);
    const details = regionDetails[regionKey];

    const infoBox = document.getElementById("regionInfo");

    if (!infoBox) return;

    if (!details) {
        infoBox.innerHTML = `
            <span class="section-label">SELECTED REGION</span>
            <h3>${regionName}</h3>
            <p>Disaster risks can vary between communities depending on their location, landscape and local conditions.</p>
            <p>Select another region to explore its main risks.</p>
        `;
        return;
    }

    infoBox.innerHTML = `
        <span class="section-label">SELECTED REGION</span>
        <h3>${regionName}</h3>
        <p>${details.description}</p>
        <h4>Main Disaster Risks</h4>
        <div class="risk-tags">
            ${details.risks.map(risk => `
                <span class="risk-tag">${risk}</span>
            `).join("")}
        </div>
    `;
}


// Add interaction to every region
function onEachRegion(feature, layer) {
    const name = getRegionName(feature);

    layer.bindTooltip(name, {
        sticky: true,
        direction: "auto",
        className: "region-tooltip"
    });

    layer.on({
        mouseover: highlightRegion,
        mouseout: resetRegion,
        click: function () {
            showRegion(name);
        }
    });
}

// Load the geographical boundaries
fetch(boundaryURL)
    .then(response => {
        if (!response.ok) {
            throw new Error("The boundary data could not be downloaded.");
        }

        return response.json();
    })
    .then(data => {
        if (!data.features || data.features.length === 0) {
            throw new Error("No region boundaries were returned.");
        }

        // Draw the coloured regions
        myanmarLayer = L.geoJSON(data, {
            style: function(feature) {
                const index = data.features.indexOf(feature);
                return getRegionStyle(feature, index);
            },
            onEachFeature: onEachRegion
        }).addTo(map);

        // Fit Myanmar inside the map
        const bounds = myanmarLayer.getBounds();

        map.fitBounds(bounds, {
            padding: [20, 20]
        });

        // Restrict movement to the country
        map.setMaxBounds(bounds.pad(0.12));
        map.options.maxBoundsViscosity = 1;

        // Bring the region layer above the map background
        myanmarLayer.bringToFront();
    })
    .catch(error => {
        console.error("Myanmar map error:", error);

        const card = document.getElementById("regionInfo");

        if (card) {
            card.innerHTML = `
                <div class="region-number">MAP UNAVAILABLE</div>
                <div class="region-icon">
                    <i class="bi bi-exclamation-circle"></i>
                </div>
                <h3>Unable to Load the Map</h3>
                <p>Please check your internet connection and refresh the page.</p>
            `;
        }
    });

// Flip the fact cards
document.querySelectorAll(".fact-card").forEach(card => {
    function flipCard() {
        card.classList.toggle("flipped");
    }

    card.addEventListener("click", flipCard);

    card.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            flipCard();
        }
    });
});