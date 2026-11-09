// Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("collapsed");
    updateSidebarIcon();
}

// Update sidebar arrow
function updateSidebarIcon() {
    const sidebar = document.getElementById("sidebar");
    const icon = document.getElementById("toggleIcon");

    if (!sidebar || !icon) return;

    icon.className = sidebar.classList.contains("collapsed")
        ? "bi bi-arrow-right"
        : "bi bi-arrow-left";
}

// Initialize sidebar
function initializeSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const isMobile = window.matchMedia("(max-width: 575.98px)");

    sidebar.classList.toggle("collapsed", isMobile.matches);

    updateSidebarIcon();

    // Update when switching between desktop and mobile sizes
    isMobile.addEventListener("change", function (event) {
        sidebar.classList.toggle("collapsed", event.matches);
        updateSidebarIcon();
    });
}

// Run initialization
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSidebar);
} else {
    initializeSidebar();
}