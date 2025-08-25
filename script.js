const scrollBtn = document.querySelector(".scroll-button");
const bmiForm = document.getElementById("bmi-form");

document.querySelector(".scroll-button a").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});    
    
// ---- BMI HESAPLAMA ----
const normalize = (v) => parseFloat(String(v).replace(",", "."));

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();

  let height = normalize(document.getElementById("height").value);
  let heightUnit = document.getElementById("height-unit").value;
  let weight = normalize(document.getElementById("weight").value);
  let weightUnit = document.getElementById("weight-unit").value;

  
  if (!height || !weight || height <= 0 || weight <= 0) {
    showPopup("⚠️ Please enter valid numbers.");
    return;
  }

  if (heightUnit === "cm") height = height / 100;
  else if (heightUnit === "ft") height = height * 0.3048;


  if (weightUnit === "lb") weight = weight * 0.453592;

  const bmi = +(weight / (height * height)).toFixed(2);

  let category = "";
  if (bmi < 18.5) {
      category = "Underweight";
  } else if (bmi < 25) {
      category = "Normal weight";
  } else if (bmi < 30) {
      category = "Overweight";
  } else {
      category = "Obese";
  }

  showPopup(`<h3>Your BMI: ${bmi}</h3><p>Category: ${category}</p>`);
});

const modal = document.getElementById("bmi-modal");
const output = document.getElementById("bmi-result");
const closeBtn = document.querySelector(".close");

function showPopup(message) {
  output.innerHTML = message;
  modal.style.display = "block";
}

// Çarpıya basınca kapat
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Arka plana tıklayınca kapat
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// ESC tuşuna basınca kapat
window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

document.getElementById("learn-more-btn").addEventListener("click", function() {
  window.location.href = "categories.html"; 
});