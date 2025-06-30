document.addEventListener("DOMContentLoaded", () => {
  // AI Assistant Widget (unchanged)
  const aiIcon = document.getElementById("ai-icon");
  const aiPopup = document.getElementById("ai-popup");
  const aiResponse = document.getElementById("ai-response");
  const aiSubmit = document.getElementById("ai-submit");
  const closeBtn = aiPopup?.querySelector(".close-btn");

  if (aiIcon && aiPopup && aiResponse && aiSubmit && closeBtn) {
    aiIcon.addEventListener("click", () => {
      aiPopup.classList.toggle("hidden");
      aiResponse.focus();
    });

    closeBtn.addEventListener("click", () => {
      aiPopup.classList.add("hidden");
    });

    aiSubmit.addEventListener("click", () => {
      const userResponse = aiResponse.value.trim();
      if (userResponse) {
        alert(`You said: "${userResponse}"`);
        aiResponse.value = "";
      } else {
        alert("Please enter a message!");
      }
    });
  }

  // Handle only the college application form
  const collegeForm = document.querySelector(".college-form");
  if (collegeForm) {
    collegeForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const formData = new FormData(collegeForm);
      const action = collegeForm.getAttribute("action") || "";
      const method = collegeForm.getAttribute("method") || "POST";
      fetch(action, {
        method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          collegeForm.reset();
          showCollegeFormMessage("Thank you! Your application has been received.", true);
        } else {
          showCollegeFormMessage("Oops! Something went wrong. Please try again.", false);
        }
      })
      .catch(() => {
        showCollegeFormMessage("Could not send! Please check your connection.", false);
      });
    });

    function showCollegeFormMessage(message, isSuccess) {
      let msgElem = collegeForm.querySelector(".form-message");
      if (!msgElem) {
        msgElem = document.createElement("div");
        msgElem.className = "form-message";
        collegeForm.appendChild(msgElem);
      }
      msgElem.textContent = message;
      msgElem.style.color = isSuccess ? "#2b7a2b" : "#a14b60";
      msgElem.style.marginTop = "1rem";
      msgElem.style.fontWeight = "bold";
      setTimeout(() => { msgElem.textContent = ""; }, 4000);
    }
  }
});