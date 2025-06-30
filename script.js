document.addEventListener("DOMContentLoaded", () => {
  // AI Assistant Widget
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

  // Handle all forms (Web3Forms, Formspree, etc.)
  function handleAjaxForms(formSelector, successMessage = "Your message has been sent!") {
    const forms = document.querySelectorAll(formSelector);
    forms.forEach(form => {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
          // Web3Forms: data.success, Formspree: response.ok (already handled)
          if ((typeof data.success !== "undefined" && data.success) || (typeof data.success === "undefined" && data.ok !== false)) {
            form.reset();
            showFormMessage(form, successMessage, true);
          } else {
            showFormMessage(form, "Oops! Something went wrong. Please try again.", false);
          }
        })
        .catch(() => {
          showFormMessage(form, "Could not send! Please check your connection.", false);
        });
      });
    });
  }

  function showFormMessage(form, message, isSuccess) {
    let msgElem = form.querySelector(".form-message");
    if (!msgElem) {
      msgElem = document.createElement("div");
      msgElem.className = "form-message";
      form.appendChild(msgElem);
    }
    msgElem.textContent = message;
    msgElem.style.color = isSuccess ? "#2b7a2b" : "#a14b60";
    msgElem.style.marginTop = "1rem";
    msgElem.style.fontWeight = "bold";
    setTimeout(() => { msgElem.textContent = ""; }, 4000);
  }

  // Attach handler to all forms using Web3Forms or Formspree endpoints
  handleAjaxForms("form[action*='web3forms'], form[action*='formspree']", "Thank you! Your submission has been received.");
});