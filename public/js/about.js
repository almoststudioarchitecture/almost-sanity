const teamButtons = document.querySelectorAll("#teamSection .box");

// Loop over each button to add a click event
teamButtons.forEach((btn, index) => {
  btn.addEventListener('click', function() {

    // Get the bio corresponding to the clicked team member
    const teamMemberTitle = btn.textContent.trim();
    const bioToShow = document.querySelector(`#teamBios [data-member="${teamMemberTitle}"]`);
    
    const wasVisible = bioToShow.classList.contains("visible");

    // Hide all bios
    const allBios = document.querySelectorAll("#teamBios .box");
    allBios.forEach(bio => {
      bio.classList.remove("visible");
    });

    // If it wasn't already displayed, show it
    if (!wasVisible) {
      bioToShow.classList.add("visible");
    }
  });
});