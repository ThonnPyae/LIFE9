document.addEventListener("DOMContentLoaded", function(){
    const creatorCards = document.querySelectorAll(".creator-card");

    creatorCards.forEach((card) => {
        const viewBioBtn = card.querySelector(".view-bio-trigger");
        const bioContent = card.querySelector(".bio-content");

        if (viewBioBtn && bioContent){
            viewBioBtn.addEventListener("click", function(){
                const isHidden = bioContent.style.display === "none";
                if (isHidden){
                    bioContent.style.display = "block";
                    viewBioBtn.innerHTML = 'Close Bio <i class="bi bi-arrow-left"></i>';
                }
                else{
                    bioContent.style.display = "none";
                    viewBioBtn.innerHTML = 'View Bio <i class="bi bi-arrow-right"></i>';
                }
            });
        }
    });
});