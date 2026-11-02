// disaster info cards
const disasterData = {
    earthquakes: {
        title: "Earthquakes",
        color: "#bc1400",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2adqCUcqXbPrYw-nR8g_wzW63VzqVeBgX5Cr42El3w&s=10",
        description: "An earthquake is a sudden shaking of the Earth's surface caused by the release of energy in the Earth's crust.",
        safety: [
            "Drop, Cover, and Hold On under sturdy furniture.",
            "Stay away from windows, heavy furniture, and exterior walls.",
            "If outdoors, move to an open area away from buildings and power lines."
        ]
    },
    floods: {
        title: "Floods",
        color: "#bc1400",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLLvmhLy94MOxi_Zj-2ATBuSglYvndnqtkPY0avaFNrsLF4MsY02jg5wP&s=10",
        description: "Floods occur when an overflow of water submerges land that is usually dry, often due to heavy rainfall or storm surges.",
        safety: [
            "Move to higher ground immediately.",
            "Avoid walking or driving through floodwaters ('Turn Around, Don't Drown').",
            "Keep emergency supplies and drinking water packed."
        ]
    },
    landslides: {
        title: "Landslides",
        color: "#bc1400",
        img: "https://media.licdn.com/dms/image/v2/D4D12AQEMHhdfnoWnJA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680375976698?e=2147483647&v=beta&t=nm7iXLUKoZZ-iZny_m7gPmAa1_WOLSJz5-93231YhbI",
        description: "Landslides are the movement of rock, earth, or debris down a sloped section of land, often triggered by rain or earthquakes.",
        safety: [
            "Evacuate vulnerable sloped areas immediately during prolonged rainfall.",
            "Listen for unusual sounds like trees cracking or boulders knocking.",
            "Curl into a tight ball and protect your head if escape is impossible."
        ]
    },
    wildfires: {
        title: "Wildfires",
        color: "#bc1400",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOLgyBxXKayJj-SBmCmlghPHxaTyma8nuJsl3N3IpvZQ&s=10",
        description: "Wildfires are unplanned, unwanted fires burning in natural areas such as forests, grasslands, or prairies.",
        safety: [
            "Follow evacuation orders from local authorities instantly.",
            "Keep doors and windows closed to block smoke and embers.",
            "Wear protective long clothing and N95 masks to reduce smoke inhalation."
        ]
    },
    cyclones: {
        title: "Cyclones",
        color: "#0756a5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCY2FZIb_fcCeLpUh-M2FItXWu6q18Fp9KctsgfK1Ltjrnnc8vv3u0UOU&s=10",
        description: "Cyclones are large-scale atmospheric systems characterized by low pressure and strong rotating winds.",
        safety: [
            "Board up windows and secure loose outdoor objects.",
            "Stay indoors away from glass during the storm.",
            "Keep a battery-powered radio active for emergency announcements."
        ]
    },
    tsunamis: {
        title: "Tsunamis",
        color: "#0756a5",
        img: "https://i.natgeofe.com/n/0f9e3b7a-d3ca-4418-8e61-f605b4e04bc5/02-rikuzentakata-japan.jpg",
        description: "Tsunamis are giant sea waves caused by under-ocean earthquakes, volcanic eruptions, or landslides.",
        safety: [
            "If you feel a strong coastal quake, head inland to higher ground immediately.",
            "Never go down to the beach to watch a tsunami wave.",
            "Stay on high ground until official clearance is given."
        ]
    },
    tornadoes: {
        title: "Tornadoes",
        color: "#0756a5",
        img: "https://www.munichre.com/content/dam/munichre/mrm/royalty-free-shutterstock/shutterstock_81366340.jpg/_jcr_content/renditions/original.image_file.1200.802.file/shutterstock_81366340.jpg",
        description: "Tornadoes are violently rotating columns of air extending from a thunderstorm to the ground.",
        safety: [
            "Go to a basement or an interior room without windows on the lowest floor.",
            "Cover yourself with a mattress or thick blankets to protect from flying debris.",
            "If in a vehicle, get out and seek shelter in a sturdy building."
        ]
    },
    hurricanes: {
        title: "Hurricanes",
        color: "#0756a5",
        img: "https://insideclimatenews.org/wp-content/uploads/2023/06/hurricane_joe-raedle-getty-scaled.jpg",
        description: "Hurricanes are tropical storms with sustained winds of 74 mph or higher, capable of widespread destruction.",
        safety: [
            "Evacuate if instructed to do so by local officials.",
            "Stock up on emergency food, water, and medical supplies.",
            "Stay indoors during the eye of the hurricane, as destructive winds will resume."
        ]
    }
};

function showDisasterInfo(type) {
    const info = disasterData[type];
    if (!info) return;

    document.getElementById('disasterModalLabel').innerText = info.title;
    document.getElementById('modalHeader').style.backgroundColor = info.color;
    document.getElementById('modalHeaderBadge').style.color = info.color;
    document.getElementById('modalDisasterImg').src = info.img;
    document.getElementById('modalDisasterImg').alt = info.title;
    document.getElementById('modalDisasterDesc').innerText = info.description;

    const safetyCard = document.getElementById('modalSafetyCard');
    safetyCard.style.borderLeftColor = info.color;
    safetyCard.style.backgroundColor = info.color === '#bc1400' ? '#fdf2f2' : '#f0f6fc';

    const safetyList = document.getElementById('modalDisasterSafety');
    safetyList.innerHTML = info.safety.map((item, index) => `
        <li class="list-group-item custom-safety-item">
            <span class="safety-bullet" style="background-color: ${info.color};">${index + 1}</span>
            <span>${item}</span>
        </li>
    `).join('');
}

// sidebar
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarSections = document.querySelectorAll('#overview, #types, #disasters, #causes, #consequences, #response');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sidebarLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, {
    rootMargin: '-25% 0px -60% 0px'
});

sidebarSections.forEach(section => sectionObserver.observe(section));